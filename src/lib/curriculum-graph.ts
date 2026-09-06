/**
 * Veda AI - Curriculum Knowledge Graph & Concept Mastery Decay Modeler
 * Represents academic subject matter as a Directed Acyclic Graph (DAG) of prerequisite
 * concepts, models student retention over time using spaced forgetting curves, and isolates root bottlenecks.
 */

export interface ConceptNode {
  id: string;
  name: string;
  domain: string;
  prerequisiteIds: string[];
  difficultyTier: 1 | 2 | 3 | 4 | 5;
  recommendedRevisionIntervalDays: number;
}

export interface StudentConceptState {
  conceptId: string;
  initialMasteryScore: number; // 0 - 100
  lastPracticedDate: string; // ISO date
  retentionDecayRate: number; // typical range 0.03 - 0.08 per day
}

export interface PrerequisiteGapDiagnostic {
  targetConceptId: string;
  missingPrerequisites: Array<{
    prerequisiteId: string;
    prerequisiteName: string;
    currentMastery: number;
    urgency: 'high' | 'critical';
  }>;
  recommendedRemediationOrder: string[];
}

export class CurriculumGraphEngine {
  /**
   * Calculates current decayed mastery score based on exponential Ebbinghaus forgetting curve
   * Formula: R = S * e^(-t * d)
   */
  public static calculateDecayedMastery(state: StudentConceptState, currentDate: Date = new Date()): number {
    const lastDate = new Date(state.lastPracticedDate);
    const elapsedDays = Math.max(0, (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const decayed = state.initialMasteryScore * Math.exp(-elapsedDays * (state.retentionDecayRate || 0.04));
    return Math.max(0, Math.min(100, Math.round(decayed * 10) / 10));
  }

  /**
   * Traverses concept prerequisite DAG to detect unmastered foundational dependencies
   */
  public static diagnosePrerequisiteGaps(
    targetConceptId: string,
    concepts: Record<string, ConceptNode>,
    studentStates: Record<string, StudentConceptState>
  ): PrerequisiteGapDiagnostic {
    const target = concepts[targetConceptId];
    if (!target) {
      return {
        targetConceptId,
        missingPrerequisites: [],
        recommendedRemediationOrder: []
      };
    }

    const missingPrereqs: PrerequisiteGapDiagnostic['missingPrerequisites'] = [];
    const visited = new Set<string>();
    const remediationOrder: string[] = [];

    const traverse = (conceptId: string) => {
      if (visited.has(conceptId)) return;
      visited.add(conceptId);

      const node = concepts[conceptId];
      if (!node) return;

      node.prerequisiteIds.forEach(prereqId => {
        traverse(prereqId);
        const prereqNode = concepts[prereqId];
        const state = studentStates[prereqId];
        const currentMastery = state ? this.calculateDecayedMastery(state) : 0;

        if (currentMastery < 65) {
          if (!missingPrereqs.some(m => m.prerequisiteId === prereqId)) {
            missingPrereqs.push({
              prerequisiteId: prereqId,
              prerequisiteName: prereqNode ? prereqNode.name : prereqId,
              currentMastery,
              urgency: currentMastery < 40 ? 'critical' : 'high'
            });
            remediationOrder.push(prereqNode ? prereqNode.name : prereqId);
          }
        }
      });
    };

    traverse(targetConceptId);

    return {
      targetConceptId,
      missingPrerequisites: missingPrereqs,
      recommendedRemediationOrder: remediationOrder
    };
  }

  /**
   * Generates next recommended review dates across all tracked concepts
   */
  public static generateOptimalReviewSchedule(
    concepts: Record<string, ConceptNode>,
    studentStates: Record<string, StudentConceptState>
  ): Array<{
    conceptId: string;
    conceptName: string;
    currentMastery: number;
    recommendedReviewDate: string;
    isUrgent: boolean;
  }> {
    const results = Object.keys(concepts).map(id => {
      const node = concepts[id];
      const state = studentStates[id] || {
        conceptId: id,
        initialMasteryScore: 50,
        lastPracticedDate: new Date(Date.now() - 7 * 86400000).toISOString(),
        retentionDecayRate: 0.04
      };

      const mastery = this.calculateDecayedMastery(state);
      const isUrgent = mastery < 60;
      
      const reviewDate = new Date();
      const daysUntilReview = isUrgent ? 1 : Math.max(2, node.recommendedRevisionIntervalDays || 5);
      reviewDate.setDate(reviewDate.getDate() + daysUntilReview);

      return {
        conceptId: id,
        conceptName: node.name,
        currentMastery: mastery,
        recommendedReviewDate: reviewDate.toISOString().split('T')[0],
        isUrgent
      };
    });

    return results.sort((a, b) => a.currentMastery - b.currentMastery);
  }
}
