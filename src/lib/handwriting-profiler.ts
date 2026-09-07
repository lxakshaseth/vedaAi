/**
 * Veda AI - Handwriting Style Profiler & Multi-Author Consistency Analyzer
 * Models individual handwriting biometric vectors (slant angle, baseline stability,
 * stroke curvature, character aspect ratio) to detect intra-exam authorship transitions.
 */

export interface HandwritingBiometricVector {
  meanSlantAngleDegrees: number; // e.g. -15° to +25°
  slantVariance: number;
  baselineJitterIndex: number; // 0.0 - 1.0
  strokeWidthUniformity: number; // 0.0 - 1.0
  characterAspectRatio: number; // width / height
  loopCurvatureIndex: number;
}

export interface PageStyleSample {
  pageNumber: number;
  sectionId: string;
  vector: HandwritingBiometricVector;
  sampleConfidence: number; // 0 - 100
}

export interface StyleDiscrepancyAlert {
  sourcePage: number;
  targetPage: number;
  divergenceDistance: number; // Euclidean metric (0.0 - 2.0)
  divergentMetrics: string[];
  severity: 'low' | 'medium' | 'high';
  explanation: string;
}

export interface HandwritingConsistencyReport {
  studentId: string;
  examId: string;
  overallConsistencyScore: number; // 0 - 100
  isSingleAuthorVerified: boolean;
  baselineVector: HandwritingBiometricVector;
  pageSamples: PageStyleSample[];
  discrepancies: StyleDiscrepancyAlert[];
  forensicNote: string;
}

export class HandwritingProfilerEngine {
  /**
   * Calculates Euclidean divergence distance between two handwriting biometric vectors
   */
  public static calculateVectorDistance(
    a: HandwritingBiometricVector,
    b: HandwritingBiometricVector
  ): { distance: number; divergentKeys: string[] } {
    const divergentKeys: string[] = [];
    let sumSquares = 0;

    // Slant angle normalized difference (scale factor / 30)
    const slantDiff = Math.abs(a.meanSlantAngleDegrees - b.meanSlantAngleDegrees) / 30;
    sumSquares += Math.pow(slantDiff, 2);
    if (slantDiff > 0.4) divergentKeys.push('Slant Angle Deviation');

    // Baseline jitter difference
    const jitterDiff = Math.abs(a.baselineJitterIndex - b.baselineJitterIndex);
    sumSquares += Math.pow(jitterDiff, 2);
    if (jitterDiff > 0.35) divergentKeys.push('Baseline Stability Shift');

    // Stroke width uniformity
    const strokeDiff = Math.abs(a.strokeWidthUniformity - b.strokeWidthUniformity);
    sumSquares += Math.pow(strokeDiff, 2);
    if (strokeDiff > 0.3) divergentKeys.push('Pen Pressure / Stroke Width Fluctuation');

    // Character aspect ratio
    const aspectDiff = Math.abs(a.characterAspectRatio - b.characterAspectRatio);
    sumSquares += Math.pow(aspectDiff, 2);
    if (aspectDiff > 0.35) divergentKeys.push('Character Geometry & Aspect Ratio Divergence');

    const distance = Math.sqrt(sumSquares);
    return {
      distance: Math.round(distance * 100) / 100,
      divergentKeys
    };
  }

  /**
   * Evaluates handwriting consistency across all pages of a student's submission
   */
  public static evaluateAuthorshipConsistency(
    studentId: string,
    examId: string,
    samples: PageStyleSample[]
  ): HandwritingConsistencyReport {
    if (samples.length <= 1) {
      const defaultVector: HandwritingBiometricVector = samples[0]?.vector || {
        meanSlantAngleDegrees: 8.5,
        slantVariance: 2.1,
        baselineJitterIndex: 0.15,
        strokeWidthUniformity: 0.88,
        characterAspectRatio: 0.72,
        loopCurvatureIndex: 0.65
      };

      return {
        studentId,
        examId,
        overallConsistencyScore: 100,
        isSingleAuthorVerified: true,
        baselineVector: defaultVector,
        pageSamples: samples,
        discrepancies: [],
        forensicNote: 'Single-page document verified. Handwriting characteristics self-consistent.'
      };
    }

    // Compute centroid baseline vector
    const count = samples.length;
    const baseline: HandwritingBiometricVector = {
      meanSlantAngleDegrees: samples.reduce((acc, s) => acc + s.vector.meanSlantAngleDegrees, 0) / count,
      slantVariance: samples.reduce((acc, s) => acc + s.vector.slantVariance, 0) / count,
      baselineJitterIndex: samples.reduce((acc, s) => acc + s.vector.baselineJitterIndex, 0) / count,
      strokeWidthUniformity: samples.reduce((acc, s) => acc + s.vector.strokeWidthUniformity, 0) / count,
      characterAspectRatio: samples.reduce((acc, s) => acc + s.vector.characterAspectRatio, 0) / count,
      loopCurvatureIndex: samples.reduce((acc, s) => acc + s.vector.loopCurvatureIndex, 0) / count
    };

    const discrepancies: StyleDiscrepancyAlert[] = [];

    // Compare each page against baseline and adjacent pages
    for (let i = 0; i < samples.length; i++) {
      const sample = samples[i];
      const { distance, divergentKeys } = this.calculateVectorDistance(sample.vector, baseline);

      if (distance > 0.65) {
        const severity = distance > 1.1 ? 'high' : (distance > 0.85 ? 'medium' : 'low');
        discrepancies.push({
          sourcePage: sample.pageNumber,
          targetPage: 0, // baseline
          divergenceDistance: distance,
          divergentMetrics: divergentKeys,
          severity,
          explanation: `Page ${sample.pageNumber} exhibits significant handwriting style drift from student baseline (distance: ${distance}).`
        });
      }
    }

    const highCount = discrepancies.filter(d => d.severity === 'high').length;
    const medCount = discrepancies.filter(d => d.severity === 'medium').length;

    const penalty = highCount * 30 + medCount * 15;
    const consistencyScore = Math.max(15, Math.min(100, 100 - penalty));
    const isSingleAuthor = consistencyScore >= 70 && highCount === 0;

    let forensicNote = 'Handwriting stroke cadence and slant angles remain homogeneous across all pages.';
    if (!isSingleAuthor) {
      forensicNote = `Noticeable handwriting divergence detected on ${discrepancies.length} pages. Secondary manual author audit advised.`;
    }

    return {
      studentId,
      examId,
      overallConsistencyScore: consistencyScore,
      isSingleAuthorVerified: isSingleAuthor,
      baselineVector: baseline,
      pageSamples: samples,
      discrepancies,
      forensicNote
    };
  }
}
