/**
 * Veda AI - Adaptive Learning Pathways & Remediation Roadmap Planner
 * Diagnoses conceptual gaps from student assessment performance and constructs
 * tailored micro-learning milestones, revision exercises, and mastery recovery plans.
 */

export interface RemediationMilestone {
  stepIndex: number;
  topic: string;
  conceptGap: string;
  difficulty: 'foundational' | 'intermediate' | 'advanced';
  estimatedHours: number;
  recommendedAction: string;
  practiceResources: Array<{
    title: string;
    type: 'video_explainer' | 'interactive_quiz' | 'formula_sheet' | 'worked_examples';
    durationMin: number;
  }>;
}

export interface StudentLearningPlan {
  studentId: string;
  subject: string;
  currentMasteryPct: number;
  targetMasteryPct: number;
  estimatedRecoveryHours: number;
  priorityLevel: 'immediate_intervention' | 'moderate_remediation' | 'enrichment';
  milestones: RemediationMilestone[];
  generatedAt: string;
}

export class LearningPathwaysEngine {
  /**
   * Constructs an adaptive learning plan based on questions where student dropped marks
   */
  public static generatePersonalizedPlan(
    studentId: string,
    subject: string,
    weakQuestions: Array<{ label: string; text: string; marksAwarded: number; maxMarks: number; feedback: string }>
  ): StudentLearningPlan {
    const totalMax = weakQuestions.reduce((sum, q) => sum + q.maxMarks, 0);
    const totalAwarded = weakQuestions.reduce((sum, q) => sum + q.marksAwarded, 0);
    const masteryPct = totalMax > 0 ? Math.round((totalAwarded / totalMax) * 100) : 75;

    const milestones: RemediationMilestone[] = weakQuestions.map((q, idx) => {
      const isCritical = q.marksAwarded === 0;
      return {
        stepIndex: idx + 1,
        topic: `Concept in ${q.label}`,
        conceptGap: q.feedback || 'Incomplete derivation or conceptual inaccuracy',
        difficulty: isCritical ? 'foundational' : 'intermediate',
        estimatedHours: isCritical ? 2.5 : 1.5,
        recommendedAction: `Review core theory for ${q.label} and solve 3 targeted drill questions.`,
        practiceResources: [
          {
            title: `Mastering ${q.label} Fundamentals`,
            type: 'video_explainer',
            durationMin: 15
          },
          {
            title: `Step-by-step Worked Examples for ${q.label}`,
            type: 'worked_examples',
            durationMin: 20
          },
          {
            title: `Self-Check Adaptive Quiz (${q.label})`,
            type: 'interactive_quiz',
            durationMin: 15
          }
        ]
      };
    });

    const totalHours = milestones.reduce((sum, m) => sum + m.estimatedHours, 0);
    let priority: StudentLearningPlan['priorityLevel'] = 'enrichment';

    if (masteryPct < 50) {
      priority = 'immediate_intervention';
    } else if (masteryPct < 75) {
      priority = 'moderate_remediation';
    }

    return {
      studentId,
      subject,
      currentMasteryPct: masteryPct,
      targetMasteryPct: 90,
      estimatedRecoveryHours: Number(totalHours.toFixed(1)),
      priorityLevel: priority,
      milestones,
      generatedAt: new Date().toISOString()
    };
  }
}
