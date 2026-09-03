import { AssessmentResult, GradedQuestion } from '@/types/assessment';

export interface PersonalizedStudyPlan {
  summaryPraise: string;
  keyStrengths: string[];
  growthAreas: string[];
  recommendedTopics: {
    topic: string;
    priority: 'High' | 'Medium' | 'Low';
    suggestedAction: string;
  }[];
  motivationalQuote: string;
}

const MOTIVATIONAL_QUOTES = [
  "Mistakes are proof that you are trying and learning.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Every expert was once a beginner. Keep exploring.",
  "Precision in reasoning builds mastery in understanding.",
];

/**
 * Generates personalized, constructive student feedback and remedial action items
 */
export function generateStudentStudyPlan(assessment: AssessmentResult): PersonalizedStudyPlan {
  const questions: GradedQuestion[] = assessment.questions || [];
  const totalAwarded = assessment.summary?.totalScore ?? 0;
  const maxScore = assessment.summary?.maxScore ?? 100;
  const percentage = maxScore > 0 ? (totalAwarded / maxScore) * 100 : 0;
  const studentName = (assessment as any).studentName || 'the student';

  const strongQuestions = questions.filter(
    (q) => (q.marksAwarded / (q.question?.maxMarks || 1)) >= 0.8
  );
  const weakQuestions = questions.filter(
    (q) => (q.marksAwarded / (q.question?.maxMarks || 1)) < 0.7
  );

  const keyStrengths: string[] = [];
  if (strongQuestions.length > 0) {
    strongQuestions.slice(0, 3).forEach((q) => {
      const label = q.question?.fullLabel || `Q${q.question?.numberLabel}`;
      keyStrengths.push(`Solid grasp of ${label} concepts with thorough working.`);
    });
  } else {
    keyStrengths.push('Demonstrated good effort and active attempt across all exam questions.');
  }

  const growthAreas: string[] = [];
  const recommendedTopics: PersonalizedStudyPlan['recommendedTopics'] = [];

  if (weakQuestions.length > 0) {
    weakQuestions.forEach((q) => {
      const label = q.question?.fullLabel || `Q${q.question?.numberLabel}`;
      const qTitle = q.question?.text ? q.question.text.slice(0, 40) + '...' : label;
      growthAreas.push(`Review foundational principles for: "${qTitle}"`);

      recommendedTopics.push({
        topic: `Concept in ${label}`,
        priority: (q.marksAwarded / (q.question?.maxMarks || 1)) < 0.4 ? 'High' : 'Medium',
        suggestedAction: q.feedback || 'Re-derive core formulas and practice 2-3 similar textbook problems.',
      });
    });
  } else {
    growthAreas.push('Focus on maintaining consistent rigor and tackling advanced extension problems.');
    recommendedTopics.push({
      topic: 'Advanced Problem Solving',
      priority: 'Low',
      suggestedAction: 'Explore competition-level problems or supplementary peer tutoring.',
    });
  }

  let summaryPraise = '';
  if (percentage >= 90) {
    summaryPraise = `Outstanding performance by ${studentName}! Excellent accuracy and methodical problem solving.`;
  } else if (percentage >= 75) {
    summaryPraise = `Very strong showing with consistent problem setup. Targeted revisions on few items will solidify full mastery.`;
  } else if (percentage >= 60) {
    summaryPraise = `Good foundational comprehension. With targeted review on highlighted questions, significant score gains are within reach.`;
  } else {
    summaryPraise = `Encouraging effort on multi-step problems. Recommended to schedule a brief 1-on-1 concept walkthrough.`;
  }

  const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

  return {
    summaryPraise,
    keyStrengths,
    growthAreas,
    recommendedTopics,
    motivationalQuote: randomQuote,
  };
}
