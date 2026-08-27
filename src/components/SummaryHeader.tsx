'use client';
import React from 'react';
import { AssessmentResult } from '@/types/assessment';
import { Award, CheckCircle2, AlertTriangle, XCircle, HelpCircle, Sparkles } from 'lucide-react';

interface SummaryHeaderProps {
  summary: AssessmentResult['summary'];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: {
    all: number;
    correct: number;
    partial: number;
    incorrect: number;
    unanswered: number;
  };
}

export const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  summary,
  activeFilter,
  onFilterChange,
  counts,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 p-4 space-y-4">
      {/* Top Score Banner Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assessment Summary</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight">
                {summary.totalScore}
              </span>
              <span className="text-sm font-semibold text-slate-400">
                / {summary.maxScore} Marks ({summary.percentage}%)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-base font-extrabold text-amber-300">
              Grade {summary.grade}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-3 leading-relaxed border-t border-white/10 pt-2.5">
          {summary.aiFeedbackSummary}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All ({counts.all})
        </button>

        <button
          onClick={() => onFilterChange('correct')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === 'correct'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Correct ({counts.correct})</span>
        </button>

        <button
          onClick={() => onFilterChange('partial')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === 'partial'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Partial ({counts.partial})</span>
        </button>

        <button
          onClick={() => onFilterChange('incorrect')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === 'incorrect'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Incorrect ({counts.incorrect})</span>
        </button>

        <button
          onClick={() => onFilterChange('unanswered')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === 'unanswered'
              ? 'bg-slate-700 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Unanswered ({counts.unanswered})</span>
        </button>
      </div>
    </div>
  );
};
