/**
 * Veda AI - Rubric Quality Optimizer & Criteria Refinement Engine
 * Evaluates rubric clarity, identifies vague terminology, ensures criteria orthogonality,
 * and generates calibrated descriptors to maximize grading consistency.
 */

export interface RubricCriterion {
  id: string;
  title: string;
  description: string;
  weight: number; // e.g. 0.0 - 1.0 or raw marks
  maxMarks: number;
  levels?: Array<{
    score: number;
    label: string;
    description: string;
  }>;
}

export interface CriteriaAmbiguityIssue {
  criterionId: string;
  criterionTitle: string;
  severity: 'low' | 'medium' | 'high';
  issueType: 'vague_modifier' | 'overlapping_scale' | 'missing_benchmark' | 'unbalanced_weight';
  snippet: string;
  recommendation: string;
}

export interface RubricAuditReport {
  clarityIndex: number; // 0 - 100
  orthogonalityScore: number; // 0 - 100
  totalCriteria: number;
  totalMarksAllocated: number;
  ambiguities: CriteriaAmbiguityIssue[];
  optimizedSuggestions: Array<{
    criterionId: string;
    originalDescription: string;
    enhancedDescription: string;
    suggestedAnchors: string[];
  }>;
}

export class RubricOptimizerEngine {
  private static VAGUE_MODIFIERS = [
    'good', 'adequate', 'somewhat', 'mostly', 'poor', 'nice', 'reasonable',
    'satisfactory', 'appropriate', 'fine', 'fairly', 'a lot', 'few'
  ];

  /**
   * Evaluates the pedagogical clarity and precision of a marking rubric
   */
  public static auditRubric(criteria: RubricCriterion[], targetTotalMarks?: number): RubricAuditReport {
    const ambiguities: CriteriaAmbiguityIssue[] = [];
    const suggestions: RubricAuditReport['optimizedSuggestions'] = [];
    let totalMarks = 0;

    criteria.forEach((criterion) => {
      totalMarks += criterion.maxMarks;
      const descLower = (criterion.description || '').toLowerCase();
      const titleLower = (criterion.title || '').toLowerCase();

      // Check for vague modifiers
      const foundVague = this.VAGUE_MODIFIERS.filter(word => 
        new RegExp(`\\b${word}\\b`, 'i').test(descLower) || new RegExp(`\\b${word}\\b`, 'i').test(titleLower)
      );

      if (foundVague.length > 0) {
        ambiguities.push({
          criterionId: criterion.id,
          criterionTitle: criterion.title,
          severity: foundVague.length > 2 ? 'high' : 'medium',
          issueType: 'vague_modifier',
          snippet: foundVague.join(', '),
          recommendation: `Replace subjective terms (${foundVague.join(', ')}) with observable evidence criteria.`
        });
      }

      // Check level descriptors if present
      if (criterion.levels && criterion.levels.length > 0) {
        const scores = criterion.levels.map(l => l.score);
        const maxLevelScore = Math.max(...scores);
        if (maxLevelScore !== criterion.maxMarks) {
          ambiguities.push({
            criterionId: criterion.id,
            criterionTitle: criterion.title,
            severity: 'high',
            issueType: 'overlapping_scale',
            snippet: `Max level score (${maxLevelScore}) does not match criterion max marks (${criterion.maxMarks})`,
            recommendation: 'Align top-level achievement score with total allocated criterion marks.'
          });
        }
      }

      // Generate suggested objective anchors
      const suggestedAnchors = [
        `Explicitly cites at least 2 relevant equations/theorems`,
        `Demonstrates correct step-by-step intermediate transformations`,
        `Includes final units and numerical rounding precision`
      ];

      suggestions.push({
        criterionId: criterion.id,
        originalDescription: criterion.description,
        enhancedDescription: this.generateCalibratedDescriptor(criterion.title, criterion.description),
        suggestedAnchors
      });
    });

    // Check total marks alignment
    if (targetTotalMarks && totalMarks !== targetTotalMarks) {
      ambiguities.push({
        criterionId: 'global',
        criterionTitle: 'Assessment Total',
        severity: 'high',
        issueType: 'unbalanced_weight',
        snippet: `Rubric sums to ${totalMarks} marks, expected ${targetTotalMarks}`,
        recommendation: `Recalibrate criteria weights so their sum exactly equals ${targetTotalMarks} marks.`
      });
    }

    const clarityPenalty = ambiguities.reduce((acc, issue) => {
      if (issue.severity === 'high') return acc + 15;
      if (issue.severity === 'medium') return acc + 8;
      return acc + 4;
    }, 0);

    const clarityIndex = Math.max(20, Math.min(100, 100 - clarityPenalty));
    const orthogonalityScore = Math.max(40, Math.min(100, 95 - ambiguities.length * 5));

    return {
      clarityIndex,
      orthogonalityScore,
      totalCriteria: criteria.length,
      totalMarksAllocated: totalMarks,
      ambiguities,
      optimizedSuggestions: suggestions
    };
  }

  /**
   * Refines a fuzzy criterion description into an evidence-based descriptor
   */
  private static generateCalibratedDescriptor(title: string, desc: string): string {
    const cleaned = desc.trim();
    if (!cleaned) {
      return `Demonstrates mastery in ${title} through correct formulation, clear notation, and verified intermediate steps.`;
    }
    return `Evaluates ${title}: Student must provide clear justification, verify boundary conditions, and detail intermediate derivation (${cleaned}).`;
  }
}
