'use client';
import React, { useRef, useEffect, useState } from 'react';
import { GradedQuestion, UnmatchedAnswer } from '@/types/assessment';
import { ZoomIn, ZoomOut, Maximize2, Layers, Zap, AlertCircle } from 'lucide-react';

interface AnswerViewerProps {
  pageImages: string[];
  questions: GradedQuestion[];
  unmatchedAnswers: UnmatchedAnswer[];
  selectedQuestionId: string | null;
  onSelectQuestion: (questionId: string) => void;
}

export const AnswerViewer: React.FC<AnswerViewerProps> = ({
  pageImages,
  questions,
  unmatchedAnswers,
  selectedQuestionId,
  onSelectQuestion,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [activePageIndex, setActivePageIndex] = useState(0);

  // References for scrolling to pages/boxes
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.2, 2.0));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.2, 0.6));
  const handleResetZoom = () => setZoomLevel(1.0);

  // Auto-scroll when selectedQuestionId changes
  useEffect(() => {
    if (!selectedQuestionId) return;

    const selectedGraded = questions.find((q) => q.question.id === selectedQuestionId);
    if (!selectedGraded || !selectedGraded.answerRegion?.boxes?.length) return;

    // Get the first box page index
    const firstBox = selectedGraded.answerRegion.boxes[0];
    setActivePageIndex(firstBox.pageIndex);

    const pageElement = pageRefs.current[firstBox.pageIndex];
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedQuestionId, questions]);

  return (
    <div className="flex flex-col h-full bg-slate-900 overflow-hidden">
      {/* Top Toolbar */}
      <div className="bg-slate-800 text-slate-200 px-4 py-2.5 flex items-center justify-between border-b border-slate-700 select-none shrink-0 z-30">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300">Answer Sheet Viewer</span>
          <span className="text-[11px] font-semibold bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
            {pageImages.length} Page(s)
          </span>
        </div>

        {/* Page selector buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-slate-700">
          {pageImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActivePageIndex(idx);
                pageRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                activePageIndex === idx
                  ? 'bg-brand-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Page {idx + 1}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono w-12 text-center text-slate-300">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            title="Reset Zoom"
            className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors ml-1"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pages Container with Overlay Bounding Boxes */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-6 flex flex-col items-center">
        {pageImages.map((pageSrc, pageIdx) => {
          return (
            <div
              key={pageIdx}
              ref={(el) => {
                pageRefs.current[pageIdx] = el;
              }}
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
              className="relative bg-white rounded-lg shadow-2xl border border-slate-700 transition-transform duration-200 max-w-[800px] w-full"
            >
              {/* Answer Sheet Image */}
              <img
                src={pageSrc}
                alt={`Answer Sheet Page ${pageIdx + 1}`}
                className="w-full h-auto rounded-lg block select-none"
              />

              {/* Page Number Watermark Badge */}
              <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm shadow-md pointer-events-none">
                Page {pageIdx + 1}
              </div>

              {/* OVERLAY SVG BOUNDING BOXES */}
              {questions.map((graded) => {
                const { question, status, marksAwarded, answerRegion, isOutOfOrder } = graded;
                if (!answerRegion?.boxes) return null;

                const isSelected = selectedQuestionId === question.id;

                return answerRegion.boxes
                  .filter((box) => box.pageIndex === pageIdx)
                  .map((box, boxIdx) => {
                    const topPercent = box.ymin;
                    const leftPercent = box.xmin;
                    const widthPercent = box.xmax - box.xmin;
                    const heightPercent = box.ymax - box.ymin;

                    return (
                      <div
                        key={`${question.id}-${boxIdx}`}
                        onClick={() => onSelectQuestion(question.id)}
                        style={{
                          top: `${topPercent}%`,
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                          height: `${heightPercent}%`,
                        }}
                        className={`absolute cursor-pointer rounded-lg transition-all duration-200 group z-20 ${
                          isSelected
                            ? 'border-4 border-brand-500 bg-brand-500/15 shadow-xl ring-4 ring-brand-500/30 animate-pulse'
                            : 'border-2 border-emerald-500/80 bg-emerald-500/10 hover:border-brand-400 hover:bg-brand-500/15'
                        }`}
                      >
                        {/* Floating Label Badge */}
                        <div
                          className={`absolute -top-3.5 left-2 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold shadow-md flex items-center gap-1.5 transition-all ${
                            isSelected
                              ? 'bg-brand-600 text-white scale-105 z-30'
                              : 'bg-emerald-700 text-white group-hover:bg-brand-600'
                          }`}
                        >
                          <span>{question.fullLabel}</span>
                          <span className="opacity-80">({marksAwarded}/{question.maxMarks}m)</span>

                          {isOutOfOrder && (
                            <span title="Answered Out of Order">
                              <Zap className="w-3 h-3 text-amber-300 fill-amber-300 inline" />
                            </span>
                          )}
                          {answerRegion.boxes.length > 1 && (
                            <span title="Spans multiple pages">
                              <Layers className="w-3 h-3 text-purple-200 inline" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  });
              })}

              {/* UNMATCHED ANSWER / SCRATCHWORK BOUNDING BOXES */}
              {unmatchedAnswers
                .filter((unm) => unm.pageIndex === pageIdx)
                .map((unm) => {
                  const topPercent = unm.boundingBox.ymin;
                  const leftPercent = unm.boundingBox.xmin;
                  const widthPercent = unm.boundingBox.xmax - unm.boundingBox.xmin;
                  const heightPercent = unm.boundingBox.ymax - unm.boundingBox.ymin;

                  return (
                    <div
                      key={unm.id}
                      style={{
                        top: `${topPercent}%`,
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                        height: `${heightPercent}%`,
                      }}
                      className="absolute border-2 border-dashed border-purple-500/80 bg-purple-500/10 rounded-lg p-2 z-10 hover:border-purple-600 transition-all"
                    >
                      <div className="absolute -top-3 left-2 bg-purple-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-purple-200" />
                        <span>Unmapped Scratchwork</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
