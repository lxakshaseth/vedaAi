export interface Question {
  id: string;
  numberLabel: string; // e.g. "11"
  subPart?: string;    // e.g. "a"
  fullLabel: string;   // e.g. "Q11 (a)"
  text: string;
  maxMarks: number;
}

export interface BoundingBox {
  pageIndex: number; // 0-indexed
  ymin: number;      // percentage 0 to 100
  xmin: number;      // percentage 0 to 100
  ymax: number;      // percentage 0 to 100
  xmax: number;      // percentage 0 to 100
}

export interface AnswerRegion {
  boxes: BoundingBox[];
  notes?: string;
}

export interface GradedQuestion {
  question: Question;
  status: 'correct' | 'partial' | 'incorrect' | 'unanswered';
  marksAwarded: number;
  studentAnswerText: string;
  feedback: string;
  answerRegion?: AnswerRegion;
  isOutOfOrder?: boolean;
}

export interface UnmatchedAnswer {
  id: string;
  pageIndex: number;
  boundingBox: BoundingBox;
  textSnippet: string;
}

export interface AssessmentResult {
  summary: {
    totalScore: number;
    maxScore: number;
    percentage: number;
    grade: string;
    totalQuestions: number;
    answeredCount: number;
    unansweredCount: number;
    aiFeedbackSummary: string;
  };
  questions: GradedQuestion[];
  unmatchedAnswers: UnmatchedAnswer[];
}

export interface DocumentFile {
  name: string;
  size: number;
  type: string;
  previewUrls: string[]; // array of base64 data URLs for rendered pages
}
