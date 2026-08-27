'use client';
import React, { useState } from 'react';
import {
  Sparkles,
  X,
  FileCheck2,
  BookOpen,
  HelpCircle,
  MessageSquareQuote,
  Copy,
  Check,
  Wand2,
  ArrowRight,
} from 'lucide-react';

interface AIToolkitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (action: string) => void;
}

export const AIToolkitModal: React.FC<AIToolkitModalProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const [activeTool, setActiveTool] = useState<'rubric' | 'question' | 'lesson' | 'feedback'>('rubric');
  const [topicInput, setTopicInput] = useState('Photosynthesis & Cellular Respiration (Class 10 Biology)');
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedOutput(null);

    setTimeout(() => {
      setIsGenerating(false);
      if (activeTool === 'rubric') {
        setGeneratedOutput(
`### 📊 4-Tier Assessment Rubric: ${topicInput}

| Criteria | Excellent (4 pts) | Proficient (3 pts) | Basic (2 pts) | Needs Work (1 pt) |
| :--- | :--- | :--- | :--- | :--- |
| **Light Reactions & Inputs** | Accurately identifies photons, H2O split, O2 release & ATP generation with precise chemical equation. | Mentions photons and water split with minor equation inaccuracies. | States light is required but omits ATP/NADPH role. | Confuses light reactions with dark reactions. |
| **Calvin Cycle (Dark Reaction)** | Explains CO2 fixation into glucose via RuBisCO enzyme with clear location (stroma). | Explains CO2 conversion to glucose with correct stroma context. | Mentions glucose creation but omits CO2 fixation steps. | Incomplete description of sugar synthesis. |
| **Diagram & Labeling** | Flawless chloroplast diagram: thylakoids, granum, stroma, and outer/inner membranes clearly labeled. | Clear diagram with at least 3 correct organelle labels. | Sketch lacks detail or has 1-2 mislabeled parts. | Missing diagram or unreadable labels. |
| **Handwriting & Clarity** | Clear handwriting, well-structured numbered steps, standard biological notation used. | Legible with structured points. | Difficult to read in sections; missing numbering. | Illegible or unorganized response. |`
        );
      } else if (activeTool === 'question') {
        setGeneratedOutput(
`### 📝 AI Generated Question Set (CBSE Class 10 Standard)
**Topic:** ${topicInput}

**Section A: Conceptual (2 Marks each)**
1. Differentiate between Light-dependent reactions and Light-independent reactions based on site of occurrence and end products.
2. Why is the rate of photosynthesis slower on very cloudy days even when temperatures are optimal?

**Section B: Application & Diagram (3 Marks each)**
3. Draw a neat schematic diagram of a Chloroplast showing the site of photolysis of water and dark reaction.
4. A plant was kept in darkness for 48 hours before an iodine starch test. Explain the expected observation and biological reason.

**Section C: High Order Thinking (5 Marks)**
5. Explain how stomatal opening and closing is regulated by guard cells with reference to potassium ion concentration and turgor pressure. Include a supporting diagram.`
        );
      } else if (activeTool === 'lesson') {
        setGeneratedOutput(
`### 📚 45-Minute Lesson Plan: ${topicInput}
**Class Level:** Grade 10 | **Subject:** Biology

- **00 - 07 min: Hook & Prior Knowledge**
  Show leaf cross-section slide. Ask: *"Why do leaves appear green under sunlight and what happens when light hits chlorophyll?"*
- **08 - 22 min: Direct Instruction & Interactive Breakdown**
  - Photolysis of water ($2H_2O \\rightarrow 4H^+ + 4e^- + O_2$)
  - Stroma vs. Thylakoid membrane roles
- **23 - 35 min: Guided Practice & Peer Activity**
  Students complete 3-step diagrammatic flowchart labeling reactants ($CO_2, H_2O$) and products ($C_6H_{12}O_6, O_2$).
- **36 - 45 min: Formative Exit Ticket**
  Quick 2-question checkpoint: 1. Where does Calvin cycle occur? 2. What is the source of oxygen released during photosynthesis?`
        );
      } else {
        setGeneratedOutput(
`### 💡 Personalized Student Feedback Suggestions:
**For Top Performer (90%+):**
*"Outstanding work! Your biological diagrams are precise and your explanation of photolysis is clear. To push further, explore how C4 plants adapt to minimize photorespiration."*

**For Student Needing Reinforcement (50-70%):**
*"Good attempt at the core definitions. Make sure to clearly separate where light vs dark reactions occur in the chloroplast. Review Section 6.2 in your NCERT textbook and re-attempt the diagram!"*`
        );
      }
    }, 700);
  };

  const handleCopy = () => {
    if (generatedOutput) {
      navigator.clipboard.writeText(generatedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-400/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-orange-400 fill-orange-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold flex items-center gap-2">
                AI Teacher&apos;s Toolkit
                <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Pro
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Instant generative assistants to speed up grading, rubrics, and planning
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Tool Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => {
                setActiveTool('rubric');
                setGeneratedOutput(null);
              }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                activeTool === 'rubric'
                  ? 'border-[#FF5722] bg-[#FFEFE7]/60 text-[#FF5722] font-bold shadow-sm'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium'
              }`}
            >
              <FileCheck2 className="w-5 h-5" />
              <span className="text-xs">Rubric Maker</span>
            </button>

            <button
              onClick={() => {
                setActiveTool('question');
                setGeneratedOutput(null);
              }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                activeTool === 'question'
                  ? 'border-[#FF5722] bg-[#FFEFE7]/60 text-[#FF5722] font-bold shadow-sm'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium'
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs">Question Creator</span>
            </button>

            <button
              onClick={() => {
                setActiveTool('lesson');
                setGeneratedOutput(null);
              }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                activeTool === 'lesson'
                  ? 'border-[#FF5722] bg-[#FFEFE7]/60 text-[#FF5722] font-bold shadow-sm'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Lesson Plan</span>
            </button>

            <button
              onClick={() => {
                setActiveTool('feedback');
                setGeneratedOutput(null);
              }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                activeTool === 'feedback'
                  ? 'border-[#FF5722] bg-[#FFEFE7]/60 text-[#FF5722] font-bold shadow-sm'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium'
              }`}
            >
              <MessageSquareQuote className="w-5 h-5" />
              <span className="text-xs">Feedback Draft</span>
            </button>
          </div>

          {/* Prompt / Input Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Topic / Chapter / Concept
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="e.g. Life Processes: Photosynthesis, Class 10 Biology"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722] bg-white shadow-inner"
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !topicInput.trim()}
                className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shrink-0 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-orange-400" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 flex-wrap">
              <span className="font-semibold">Quick presets:</span>
              <button
                onClick={() => setTopicInput('Chemical Reactions & Equations, Class 10')}
                className="hover:text-orange-600 underline"
              >
                Chemical Reactions
              </button>
              <span>•</span>
              <button
                onClick={() => setTopicInput('Light - Reflection and Refraction (Ray Diagrams)')}
                className="hover:text-orange-600 underline"
              >
                Light &amp; Optics
              </button>
              <span>•</span>
              <button
                onClick={() => setTopicInput('Heredity and Evolution, Mendelian Genetics')}
                className="hover:text-orange-600 underline"
              >
                Genetics
              </button>
            </div>
          </div>

          {/* Generated Result Output */}
          {generatedOutput && (
            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 border border-slate-800 relative animate-fadeIn">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Generated AI Output
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Output</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-xs leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap font-mono text-slate-200">
                {generatedOutput}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Powered by VedaAI Multi-Modal Reasoning Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 font-semibold text-slate-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
