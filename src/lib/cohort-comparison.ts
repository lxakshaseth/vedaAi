import { AssessmentResult } from '@/types/assessment';
import { calculateClassStatistics, ClassStatistics } from './analytics-utils';

export interface CohortSection {
  id: string;
  name: string; // e.g., "Grade 11 - Section A"
  term: string; // e.g., "Midterm 2024"
  assessments: AssessmentResult[];
}

export interface CohortComparisonReport {
  cohorts: {
    id: string;
    name: string;
    term: string;
    stats: ClassStatistics;
  }[];
  topPerformingCohortId: string;
  overallAverageScore: number;
  highestPassRate: number;
  scoreVariance: number;
}

/**
 * Compares academic performance across multiple class sections or historical terms
 */
export function compareCohorts(cohorts: CohortSection[]): CohortComparisonReport {
  if (!cohorts || cohorts.length === 0) {
    return {
      cohorts: [],
      topPerformingCohortId: '',
      overallAverageScore: 0,
      highestPassRate: 0,
      scoreVariance: 0,
    };
  }

  const evaluatedCohorts = cohorts.map((c) => ({
    id: c.id,
    name: c.name,
    term: c.term,
    stats: calculateClassStatistics(c.assessments),
  }));

  let topCohortId = evaluatedCohorts[0].id;
  let highestMean = -1;
  let highestPass = 0;
  let totalMeanSum = 0;

  evaluatedCohorts.forEach((c) => {
    totalMeanSum += c.stats.meanScore;
    if (c.stats.meanScore > highestMean) {
      highestMean = c.stats.meanScore;
      topCohortId = c.id;
    }
    if (c.stats.passRate > highestPass) {
      highestPass = c.stats.passRate;
    }
  });

  const overallAverageScore = Number((totalMeanSum / evaluatedCohorts.length).toFixed(2));

  // Compute variance across cohorts
  const variance =
    evaluatedCohorts.reduce((acc, c) => acc + Math.pow(c.stats.meanScore - overallAverageScore, 2), 0) /
    evaluatedCohorts.length;

  return {
    cohorts: evaluatedCohorts,
    topPerformingCohortId: topCohortId,
    overallAverageScore,
    highestPassRate: highestPass,
    scoreVariance: Number(variance.toFixed(2)),
  };
}
