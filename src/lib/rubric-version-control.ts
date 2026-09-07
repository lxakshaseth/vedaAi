/**
 * Veda AI - Rubric Version Control & Grade Re-Evaluation Ledger
 * Tracks immutable semantic version history for rubrics, computes criteria diff deltas,
 * and analyzes score recalculation impact across historic student cohorts.
 */

export interface RubricSnapshotItem {
  criterionId: string;
  title: string;
  weight: number;
  maxMarks: number;
  description: string;
}

export interface RubricVersionRecord {
  version: string; // e.g. "1.0.0", "1.1.0"
  rubricId: string;
  authorId: string;
  timestamp: string; // ISO
  changelogNote: string;
  criteria: RubricSnapshotItem[];
}

export interface RubricDeltaDiff {
  previousVersion: string;
  newVersion: string;
  addedCriteria: RubricSnapshotItem[];
  removedCriteria: RubricSnapshotItem[];
  modifiedCriteria: Array<{
    criterionId: string;
    field: string;
    oldValue: string | number;
    newValue: string | number;
  }>;
  totalMarksDifference: number;
  isBreakingChange: boolean;
}

export interface CohortRecalculationImpact {
  rubricId: string;
  oldVersion: string;
  newVersion: string;
  affectedSubmissionsCount: number;
  averageScoreDelta: number; // positive or negative
  maxIndividualScoreShift: number;
  studentsBenefitingCount: number;
  studentsPenalizedCount: number;
}

export class RubricVersionControlEngine {
  /**
   * Computes granular delta difference between two consecutive rubric versions
   */
  public static computeRubricDiff(
    prev: RubricVersionRecord,
    next: RubricVersionRecord
  ): RubricDeltaDiff {
    const prevMap = new Map(prev.criteria.map(c => [c.criterionId, c]));
    const nextMap = new Map(next.criteria.map(c => [c.criterionId, c]));

    const added: RubricSnapshotItem[] = [];
    const removed: RubricSnapshotItem[] = [];
    const modified: RubricDeltaDiff['modifiedCriteria'] = [];

    next.criteria.forEach(item => {
      if (!prevMap.has(item.criterionId)) {
        added.push(item);
      } else {
        const old = prevMap.get(item.criterionId)!;
        if (old.maxMarks !== item.maxMarks) {
          modified.push({ criterionId: item.criterionId, field: 'maxMarks', oldValue: old.maxMarks, newValue: item.maxMarks });
        }
        if (old.weight !== item.weight) {
          modified.push({ criterionId: item.criterionId, field: 'weight', oldValue: old.weight, newValue: item.weight });
        }
        if (old.description !== item.description) {
          modified.push({ criterionId: item.criterionId, field: 'description', oldValue: old.description, newValue: item.description });
        }
      }
    });

    prev.criteria.forEach(item => {
      if (!nextMap.has(item.criterionId)) {
        removed.push(item);
      }
    });

    const prevTotalMarks = prev.criteria.reduce((a, b) => a + b.maxMarks, 0);
    const nextTotalMarks = next.criteria.reduce((a, b) => a + b.maxMarks, 0);
    const totalMarksDiff = nextTotalMarks - prevTotalMarks;

    const isBreaking = added.length > 0 || removed.length > 0 || totalMarksDiff !== 0;

    return {
      previousVersion: prev.version,
      newVersion: next.version,
      addedCriteria: added,
      removedCriteria: removed,
      modifiedCriteria: modified,
      totalMarksDifference: totalMarksDiff,
      isBreakingChange: isBreaking
    };
  }

  /**
   * Simulates score recalibration across historic student evaluations
   */
  public static simulateCohortRecalculation(
    diff: RubricDeltaDiff,
    historicScores: Array<{ studentId: string; currentScore: number; maxScore: number }>
  ): CohortRecalculationImpact {
    const count = historicScores.length;
    if (count === 0) {
      return {
        rubricId: 'default',
        oldVersion: diff.previousVersion,
        newVersion: diff.newVersion,
        affectedSubmissionsCount: 0,
        averageScoreDelta: 0,
        maxIndividualScoreShift: 0,
        studentsBenefitingCount: 0,
        studentsPenalizedCount: 0
      };
    }

    let totalDelta = 0;
    let maxShift = 0;
    let benefiting = 0;
    let penalized = 0;

    historicScores.forEach(sub => {
      // Estimated score shift proportional to mark adjustment
      const shiftRatio = diff.totalMarksDifference !== 0 
        ? (sub.currentScore / sub.maxScore) * (diff.totalMarksDifference * 0.5) 
        : 0;
      
      const delta = Math.round(shiftRatio * 10) / 10;
      totalDelta += delta;

      if (Math.abs(delta) > Math.abs(maxShift)) {
        maxShift = delta;
      }

      if (delta > 0) benefiting++;
      else if (delta < 0) penalized++;
    });

    return {
      rubricId: 'rubric-recalibrated',
      oldVersion: diff.previousVersion,
      newVersion: diff.newVersion,
      affectedSubmissionsCount: count,
      averageScoreDelta: Math.round((totalDelta / count) * 100) / 100,
      maxIndividualScoreShift: maxShift,
      studentsBenefitingCount: benefiting,
      studentsPenalizedCount: penalized
    };
  }
}
