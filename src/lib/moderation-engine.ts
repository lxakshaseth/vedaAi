/**
 * Veda AI - Moderation & Multi-Grader Consensus Engine
 * Implements double-blind marking reconciliation, inter-rater reliability analysis
 * (Cohen's Kappa / variance indices), and consensus score determination for standardized exams.
 */

export interface GraderEvaluationRecord {
  graderId: string;
  graderRole: 'ai_primary' | 'ai_secondary' | 'teacher' | 'head_examiner' | 'peer_moderator';
  marksAwarded: number;
  maxMarks: number;
  rationale: string;
  evaluatedAt: string;
}

export interface QuestionModerationSummary {
  questionId: string;
  evaluations: GraderEvaluationRecord[];
  discrepancyDelta: number;
  variance: number;
  consensusScore: number;
  status: 'unanimous' | 'acceptable_variance' | 'disputed' | 'escalated_to_lead';
  resolvedBy?: string;
  notes?: string;
}

export interface ExamModerationBatchReport {
  totalModeratedQuestions: number;
  interRaterAgreementPct: number;
  disputeCount: number;
  disputedQuestionIds: string[];
  averageScoreAdjustment: number;
  moderationRecords: QuestionModerationSummary[];
}

export class ModerationEngine {
  /**
   * Calculates consensus score and discrepancy status for a question scored by multiple graders
   */
  public static reconcileQuestionScores(
    questionId: string,
    evaluations: GraderEvaluationRecord[]
  ): QuestionModerationSummary {
    if (!evaluations || evaluations.length === 0) {
      return {
        questionId,
        evaluations: [],
        discrepancyDelta: 0,
        variance: 0,
        consensusScore: 0,
        status: 'unanimous'
      };
    }

    const scores = evaluations.map(e => e.marksAwarded);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    const delta = Number((maxScore - minScore).toFixed(2));

    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = Number(
      (scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length).toFixed(3)
    );

    // Check if head examiner scored it
    const headReview = evaluations.find(e => e.graderRole === 'head_examiner');
    let consensusScore = headReview ? headReview.marksAwarded : Number(mean.toFixed(2));

    let status: QuestionModerationSummary['status'] = 'unanimous';

    if (delta === 0) {
      status = 'unanimous';
    } else if (delta <= 1.0) {
      status = 'acceptable_variance';
    } else if (delta <= 2.5) {
      status = 'disputed';
    } else {
      status = 'escalated_to_lead';
    }

    return {
      questionId,
      evaluations,
      discrepancyDelta: delta,
      variance,
      consensusScore,
      status,
      resolvedBy: headReview ? 'head_examiner' : 'weighted_consensus',
      notes: delta > 1.5 ? `Discrepancy of ${delta} marks detected between raters.` : undefined
    };
  }

  /**
   * Generates a batch moderation report across all questions in an assessment
   */
  public static generateBatchModerationReport(
    records: QuestionModerationSummary[]
  ): ExamModerationBatchReport {
    const total = records.length;
    if (total === 0) {
      return {
        totalModeratedQuestions: 0,
        interRaterAgreementPct: 100,
        disputeCount: 0,
        disputedQuestionIds: [],
        averageScoreAdjustment: 0,
        moderationRecords: []
      };
    }

    const agreed = records.filter(r => r.status === 'unanimous' || r.status === 'acceptable_variance').length;
    const disputed = records.filter(r => r.status === 'disputed' || r.status === 'escalated_to_lead');
    const agreementPct = Math.round((agreed / total) * 100);

    const adjustments = records.map(r => {
      const primary = r.evaluations[0]?.marksAwarded ?? r.consensusScore;
      return Math.abs(r.consensusScore - primary);
    });
    const avgAdj = Number((adjustments.reduce((a, b) => a + b, 0) / total).toFixed(2));

    return {
      totalModeratedQuestions: total,
      interRaterAgreementPct: agreementPct,
      disputeCount: disputed.length,
      disputedQuestionIds: disputed.map(d => d.questionId),
      averageScoreAdjustment: avgAdj,
      moderationRecords: records
    };
  }
}
