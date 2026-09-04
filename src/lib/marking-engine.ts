import { AssessmentResult, GradedQuestion } from '@/types/assessment';

export interface MarkingRuleConfig {
  penalizeMissingUnits: boolean;
  unitDeductionAmount: number; // e.g. 0.5 marks
  negativeMarkingUnanswered: boolean;
  unansweredPenalty: number;
  curveScalingType: 'none' | 'linear_boost' | 'square_root_curve';
  curveBoostPoints?: number;
}

export const DEFAULT_MARKING_RULES: MarkingRuleConfig = {
  penalizeMissingUnits: false,
  unitDeductionAmount: 0.5,
  negativeMarkingUnanswered: false,
  unansweredPenalty: 0,
  curveScalingType: 'none',
  curveBoostPoints: 5,
};

/**
 * Applies custom pedagogical grading rules, penalties, and score curves
 */
export function applyMarkingAdjustments(
  assessment: AssessmentResult,
  rules: MarkingRuleConfig
): AssessmentResult {
  let adjustedTotal = 0;
  const maxScore = assessment.summary?.maxScore || 100;

  const adjustedQuestions: GradedQuestion[] = (assessment.questions || []).map((q) => {
    let marks = q.marksAwarded;

    // Unit deduction check
    if (rules.penalizeMissingUnits && q.feedback?.toLowerCase().includes('missing unit')) {
      marks = Math.max(0, marks - rules.unitDeductionAmount);
    }

    // Unanswered penalty
    if (rules.negativeMarkingUnanswered && q.status === 'unanswered') {
      marks = Math.max(0, marks - rules.unansweredPenalty);
    }

    adjustedTotal += marks;

    return {
      ...q,
      marksAwarded: Number(marks.toFixed(2)),
    };
  });

  // Apply curve scaling if selected
  if (rules.curveScalingType === 'linear_boost') {
    adjustedTotal = Math.min(maxScore, adjustedTotal + (rules.curveBoostPoints || 0));
  } else if (rules.curveScalingType === 'square_root_curve') {
    // 10 * sqrt(raw_score_on_100)
    const rawPct = maxScore > 0 ? (adjustedTotal / maxScore) * 100 : 0;
    const curvedPct = Math.min(100, 10 * Math.sqrt(rawPct));
    adjustedTotal = (curvedPct / 100) * maxScore;
  }

  const finalPercentage = maxScore > 0 ? (adjustedTotal / maxScore) * 100 : 0;

  let grade = 'A';
  if (finalPercentage < 60) grade = 'F';
  else if (finalPercentage < 70) grade = 'D';
  else if (finalPercentage < 80) grade = 'C';
  else if (finalPercentage < 90) grade = 'B';

  return {
    ...assessment,
    summary: {
      ...assessment.summary,
      totalScore: Number(adjustedTotal.toFixed(2)),
      percentage: Number(finalPercentage.toFixed(1)),
      grade,
    },
    questions: adjustedQuestions,
  };
}
