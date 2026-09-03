export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  levels: {
    points: number;
    title: string;
    description: string;
  }[];
}

export interface RubricTemplate {
  id: string;
  title: string;
  category: 'STEM' | 'Humanities' | 'Computer Science' | 'General';
  description: string;
  criteria: RubricCriterion[];
}

export const PRESET_RUBRICS: RubricTemplate[] = [
  {
    id: 'stem-mathematical-derivation',
    title: 'STEM Step-by-Step Derivation & Precision',
    category: 'STEM',
    description: 'Evaluates formula application, intermediate calculation accuracy, algebraic reasoning, and final units.',
    criteria: [
      {
        id: 'c1',
        name: 'Conceptual Formulation',
        description: 'Identification of correct theorem, governing laws, and starting equations.',
        maxPoints: 4,
        levels: [
          { points: 4, title: 'Exemplary', description: 'Identifies all relevant theorems correctly.' },
          { points: 2, title: 'Developing', description: 'Partial formula identified with omissions.' },
          { points: 0, title: 'Inadequate', description: 'Incorrect starting principles.' },
        ],
      },
      {
        id: 'c2',
        name: 'Step-by-Step Working',
        description: 'Logical algebraic progression without arbitrary skipped steps.',
        maxPoints: 4,
        levels: [
          { points: 4, title: 'Rigorous', description: 'All steps documented clearly with correct manipulations.' },
          { points: 2, title: 'Moderate', description: 'Minor computational slip but method is sound.' },
          { points: 0, title: 'Flawed', description: 'Major reasoning errors or invalid assumptions.' },
        ],
      },
      {
        id: 'c3',
        name: 'Final Answer & Physical Units',
        description: 'Accuracy of final numeric/symbolic result and SI units.',
        maxPoints: 2,
        levels: [
          { points: 2, title: 'Accurate', description: 'Correct magnitude, sign, and unit notation.' },
          { points: 1, title: 'Unit Error', description: 'Correct value but missing or incorrect unit.' },
          { points: 0, title: 'Incorrect', description: 'Final result is erroneous.' },
        ],
      },
    ],
  },
  {
    id: 'essay-argumentation',
    title: 'Analytical Essay & Argument Coherence',
    category: 'Humanities',
    description: 'Evaluates thesis clarity, textual evidence, critical evaluation, and syntactic flow.',
    criteria: [
      {
        id: 'e1',
        name: 'Thesis & Thesis Support',
        description: 'Clear argument and logical progression throughout paragraphs.',
        maxPoints: 5,
        levels: [
          { points: 5, title: 'Nuanced', description: 'Insightful, well-defined thesis sustained across all sections.' },
          { points: 3, title: 'Adequate', description: 'Clear thesis with occasional drift in argument.' },
          { points: 1, title: 'Unfocused', description: 'Vague or missing thesis.' },
        ],
      },
      {
        id: 'e2',
        name: 'Evidence & Textual Citation',
        description: 'Relevance and integration of supporting quotes/data.',
        maxPoints: 5,
        levels: [
          { points: 5, title: 'Comprehensive', description: 'Seamlessly integrated citations with deep contextual analysis.' },
          { points: 3, title: 'Basic', description: 'Evidence presented but surface-level commentary.' },
          { points: 1, title: 'Insufficient', description: 'Unsupported claims with lack of citations.' },
        ],
      },
    ],
  },
  {
    id: 'cs-algorithm-code',
    title: 'Algorithm Design & Code Correctness',
    category: 'Computer Science',
    description: 'Evaluates algorithmic efficiency, edge case handling, clean modular code, and syntax.',
    criteria: [
      {
        id: 'cs1',
        name: 'Algorithmic Complexity & Correctness',
        description: 'Optimal time/space complexity and correctness on core test cases.',
        maxPoints: 5,
        levels: [
          { points: 5, title: 'Optimal', description: 'Meets optimal Big-O bounds and passes all test inputs.' },
          { points: 3, title: 'Sub-optimal', description: 'Working solution but inefficient complexity.' },
          { points: 1, title: 'Failing', description: 'Produces wrong output on standard test cases.' },
        ],
      },
      {
        id: 'cs2',
        name: 'Edge Case Resilience',
        description: 'Handling empty inputs, null pointers, boundary limits, and large data.',
        maxPoints: 5,
        levels: [
          { points: 5, title: 'Robust', description: 'Handles null, zero, negative, and extreme boundaries.' },
          { points: 2, title: 'Partial', description: 'Misses boundary condition (e.g. off-by-one).' },
          { points: 0, title: 'Fragile', description: 'Throws unhandled exceptions on edge cases.' },
        ],
      },
    ],
  },
];

/**
 * Returns a template formatted as an AI grading system prompt instruction
 */
export function formatRubricForPrompt(rubric: RubricTemplate): string {
  let promptText = `Evaluation Rubric: "${rubric.title}" (${rubric.category})\n`;
  promptText += `${rubric.description}\n\nCriteria Breakdown:\n`;

  rubric.criteria.forEach((criterion, idx) => {
    promptText += `${idx + 1}. ${criterion.name} (Max ${criterion.maxPoints} pts): ${criterion.description}\n`;
    criterion.levels.forEach((lvl) => {
      promptText += `   - [${lvl.points} pts] ${lvl.title}: ${lvl.description}\n`;
    });
  });

  return promptText;
}
