/**
 * Veda AI - Demographic Fairness Audit Engine & Blind Grading Anonymizer
 * Implements automated PII masking for unbiased evaluation and statistical parity
 * auditing across student cohorts and grading sessions.
 */

export interface StudentAnonymizationProfile {
  originalId: string;
  anonymousToken: string;
  maskedFields: Record<string, string>;
  createdAt: string;
}

export interface DemographicCohortMetrics {
  cohortId: string;
  cohortName: string;
  sampleSize: number;
  averageScore: number;
  medianScore: number;
  standardDeviation: number;
  passRate: number;
}

export interface FairnessAuditReport {
  overallParityScore: number; // 0 - 100
  disparateImpactRatio: number; // 4/5ths rule benchmark (0.80 threshold)
  isStatisticallyFair: boolean;
  cohortMetrics: DemographicCohortMetrics[];
  potentialBiasAlerts: string[];
  mitigationRecommendations: string[];
}

export class BlindGradingAnonymizer {
  private static PII_PATTERNS = [
    { label: 'NAME_HEADER', regex: /(?:Student\s*Name|Candidate|Name)\s*:\s*([A-Za-z\s]+)(?:\n|\r|$)/gi },
    { label: 'ROLL_NUMBER', regex: /(?:Roll\s*(?:No\.?|Number)|Candidate\s*ID|Reg\s*(?:No\.?|Number))\s*:\s*([A-Za-z0-9\-_]+)/gi },
    { label: 'EMAIL_ADDRESS', regex: /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi },
    { label: 'PHONE_NUMBER', regex: /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/gi }
  ];

  /**
   * Generates a deterministic pseudonymous token for blind grading sessions
   */
  public static generateAnonymousToken(studentId: string, examSalt: string = 'veda-blind-v1'): string {
    let hash = 0;
    const combined = `${studentId}:${examSalt}`;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32bit integer
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `ANON-CANDIDATE-${hex.toUpperCase()}`;
  }

  /**
   * Anonymizes submission text by masking detected PII identifiers
   */
  public static maskSubmissionMetadata(rawSubmissionText: string, studentId: string): {
    anonymizedText: string;
    profile: StudentAnonymizationProfile;
  } {
    const anonymousToken = this.generateAnonymousToken(studentId);
    let sanitizedText = rawSubmissionText;
    const masked: Record<string, string> = {};

    this.PII_PATTERNS.forEach(({ label, regex }) => {
      sanitizedText = sanitizedText.replace(regex, (match) => {
        masked[label] = match;
        return `[REDACTED_${label}]`;
      });
    });

    return {
      anonymizedText: sanitizedText,
      profile: {
        originalId: studentId,
        anonymousToken,
        maskedFields: masked,
        createdAt: new Date().toISOString()
      }
    };
  }
}

export class FairnessAuditEngine {
  /**
   * Performs statistical fairness and parity audit across grading results
   */
  public static auditGradingFairness(
    cohortData: Array<{ cohortId: string; cohortName: string; scores: number[]; maxScore: number }>
  ): FairnessAuditReport {
    const metrics: DemographicCohortMetrics[] = cohortData.map(c => {
      const count = c.scores.length;
      if (count === 0) {
        return {
          cohortId: c.cohortId,
          cohortName: c.cohortName,
          sampleSize: 0,
          averageScore: 0,
          medianScore: 0,
          standardDeviation: 0,
          passRate: 0
        };
      }

      const sum = c.scores.reduce((a, b) => a + b, 0);
      const avg = sum / count;
      const sorted = [...c.scores].sort((a, b) => a - b);
      const median = count % 2 === 0 
        ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2 
        : sorted[Math.floor(count / 2)];
      
      const variance = c.scores.reduce((acc, score) => acc + Math.pow(score - avg, 2), 0) / count;
      const stdDev = Math.sqrt(variance);
      const passCutoff = c.maxScore * 0.4;
      const passedCount = c.scores.filter(s => s >= passCutoff).length;

      return {
        cohortId: c.cohortId,
        cohortName: c.cohortName,
        sampleSize: count,
        averageScore: Math.round(avg * 100) / 100,
        medianScore: Math.round(median * 100) / 100,
        standardDeviation: Math.round(stdDev * 100) / 100,
        passRate: Math.round((passedCount / count) * 100)
      };
    }).filter(m => m.sampleSize > 0);

    if (metrics.length < 2) {
      return {
        overallParityScore: 100,
        disparateImpactRatio: 1.0,
        isStatisticallyFair: true,
        cohortMetrics: metrics,
        potentialBiasAlerts: ['Insufficient demographic cohorts for cross-group disparity audit.'],
        mitigationRecommendations: ['Enable multi-cohort tracking to benchmark grading parity.']
      };
    }

    // Disparate impact ratio: minimum pass rate / maximum pass rate (EEOC 80% four-fifths rule)
    const passRates = metrics.map(m => m.passRate);
    const maxPassRate = Math.max(...passRates);
    const minPassRate = Math.min(...passRates);
    const impactRatio = maxPassRate > 0 ? minPassRate / maxPassRate : 1.0;

    // Score disparity variance
    const avgScores = metrics.map(m => m.averageScore);
    const maxAvg = Math.max(...avgScores);
    const minAvg = Math.min(...avgScores);
    const avgScoreSpread = maxAvg - minAvg;

    const alerts: string[] = [];
    const recommendations: string[] = [];

    if (impactRatio < 0.80) {
      alerts.push(`Disparate impact ratio (${(impactRatio * 100).toFixed(1)}%) falls below the 80% fairness threshold.`);
      recommendations.push('Apply blind multi-grader consensus on borderline and failing submissions.');
    }

    if (avgScoreSpread > 15) {
      alerts.push(`Significant average score variance (${avgScoreSpread.toFixed(1)} pts) detected across cohorts.`);
      recommendations.push('Review rubric criteria for subjective or culturally specific phrasing.');
    }

    const parityScore = Math.max(0, Math.min(100, Math.round(impactRatio * 70 + (100 - avgScoreSpread * 2) * 0.3)));
    const isFair = impactRatio >= 0.80 && avgScoreSpread <= 15;

    if (isFair) {
      recommendations.push('Grading metrics demonstrate healthy demographic parity and consistency.');
    }

    return {
      overallParityScore: parityScore,
      disparateImpactRatio: Math.round(impactRatio * 100) / 100,
      isStatisticallyFair: isFair,
      cohortMetrics: metrics,
      potentialBiasAlerts: alerts,
      mitigationRecommendations: recommendations
    };
  }
}
