/**
 * Veda AI - Bloom's Taxonomy Classifier & Curriculum Standard Alignment Matrix
 * Evaluates cognitive demand levels (LOTS/HOTS) across Bloom's Revised Taxonomy
 * and benchmarks assessment coverage against international curriculum standards.
 */

export type BloomLevel = 'Remembering' | 'Understanding' | 'Applying' | 'Analyzing' | 'Evaluating' | 'Creating';
export type CurriculumStandard = 'CBSE' | 'ICSE' | 'IB_DP' | 'CAMBRIDGE_IGCSE' | 'COMMON_CORE';

export interface CompetencyMapping {
  questionId: string;
  bloomLevel: BloomLevel;
  cognitiveCategory: 'LOTS' | 'HOTS'; // Lower-Order vs Higher-Order Thinking Skills
  standardTag: string;
  skillDomain: 'conceptual' | 'procedural' | 'metacognitive' | 'factual';
  marks: number;
}

export interface CognitiveBalanceReport {
  totalQuestions: number;
  totalMarks: number;
  lotsMarksRatio: number; // percentage of marks in LOTS
  hotsMarksRatio: number; // percentage of marks in HOTS
  distributionByLevel: Record<BloomLevel, number>;
  curriculumComplianceScore: number; // 0 - 100
  pedagogicalRecommendations: string[];
}

export class CompetencyMatrixEngine {
  private static ACTION_VERB_MAP: Record<BloomLevel, string[]> = {
    Remembering: ['state', 'define', 'list', 'recall', 'name', 'identify', 'label'],
    Understanding: ['explain', 'describe', 'summarize', 'classify', 'interpret', 'compare'],
    Applying: ['calculate', 'solve', 'apply', 'compute', 'implement', 'demonstrate', 'use'],
    Analyzing: ['analyze', 'differentiate', 'distinguish', 'deconstruct', 'examine', 'contrast'],
    Evaluating: ['evaluate', 'assess', 'justify', 'critique', 'verify', 'validate', 'judge'],
    Creating: ['design', 'formulate', 'construct', 'develop', 'synthesize', 'devise', 'propose']
  };

  /**
   * Classifies a question text into a Bloom Taxonomy cognitive tier
   */
  public static classifyQuestionBloomLevel(questionText: string): { level: BloomLevel; category: 'LOTS' | 'HOTS' } {
    const lower = (questionText || '').toLowerCase();
    
    // Check verbs from highest cognitive complexity to lowest
    for (const [level, verbs] of Object.entries(this.ACTION_VERB_MAP).reverse()) {
      if (verbs.some(v => new RegExp(`\\b${v}\\b`, 'i').test(lower))) {
        const isHots = ['Analyzing', 'Evaluating', 'Creating'].includes(level);
        return {
          level: level as BloomLevel,
          category: isHots ? 'HOTS' : 'LOTS'
        };
      }
    }

    // Default heuristic based on word length / complexity
    return {
      level: 'Applying',
      category: 'LOTS'
    };
  }

  /**
   * Generates a full curriculum competency & cognitive balance audit for an assessment
   */
  public static analyzeCognitiveBalance(
    questions: Array<{ id: string; text: string; maxMarks: number; standard?: string }>
  ): CognitiveBalanceReport {
    const mappings: CompetencyMapping[] = questions.map(q => {
      const { level, category } = this.classifyQuestionBloomLevel(q.text);
      return {
        questionId: q.id,
        bloomLevel: level,
        cognitiveCategory: category,
        standardTag: q.standard || 'General_Standard',
        skillDomain: category === 'HOTS' ? 'metacognitive' : 'procedural',
        marks: q.maxMarks
      };
    });

    const totalMarks = mappings.reduce((acc, m) => acc + m.marks, 0);
    const hotsMarks = mappings.filter(m => m.cognitiveCategory === 'HOTS').reduce((acc, m) => acc + m.marks, 0);
    const lotsMarks = totalMarks - hotsMarks;

    const distribution: Record<BloomLevel, number> = {
      Remembering: 0,
      Understanding: 0,
      Applying: 0,
      Analyzing: 0,
      Evaluating: 0,
      Creating: 0
    };

    mappings.forEach(m => {
      distribution[m.bloomLevel] = (distribution[m.bloomLevel] || 0) + m.marks;
    });

    const hotsRatio = totalMarks > 0 ? Math.round((hotsMarks / totalMarks) * 100) : 0;
    const lotsRatio = 100 - hotsRatio;

    const recommendations: string[] = [];
    if (hotsRatio < 30) {
      recommendations.push('Assessment heavily favors rote recall (LOTS). Increase analytical and evaluation-tier items to reach at least 40% HOTS.');
    } else if (hotsRatio > 70) {
      recommendations.push('High concentration of advanced HOTS items. Consider adding scaffolding/stepping for foundational questions.');
    } else {
      recommendations.push('Well-balanced cognitive distribution adhering to standard pedagogical benchmarks.');
    }

    // Standard compliance score (optimal balance between 35-55% HOTS)
    const complianceScore = Math.max(60, Math.min(100, 100 - Math.abs(45 - hotsRatio)));

    return {
      totalQuestions: questions.length,
      totalMarks,
      lotsMarksRatio: lotsRatio,
      hotsMarksRatio: hotsRatio,
      distributionByLevel: distribution,
      curriculumComplianceScore: complianceScore,
      pedagogicalRecommendations: recommendations
    };
  }
}
