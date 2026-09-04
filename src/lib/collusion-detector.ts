import { AssessmentResult } from '@/types/assessment';

export interface CollusionMatch {
  studentA: string;
  studentB: string;
  questionNumber: string | number;
  similarityScore: number; // 0.0 to 1.0 (100%)
  reason: string;
  matchedSnippet: string;
}

export interface PlagiarismReport {
  analyzedSubmissions: number;
  potentialCollusionCount: number;
  flaggedPairs: CollusionMatch[];
  highestSimilarityScore: number;
}

/**
 * Calculates Jaccard similarity coefficient between two text strings using word n-grams
 */
export function calculateTextSimilarity(textA: string, textB: string, nGramSize: number = 2): number {
  if (!textA || !textB) return 0;

  const sanitize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

  const wordsA = sanitize(textA);
  const wordsB = sanitize(textB);

  if (wordsA.length === 0 || wordsB.length === 0) return 0;

  const getNGrams = (words: string[], n: number) => {
    const ngrams = new Set<string>();
    if (words.length < n) {
      ngrams.add(words.join(' '));
      return ngrams;
    }
    for (let i = 0; i <= words.length - n; i++) {
      ngrams.add(words.slice(i, i + n).join(' '));
    }
    return ngrams;
  };

  const ngramsA = getNGrams(wordsA, nGramSize);
  const ngramsB = getNGrams(wordsB, nGramSize);

  let intersectionCount = 0;
  ngramsA.forEach((gram) => {
    if (ngramsB.has(gram)) {
      intersectionCount++;
    }
  });

  const unionSize = ngramsA.size + ngramsB.size - intersectionCount;
  return unionSize > 0 ? Number((intersectionCount / unionSize).toFixed(3)) : 0;
}

/**
 * Analyzes a batch of student submissions for anomalous pairwise answer similarity
 */
export function detectCollusionAcrossBatch(
  assessments: (AssessmentResult & { studentName?: string; studentId?: string })[],
  threshold: number = 0.75
): PlagiarismReport {
  const flaggedPairs: CollusionMatch[] = [];
  let highestScore = 0;

  for (let i = 0; i < assessments.length; i++) {
    for (let j = i + 1; j < assessments.length; j++) {
      const a1 = assessments[i];
      const a2 = assessments[j];
      const name1 = a1.studentName || `Student ${i + 1}`;
      const name2 = a2.studentName || `Student ${j + 1}`;

      const questions1 = a1.questions || [];
      const questions2 = a2.questions || [];

      questions1.forEach((q1) => {
        const qLabel1 = q1.question.fullLabel || q1.question.numberLabel;
        const q2 = questions2.find(
          (q) => (q.question.fullLabel || q.question.numberLabel) === qLabel1
        );

        if (q2 && q1.studentAnswerText && q2.studentAnswerText) {
          const sim = calculateTextSimilarity(q1.studentAnswerText, q2.studentAnswerText);
          if (sim > highestScore) highestScore = sim;

          if (sim >= threshold && q1.studentAnswerText.length > 25) {
            flaggedPairs.push({
              studentA: name1,
              studentB: name2,
              questionNumber: qLabel1,
              similarityScore: sim,
              reason: `High textual verbatim concordance (${(sim * 100).toFixed(0)}%) in answer body.`,
              matchedSnippet: q1.studentAnswerText.slice(0, 80) + '...',
            });
          }
        }
      });
    }
  }

  return {
    analyzedSubmissions: assessments.length,
    potentialCollusionCount: flaggedPairs.length,
    flaggedPairs,
    highestSimilarityScore: highestScore,
  };
}
