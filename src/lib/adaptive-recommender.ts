/**
 * Veda AI - Item Response Theory (IRT) Adaptive Question Recommender
 * Employs 2-Parameter Logistic (2PL) IRT modeling to dynamically evaluate student
 * latent ability (theta) and recommend optimal diagnostic follow-up questions.
 */

export interface AssessmentItem {
  id: string;
  topic: string;
  difficultyBeta: number; // Item difficulty (-3.0 to +3.0)
  discriminationAlpha: number; // Item discrimination (0.5 to 2.5)
  maxMarks: number;
  bloomTier: string;
  promptText: string;
}

export interface StudentItemResponse {
  itemId: string;
  isCorrect: boolean;
  scoreFraction: number; // 0.0 - 1.0
  timeTakenSeconds: number;
}

export interface AdaptiveRecommendationResult {
  estimatedTheta: number; // Latent ability score (-3.0 to +3.0, converted to percentile 0 - 100)
  thetaStandardError: number;
  abilityPercentile: number; // 0 - 100%
  recommendedNextItem: AssessmentItem | null;
  fisherInformation: number;
  pedagogicalRationale: string;
}

export class AdaptiveRecommenderEngine {
  /**
   * 2-Parameter Logistic (2PL) probability function
   * P(theta) = 1 / (1 + exp(-alpha * (theta - beta)))
   */
  public static calculateProbability(theta: number, item: AssessmentItem): number {
    const exponent = -item.discriminationAlpha * (theta - item.difficultyBeta);
    return 1 / (1 + Math.exp(exponent));
  }

  /**
   * Computes Fisher Information for an item at a given theta
   * I(theta) = alpha^2 * P(theta) * (1 - P(theta))
   */
  public static calculateFisherInformation(theta: number, item: AssessmentItem): number {
    const p = this.calculateProbability(theta, item);
    return Math.pow(item.discriminationAlpha, 2) * p * (1 - p);
  }

  /**
   * Estimates student latent ability (theta) from past item responses using Newton-Raphson approximation
   */
  public static estimateStudentAbility(
    responses: StudentItemResponse[],
    itemBank: Record<string, AssessmentItem>
  ): { theta: number; standardError: number } {
    if (responses.length === 0) {
      return { theta: 0.0, standardError: 1.0 }; // Standard prior mean
    }

    let theta = 0.0; // Starting prior

    // Perform 5 iterations of Newton-Raphson maximum likelihood update
    for (let iter = 0; iter < 5; iter++) {
      let firstDerivative = 0;
      let secondDerivative = 0;

      for (const res of responses) {
        const item = itemBank[res.itemId];
        if (!item) continue;

        const p = this.calculateProbability(theta, item);
        const y = res.scoreFraction; // observed score
        const a = item.discriminationAlpha;

        firstDerivative += a * (y - p);
        secondDerivative += -Math.pow(a, 2) * p * (1 - p);
      }

      // Bayesian prior penalty (standard normal prior N(0, 1))
      firstDerivative -= theta;
      secondDerivative -= 1;

      if (Math.abs(secondDerivative) < 1e-6) break;

      const delta = firstDerivative / secondDerivative;
      theta = theta - delta;

      // Bound theta within reasonable psychological spectrum (-3.5 to +3.5)
      theta = Math.max(-3.5, Math.min(3.5, theta));
    }

    // Standard error = 1 / sqrt(total information)
    let totalInfo = 1; // Prior variance
    for (const res of responses) {
      const item = itemBank[res.itemId];
      if (item) totalInfo += this.calculateFisherInformation(theta, item);
    }

    const standardError = Math.round((1 / Math.sqrt(totalInfo)) * 100) / 100;
    return {
      theta: Math.round(theta * 100) / 100,
      standardError
    };
  }

  /**
   * Selects the next optimal assessment question to maximize measurement precision
   */
  public static recommendNextQuestion(
    responses: StudentItemResponse[],
    availableItems: AssessmentItem[],
    itemBank: Record<string, AssessmentItem>
  ): AdaptiveRecommendationResult {
    const { theta, standardError } = this.estimateStudentAbility(responses, itemBank);

    // Filter out already answered items
    const answeredIds = new Set(responses.map(r => r.itemId));
    const eligibleItems = availableItems.filter(item => !answeredIds.has(item.id));

    if (eligibleItems.length === 0) {
      const percentile = this.thetaToPercentile(theta);
      return {
        estimatedTheta: theta,
        thetaStandardError: standardError,
        abilityPercentile: percentile,
        recommendedNextItem: null,
        fisherInformation: 0,
        pedagogicalRationale: 'Assessment complete. All available items in diagnostic bank have been completed.'
      };
    }

    // Find item with highest Fisher Information at current theta
    let bestItem = eligibleItems[0];
    let maxInfo = -1;

    for (const item of eligibleItems) {
      const info = this.calculateFisherInformation(theta, item);
      if (info > maxInfo) {
        maxInfo = info;
        bestItem = item;
      }
    }

    const percentile = this.thetaToPercentile(theta);
    const difficultyLabel = bestItem.difficultyBeta > 1.0 ? 'Advanced' : (bestItem.difficultyBeta < -1.0 ? 'Foundational' : 'Moderate');

    const rationale = `Selected ${bestItem.topic} (${difficultyLabel} tier, beta=${bestItem.difficultyBeta.toFixed(2)}) to maximize test information at student ability index θ=${theta.toFixed(2)} (${percentile}th percentile).`;

    return {
      estimatedTheta: theta,
      thetaStandardError: standardError,
      abilityPercentile: percentile,
      recommendedNextItem: bestItem,
      fisherInformation: Math.round(maxInfo * 100) / 100,
      pedagogicalRationale: rationale
    };
  }

  /**
   * Maps standard normal z-score (theta) to 0 - 100th percentile using error function approximation
   */
  private static thetaToPercentile(theta: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(theta));
    const d = 0.3989423 * Math.exp(-theta * theta / 2);
    let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (theta > 0) p = 1 - p;
    return Math.max(1, Math.min(99, Math.round(p * 100)));
  }
}
