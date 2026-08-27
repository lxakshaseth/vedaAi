'use client';
import React, { useState } from 'react';
import {
  History,
  BookOpen,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  FileText,
  Sparkles,
  Layers,
  FileCheck2,
  Share2,
  Copy,
  Check,
  X,
  ExternalLink,
  GraduationCap,
} from 'lucide-react';

interface LibraryScreenProps {
  onUseResourceInExam: (resourceName: string) => void;
  onOpenToolkit: () => void;
}

interface LibraryItem {
  id: string;
  title: string;
  category: 'question_bank' | 'past_paper' | 'rubric' | 'lesson_plan';
  subject: string;
  grade: string;
  pages: number;
  updatedAt: string;
  description: string;
  contentPreview?: string;
  tags: string[];
}

const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'lib-1',
    title: 'Class 10 Biology - Life Processes & Photosynthesis Question Bank',
    category: 'question_bank',
    subject: 'Biology',
    grade: 'Class 10',
    pages: 8,
    updatedAt: '2 days ago',
    description:
      '50 Curated CBSE standard questions covering light reactions, stomatal regulation, Calvin cycle, and chloroplast anatomy with answer keys.',
    contentPreview:
      'Q1. State two differences between photolysis of water and photophosphorylation.\nQ2. Explain the mechanism of stomatal opening with potassium ion exchange.\nQ3. Draw a cross section of dicot leaf showing palisade and spongy mesophyll cells.\nQ4. Describe the double circulation pathway in humans with schematic flow chart.',
    tags: ['CBSE 2026', 'NCERT Aligned', 'With Marking Scheme'],
  },
  {
    id: 'lib-2',
    title: 'Class 10 Biology Unit Test - Sample Question Paper & Answer Sheets',
    category: 'past_paper',
    subject: 'Biology',
    grade: 'Class 10',
    pages: 5,
    updatedAt: 'Yesterday',
    description:
      'Original scanned 2-page biology unit test question paper and 3-page handwritten student answer sheets mapped with optical AI coordinates.',
    contentPreview:
      'Original Question Paper:\n1. Photosynthesis light reaction equations (4 marks)\n2. Diagram of chloroplast with labels (3 marks)\n3. Difference between aerobic vs anaerobic respiration (3 marks)',
    tags: ['Interactive Mapping', 'Handwritten Dataset', 'High Resolution'],
  },
  {
    id: 'lib-3',
    title: '4-Tier Analytical Rubric: Diagrammatic & Biological Labeling',
    category: 'rubric',
    subject: 'Biology',
    grade: 'Class 10-12',
    pages: 2,
    updatedAt: 'Oct 22',
    description:
      'Comprehensive scoring rubric evaluating anatomical precision, proportional scaling, standard biological nomenclature, and step-wise clarity.',
    contentPreview:
      'Criteria 1: Diagram Proportion & Neatness (4 pts max)\nCriteria 2: Correct Labeling of 4+ Key Organelles (3 pts max)\nCriteria 3: Biological Flow & Directional Arrows (2 pts max)\nCriteria 4: Scientific Terminology & Handwriting (1 pt max)',
    tags: ['Standardized Rubric', 'AI Evaluator Preset'],
  },
  {
    id: 'lib-4',
    title: 'Class 9 Physics: Force, Laws of Motion & Momentum Problem Bank',
    category: 'question_bank',
    subject: 'Physics',
    grade: 'Class 9',
    pages: 6,
    updatedAt: 'Oct 20',
    description:
      '35 Numerical physics problems on Newton second law ($F=ma$), conservation of momentum, and friction calculations with step-by-step solutions.',
    contentPreview:
      '1. A bullet of mass 10g moving with velocity 400 m/s strikes a wooden block and comes to rest in 0.02s. Calculate the resistive force.\n2. State Newton third law of motion and explain why action and reaction forces do not cancel each other.',
    tags: ['Numerical Set', 'CBSE Class 9'],
  },
  {
    id: 'lib-5',
    title: '45-Minute Lesson Plan: Chemical Equations & Redox Reactions',
    category: 'lesson_plan',
    subject: 'Chemistry',
    grade: 'Class 10',
    pages: 3,
    updatedAt: 'Oct 18',
    description:
      'Interactive classroom pacing guide with 7-minute demonstration hook (burning magnesium ribbon), direct instruction, and 5-min exit ticket.',
    contentPreview:
      '00-08 min: Hook Demonstration (Burning Mg in air)\n08-25 min: Oxidation vs Reduction electron transfer rules\n25-38 min: Peer balancing activity on whiteboards\n38-45 min: Formative exit ticket checkpoint',
    tags: ['Pedagogy', 'Interactive Activity'],
  },
  {
    id: 'lib-6',
    title: 'Class 11 Biology: Biomolecules & Protein Primary/Secondary Structures',
    category: 'question_bank',
    subject: 'Biology',
    grade: 'Class 11',
    pages: 10,
    updatedAt: 'Oct 14',
    description:
      'Higher order thinking questions on peptide bonds, alpha helices, beta pleated sheets, and enzyme active site kinetics.',
    contentPreview:
      '1. Distinguish between apoenzyme, cofactor, and coenzyme.\n2. Explain the lock and key vs induced fit model of enzyme action with energy barrier graph.',
    tags: ['Class 11', 'Advanced Biology'],
  },
];

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  onUseResourceInExam,
  onOpenToolkit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewItem, setPreviewItem] = useState<LibraryItem | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredItems = LIBRARY_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSubject =
      selectedSubject === 'all' || item.subject === selectedSubject;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSubject && matchesSearch;
  });

  const handleCopyPreview = () => {
    if (previewItem?.contentPreview) {
      navigator.clipboard.writeText(previewItem.contentPreview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 flex flex-col overflow-y-auto">
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Library
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Curated CBSE question banks, rubrics, past papers, and AI lesson plans
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenToolkit}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFEFE7] text-[#FF5722] border border-orange-200 hover:bg-orange-100 text-xs font-bold transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate AI Resource</span>
            </button>

            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm">
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Category Chips */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                All ({LIBRARY_ITEMS.length})
              </button>
              <button
                onClick={() => setSelectedCategory('question_bank')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === 'question_bank'
                    ? 'bg-[#FF5722] text-white'
                    : 'bg-orange-50 hover:bg-orange-100 text-[#FF5722]'
                }`}
              >
                Question Banks (3)
              </button>
              <button
                onClick={() => setSelectedCategory('past_paper')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === 'past_paper'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                }`}
              >
                Past Papers (1)
              </button>
              <button
                onClick={() => setSelectedCategory('rubric')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === 'rubric'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-700'
                }`}
              >
                Rubrics (1)
              </button>
              <button
                onClick={() => setSelectedCategory('lesson_plan')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === 'lesson_plan'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                }`}
              >
                Lesson Plans (1)
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search library resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#FF5722] bg-slate-50"
              />
            </div>
          </div>

          {/* Subject Filter Row */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500 overflow-x-auto">
            <span className="font-bold text-slate-700 shrink-0">Subject:</span>
            {['all', 'Biology', 'Physics', 'Chemistry'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                  selectedSubject === sub
                    ? 'bg-slate-800 text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {sub === 'all' ? 'All Subjects' : sub}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-orange-300 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Category Pill & Grade */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        item.category === 'question_bank'
                          ? 'bg-orange-50 text-[#FF5722] border-orange-200'
                          : item.category === 'past_paper'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : item.category === 'rubric'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {item.category.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {item.updatedAt}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#FF5722] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 flex-wrap">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      {item.grade}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      {item.subject}
                    </span>
                    <span className="text-slate-400">{item.pages} Pages</span>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-50 border border-slate-200 text-slate-500 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Preview</span>
                  </button>

                  <button
                    onClick={() => onUseResourceInExam(item.title)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    <span>Use in Exam</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resource Preview Modal */}
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-400/40 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold line-clamp-1">{previewItem.title}</h3>
                    <p className="text-xs text-slate-300">
                      {previewItem.grade} • {previewItem.subject} • {previewItem.pages} Pages
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block mb-1">Description:</strong>
                  {previewItem.description}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Document Content Preview</span>
                    <button
                      onClick={handleCopyPreview}
                      className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors font-semibold"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-slate-900 text-slate-100 font-mono text-xs p-4 rounded-xl max-h-60 overflow-y-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {previewItem.contentPreview}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    const title = previewItem.title;
                    setPreviewItem(null);
                    onUseResourceInExam(title);
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-md transition-all"
                >
                  <span>Load Into Exam Evaluator</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
