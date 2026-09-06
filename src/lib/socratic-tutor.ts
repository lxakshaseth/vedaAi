/**
 * Veda AI - Socratic Dialogue Generator & Misconception Diagnostic Engine
 * Analyzes student errors, classifies underlying cognitive misconceptions, and builds
 * tiered Socratic guiding questions to facilitate active student self-remediation.
 */

export type MisconceptionCategory = 
  | 'conceptual_flaw' 
  | 'procedural_error' 
  | 'arithmetic_slip' 
  | 'incomplete_justification' 
  | 'misread_premise' 
  | 'unit_omission';

export interface DiagnosedMisconception {
  category: MisconceptionCategory;
  severity: 'minor' | 'moderate' | 'critical';
  identifiedConcept: string;
  flawedReasoningSnippet: string;
  correctUnderlyingPrinciple: string;
}

export interface SocraticScaffoldTier {
  tierLevel: 1 | 2 | 3;
  scaffoldType: 'gentle_nudge' | 'guiding_inquiry' | 'targeted_breakdown';
  promptText: string;
  expectedStudentInsight: string;
}

export interface SocraticTutoringPlan {
  questionId: string;
  studentId: string;
  diagnosedMisconception: DiagnosedMisconception;
  scaffoldingTiers: SocraticScaffoldTier[];
  reflectionPrompt: string;
}

export class SocraticTutorEngine {
  /**
   * Diagnoses the nature of a student mistake based on model evaluation notes
   */
  public static diagnoseMistake(
    questionText: string,
    studentAnswerText: string,
    evaluatorNotes: string
  ): DiagnosedMisconception {
    const combined = `${evaluatorNotes} ${studentAnswerText}`.toLowerCase();

    let category: MisconceptionCategory = 'conceptual_flaw';
    let severity: DiagnosedMisconception['severity'] = 'moderate';
    let principle = 'Review core domain definitions and fundamental theorems.';

    if (combined.includes('calculation') || combined.includes('arithmetic') || combined.includes('sign error')) {
      category = 'arithmetic_slip';
      severity = 'minor';
      principle = 'Double check algebraic signs and intermediate arithmetic computations.';
    } else if (combined.includes('unit') || combined.includes('dimension')) {
      category = 'unit_omission';
      severity = 'minor';
      principle = 'Dimensional consistency and standard SI unit specification.';
    } else if (combined.includes('step') || combined.includes('missing derivation') || combined.includes('jump')) {
      category = 'incomplete_justification';
      severity = 'moderate';
      principle = 'Explicit mathematical proof and derivation step linkage.';
    } else if (combined.includes('formula') || combined.includes('misunderstood') || combined.includes('concept')) {
      category = 'conceptual_flaw';
      severity = 'critical';
      principle = 'Fundamental theoretical models and boundary conditions.';
    } else if (combined.includes('question') || combined.includes('misread') || combined.includes('asked for')) {
      category = 'misread_premise';
      severity = 'minor';
      principle = 'Careful parsing of problem constraints and target variables.';
    }

    return {
      category,
      severity,
      identifiedConcept: questionText.slice(0, 45) + '...',
      flawedReasoningSnippet: studentAnswerText.slice(0, 60) + '...',
      correctUnderlyingPrinciple: principle
    };
  }

  /**
   * Generates a 3-tier scaffolded Socratic interaction sequence for active learning
   */
  public static generateTutoringSequence(
    questionId: string,
    studentId: string,
    misconception: DiagnosedMisconception
  ): SocraticTutoringPlan {
    const tiers: SocraticScaffoldTier[] = [
      {
        tierLevel: 1,
        scaffoldType: 'gentle_nudge',
        promptText: `Take a close look at your intermediate steps for this question. Do the units and signs align with the initial problem conditions?`,
        expectedStudentInsight: 'Student inspects arithmetic or boundary setups.'
      },
      {
        tierLevel: 2,
        scaffoldType: 'guiding_inquiry',
        promptText: `What core principle relates the given values to the target outcome here? Consider how ${misconception.correctUnderlyingPrinciple} applies.`,
        expectedStudentInsight: 'Student identifies the missing theorem or relationship.'
      },
      {
        tierLevel: 3,
        scaffoldType: 'targeted_breakdown',
        promptText: `Let's break this down: if we apply ${misconception.correctUnderlyingPrinciple}, how does the first transformation change?`,
        expectedStudentInsight: 'Student executes the corrected mathematical transformation.'
      }
    ];

    return {
      questionId,
      studentId,
      diagnosedMisconception: misconception,
      scaffoldingTiers: tiers,
      reflectionPrompt: `In your own words, summarize why this approach resolves the ambiguity in this problem.`
    };
  }
}
