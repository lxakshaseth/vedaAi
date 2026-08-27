import { AssessmentResult } from '@/types/assessment';

// SVG Sample Pages matching the exact Figma design test paper
export const SAMPLE_QUESTION_PAPER_PAGES = [
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" fill="none">
    <rect width="800" height="1100" fill="%23FFFFFF"/>
    <rect x="40" y="40" width="720" height="1020" rx="6" stroke="%23E2E8F0" stroke-width="2"/>
    
    <text x="400" y="90" font-family="sans-serif" font-size="20" font-weight="bold" fill="%230F172A" text-anchor="middle">DELHI PUBLIC SCHOOL - BOKARO STEEL CITY</text>
    <text x="400" y="115" font-family="sans-serif" font-size="13" fill="%2364748B" text-anchor="middle">Class 10 - Biology &amp; Physiology Unit Test | Max Marks: 40</text>
    <line x1="70" y1="135" x2="730" y2="135" stroke="%23CBD5E1" stroke-width="1.5"/>

    <text x="70" y="175" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">1. Which blood vessel carries blood away from the heart? [2 Marks]</text>
    <text x="70" y="225" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">2. Which of the following organelles is primarily involved in photosynthesis? [2 Marks]</text>
    <text x="70" y="275" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">3. Explain the role of chloroplasts in photosynthesis, naming main pigments and stages. [2 Marks]</text>
    <text x="70" y="330" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">4. Describe the flow of blood through the human heart from right atrium to aorta. [2 Marks]</text>
    <text x="70" y="385" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">5. Draw a labelled diagram of an alveolus showing capillaries and air space. [2 Marks]</text>
    <text x="70" y="440" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">6. Draw a neat labelled diagram of the human digestive system. [5 Marks]</text>
    <text x="70" y="495" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">7. Draw and label a nephron (Bowman capsule, glomerulus, tubule, loop of Henle). [5 Marks]</text>
    <text x="70" y="550" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">8. Explain structural differences between palisade and spongy mesophyll. [5 Marks]</text>
    <text x="70" y="605" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">9. Describe the process of transpiration in plants. [5 Marks]</text>
    <text x="70" y="660" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">10. Explain how the structure of xylem vessels facilitates water transport. [5 Marks]</text>
    <text x="70" y="715" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">11 (a). Potted plants: Plant A in bright light vs Plant B in dim light. [2 Marks]</text>
    <text x="70" y="760" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">11 (b). Suggest one practical measure to help Plant B recover. [3 Marks]</text>
    <text x="70" y="805" font-family="sans-serif" font-size="13" font-weight="bold" fill="%230F172A">12. Tidal volume of 0.5 L and breathes 12 times per minute calculation. [3 Marks]</text>

    <text x="400" y="1030" font-family="sans-serif" font-size="12" fill="%2394A3B8" text-anchor="middle">--- Page 1 of 1 ---</text>
  </svg>`
];

// SVG Sample Answer Sheet Pages matching Figma Page 1 of 4
export const SAMPLE_ANSWER_SHEET_PAGES = [
  // Page 1
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" fill="none">
    <rect width="800" height="1100" fill="%23FBFBFA"/>
    <!-- Notebook Lines -->
    <line x1="70" y1="0" x2="70" y2="1100" stroke="%23F87171" stroke-width="1.5"/>
    ${Array.from({ length: 35 }).map((_, i) => `<line x1="0" y1="${80 + i * 28}" x2="800" y2="${80 + i * 28}" stroke="%23E2E8F0" stroke-width="1"/>`).join('')}

    <!-- Q1 Handwriting Section -->
    <text x="25" y="125" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="15" font-weight="bold" fill="%231E3A8A">Q1.</text>
    <text x="90" y="125" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="14" fill="%231E293B">Photosynthesis is the process used by green plants and some other organisms to convert light energy into chemical energy.</text>

    <!-- Chemical equation box -->
    <rect x="90" y="180" width="620" height="42" fill="none" stroke="%231E3A8A" stroke-width="1.2"/>
    <text x="400" y="206" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="14" fill="%231E3A8A" text-anchor="middle">6CO₂ + 6H₂O  ────[Light / Chlorophyll]────&gt;  C₆H₁₂O₆ + 6O₂</text>

    <!-- Plant Diagram Drawing -->
    <g transform="translate(300, 240)">
      <!-- Sun -->
      <circle cx="100" cy="40" r="14" fill="none" stroke="%231E3A8A" stroke-width="1.5"/>
      <path d="M 100 20 L 100 12 M 100 60 L 100 68 M 80 40 L 72 40 M 120 40 L 128 40" stroke="%231E3A8A" stroke-width="1.5"/>
      <text x="135" y="45" font-family="'Segoe Print', cursive" font-size="12" fill="%231E3A8A">Sunlight</text>
      <!-- Rays to plant -->
      <path d="M 90 60 L 60 100" stroke="%231E3A8A" stroke-width="1" stroke-dasharray="3,3"/>

      <!-- Plant stem & leaves -->
      <path d="M 50 100 Q 50 160 50 190" stroke="%231E3A8A" stroke-width="2" fill="none"/>
      <!-- Leaves -->
      <path d="M 50 120 Q 20 100 0 110 Q 20 130 50 125" stroke="%231E3A8A" stroke-width="1.5" fill="none"/>
      <path d="M 50 140 Q 80 120 100 130 Q 80 150 50 145" stroke="%231E3A8A" stroke-width="1.5" fill="none"/>
      <path d="M 50 100 Q 30 75 40 60 Q 60 75 50 100" stroke="%231E3A8A" stroke-width="1.5" fill="none"/>

      <!-- Arrows -->
      <text x="-40" y="115" font-family="'Segoe Print', cursive" font-size="12" fill="%231E3A8A">Carbon dioxide ──&gt;</text>
      <text x="110" y="135" font-family="'Segoe Print', cursive" font-size="12" fill="%231E3A8A">──&gt; Oxygen</text>

      <!-- Soil & roots -->
      <line x1="-30" y1="190" x2="130" y2="190" stroke="%231E3A8A" stroke-width="1.5"/>
      <path d="M 50 190 L 40 220 M 50 190 L 60 225 M 50 190 L 50 230" stroke="%231E3A8A" stroke-width="1.2"/>
      <text x="80" y="215" font-family="'Segoe Print', cursive" font-size="12" fill="%231E3A8A">──&gt; Water</text>
    </g>

    <!-- Q2 Handwriting Section -->
    <g transform="translate(0, 520)">
      <text x="25" y="30" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="15" font-weight="bold" fill="%231E3A8A">Q2.</text>
      <text x="90" y="30" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="14" fill="%231E293B">The process mainly occurs in the chloroplast of the plant cell. It has two main stages:</text>
      <text x="90" y="65" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="14" fill="%231E293B">1. Light reaction — Captures light energy.</text>
      <text x="90" y="98" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="14" fill="%231E293B">2. Dark reaction — Uses energy to make glucose.</text>
    </g>

    <!-- Q3 Handwriting Section -->
    <g transform="translate(0, 680)">
      <text x="25" y="30" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="15" font-weight="bold" fill="%231E3A8A">Q3.</text>
      <text x="90" y="30" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="14" fill="%231E293B">Chloroplast contains chlorophyll a &amp; b pigments which absorb blue &amp; red wavelengths of light while reflecting green.</text>
      <text x="90" y="65" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="14" fill="%231E293B">Thylakoid membranes drive photolysis of water producing ATP and NADPH in light reactions.</text>
    </g>

    <!-- Q4 Handwriting Section -->
    <g transform="translate(0, 830)">
      <text x="25" y="30" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="15" font-weight="bold" fill="%231E3A8A">Q4.</text>
      <text x="90" y="30" font-family="'Segoe Print', 'Comic Sans MS', cursive, sans-serif" font-size="14" fill="%231E293B">Blood from vena cava enters left ventricle and pumps to pulmonary vein directly without valve action.</text>
    </g>

    <text x="400" y="1060" font-family="sans-serif" font-size="11" fill="%2394A3B8" text-anchor="middle">--- Page 1 of 4 ---</text>
  </svg>`,

  // Page 2
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" fill="none">
    <rect width="800" height="1100" fill="%23FBFBFA"/>
    <line x1="70" y1="0" x2="70" y2="1100" stroke="%23F87171" stroke-width="1.5"/>
    ${Array.from({ length: 35 }).map((_, i) => `<line x1="0" y1="${80 + i * 28}" x2="800" y2="${80 + i * 28}" stroke="%23E2E8F0" stroke-width="1"/>`).join('')}

    <!-- Q5 Handwriting Section -->
    <text x="25" y="110" font-family="'Segoe Print', cursive" font-size="15" font-weight="bold" fill="%231E3A8A">Q5.</text>
    <text x="90" y="110" font-family="'Segoe Print', cursive" font-size="14" fill="%231E293B">Diagram of Alveolus showing capillary network and thin alveolar membrane for gas diffusion.</text>

    <!-- Q6 Handwriting Section -->
    <g transform="translate(0, 320)">
      <text x="25" y="30" font-family="'Segoe Print', cursive" font-size="15" font-weight="bold" fill="%231E3A8A">Q6.</text>
      <text x="90" y="30" font-family="'Segoe Print', cursive" font-size="14" fill="%231E293B">Human Digestive System: Stomach, Liver, Pancreas, Small Intestine (Site of maximum absorption with villi).</text>
    </g>

    <!-- Q7 Handwriting Section -->
    <g transform="translate(0, 600)">
      <text x="25" y="30" font-family="'Segoe Print', cursive" font-size="15" font-weight="bold" fill="%231E3A8A">Q7.</text>
      <text x="90" y="30" font-family="'Segoe Print', cursive" font-size="14" fill="%231E293B">Nephron structure: Glomerulus in Bowman capsule filters blood, Loop of Henle reabsorbs water &amp; salts.</text>
    </g>

    <text x="400" y="1060" font-family="sans-serif" font-size="11" fill="%2394A3B8" text-anchor="middle">--- Page 2 of 4 ---</text>
  </svg>`,

  // Page 3
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" fill="none">
    <rect width="800" height="1100" fill="%23FBFBFA"/>
    <line x1="70" y1="0" x2="70" y2="1100" stroke="%23F87171" stroke-width="1.5"/>
    ${Array.from({ length: 35 }).map((_, i) => `<line x1="0" y1="${80 + i * 28}" x2="800" y2="${80 + i * 28}" stroke="%23E2E8F0" stroke-width="1"/>`).join('')}

    <!-- Q8 Handwriting Section -->
    <text x="25" y="110" font-family="'Segoe Print', cursive" font-size="15" font-weight="bold" fill="%231E3A8A">Q8.</text>
    <text x="90" y="110" font-family="'Segoe Print', cursive" font-size="14" fill="%231E293B">Palisade mesophyll cells are columnar and tightly packed with high chloroplast density to maximize light absorption.</text>

    <!-- Q9 Handwriting Section -->
    <g transform="translate(0, 300)">
      <text x="25" y="30" font-family="'Segoe Print', cursive" font-size="15" font-weight="bold" fill="%231E3A8A">Q9.</text>
      <text x="90" y="30" font-family="'Segoe Print', cursive" font-size="14" fill="%231E293B">Transpiration is the evaporative loss of water vapor through stomata in leaves. Wind velocity and temperature increase rate.</text>
    </g>

    <!-- Q10 Handwriting Section -->
    <g transform="translate(0, 520)">
      <text x="25" y="30" font-family="'Segoe Print', cursive" font-size="15" font-weight="bold" fill="%231E3A8A">Q10.</text>
      <text x="90" y="30" font-family="'Segoe Print', cursive" font-size="14" fill="%231E293B">Xylem vessels have hollow, lignified dead cell walls forming a continuous capillary tube preventing collapse under negative pressure.</text>
    </g>

    <text x="400" y="1060" font-family="sans-serif" font-size="11" fill="%2394A3B8" text-anchor="middle">--- Page 3 of 4 ---</text>
  </svg>`,

  // Page 4
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" fill="none">
    <rect width="800" height="1100" fill="%23FBFBFA"/>
    <line x1="70" y1="0" x2="70" y2="1100" stroke="%23F87171" stroke-width="1.5"/>
    ${Array.from({ length: 35 }).map((_, i) => `<line x1="0" y1="${80 + i * 28}" x2="800" y2="${80 + i * 28}" stroke="%23E2E8F0" stroke-width="1"/>`).join('')}

    <!-- Q11.a -->
    <text x="25" y="110" font-family="'Segoe Print', cursive" font-size="15" font-weight="bold" fill="%231E3A8A">Q11.a</text>
    <text x="90" y="110" font-family="'Segoe Print', cursive" font-size="14" fill="%231E293B">Plant A exhibits healthy phototropism and robust chlorophyll synthesis, while Plant B underwent etiolation due to light deprivation.</text>

    <!-- Q11.b -->
    <g transform="translate(0, 260)">
      <text x="25" y="30" font-family="'Segoe Print', cursive" font-size="15" font-weight="bold" fill="%231E3A8A">Q11.b</text>
      <text x="90" y="30" font-family="'Segoe Print', cursive" font-size="14" fill="%231E293B">Gradually expose Plant B to indirect sunlight and provide balanced mineral nutrition.</text>
    </g>

    <!-- Q12 -->
    <g transform="translate(0, 450)">
      <text x="25" y="30" font-family="'Segoe Print', cursive" font-size="15" font-weight="bold" fill="%231E3A8A">Q12.</text>
      <text x="90" y="30" font-family="'Segoe Print', cursive" font-size="14" fill="%231E293B">Minute ventilation = Tidal Volume * Respiratory Rate = 0.5 L * 12 = 6.0 L/min.</text>
    </g>

    <text x="400" y="1060" font-family="sans-serif" font-size="11" fill="%2394A3B8" text-anchor="middle">--- Page 4 of 4 ---</text>
  </svg>`
];

// Complete Pre-extracted Assessment Result matching Figma screens exactly
export const SAMPLE_ASSESSMENT_RESULT: AssessmentResult = {
  summary: {
    totalScore: 34,
    maxScore: 40,
    percentage: 85.0,
    grade: 'A+',
    totalQuestions: 13,
    answeredCount: 12,
    unansweredCount: 0,
    aiFeedbackSummary: 'Exceptional conceptual understanding of plant physiology, photosynthesis, and anatomical structures. Question 4 had flow sequencing errors in cardiovascular circulation. Sub-parts 11(a) and 11(b) evaluated with high precision.',
  },
  questions: [
    {
      question: {
        id: 'q1',
        numberLabel: '1',
        fullLabel: '1',
        text: 'Which blood vessel carries blood away from the heart?',
        maxMarks: 2,
      },
      status: 'correct',
      marksAwarded: 2,
      studentAnswerText: 'Photosynthesis is the process used by green plants and some other organisms to convert light energy into chemical energy. 6CO₂ + 6H₂O -> C₆H₁₂O₆ + 6O₂',
      feedback: 'Correctly noted the chemical equation and physiological role.',
      answerRegion: {
        boxes: [
          { pageIndex: 0, ymin: 9, xmin: 3, ymax: 45, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q2',
        numberLabel: '2',
        fullLabel: '2',
        text: 'Which of the following organelles is primarily involved in photosynthesis?',
        maxMarks: 2,
      },
      status: 'correct',
      marksAwarded: 2,
      studentAnswerText: 'The process mainly occurs in the chloroplast of the plant cell. It has two main stages: 1. Light reaction - Captures light energy. 2. Dark reaction - Uses energy to make glucose.',
      feedback: 'Excellent work! You correctly identified the chloroplast as the organelle responsible for photosynthesis. Keep it up!',
      answerRegion: {
        boxes: [
          { pageIndex: 0, ymin: 47, xmin: 3, ymax: 60, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q3',
        numberLabel: '3',
        fullLabel: '3',
        text: 'Explain the role of chloroplasts in photosynthesis, naming the main pigments involved and briefly outlining the two major stages of the process.',
        maxMarks: 2,
      },
      status: 'correct',
      marksAwarded: 2,
      studentAnswerText: 'Chloroplast contains chlorophyll a & b pigments which absorb light. Thylakoid drives light reactions.',
      feedback: 'Well explained with accurate mention of chlorophyll a & b and thylakoid membranes.',
      answerRegion: {
        boxes: [
          { pageIndex: 0, ymin: 62, xmin: 3, ymax: 74, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q4',
        numberLabel: '4',
        fullLabel: '4',
        text: 'Describe the flow of blood through the human heart starting from the right atrium and ending at the aorta; include the names of valves crossed.',
        maxMarks: 2,
      },
      status: 'incorrect',
      marksAwarded: 0,
      studentAnswerText: 'Blood from vena cava enters left ventricle and pumps to pulmonary vein directly without valve action.',
      feedback: 'Incorrect circulation path. Blood enters right ventricle through tricuspid valve, passes through pulmonary artery to lungs before reaching aorta.',
      answerRegion: {
        boxes: [
          { pageIndex: 0, ymin: 75, xmin: 3, ymax: 87, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q5',
        numberLabel: '5',
        fullLabel: '5',
        text: 'Draw a labelled diagram of an alveolus showing capillaries and air space (label alveolar sac, capillary, and direction of gas exchange).',
        maxMarks: 2,
      },
      status: 'correct',
      marksAwarded: 2,
      studentAnswerText: 'Diagram of Alveolus showing capillary network and thin alveolar membrane for gas diffusion.',
      feedback: 'Clear diagrammatic depiction and accurate gas exchange direction.',
      answerRegion: {
        boxes: [
          { pageIndex: 1, ymin: 8, xmin: 3, ymax: 27, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q6',
        numberLabel: '6',
        fullLabel: '6',
        text: 'Draw a neat labelled diagram of the human digestive system (stomach, small intestine, large intestine, liver, pancreas) and label the site where most absorption occurs.',
        maxMarks: 5,
      },
      status: 'correct',
      marksAwarded: 4,
      studentAnswerText: 'Digestive system diagram including stomach, small intestine, large intestine, pancreas.',
      feedback: 'Accurate labels. 1 mark deducted for missing gallbladder placement.',
      answerRegion: {
        boxes: [
          { pageIndex: 1, ymin: 29, xmin: 3, ymax: 53, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q7',
        numberLabel: '7',
        fullLabel: '7',
        text: 'Draw and label a nephron (Bowman\'s capsule, glomerulus, proximal tubule, loop of Henle, distal tubule, collecting duct).',
        maxMarks: 5,
      },
      status: 'correct',
      marksAwarded: 5,
      studentAnswerText: 'Nephron structure with Bowman capsule, glomerulus, proximal tubule, and collecting duct.',
      feedback: 'Comprehensive and accurately labeled nephron diagram. Full marks awarded.',
      answerRegion: {
        boxes: [
          { pageIndex: 1, ymin: 55, xmin: 3, ymax: 82, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q8',
        numberLabel: '8',
        fullLabel: '8',
        text: 'Explain the structural differences between palisade mesophyll and spongy mesophyll and state how each structure aids its function in the leaf.',
        maxMarks: 5,
      },
      status: 'partial',
      marksAwarded: 3,
      studentAnswerText: 'Palisade cells are columnar and tightly packed for light absorption.',
      feedback: 'Correctly detailed palisade mesophyll. Missed spongy mesophyll intercellular air space explanation.',
      answerRegion: {
        boxes: [
          { pageIndex: 2, ymin: 8, xmin: 3, ymax: 26, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q9',
        numberLabel: '9',
        fullLabel: '9',
        text: 'Describe the process of transpiration in plants in two to three sentences and name two environmental factors that increase its rate.',
        maxMarks: 5,
      },
      status: 'correct',
      marksAwarded: 5,
      studentAnswerText: 'Transpiration is the evaporative loss of water through stomata. Wind and temperature increase rate.',
      feedback: 'Concise, scientifically accurate definition with correct environmental variables.',
      answerRegion: {
        boxes: [
          { pageIndex: 2, ymin: 28, xmin: 3, ymax: 46, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q10',
        numberLabel: '10',
        fullLabel: '10',
        text: 'Explain how the structure of xylem vessels facilitates water transport in plants (mention one structural feature and its role).',
        maxMarks: 5,
      },
      status: 'correct',
      marksAwarded: 4,
      studentAnswerText: 'Xylem vessels have hollow, lignified dead cell walls forming a continuous capillary tube.',
      feedback: 'Strong mention of lignified walls and continuous tube structure.',
      answerRegion: {
        boxes: [
          { pageIndex: 2, ymin: 48, xmin: 3, ymax: 72, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q11_a',
        numberLabel: '11',
        subPart: 'a.',
        fullLabel: '11 a.',
        text: 'A diagram shows two potted plants — Plant A in bright light with broad green leaves, Plant B kept in dim light with pale, elongated leaves.',
        maxMarks: 2,
      },
      status: 'correct',
      marksAwarded: 2,
      studentAnswerText: 'Plant A exhibits healthy phototropism, while Plant B underwent etiolation due to light deprivation.',
      feedback: 'Accurately identified etiolation and chlorophyll degradation.',
      answerRegion: {
        boxes: [
          { pageIndex: 3, ymin: 8, xmin: 3, ymax: 23, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q11_b',
        numberLabel: '11',
        subPart: 'b.',
        fullLabel: '11 b.',
        text: 'Suggest one practical measure to help Plant B recover.',
        maxMarks: 3,
      },
      status: 'partial',
      marksAwarded: 1,
      studentAnswerText: 'Gradually expose Plant B to indirect sunlight and provide balanced mineral nutrition.',
      feedback: 'Good suggestion. Needs explicit mention of avoiding photobleaching through staged acclimatization.',
      answerRegion: {
        boxes: [
          { pageIndex: 3, ymin: 24, xmin: 3, ymax: 40, xmax: 95 }
        ],
      },
    },
    {
      question: {
        id: 'q12',
        numberLabel: '12',
        fullLabel: '12',
        text: 'A resting person has tidal volume (air per breath) of 0.5 L and breathes 12 times per minute.',
        maxMarks: 3,
      },
      status: 'correct',
      marksAwarded: 3,
      studentAnswerText: 'Minute ventilation = Tidal Volume * Respiratory Rate = 0.5 L * 12 = 6.0 L/min.',
      feedback: 'Accurate calculation of pulmonary minute ventilation.',
      answerRegion: {
        boxes: [
          { pageIndex: 3, ymin: 42, xmin: 3, ymax: 60, xmax: 95 }
        ],
      },
    },
  ],
  unmatchedAnswers: [],
};
