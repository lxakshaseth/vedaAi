import { AssessmentResult, GradedQuestion } from '@/types/assessment';

export interface SyntheticExamConfig {
  studentName: string;
  studentId: string;
  subject: string;
  questionCount: number;
  averageMasteryTarget?: number; // e.g. 0.8 for 80%
}

/**
 * Generates synthetic assessment fixture data for development, benchmarking, and unit testing
 */
export function generateSyntheticAssessment(config: SyntheticExamConfig): AssessmentResult {
  const target = config.averageMasteryTarget ?? 0.85;
  const questions: GradedQuestion[] = [];
  let totalAwarded = 0;
  let totalMax = 0;

  const STEM_QUESTIONS = [
    { text: 'Derive the ideal gas law from kinetic molecular theory assumptions.', max: 10 },
    { text: 'Calculate the determinant of a 3x3 matrix and describe geometric transformation.', max: 8 },
    { text: 'Explain the mechanism of enzyme-substrate binding and competitive inhibition.', max: 12 },
    { text: 'Compute the time complexity of QuickSort in worst and best cases with proofs.', max: 10 },
    { text: 'Solve the second order differential equation with boundary conditions y(0)=1, y\'(0)=0.', max: 10 },
  ];

  const count = Math.min(config.questionCount, STEM_QUESTIONS.length);

  for (let i = 0; i < count; i++) {
    const qData = STEM_QUESTIONS[i];
    const maxMarks = qData.max;
    // Calculate simulated score around target with slight variance
    const variance = (Math.random() - 0.5) * 0.2;
    const scoreFactor = Math.min(1, Math.max(0.2, target + variance));
    const marksAwarded = Math.round(maxMarks * scoreFactor);

    totalAwarded += marksAwarded;
    totalMax += maxMarks;

    const isFull = marksAwarded === maxMarks;
    const isZero = marksAwarded === 0;

    questions.push({
      question: {
        id: `q_${i + 1}`,
        numberLabel: `${i + 1}`,
        fullLabel: `Q${i + 1}`,
        text: qData.text,
        maxMarks,
      },
      status: isFull ? 'correct' : isZero ? 'incorrect' : 'partial',
      marksAwarded,
      studentAnswerText: `Simulated student response for ${qData.text}. Demonstrated step calculations and derived final theorem values.`,
      feedback: isFull
        ? 'Exemplary reasoning and accurate units throughout.'
        : `Accurate initial setup, minor algebraic slip in step 3. Awarded ${marksAwarded}/${maxMarks} marks.`,
      answerRegion: {
        boxes: [
          {
            pageIndex: 0,
            ymin: 15 + i * 15,
            xmin: 10,
            ymax: 25 + i * 15,
            xmax: 90,
          },
        ],
      },
    });
  }

  const percentage = totalMax > 0 ? (totalAwarded / totalMax) * 100 : 0;
  let grade = 'A';
  if (percentage < 60) grade = 'F';
  else if (percentage < 70) grade = 'D';
  else if (percentage < 80) grade = 'C';
  else if (percentage < 90) grade = 'B';

  return {
    summary: {
      totalScore: totalAwarded,
      maxScore: totalMax,
      percentage: Number(percentage.toFixed(1)),
      grade,
      totalQuestions: count,
      answeredCount: count,
      unansweredCount: 0,
      aiFeedbackSummary: `Assessment evaluated with ${count} questions. Strong performance on conceptual definitions.`,
    },
    questions,
    unmatchedAnswers: [],
  };
}
