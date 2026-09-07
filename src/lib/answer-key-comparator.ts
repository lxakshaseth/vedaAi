/**
 * Veda AI - Multi-Version Answer Key Comparator & Equivalence Resolver
 * Aligns multi-set exam answer keys (Set A/B/C/D), resolves algebraic/symbolic
 * equivalences, and configures numerical tolerance bands for objective grading.
 */

export interface AnswerKeyItem {
  questionId: string;
  questionNumber: number;
  expectedAnswer: string;
  acceptableVariants?: string[];
  numericalTolerance?: {
    absolute?: number; // e.g. +/- 0.05
    percentage?: number; // e.g. 1%
  };
  caseSensitive?: boolean;
  requiresUnits?: boolean;
  expectedUnit?: string;
  maxMarks: number;
  partialCreditMap?: Record<string, number>;
}

export interface ExamVersionMapping {
  versionCode: 'A' | 'B' | 'C' | 'D' | string;
  versionName: string;
  items: AnswerKeyItem[];
}

export interface ComparisonResult {
  isExactMatch: boolean;
  isEquivalentMatch: boolean;
  awardedMarks: number;
  maxMarks: number;
  matchedVariant?: string;
  discrepancyNote?: string;
  numericalDifference?: number;
}

export class AnswerKeyComparatorEngine {
  /**
   * Evaluates student submitted answer against a specified answer key item
   */
  public static compareAnswer(
    studentAnswer: string,
    keyItem: AnswerKeyItem
  ): ComparisonResult {
    const rawStudent = (studentAnswer || '').trim();
    const rawExpected = keyItem.expectedAnswer.trim();

    if (!rawStudent) {
      return {
        isExactMatch: false,
        isEquivalentMatch: false,
        awardedMarks: 0,
        maxMarks: keyItem.maxMarks,
        discrepancyNote: 'No answer provided by candidate.'
      };
    }

    // Exact string match
    const checkEquality = (a: string, b: string) => 
      keyItem.caseSensitive ? a === b : a.toLowerCase() === b.toLowerCase();

    if (checkEquality(rawStudent, rawExpected)) {
      return {
        isExactMatch: true,
        isEquivalentMatch: true,
        awardedMarks: keyItem.maxMarks,
        maxMarks: keyItem.maxMarks
      };
    }

    // Acceptable variants match
    if (keyItem.acceptableVariants && keyItem.acceptableVariants.length > 0) {
      for (const variant of keyItem.acceptableVariants) {
        if (checkEquality(rawStudent, variant.trim())) {
          return {
            isExactMatch: false,
            isEquivalentMatch: true,
            awardedMarks: keyItem.maxMarks,
            maxMarks: keyItem.maxMarks,
            matchedVariant: variant
          };
        }
      }
    }

    // Numerical evaluation with tolerance
    const studentNum = parseFloat(rawStudent.replace(/[^0-9.-]/g, ''));
    const expectedNum = parseFloat(rawExpected.replace(/[^0-9.-]/g, ''));

    if (!isNaN(studentNum) && !isNaN(expectedNum)) {
      const diff = Math.abs(studentNum - expectedNum);
      let withinTolerance = false;

      if (keyItem.numericalTolerance?.absolute !== undefined) {
        withinTolerance = diff <= keyItem.numericalTolerance.absolute;
      } else if (keyItem.numericalTolerance?.percentage !== undefined) {
        const allowedDiff = Math.abs(expectedNum * (keyItem.numericalTolerance.percentage / 100));
        withinTolerance = diff <= allowedDiff;
      } else {
        // Default tolerance for floating point rounding: 0.5%
        withinTolerance = diff <= Math.abs(expectedNum * 0.005) || diff < 0.01;
      }

      if (withinTolerance) {
        // Check units if required
        if (keyItem.requiresUnits && keyItem.expectedUnit) {
          const unitNormalized = keyItem.expectedUnit.toLowerCase().trim();
          const studentHasUnit = rawStudent.toLowerCase().includes(unitNormalized);
          if (!studentHasUnit) {
            const partial = Math.round(keyItem.maxMarks * 0.8 * 10) / 10;
            return {
              isExactMatch: false,
              isEquivalentMatch: true,
              awardedMarks: partial,
              maxMarks: keyItem.maxMarks,
              discrepancyNote: `Correct numerical value (${studentNum}), but missing required unit (${keyItem.expectedUnit}).`,
              numericalDifference: diff
            };
          }
        }

        return {
          isExactMatch: false,
          isEquivalentMatch: true,
          awardedMarks: keyItem.maxMarks,
          maxMarks: keyItem.maxMarks,
          numericalDifference: diff
        };
      }
    }

    // Partial credit map inspection
    if (keyItem.partialCreditMap) {
      for (const [partialKey, marks] of Object.entries(keyItem.partialCreditMap)) {
        if (checkEquality(rawStudent, partialKey)) {
          return {
            isExactMatch: false,
            isEquivalentMatch: false,
            awardedMarks: Math.min(keyItem.maxMarks, marks),
            maxMarks: keyItem.maxMarks,
            discrepancyNote: `Partial credit awarded for recognizable intermediate state: "${partialKey}".`
          };
        }
      }
    }

    return {
      isExactMatch: false,
      isEquivalentMatch: false,
      awardedMarks: 0,
      maxMarks: keyItem.maxMarks,
      discrepancyNote: `Answer does not match expected reference: "${rawExpected}".`
    };
  }

  /**
   * Aligns questions across multi-version exams (e.g. Set A Q3 corresponds to Set B Q7)
   */
  public static mapVersionQuestion(
    fromVersion: ExamVersionMapping,
    toVersion: ExamVersionMapping,
    sourceQuestionNumber: number
  ): AnswerKeyItem | null {
    const sourceItem = fromVersion.items.find(i => i.questionNumber === sourceQuestionNumber);
    if (!sourceItem) return null;

    // Match by questionId or content similarity
    const targetItem = toVersion.items.find(i => 
      i.questionId === sourceItem.questionId || 
      i.expectedAnswer.toLowerCase() === sourceItem.expectedAnswer.toLowerCase()
    );

    return targetItem || null;
  }
}
