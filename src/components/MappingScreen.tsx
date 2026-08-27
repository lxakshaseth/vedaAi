'use client';
import React, { useState, useRef, useEffect } from 'react';
import { AssessmentResult, GradedQuestion } from '@/types/assessment';
import { ChevronDown, ChevronUp, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface MappingScreenProps {
  assessmentResult: AssessmentResult;
  answerSheetPages: string[];
}

export const MappingScreen: React.FC<MappingScreenProps> = ({
  assessmentResult,
  answerSheetPages,
}) => {
  // Mobile active tab: 'questions' or 'answers'
  const [mobileTab, setMobileTab] = useState<'questions' | 'answers'>('questions');

  // Selected question (defaults to Q2 as shown in Figma mockup)
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('q2');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({ q2: true });
  const [isExpandAll, setIsExpandAll] = useState(false);

  // Viewer state
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  // References for scrolling
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const totalPages = answerSheetPages.length;

  const toggleExpandAll = () => {
    if (isExpandAll) {
      setExpandedIds({ [selectedQuestionId]: true });
      setIsExpandAll(false);
    } else {
      const all: Record<string, boolean> = {};
      assessmentResult.questions.forEach((q) => {
        all[q.question.id] = true;
      });
      setExpandedIds(all);
      setIsExpandAll(true);
    }
  };

  const handleSelectQuestion = (qId: string) => {
    setSelectedQuestionId(qId);
    setExpandedIds((prev) => ({ ...prev, [qId]: true }));

    // Find the target page for this question
    const q = assessmentResult.questions.find((item) => item.question.id === qId);
    if (q?.answerRegion?.boxes?.length) {
      const targetPage = q.answerRegion.boxes[0].pageIndex;
      setCurrentPageIndex(targetPage);
    }
  };

  const handleNextPage = () => {
    setCurrentPageIndex((p) => Math.min(p + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPageIndex((p) => Math.max(p - 1, 0));
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden">
      {/* Mobile Tab Segmented Switcher */}
      <div className="md:hidden bg-white border-b border-slate-200 p-2.5 flex items-center justify-center gap-2 shrink-0">
        <div className="bg-slate-100 p-1 rounded-full flex items-center w-full max-w-xs">
          <button
            onClick={() => setMobileTab('questions')}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
              mobileTab === 'questions'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Questions
          </button>
          <button
            onClick={() => setMobileTab('answers')}
            className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
              mobileTab === 'answers'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Answer Sheet
          </button>
        </div>
      </div>

      {/* Main Split-Screen Workspace matching Figma */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden h-[calc(100vh-57px)]">
        {/* Left Pane: Extracted Questions List */}
        <div
          className={`md:col-span-6 lg:col-span-6 bg-white border-r border-slate-200 flex flex-col overflow-hidden ${
            mobileTab === 'questions' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Header Bar */}
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900">
              Extracted Questions <span className="font-normal text-slate-500">(from question paper)</span>
            </h2>
            <button
              onClick={toggleExpandAll}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
            >
              {isExpandAll ? 'Collapse All' : 'Expand All'}
            </button>
          </div>

          {/* Questions Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-4 space-y-3">
            {assessmentResult.questions.map((item) => {
              const { question, status, marksAwarded, feedback } = item;
              const isSelected = selectedQuestionId === question.id;
              const isExpanded = expandedIds[question.id] || isSelected;

              // Marks styling
              let scoreColor = 'text-emerald-700 bg-emerald-50';
              if (status === 'incorrect' || marksAwarded === 0) {
                scoreColor = 'text-rose-700 bg-rose-50';
              } else if (status === 'partial' || marksAwarded < question.maxMarks) {
                scoreColor = 'text-amber-700 bg-amber-50';
              }

              return (
                <div
                  key={question.id}
                  ref={(el) => {
                    cardRefs.current[question.id] = el;
                  }}
                  onClick={() => handleSelectQuestion(question.id)}
                  className={`rounded-2xl transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'border-2 border-[#FF5722] bg-white shadow-md p-4'
                      : 'border border-slate-200 hover:border-slate-300 bg-white p-4'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Number circle badge */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#FF5722] text-white'
                            : 'bg-slate-700 text-white'
                        }`}
                      >
                        {question.numberLabel}
                      </div>

                      {/* Subpart label & Question text */}
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                          {question.subPart && (
                            <span className="font-bold text-slate-900 mr-1.5">{question.subPart}</span>
                          )}
                          {question.text}
                        </p>
                      </div>
                    </div>

                    {/* Marks Pill & Dropdown Chevron */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${scoreColor}`}>
                        {marksAwarded}/{question.maxMarks}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedIds((prev) => ({ ...prev, [question.id]: !isExpanded }));
                        }}
                        className="text-slate-400 hover:text-slate-600 p-0.5"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable AI Feedback Section */}
                  {isExpanded && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100">
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs">
                        <span className="font-bold text-slate-800 block mb-1">AI Feedback</span>
                        <p className="text-slate-600 leading-relaxed">{feedback}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Student Answer Sheet Document Viewer matching Figma */}
        <div
          className={`md:col-span-6 lg:col-span-6 bg-[#18181B] flex flex-col overflow-hidden ${
            mobileTab === 'answers' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Top Dark Toolbar matching Figma */}
          <div className="bg-[#18181B] text-slate-200 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 select-none shrink-0 z-20">
            <span className="text-xs font-bold text-slate-300">Answer Sheet</span>

            {/* Middle Zoom controls (- 100% +) */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-2 py-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.6))}
                className="text-slate-400 hover:text-white px-1 font-bold text-xs"
              >
                -
              </button>
              <span className="text-xs font-mono text-slate-300 px-1">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 2.0))}
                className="text-slate-400 hover:text-white px-1 font-bold text-xs"
              >
                +
              </button>
            </div>

            {/* Right Pagination (< Page 1 of 4 >) */}
            <div className="flex items-center gap-1 bg-slate-900/90 px-2 py-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className="text-slate-400 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-300 font-semibold px-1">
                Page {currentPageIndex + 1} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPageIndex === totalPages - 1}
                className="text-slate-400 hover:text-white disabled:opacity-30"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Document Canvas Page Display */}
          <div
            ref={pageContainerRef}
            className="flex-1 overflow-auto p-4 flex flex-col items-center justify-start relative scrollbar-none"
          >
            <div
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
              className="relative bg-[#FBFBFA] rounded-md shadow-2xl transition-transform duration-150 max-w-[700px] w-full"
            >
              {/* Answer Sheet SVG/PNG Image */}
              <img
                src={answerSheetPages[currentPageIndex]}
                alt={`Answer Sheet Page ${currentPageIndex + 1}`}
                className="w-full h-auto block rounded-md select-none pointer-events-none"
              />

              {/* OVERLAID DYNAMIC BOUNDING BOXES */}
              {assessmentResult.questions.map((item) => {
                const { question, answerRegion } = item;
                if (!answerRegion?.boxes) return null;

                const isSelected = selectedQuestionId === question.id;

                return answerRegion.boxes
                  .filter((box) => box.pageIndex === currentPageIndex)
                  .map((box, bIdx) => {
                    const top = `${box.ymin}%`;
                    const left = `${box.xmin}%`;
                    const width = `${box.xmax - box.xmin}%`;
                    const height = `${box.ymax - box.ymin}%`;

                    if (!isSelected) {
                      return (
                        <div
                          key={`${question.id}-${bIdx}`}
                          onClick={() => handleSelectQuestion(question.id)}
                          style={{ top, left, width, height }}
                          className="absolute cursor-pointer rounded-xl border border-transparent hover:border-emerald-400/60 hover:bg-emerald-500/5 transition-all"
                        />
                      );
                    }

                    return (
                      <div
                        key={`${question.id}-${bIdx}`}
                        style={{ top, left, width, height }}
                        className="absolute cursor-pointer rounded-xl border-2 border-[#22C55E] bg-[#22C55E]/10 transition-all z-20"
                      >
                        {/* Green Badge matching Figma "Q2" */}
                        <div className="absolute -top-3.5 left-2 bg-[#16A34A] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-md shadow-md">
                          Q{question.numberLabel}
                        </div>
                      </div>
                    );
                  });
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
