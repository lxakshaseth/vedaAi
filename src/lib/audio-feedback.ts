/**
 * Veda AI - Audio Feedback & Multimodal Voice Commentary Engine
 * Allows educators to record, synthesize, and attach timecoded voice commentary
 * and pedagogical audio feedback to specific student answers and question regions.
 */

export interface AudioFeedbackAttachment {
  id: string;
  questionId: string;
  teacherId: string;
  durationSeconds: number;
  audioBlobUrl?: string;
  waveformPeaks: number[];
  transcript: string;
  sentiment: 'encouraging' | 'constructive' | 'analytical' | 'praise';
  timestamp: string;
  keyTimestamps: Array<{
    timeSec: number;
    label: string;
    note: string;
  }>;
}

export interface VoiceCommentarySummary {
  totalDurationSeconds: number;
  totalCommentsCount: number;
  coveredQuestions: string[];
  averageSentiment: 'encouraging' | 'constructive' | 'analytical' | 'praise';
  generatedAt: string;
}

export class AudioFeedbackManager {
  private static STORAGE_KEY = 'veda_audio_feedback_records';

  /**
   * Generates simulated waveform peaks for audio visualizer rendering
   */
  public static generateWaveform(sampleCount = 36): number[] {
    const peaks: number[] = [];
    for (let i = 0; i < sampleCount; i++) {
      const base = Math.sin((i / sampleCount) * Math.PI) * 0.7;
      const noise = (Math.random() * 0.3) + 0.1;
      peaks.push(Math.min(1.0, Math.max(0.15, Number((base + noise).toFixed(2)))));
    }
    return peaks;
  }

  /**
   * Creates an audio feedback attachment
   */
  public static createFeedbackNote(
    questionId: string,
    transcript: string,
    durationSeconds: number,
    sentiment: 'encouraging' | 'constructive' | 'analytical' | 'praise' = 'constructive'
  ): AudioFeedbackAttachment {
    const noteId = `aud_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const waveform = this.generateWaveform(Math.min(48, Math.max(16, durationSeconds * 3)));
    
    return {
      id: noteId,
      questionId,
      teacherId: 'evaluator-current',
      durationSeconds,
      waveformPeaks: waveform,
      transcript,
      sentiment,
      timestamp: new Date().toISOString(),
      keyTimestamps: [
        {
          timeSec: 0,
          label: 'Opening Note',
          note: 'Initial feedback on approach'
        },
        {
          timeSec: Math.floor(durationSeconds * 0.5),
          label: 'Core Advice',
          note: 'Targeted correction for step derivations'
        }
      ]
    };
  }

  /**
   * Generates an AI-suggested audio narration transcript tailored to student weaknesses
   */
  public static generateSuggestedNarration(
    studentName: string,
    questionLabel: string,
    score: number,
    maxScore: number,
    coreDeficiency?: string
  ): string {
    const isFull = score === maxScore;
    const isPartial = score > 0 && score < maxScore;

    if (isFull) {
      return `Excellent work on ${questionLabel}, ${studentName}. Your explanation is logically cohesive and all intermediate formulas are accurately referenced. Keep up the high standard!`;
    }

    if (isPartial) {
      const def = coreDeficiency || 'missed verifying the final boundary conditions';
      return `Good effort on ${questionLabel}, ${studentName}. You correctly identified the core principle, but ${def}. Take a close look at the highlighted step on line 3 to see how to avoid losing partial marks next time.`;
    }

    return `Hello ${studentName}. For ${questionLabel}, let's review the fundamental theorem tested here. Notice how the initial assumption needs to be justified before applying the transformation. Let's walk through the solution steps together.`;
  }

  /**
   * Computes an overview summary of all attached voice commentaries
   */
  public static summarizeCommentary(attachments: AudioFeedbackAttachment[]): VoiceCommentarySummary {
    const totalDuration = attachments.reduce((acc, curr) => acc + curr.durationSeconds, 0);
    const covered = Array.from(new Set(attachments.map(a => a.questionId)));
    
    const sentimentCounts: Record<string, number> = {
      encouraging: 0,
      constructive: 0,
      analytical: 0,
      praise: 0
    };
    attachments.forEach(a => sentimentCounts[a.sentiment] = (sentimentCounts[a.sentiment] || 0) + 1);

    let dominantSentiment: 'encouraging' | 'constructive' | 'analytical' | 'praise' = 'constructive';
    let highestCount = 0;
    for (const [sent, count] of Object.entries(sentimentCounts)) {
      if (count > highestCount) {
        highestCount = count;
        dominantSentiment = sent as any;
      }
    }

    return {
      totalDurationSeconds: totalDuration,
      totalCommentsCount: attachments.length,
      coveredQuestions: covered,
      averageSentiment: dominantSentiment,
      generatedAt: new Date().toISOString()
    };
  }
}
