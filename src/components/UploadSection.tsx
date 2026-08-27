'use client';
import React, { useRef } from 'react';
import { Upload, FileText, Image as ImageIcon, Sparkles, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { DocumentFile } from '@/types/assessment';

interface UploadSectionProps {
  questionPaper: DocumentFile | null;
  answerSheet: DocumentFile | null;
  onQuestionPaperUpload: (file: File) => void;
  onAnswerSheetUpload: (file: File) => void;
  onRemoveQuestionPaper: () => void;
  onRemoveAnswerSheet: () => void;
  onLoadSample: () => void;
  onStartProcess: () => void;
  isProcessing?: boolean;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  questionPaper,
  answerSheet,
  onQuestionPaperUpload,
  onAnswerSheetUpload,
  onRemoveQuestionPaper,
  onRemoveAnswerSheet,
  onLoadSample,
  onStartProcess,
}) => {
  const qInputRef = useRef<HTMLInputElement>(null);
  const aInputRef = useRef<HTMLInputElement>(null);

  const canProcess = Boolean(questionPaper && answerSheet);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-brand-700 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-Powered Answer Sheet Grading</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Upload question paper &amp; answer sheet
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Upload printed question paper and handwritten student answer sheet. VedaAI will extract questions, identify bounding answer regions, and grade solutions side-by-side.
        </p>

        {/* 1-Click Sample Data Banner */}
        <div className="mt-6">
          <button
            onClick={onLoadSample}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-brand-600 hover:from-amber-600 hover:to-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4 fill-white/20" />
            <span>Try Sample Test Paper &amp; Handwritten Answer Sheet</span>
          </button>
        </div>
      </div>

      {/* Dual Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Question Paper Card */}
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-brand-300 shadow-sm transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-orange-100 text-brand-600 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Question Paper</h3>
                  <p className="text-xs text-slate-500">PDF or printed paper images</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                Step 1
              </span>
            </div>

            {questionPaper ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative group">
                <button
                  onClick={onRemoveQuestionPaper}
                  className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div className="overflow-hidden pr-6">
                    <p className="text-xs font-bold text-slate-800 truncate">{questionPaper.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {(questionPaper.size / 1024).toFixed(1)} KB • {questionPaper.previewUrls.length} Page(s)
                    </p>
                  </div>
                </div>

                {/* Page Thumbnails */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200 overflow-x-auto">
                  {questionPaper.previewUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Page ${idx + 1}`}
                      className="w-12 h-16 object-cover rounded border border-slate-300 shadow-sm"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div
                onClick={() => qInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-brand-500 bg-slate-50/50 hover:bg-orange-50/30 rounded-xl p-8 text-center cursor-pointer transition-all group"
              >
                <input
                  ref={qInputRef}
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) onQuestionPaperUpload(e.target.files[0]);
                  }}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-brand-100 text-slate-500 group-hover:text-brand-600 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-700 mb-1">
                  Click or drag question paper file
                </p>
                <p className="text-[11px] text-slate-400">Supports PDF, PNG, JPG (Max 20MB)</p>
              </div>
            )}
          </div>
        </div>

        {/* Answer Sheet Card */}
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-brand-300 shadow-sm transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Student Answer Sheet</h3>
                  <p className="text-xs text-slate-500">Handwritten answer sheet PDF or images</p>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                Step 2
              </span>
            </div>

            {answerSheet ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative group">
                <button
                  onClick={onRemoveAnswerSheet}
                  className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div className="overflow-hidden pr-6">
                    <p className="text-xs font-bold text-slate-800 truncate">{answerSheet.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {(answerSheet.size / 1024).toFixed(1)} KB • {answerSheet.previewUrls.length} Page(s)
                    </p>
                  </div>
                </div>

                {/* Page Thumbnails */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200 overflow-x-auto">
                  {answerSheet.previewUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Page ${idx + 1}`}
                      className="w-12 h-16 object-cover rounded border border-slate-300 shadow-sm"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div
                onClick={() => aInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-brand-500 bg-slate-50/50 hover:bg-orange-50/30 rounded-xl p-8 text-center cursor-pointer transition-all group"
              >
                <input
                  ref={aInputRef}
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) onAnswerSheetUpload(e.target.files[0]);
                  }}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-brand-100 text-slate-500 group-hover:text-brand-600 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-700 mb-1">
                  Click or drag handwritten answer sheet file
                </p>
                <p className="text-[11px] text-slate-400">Supports PDF, PNG, JPG (Max 20MB)</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="text-center">
        <button
          onClick={onStartProcess}
          disabled={!canProcess}
          className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all ${
            canProcess
              ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <Sparkles className="w-4 h-4 fill-white/20" />
          <span>Process &amp; Map Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
