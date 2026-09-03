import { AssessmentResult, GradedQuestion } from '@/types/assessment';

export interface ClassStatistics {
  count: number;
  meanScore: number;
  medianScore: number;
  minScore: number;
  maxScore: number;
  standardDeviation: number;
  passRate: number; // percentage scoring >= 60%
  gradeDistribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
}

export interface QuestionMasteryStats {
  questionLabel: string;
  questionText: string;
  averageScore: number;
  maxMarks: number;
  masteryPercentage: number;
  difficultyCategory: 'Easy' | 'Moderate' | 'Challenging';
  commonErrorPatterns: string[];
}

/**
 * Calculates statistical metrics across a batch of assessment results
 */
export function calculateClassStatistics(assessments: AssessmentResult[]): ClassStatistics {
  if (!assessments || assessments.length === 0) {
    return {
      count: 0,
      meanScore: 0,
      medianScore: 0,
      minScore: 0,
      maxScore: 0,
      standardDeviation: 0,
      passRate: 0,
      gradeDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 },
    };
  }

  const scores = assessments.map((a) => a.summary?.totalScore ?? 0).sort((a, b) => a - b);
  const count = scores.length;
  const sum = scores.reduce((acc, val) => acc + val, 0);
  const meanScore = sum / count;

  // Median
  const mid = Math.floor(count / 2);
  const medianScore = count % 2 !== 0 ? scores[mid] : (scores[mid - 1] + scores[mid]) / 2;

  // Standard Deviation
  const variance = scores.reduce((acc, val) => acc + Math.pow(val - meanScore, 2), 0) / count;
  const standardDeviation = Math.sqrt(variance);

  // Grade Distribution & Pass Rate
  const gradeDistribution = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  let passingCount = 0;

  assessments.forEach((a) => {
    const max = a.summary?.maxScore || 100;
    const total = a.summary?.totalScore ?? 0;
    const pct = max > 0 ? (total / max) * 100 : 0;
    if (pct >= 90) gradeDistribution.A++;
    else if (pct >= 80) gradeDistribution.B++;
    else if (pct >= 70) gradeDistribution.C++;
    else if (pct >= 60) gradeDistribution.D++;
    else gradeDistribution.F++;

    if (pct >= 60) passingCount++;
  });

  return {
    count,
    meanScore: Number(meanScore.toFixed(2)),
    medianScore: Number(medianScore.toFixed(2)),
    minScore: scores[0] || 0,
    maxScore: scores[scores.length - 1] || 0,
    standardDeviation: Number(standardDeviation.toFixed(2)),
    passRate: Number(((passingCount / count) * 100).toFixed(1)),
    gradeDistribution,
  };
}

/**
 * Computes question-level mastery across all student assessments
 */
export function calculateQuestionMastery(assessments: AssessmentResult[]): QuestionMasteryStats[] {
  if (!assessments || assessments.length === 0) return [];

  const questionMap: {
    [qId: string]: {
      label: string;
      text: string;
      scores: number[];
      maxMarks: number;
      feedbacks: string[];
    };
  } = {};

  assessments.forEach((a) => {
    (a.questions || []).forEach((q: GradedQuestion) => {
      const qKey = q.question.id || q.question.fullLabel || q.question.numberLabel;
      if (!questionMap[qKey]) {
        questionMap[qKey] = {
          label: q.question.fullLabel || `Q${q.question.numberLabel}`,
          text: q.question.text || '',
          scores: [],
          maxMarks: q.question.maxMarks || 1,
          feedbacks: [],
        };
      }
      questionMap[qKey].scores.push(q.marksAwarded || 0);
      if (q.feedback) {
        questionMap[qKey].feedbacks.push(q.feedback);
      }
    });
  });

  return Object.values(questionMap).map((data) => {
    const avg = data.scores.reduce((a, b) => a + b, 0) / (data.scores.length || 1);
    const pct = (avg / (data.maxMarks || 1)) * 100;

    let difficultyCategory: 'Easy' | 'Moderate' | 'Challenging' = 'Moderate';
    if (pct >= 80) difficultyCategory = 'Easy';
    else if (pct < 60) difficultyCategory = 'Challenging';

    return {
      questionLabel: data.label,
      questionText: data.text,
      averageScore: Number(avg.toFixed(2)),
      maxMarks: data.maxMarks,
      masteryPercentage: Number(pct.toFixed(1)),
      difficultyCategory,
      commonErrorPatterns: data.feedbacks.slice(0, 3),
    };
  });
}
