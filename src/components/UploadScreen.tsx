'use client';
import React, { useRef } from 'react';
import { Upload, X, ArrowRight, Sparkles } from 'lucide-react';
import { DocumentFile } from '@/types/assessment';

interface UploadScreenProps {
  questionPaper: DocumentFile | null;
  answerSheet: DocumentFile | null;
  onQuestionPaperUpload: (file: File) => void;
  onAnswerSheetUpload: (file: File) => void;
  onRemoveQuestionPaper: () => void;
  onRemoveAnswerSheet: () => void;
  onLoadSample: () => void;
  onStartMapping: () => void;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({
  questionPaper,
  answerSheet,
  onQuestionPaperUpload,
  onAnswerSheetUpload,
  onRemoveQuestionPaper,
  onRemoveAnswerSheet,
  onLoadSample,
  onStartMapping,
}) => {
  const qInputRef = useRef<HTMLInputElement>(null);
  const aInputRef = useRef<HTMLInputElement>(null);

  const isFilled = Boolean(questionPaper && answerSheet);

  return (
    <div className="flex-1 bg-gradient-to-b from-slate-50 to-slate-100/60 flex flex-col justify-between p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto my-auto flex flex-col items-center text-center py-4">
        {/* Main Heading matching Figma */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 flex items-center justify-center flex-wrap gap-2">
          <span>Upload</span>
          <span className="bg-[#FFEFE7] text-[#FF5722] px-3.5 py-1 rounded-2xl inline-block">
            Question Paper &amp; Answer Sheets
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">
          Upload both files to get started
        </p>

        {/* Central Teacher Avatar with Glowing Halo */}
        <div className="relative mb-8 select-none">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FFEFE7] p-2 flex items-center justify-center relative shadow-inner ring-8 ring-orange-100/40">
            {/* Floating orange node dots */}
            <div className="absolute top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#FF5722] text-white text-[8px] font-bold flex items-center justify-center shadow-md animate-pulse">
              1
            </div>
            <div className="absolute bottom-2 left-1 w-3.5 h-3.5 rounded-full bg-[#FF5722] text-white text-[8px] font-bold flex items-center justify-center shadow-md">
              2
            </div>
            <div className="absolute top-8 left-0 w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="absolute top-9 right-0 w-2.5 h-2.5 rounded-full bg-amber-400" />

            {/* Avatar Image */}
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
              alt="Teacher Illustration"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-sm"
            />
          </div>
        </div>

        {/* Dual Upload Cards (Dashed Borders) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {/* Question Paper Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-300 hover:border-orange-400 p-6 min-h-[170px] flex flex-col items-center justify-center transition-all shadow-sm">
            {questionPaper ? (
              <div className="w-full bg-slate-100/90 rounded-xl p-3.5 flex items-center justify-between border border-slate-200 relative">
                <div className="flex items-center gap-3 overflow-hidden text-left">
                  <div className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-1 rounded shadow-sm shrink-0">
                    PDF
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 truncate">{questionPaper.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {(questionPaper.size / (1024 * 1024)).toFixed(1)}MB • {questionPaper.previewUrls.length} Pages
                    </p>
                  </div>
                </div>

                <button
                  onClick={onRemoveQuestionPaper}
                  className="w-6 h-6 rounded-full bg-slate-700 hover:bg-slate-900 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm ml-2"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => qInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center cursor-pointer group py-2"
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
                <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-orange-50 text-slate-600 group-hover:text-[#FF5722] mb-2.5 transition-colors">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  Upload <span className="text-[#FF5722] font-bold">Question Paper</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Max 10MB</p>
              </div>
            )}
          </div>

          {/* Answer Sheet Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-300 hover:border-orange-400 p-6 min-h-[170px] flex flex-col items-center justify-center transition-all shadow-sm">
            {answerSheet ? (
              <div className="w-full bg-slate-100/90 rounded-xl p-3.5 flex items-center justify-between border border-slate-200 relative">
                <div className="flex items-center gap-3 overflow-hidden text-left">
                  <div className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-1 rounded shadow-sm shrink-0">
                    PDF
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 truncate">{answerSheet.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {(answerSheet.size / (1024 * 1024)).toFixed(1)}MB • {answerSheet.previewUrls.length} Pages
                    </p>
                  </div>
                </div>

                <button
                  onClick={onRemoveAnswerSheet}
                  className="w-6 h-6 rounded-full bg-slate-700 hover:bg-slate-900 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm ml-2"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => aInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center cursor-pointer group py-2"
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
                <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-orange-50 text-slate-600 group-hover:text-[#FF5722] mb-2.5 transition-colors">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  Upload <span className="text-[#FF5722] font-bold">Answer Sheet</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Max 10MB</p>
              </div>
            )}
          </div>
        </div>

        {/* 1-Click Try Demo Assignment Action */}
        <div className="mb-6">
          <button
            onClick={onLoadSample}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#FF5722] border border-orange-200 rounded-xl text-xs font-bold transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Figma Sample (Class 10 Biology &amp; Handwritten Answers)</span>
          </button>
        </div>

        {/* Bottom CTA Button matching Figma */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onStartMapping}
            disabled={!isFilled}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-xs transition-all ${
              isFilled
                ? 'bg-slate-900 hover:bg-black text-white shadow-lg shadow-slate-900/20 cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-slate-400 text-white cursor-not-allowed opacity-60'
            }`}
          >
            <span>Start Mapping</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-slate-400 mt-1">
            Once both files are uploaded, you&apos;ll able to map answers with questions
          </p>
        </div>
      </div>
    </div>
  );
};
