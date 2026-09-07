/**
 * Veda AI - Adaptive Rubric Synthesizer & Emergent Answer Clustering Engine
 * Clusters student solution approaches, discovers unforeseen valid alternative methods,
 * and dynamically synthesizes updated rubric criteria to reward creative problem-solving.
 */

export interface StudentAnswerSubmission {
  studentId: string;
  questionId: string;
  rawAnswerText: string;
  extractedKeywords: string[];
  awardedScore?: number;
}

export interface SolutionMethodologyCluster {
  clusterId: string;
  methodologyName: string; // e.g. "Algebraic Derivation", "Trigonometric Substitution", "Graphical/Coordinate Approach"
  studentCount: number;
  percentageOfCohort: number;
  representativeSnippet: string;
  isCoveredInOriginalRubric: boolean;
  averageScoreInCluster: number;
}

export interface SynthesizedRubricUpdate {
  questionId: string;
  totalSubmissionsAnalyzed: number;
  clustersDiscovered: SolutionMethodologyCluster[];
  emergentCriteriaRecommendations: Array<{
    title: string;
    description: string;
    suggestedPoints: number;
    justification: string;
  }>;
  confidenceScore: number; // 0 - 100
}

export class RubricSynthesizerEngine {
  private static METHOD_HEURISTICS: Array<{ name: string; triggers: string[] }> = [
    { name: 'Algebraic Derivation', triggers: ['substitute', 'equation', 'simplify', 'factor', 'solve for'] },
    { name: 'Calculus / Differential Approach', triggers: ['derivative', 'integrate', 'dx', 'dy/dx', 'limit', 'chain rule'] },
    { name: 'Geometric / Spatial Proof', triggers: ['triangle', 'angle', 'parallel', 'congruent', 'pythagorean', 'circle'] },
    { name: 'Numerical / Approximation Method', triggers: ['iterate', 'estimate', 'decimal', 'table', 'round'] },
    { name: 'Direct Empirical / Factual Statement', triggers: ['because', 'states that', 'defined as', 'law of', 'rule'] }
  ];

  /**
   * Clusters a batch of student answers into distinct methodological approaches
   */
  public static clusterAnswerMethodologies(
    questionId: string,
    submissions: StudentAnswerSubmission[],
    baselineRubricMethodNames: string[] = ['Algebraic Derivation']
  ): SynthesizedRubricUpdate {
    const total = submissions.length;
    if (total === 0) {
      return {
        questionId,
        totalSubmissionsAnalyzed: 0,
        clustersDiscovered: [],
        emergentCriteriaRecommendations: [],
        confidenceScore: 100
      };
    }

    const clusterMap: Record<string, { count: number; snippets: string[]; scores: number[] }> = {};

    submissions.forEach(sub => {
      const lower = sub.rawAnswerText.toLowerCase();
      let matchedMethod = 'Alternative Custom Formulation';

      for (const heuristic of this.METHOD_HEURISTICS) {
        if (heuristic.triggers.some(t => lower.includes(t))) {
          matchedMethod = heuristic.name;
          break;
        }
      }

      if (!clusterMap[matchedMethod]) {
        clusterMap[matchedMethod] = { count: 0, snippets: [], scores: [] };
      }

      clusterMap[matchedMethod].count++;
      if (clusterMap[matchedMethod].snippets.length < 3) {
        clusterMap[matchedMethod].snippets.push(sub.rawAnswerText.slice(0, 100));
      }
      if (sub.awardedScore !== undefined) {
        clusterMap[matchedMethod].scores.push(sub.awardedScore);
      }
    });

    const clusters: SolutionMethodologyCluster[] = Object.entries(clusterMap).map(([name, data], idx) => {
      const avgScore = data.scores.length > 0 
        ? Math.round((data.scores.reduce((a, b) => a + b, 0) / data.scores.length) * 10) / 10 
        : 0;

      const isCovered = baselineRubricMethodNames.some(b => b.toLowerCase().includes(name.toLowerCase()));

      return {
        clusterId: `cluster-${idx + 1}-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        methodologyName: name,
        studentCount: data.count,
        percentageOfCohort: Math.round((data.count / total) * 100),
        representativeSnippet: data.snippets[0] || '',
        isCoveredInOriginalRubric: isCovered,
        averageScoreInCluster: avgScore
      };
    });

    // Detect emergent criteria for unlisted valid methods adopted by >10% of students
    const emergentRecommendations: SynthesizedRubricUpdate['emergentCriteriaRecommendations'] = [];

    clusters.filter(c => !c.isCoveredInOriginalRubric && c.percentageOfCohort >= 10).forEach(c => {
      emergentRecommendations.push({
        title: `Alternative Path: ${c.methodologyName}`,
        description: `Award full/equivalent partial marks if student correctly solves using ${c.methodologyName}.`,
        suggestedPoints: Math.max(1, Math.round(c.averageScoreInCluster || 3)),
        justification: `Adopted by ${c.percentageOfCohort}% of the cohort (${c.studentCount} students) as an alternative problem-solving vector.`
      });
    });

    return {
      questionId,
      totalSubmissionsAnalyzed: total,
      clustersDiscovered: clusters,
      emergentCriteriaRecommendations: emergentRecommendations,
      confidenceScore: Math.min(100, Math.max(70, 100 - (clusters.length > 4 ? 15 : 0)))
    };
  }
}
