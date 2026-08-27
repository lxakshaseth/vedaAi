'use client';
import React, { useState } from 'react';
import { GradedQuestion } from '@/types/assessment';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, ChevronDown, ChevronUp, Zap, Layers, Sparkles } from 'lucide-react';

interface QuestionListProps {
  questions: GradedQuestion[];
  selectedQuestionId: string | null;
  onSelectQuestion: (questionId: string) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  selectedQuestionId,
  onSelectQuestion,
}) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="divide-y divide-slate-100 overflow-y-auto max-h-[calc(100vh-220px)]">
      {questions.map((item) => {
        const { question, status, marksAwarded, studentAnswerText, feedback, isOutOfOrder, answerRegion } = item;
        const isSelected = selectedQuestionId === question.id;
        const isExpanded = expandedIds[question.id] ?? isSelected;
        const pageCount = answerRegion?.boxes?.length || 0;

        return (
          <div
            key={question.id}
            id={`q-card-${question.id}`}
            onClick={() => onSelectQuestion(question.id)}
            className={`p-4 transition-all cursor-pointer ${
              isSelected
                ? 'bg-orange-50/60 border-l-4 border-brand-600 shadow-sm'
                : 'hover:bg-slate-50 border-l-4 border-transparent'
            }`}
          >
            {/* Header Line */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Question Label */}
                <span
                  className={`font-extrabold text-sm px-2.5 py-1 rounded-lg ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  {question.fullLabel}
                </span>

                {/* Status Pill */}
                {status === 'correct' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Correct
                  </span>
                )}
                {status === 'partial' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-3 h-3" /> Partial Credit
                  </span>
                )}
                {status === 'incorrect' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    <XCircle className="w-3 h-3" /> Incorrect
                  </span>
                )}
                {status === 'unanswered' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                    <HelpCircle className="w-3 h-3" /> Unanswered
                  </span>
                )}

                {/* Edge Case Badges */}
                {isOutOfOrder && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    <Zap className="w-3 h-3 text-blue-500 fill-blue-500" /> Out of Order
                  </span>
                )}
                {pageCount > 1 && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                    <Layers className="w-3 h-3 text-purple-500" /> Spans {pageCount} Pages
                  </span>
                )}
              </div>

              {/* Marks Awarded Badge */}
              <div className="text-right shrink-0">
                <span className="font-extrabold text-sm text-slate-900">
                  {marksAwarded}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {' '}/ {question.maxMarks} Marks
                </span>
              </div>
            </div>

            {/* Printed Question Text */}
            <p className="text-xs font-semibold text-slate-800 mb-2 leading-relaxed">
              {question.text}
            </p>

            {/* Answer & Feedback Expandable Drawer */}
            <div className="mt-3">
              <button
                onClick={(e) => toggleExpand(question.id, e)}
                className="flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:text-brand-700 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>{isExpanded ? 'Hide AI Rubric & OCR' : 'Show AI Rubric & OCR'}</span>
                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {isExpanded && (
                <div className="mt-2 text-xs space-y-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 animate-fadeIn">
                  {/* OCR Text */}
                  <div>
                    <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider block mb-1">
                      Detected Handwritten Solution:
                    </span>
                    <p className="text-slate-700 font-mono text-[11px] bg-white p-2 rounded-lg border border-slate-200 leading-normal">
                      {studentAnswerText}
                    </p>
                  </div>

                  {/* AI Feedback */}
                  <div>
                    <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider block mb-1">
                      AI Feedback &amp; Rubric Evaluation:
                    </span>
                    <p className="text-slate-600 leading-relaxed bg-orange-50/50 p-2 rounded-lg border border-orange-100">
                      {feedback}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
