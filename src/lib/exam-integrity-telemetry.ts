/**
 * Veda AI - Exam Integrity Telemetry & Pacing Anomaly Engine
 * Analyzes question time-distribution, paces vs complexity baselines, and flags
 * atypical behavioral anomalies to ensure exam fairness and authenticity.
 */

export interface QuestionTelemetryEvent {
  questionId: string;
  timeSpentSeconds: number;
  wordCount: number;
  obtainedScore: number;
  maxScore: number;
  revisitCount: number;
  interactionEvents?: number;
}

export interface PacingAnomalyFlag {
  questionId: string;
  anomalyType: 'ultra_rapid_completion' | 'abnormal_pacing_burst' | 'inconsistent_effort_ratio' | 'zero_dwell_high_score';
  severity: 'low' | 'medium' | 'high';
  observedValue: string;
  expectedRange: string;
  reasoning: string;
}

export interface IntegrityTelemetryReport {
  studentId: string;
  integrityConfidenceScore: number; // 0 - 100
  totalExamDurationMinutes: number;
  averageTimePerQuestionSeconds: number;
  anomaliesDetected: PacingAnomalyFlag[];
  isFlaggedForIntegrityReview: boolean;
  behavioralSummary: string;
}

export class ExamIntegrityTelemetryEngine {
  /**
   * Evaluates student response telemetry against question difficulty thresholds
   */
  public static analyzeExamTelemetry(
    studentId: string,
    events: QuestionTelemetryEvent[],
    cohortAverageTimePerQuestionSeconds: number = 180
  ): IntegrityTelemetryReport {
    const anomalies: PacingAnomalyFlag[] = [];
    let totalTimeSec = 0;

    events.forEach(event => {
      totalTimeSec += event.timeSpentSeconds;
      const scoreRatio = event.maxScore > 0 ? event.obtainedScore / event.maxScore : 0;

      // Check for ultra-rapid completion on complex/high-mark questions
      if (event.maxScore >= 5 && event.timeSpentSeconds < 15 && scoreRatio >= 0.8) {
        anomalies.push({
          questionId: event.questionId,
          anomalyType: 'ultra_rapid_completion',
          severity: 'high',
          observedValue: `${event.timeSpentSeconds}s for ${event.maxScore} marks`,
          expectedRange: '>= 90s',
          reasoning: 'High-score multi-step question answered in unrealistically short duration.'
        });
      }

      // High word count typed in impossibly short window (>120 WPM equivalent for handwriting/entry)
      const wordsPerMinute = event.timeSpentSeconds > 0 ? (event.wordCount / (event.timeSpentSeconds / 60)) : 0;
      if (wordsPerMinute > 130 && event.wordCount > 40) {
        anomalies.push({
          questionId: event.questionId,
          anomalyType: 'abnormal_pacing_burst',
          severity: 'medium',
          observedValue: `${Math.round(wordsPerMinute)} WPM`,
          expectedRange: '< 90 WPM',
          reasoning: 'Input burst velocity exceeds normal manual response generation speed.'
        });
      }

      // Zero or near zero dwell with full marks
      if (event.timeSpentSeconds <= 3 && scoreRatio === 1.0 && event.maxScore >= 2) {
        anomalies.push({
          questionId: event.questionId,
          anomalyType: 'zero_dwell_high_score',
          severity: 'high',
          observedValue: `${event.timeSpentSeconds}s dwell`,
          expectedRange: '>= 30s',
          reasoning: 'Full marks awarded with virtually zero dwell time on question canvas.'
        });
      }
    });

    const highSeverityCount = anomalies.filter(a => a.severity === 'high').length;
    const medSeverityCount = anomalies.filter(a => a.severity === 'medium').length;

    let penalty = highSeverityCount * 25 + medSeverityCount * 10;
    const confidenceScore = Math.max(10, Math.min(100, 100 - penalty));

    const totalMinutes = Math.round((totalTimeSec / 60) * 10) / 10;
    const avgTimePerQuestion = events.length > 0 ? Math.round(totalTimeSec / events.length) : 0;

    const isFlagged = confidenceScore < 75 || highSeverityCount > 0;

    let summary = 'Exam session timing follows natural pacing curves and cognitive milestones.';
    if (highSeverityCount > 0) {
      summary = `Elevated integrity review recommended: ${highSeverityCount} critical pacing anomalies detected.`;
    } else if (medSeverityCount > 0) {
      summary = `Minor pacing irregularities observed across ${medSeverityCount} items. Within acceptable deviation.`;
    }

    return {
      studentId,
      integrityConfidenceScore: confidenceScore,
      totalExamDurationMinutes: totalMinutes,
      averageTimePerQuestionSeconds: avgTimePerQuestion,
      anomaliesDetected: anomalies,
      isFlaggedForIntegrityReview: isFlagged,
      behavioralSummary: summary
    };
  }
}
