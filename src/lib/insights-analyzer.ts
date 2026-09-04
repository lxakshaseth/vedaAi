import { AssessmentResult } from '@/types/assessment';

export type CognitiveDomain = 'Remembering' | 'Understanding' | 'Applying' | 'Analyzing' | 'Evaluating' | 'Creating';

export interface DomainPerformance {
  domain: CognitiveDomain;
  averageMastery: number; // percentage 0 - 100
  questionCount: number;
  status: 'Mastered' | 'Developing' | 'Needs Attention';
}

export interface PedagogicalDiagnosticSummary {
  domains: DomainPerformance[];
  dominantCognitiveStrength: CognitiveDomain;
  primaryRemedialFocus: CognitiveDomain;
  overallBloomsIndex: number;
}

const DOMAIN_KEYWORDS: Record<CognitiveDomain, string[]> = {
  Remembering: ['define', 'list', 'state', 'identify', 'name', 'recall', 'what is'],
  Understanding: ['explain', 'describe', 'summarize', 'interpret', 'classify', 'discuss'],
  Applying: ['calculate', 'solve', 'derive', 'compute', 'demonstrate', 'implement'],
  Analyzing: ['compare', 'contrast', 'differentiate', 'examine', 'analyze', 'why'],
  Evaluating: ['justify', 'critique', 'assess', 'judge', 'validate', 'verify'],
  Creating: ['design', 'formulate', 'construct', 'propose', 'devise', 'synthesize'],
};

/**
 * Classifies a question text into its Bloom's Taxonomy cognitive category
 */
export function classifyCognitiveDomain(questionText: string): CognitiveDomain {
  const lower = (questionText || '').toLowerCase();

  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return domain as CognitiveDomain;
    }
  }

  return 'Applying'; // Default domain for STEM calculation tasks
}

/**
 * Generates pedagogical cognitive diagnostic breakdown across all evaluated assessments
 */
export function analyzeCognitiveDiagnostic(assessments: AssessmentResult[]): PedagogicalDiagnosticSummary {
  const domainScores: Record<CognitiveDomain, { totalAwarded: number; totalMax: number; count: number }> = {
    Remembering: { totalAwarded: 0, totalMax: 0, count: 0 },
    Understanding: { totalAwarded: 0, totalMax: 0, count: 0 },
    Applying: { totalAwarded: 0, totalMax: 0, count: 0 },
    Analyzing: { totalAwarded: 0, totalMax: 0, count: 0 },
    Evaluating: { totalAwarded: 0, totalMax: 0, count: 0 },
    Creating: { totalAwarded: 0, totalMax: 0, count: 0 },
  };

  assessments.forEach((assessment) => {
    (assessment.questions || []).forEach((q) => {
      const domain = classifyCognitiveDomain(q.question.text);
      const max = q.question.maxMarks || 1;
      const awarded = q.marksAwarded || 0;

      domainScores[domain].totalAwarded += awarded;
      domainScores[domain].totalMax += max;
      domainScores[domain].count += 1;
    });
  });

  const domains: DomainPerformance[] = (Object.keys(domainScores) as CognitiveDomain[]).map((domain) => {
    const data = domainScores[domain];
    const avg = data.totalMax > 0 ? (data.totalAwarded / data.totalMax) * 100 : 0;

    let status: DomainPerformance['status'] = 'Developing';
    if (avg >= 80) status = 'Mastered';
    else if (avg < 60) status = 'Needs Attention';

    return {
      domain,
      averageMastery: Number(avg.toFixed(1)),
      questionCount: data.count,
      status,
    };
  });

  // Determine top and weakest domain
  const sorted = [...domains].filter((d) => d.questionCount > 0).sort((a, b) => b.averageMastery - a.averageMastery);
  const dominantCognitiveStrength = sorted[0]?.domain || 'Applying';
  const primaryRemedialFocus = sorted[sorted.length - 1]?.domain || 'Evaluating';

  const totalMasterySum = domains.reduce((acc, d) => acc + d.averageMastery, 0);
  const overallBloomsIndex = Number((totalMasterySum / domains.length).toFixed(1));

  return {
    domains,
    dominantCognitiveStrength,
    primaryRemedialFocus,
    overallBloomsIndex,
  };
}
