'use client';
import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  UploadCloud,
  FileCheck2,
  Users,
  Clock,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  Award,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  GraduationCap,
  MessageSquare,
  HelpCircle,
  School,
  ExternalLink,
  Flame,
} from 'lucide-react';

interface LandingWebsiteProps {
  onLaunchApp: (tab?: 'home' | 'classroom' | 'assignments' | 'exams' | 'library') => void;
  onTrySampleExam: () => void;
  onOpenToolkit: () => void;
}

export const LandingWebsite: React.FC<LandingWebsiteProps> = ({
  onLaunchApp,
  onTrySampleExam,
  onOpenToolkit,
}) => {
  // Interactive ROI Calculator State
  const [studentCount, setStudentCount] = useState<number>(120);
  const [examsPerTerm, setExamsPerTerm] = useState<number>(6);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Active Toolkit Tab Preview
  const [activeTabPreview, setActiveTabPreview] = useState<'rubric' | 'questions' | 'lesson'>('rubric');

  const hoursSavedPerTerm = Math.round((studentCount * examsPerTerm * 12) / 60);
  const manualGradingHours = Math.round((studentCount * examsPerTerm * 15) / 60);

  const faqs = [
    {
      q: 'How does VedaAI accurately read messy or cursive student handwriting?',
      a: 'VedaAI employs advanced multi-modal vision-language models fine-tuned on diverse handwritten exam scripts. It performs adaptive contrast enhancement, stroke de-noising, and optical token mapping to read pencil, ink, cursive, and faded scans with 99.2% accuracy.',
    },
    {
      q: 'Can VedaAI evaluate biological diagrams, chemical structures, and math equations?',
      a: 'Yes! VedaAI verifies anatomical diagram proportion, directional arrows, organelle labeling (e.g., chloroplast thylakoids vs. stroma), balanced chemical reactions, and step-wise mathematical derivation according to CBSE and ICSE marking rubrics.',
    },
    {
      q: 'What if a student writes answers out of order?',
      a: 'VedaAI automatically identifies question numbers even when scrambled across different pages (e.g. Q4 written on Page 3, Q1 on Page 1) and pairs each answer block with its corresponding question paper prompt.',
    },
    {
      q: 'Is student assessment data kept secure and private?',
      a: 'Absolutely. We enforce end-to-end encryption in transit and at rest. Student scripts are processed within isolated private cloud instances and are never used to train public third-party models.',
    },
    {
      q: 'How do I integrate VedaAI with our school LMS?',
      a: 'VedaAI provides seamless CSV/Excel gradebook exports and direct REST API connectors for Google Classroom, Canvas, Blackboard, and custom school ERP systems.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#FF5722] selection:text-white overflow-x-hidden">
      {/* Top Floating Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-500/15 via-amber-500/5 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="fixed -top-40 right-10 w-96 h-96 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => onLaunchApp('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              V
            </div>
            <div>
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center gap-1.5">
                Veda<span className="text-[#FF5722]">AI</span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full ml-1 hidden sm:inline-block">
                  v2.4 Pro
                </span>
              </span>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#interactive-demo" className="hover:text-white transition-colors">
              Live Demo
            </a>
            <a href="#ai-toolkit" className="hover:text-white transition-colors">
              AI Toolkit
            </a>
            <a href="#roi-calculator" className="hover:text-white transition-colors">
              ROI Calculator
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onLaunchApp('home')}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-colors"
            >
              <span>Teacher Portal</span>
            </button>

            <button
              onClick={() => onLaunchApp('home')}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-amber-500 hover:from-[#E64A19] hover:to-orange-500 text-white text-xs font-extrabold shadow-lg shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-24 sm:space-y-32 pb-24">
        {/* HERO SECTION */}
        <section className="pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold shadow-inner">
            <Sparkles className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
            <span>Next-Gen Optical Evaluation AI • CBSE &amp; ICSE Curriculum Aligned</span>
          </div>

          {/* Primary Headline */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              Turn Handwritten Exam Sheets Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                Graded Feedback
              </span>{' '}
              in Seconds.
            </h1>
            <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              VedaAI automatically pairs student answers with question paper numbers, analyzes diagrams and step-wise formulas, and generates personalized pedagogical feedback at sub-second speed.
            </p>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-md mx-auto">
            <button
              onClick={() => onLaunchApp('home')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF5722] to-amber-500 hover:from-[#E64A19] hover:to-orange-500 text-white font-extrabold text-sm shadow-xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Launch Teacher Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onTrySampleExam}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-bold text-sm transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span>Try Live Biology Exam</span>
            </button>
          </div>

          {/* Quick Metrics Banner */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-black text-white">99.2%</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Optical Mapping Accuracy</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-black text-orange-400">&lt; 1.2s</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Per Answer Sheet Analysis</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">48.5 hrs</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Avg. Teacher Time Saved</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <p className="text-2xl sm:text-3xl font-black text-white">100%</p>
              <p className="text-xs text-slate-400 font-medium mt-1">CBSE &amp; ICSE Rubric Alignment</p>
            </div>
          </div>

          {/* School Trust Proof Bar */}
          <div className="pt-10 border-t border-slate-900 space-y-4">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">
              Trusted by Educators and Examination Boards
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all text-xs font-extrabold text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-400 font-bold">
                  DPS
                </div>
                <span>Delhi Public School</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-900/50 border border-blue-500/30 flex items-center justify-center text-[10px] text-blue-400 font-bold">
                  KVS
                </div>
                <span>Kendriya Vidyalaya</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-orange-900/50 border border-orange-500/30 flex items-center justify-center text-[10px] text-orange-400 font-bold">
                  DAV
                </div>
                <span>DAV Public Schools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-[10px] text-purple-400 font-bold">
                  RYAN
                </div>
                <span>Ryan International</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE PRODUCT PREVIEW & OPTICAL MAPPING SHOWCASE */}
        <section id="interactive-demo" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF5722] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Live Product Demo
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Optical Document Mapping in Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              See how VedaAI correlates printed test questions with handwritten student responses and evaluates them with precise bounding-box coordinates.
            </p>
          </div>

          {/* Interactive Mockup Container */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl shadow-orange-500/5 relative overflow-hidden">
            {/* Window Top Controls */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">
                  VedaAI Optical Coordinate Inspector • Class 10 Biology Test
                </span>
              </div>

              <button
                onClick={onTrySampleExam}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Open Full Interactive Evaluator</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Split Screen Demo: Left Question Paper, Right Handwritten Student Sheet */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-start">
              {/* Question List (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Class 10 Biology Exam Paper</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Score: 47 / 50 (94%)
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-2xl bg-orange-500/10 border-2 border-[#FF5722] space-y-1.5 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-orange-400">Q1. Photolysis &amp; Light Reactions</span>
                      <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full">
                        4.5 / 5.0 Marks
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Explain the biochemical reaction of photolysis in chloroplast thylakoids and state the gaseous byproduct.
                    </p>
                    <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Mapped to Student Sheet Page 1 (Coordinates: [ymin: 12%, xmin: 8%])</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">Q2. Chloroplast Anatomy &amp; Labels</span>
                      <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        5.0 / 5.0 Marks
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Draw a neat labeled sketch showing Granum, Thylakoids, and Stroma.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">Q3. Aerobic vs. Anaerobic Glycolysis</span>
                      <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        4.0 / 4.0 Marks
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      State end products and net ATP synthesis in human muscle tissue under hypoxia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Sheet with Optical Overlay Box (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    Handwritten Student Submission (Priya Sharma • Roll #10A-01)
                  </span>
                  <span className="text-[10px] text-slate-400">Optical OCR Engine: Active</span>
                </div>

                <div className="relative rounded-2xl bg-slate-950 border border-slate-700 p-4 sm:p-6 overflow-hidden min-h-[340px] flex flex-col justify-between">
                  {/* Handwritten Content Simulation */}
                  <div className="space-y-4 font-mono text-xs">
                    <div className="relative p-3 rounded-xl border-2 border-dashed border-[#FF5722] bg-orange-500/10 transition-all">
                      <span className="absolute -top-3 left-3 bg-[#FF5722] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                        Optical Bounding Box [Q1 - 4.5/5.0]
                      </span>
                      <p className="text-slate-200 italic leading-relaxed pt-1">
                        &quot;Ans 1: During light reaction, solar photons strike chlorophyll pigment causing photolysis of water molecule: 2H2O -&gt; 4H+ + 4e- + O2 (gas). Oxygen is released through stomatal pores.&quot;
                      </p>
                      <div className="mt-2 pt-2 border-t border-orange-500/30 text-[10px] text-orange-300 font-sans">
                        💡 <strong>AI Feedback:</strong> Excellent equation. Awarded +4.5 marks for accurate stoichiometric balancing and ATP co-factor context.
                      </div>
                    </div>

                    <div className="relative p-3 rounded-xl border border-dashed border-emerald-500/50 bg-emerald-500/5">
                      <span className="absolute -top-3 left-3 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                        Optical Bounding Box [Q2 - 5.0/5.0]
                      </span>
                      <p className="text-slate-300 italic text-[11px]">
                        [Handwritten Chloroplast Diagram: Correctly labeled Granum stacks, Inner/Outer Membrane, and Stroma matrix]
                      </p>
                    </div>
                  </div>

                  {/* Bottom Bar inside Mockup */}
                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Page 1 of 3 • 300 DPI Optical Scan</span>
                    <button
                      onClick={onTrySampleExam}
                      className="text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1"
                    >
                      <span>Launch Full Interactive View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 CORE FEATURES & INNOVATIONS */}
        <section id="features" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF5722] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Platform Features
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Built Specifically for the Modern Educator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Everything teachers and schools need to streamline grading, diagnose learning gaps, and elevate classroom outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-orange-500/50 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-[#FF5722] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                Sub-Second Optical OCR
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Processes full handwritten multi-page scripts in under 2 seconds. Identifies cursive handwriting, struck-out text, and margin notes flawlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-orange-500/50 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Scrambled Answer Realignment
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Students rarely answer sequentially. VedaAI automatically pairs answers written out of order with their corresponding question number.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-orange-500/50 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Step-Wise Partial Marking
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Applies fractional marking criteria strictly adhering to CBSE/ICSE rubrics. Rewards correct formulas, working steps, and units.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-orange-500/50 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Classroom Gap Analytics
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Identifies which exact questions tripped up the class (e.g. 68% lost marks on Photolysis) and recommends targeted remedial lessons.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-orange-500/50 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                AI Teacher&apos;s Toolkit
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Instant generation of 4-tier marking rubrics, CBSE question banks, 45-minute lesson plans, and customized constructive feedback.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-orange-500/50 transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                Enterprise Data Privacy
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                FERPA, GDPR, and Indian DPDP Act compliant. Student answer sheets are processed securely and never retained for public AI model training.
              </p>
            </div>
          </div>
        </section>

        {/* AI TOOLKIT INTERACTIVE SHOWCASE */}
        <section id="ai-toolkit" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF5722] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Generative Power
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              AI Teacher&apos;s Toolkit Inside Every Workspace
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Eliminate hours of manual rubric drafting and question creation with 1-click generative templates.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Tabs */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 border-b border-slate-800 pb-4 overflow-x-auto">
              <button
                onClick={() => setActiveTabPreview('rubric')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTabPreview === 'rubric'
                    ? 'bg-[#FF5722] text-white shadow-lg shadow-orange-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                4-Tier Rubric Maker
              </button>
              <button
                onClick={() => setActiveTabPreview('questions')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTabPreview === 'questions'
                    ? 'bg-[#FF5722] text-white shadow-lg shadow-orange-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                CBSE Question Creator
              </button>
              <button
                onClick={() => setActiveTabPreview('lesson')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTabPreview === 'lesson'
                    ? 'bg-[#FF5722] text-white shadow-lg shadow-orange-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                45-Min Lesson Plan
              </button>
            </div>

            {/* Tab Preview Box */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
              {activeTabPreview === 'rubric' && (
`📊 4-Tier Assessment Rubric: Photosynthesis & Light Reactions (Class 10 Biology)

Criteria:
1. Photolysis Equation (4 pts): Accurate stoichiometric chemical balance: 2H2O -> 4H+ + 4e- + O2.
2. Chloroplast Anatomy (3 pts): Correctly labels Granum, Stroma, and Thylakoid membrane.
3. Dark Reaction Fixation (2 pts): Identifies RuBisCO enzyme role and glucose synthesis.
4. Handwriting & Scientific Notation (1 pt): Legible, structured presentation.`
              )}

              {activeTabPreview === 'questions' && (
`📝 CBSE Standard Question Paper (Class 10 Biology • Life Processes)

Section A: Conceptual (2 Marks Each)
1. Why is the rate of photosynthesis slower on very cloudy days even when temperature is optimal?
2. Differentiate between autotrophic and heterotrophic nutrition with examples.

Section B: Application & Diagram (3 Marks Each)
3. Draw a neat labeled diagram of human nephron showing Bowman's capsule and Glomerulus.
4. Explain why nitrogen is an essential element for plant growth and how it is absorbed.`
              )}

              {activeTabPreview === 'lesson' && (
`📚 45-Minute Lesson Plan: Photosynthesis & Cellular Respiration (Class 10)

00-08 min: Hook Demonstration - Place Elodea plant in beaker under lamp to show O2 bubbles.
08-25 min: Direct Instruction - Light vs Dark reactions breakdown on whiteboard.
25-38 min: Guided Practice - Students complete 3-part labeling flowchart.
38-45 min: Formative Exit Ticket - 2-question checkpoint on chloroplast stroma.`
              )}
            </div>

            {/* Launch Toolkit Action */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">Available in all teacher accounts with 1-click export</span>
              <button
                onClick={onOpenToolkit}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-[#FF5722] border border-orange-500/30 text-xs font-bold transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open Full AI Toolkit</span>
              </button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (3 SIMPLE STEPS) */}
        <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF5722] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Workflow
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Three Simple Steps to Automated Grading
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              No complex hardware or specialized answer sheets needed. Use your existing standard paper tests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 relative space-y-4">
              <div className="w-10 h-10 rounded-full bg-[#FF5722] text-white font-black text-sm flex items-center justify-center shadow-lg shadow-orange-500/25">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Upload Question &amp; Answer Sheets</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Scan or photograph your question paper and student handwritten answer sheets as standard PDFs or images.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 relative space-y-4">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg shadow-amber-500/25">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Optical Coordinate Extraction</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                VedaAI detects answers across all pages, pairs them to question rubrics, and marks step-wise solutions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 relative space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg shadow-emerald-500/25">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Review &amp; Export Gradebook</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Inspect AI bounding boxes, adjust marks with 1-click overrides, and export student reports and CSV gradebooks.
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE ROI / TIME-SAVINGS CALCULATOR */}
        <section id="roi-calculator" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF5722] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                School ROI Calculator
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                How Much Time Will Your Faculty Save?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Adjust student and assessment counts to see hours returned to teaching.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-4">
              {/* Sliders */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span>Number of Enrolled Students:</span>
                    <span className="text-orange-400 text-sm font-black">{studentCount} Students</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={500}
                    step={10}
                    value={studentCount}
                    onChange={(e) => setStudentCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF5722]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>30 (Single Section)</span>
                    <span>500+ (Full Grade Level)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span>Exams / Unit Tests per Term:</span>
                    <span className="text-orange-400 text-sm font-black">{examsPerTerm} Exams</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    step={1}
                    value={examsPerTerm}
                    onChange={(e) => setExamsPerTerm(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF5722]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>2 (Mid &amp; Final)</span>
                    <span>12 (Weekly Unit Quizzes)</span>
                  </div>
                </div>
              </div>

              {/* Calculated Savings Box */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-center sm:text-left">
                <div className="flex items-baseline justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-slate-400">Estimated Time Saved / Term:</span>
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                    {hoursSavedPerTerm} Hours
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>Manual Grading Requirement:</span>
                    <strong className="text-slate-200">~{manualGradingHours} hours</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1.5">
                    <span>With VedaAI Optical Assistant:</span>
                    <strong className="text-emerald-400">~{Math.round(manualGradingHours * 0.15)} hours</strong>
                  </div>
                  <div className="flex justify-between text-orange-400 font-bold pt-1">
                    <span>Grading Turnaround Speedup:</span>
                    <span>10x Faster</span>
                  </div>
                </div>

                <button
                  onClick={() => onLaunchApp('home')}
                  className="w-full py-3 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-extrabold shadow-lg shadow-orange-500/20 transition-all"
                >
                  Start Saving Time in Your Classes
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING PLANS */}
        <section id="pricing" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF5722] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Plans for Individual Teachers and Entire Institutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Start evaluating for free, or power your entire school department.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Educator Free</h3>
                  <p className="text-xs text-slate-400 mt-1">Perfect for individual teachers testing AI grading.</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white">₹0</span>
                  <span className="text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Up to 100 Answer Sheets / month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Optical Question-Answer Mapping</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Standard CBSE Question Bank Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>CSV Gradebook Export</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onLaunchApp('home')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Educator Tier (Featured) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-[#FF5722] space-y-6 flex flex-col justify-between relative shadow-xl shadow-orange-500/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF5722] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                Most Popular
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Pro Teacher</h3>
                  <p className="text-xs text-slate-400 mt-1">Unlimited power for dedicated educators.</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white">₹799</span>
                  <span className="text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-400" />
                    <span>Unlimited Answer Sheets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-400" />
                    <span>AI Teacher&apos;s Toolkit Pro (Rubrics, Plans)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-400" />
                    <span>High-Resolution Diagram Verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-orange-400" />
                    <span>Priority Multi-Modal AI Processing</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onLaunchApp('home')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5722] to-amber-500 hover:from-[#E64A19] hover:to-orange-500 text-white text-xs font-extrabold shadow-lg shadow-orange-500/25 transition-all"
              >
                Upgrade to Pro Teacher
              </button>
            </div>

            {/* School / Enterprise Tier */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Institutional Campus</h3>
                  <p className="text-xs text-slate-400 mt-1">Full school rollout with LMS integration.</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white">Custom</span>
                  <span className="text-xs text-slate-400 font-semibold">/ school year</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Full Faculty &amp; Classrooms Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Google Classroom &amp; ERP Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Dedicated Private Cloud Instance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Custom School Branding &amp; Watermarks</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onLaunchApp('home')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
              >
                Contact Institutional Sales
              </button>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF5722] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-100 hover:text-orange-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-orange-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* HIGH-IMPACT FINAL CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-[#FF5722] via-orange-600 to-amber-600 p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl shadow-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Ready to Experience Next-Gen AI Exam Evaluation?
              </h2>
              <p className="text-xs sm:text-sm text-orange-100 max-w-xl mx-auto leading-relaxed">
                Join hundreds of CBSE &amp; ICSE teachers already grading tests in seconds with VedaAI.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onLaunchApp('home')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-950 hover:bg-black text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
                  <span>Launch Teacher Workspace Now</span>
                </button>
                <button
                  onClick={onTrySampleExam}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/30 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Evaluate Class 10 Biology Sample</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FF5722] flex items-center justify-center text-white font-extrabold text-base">
                V
              </div>
              <span className="font-extrabold text-lg text-white">VedaAI</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The AI-powered optical grading copilot and assessment platform for modern educators and academic institutions.
            </p>
            <p className="text-[11px] text-slate-600">
              © {new Date().getFullYear()} VedaAI Inc. All rights reserved.
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="font-bold text-slate-200">Product</p>
            <ul className="space-y-1.5">
              <li><button onClick={() => onLaunchApp('exams')} className="hover:text-white">Exam Evaluator</button></li>
              <li><button onClick={() => onLaunchApp('classroom')} className="hover:text-white">Classrooms</button></li>
              <li><button onClick={() => onLaunchApp('assignments')} className="hover:text-white">Assignments</button></li>
              <li><button onClick={() => onLaunchApp('library')} className="hover:text-white">My Library</button></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="font-bold text-slate-200">Curriculum</p>
            <ul className="space-y-1.5">
              <li><span className="text-slate-400">CBSE Class 9 &amp; 10</span></li>
              <li><span className="text-slate-400">CBSE Class 11 &amp; 12</span></li>
              <li><span className="text-slate-400">ICSE &amp; State Boards</span></li>
              <li><span className="text-slate-400">NEET / JEE Foundations</span></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="font-bold text-slate-200">Security &amp; Legal</p>
            <ul className="space-y-1.5">
              <li><span className="text-slate-400">FERPA Compliance</span></li>
              <li><span className="text-slate-400">DPDP Act Compliance</span></li>
              <li><span className="text-slate-400">Privacy Policy</span></li>
              <li><span className="text-slate-400">Terms of Service</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
