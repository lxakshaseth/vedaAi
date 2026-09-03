'use client';

import React, { useState } from 'react';
import { AssessmentResult } from '@/types/assessment';
import { exportToGradebookCSV, exportQuestionAnalysisCSV, downloadFile, generatePrintableReportHTML } from '@/lib/export-utils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentData?: AssessmentResult | null;
  batchAssessments?: AssessmentResult[];
  title?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  assessmentData,
  batchAssessments = [],
  title = 'Export Assessment Reports',
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'json' | 'html'>('csv');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);
    try {
      const activeData = assessmentData ? [assessmentData] : batchAssessments;
      const timestamp = new Date().toISOString().split('T')[0];

      if (selectedFormat === 'csv') {
        if (assessmentData && (!batchAssessments || batchAssessments.length === 0)) {
          const csvContent = exportQuestionAnalysisCSV(assessmentData);
          downloadFile(csvContent, `veda-question-breakdown-${timestamp}.csv`, 'text/csv');
        } else {
          const csvContent = exportToGradebookCSV(activeData);
          downloadFile(csvContent, `veda-gradebook-${timestamp}.csv`, 'text/csv');
        }
      } else if (selectedFormat === 'json') {
        const jsonContent = JSON.stringify(activeData, null, 2);
        downloadFile(jsonContent, `veda-assessment-export-${timestamp}.json`, 'application/json');
      } else if (selectedFormat === 'html') {
        const target = assessmentData || batchAssessments[0];
        if (target) {
          const htmlContent = generatePrintableReportHTML(target);
          const printWindow = window.open('', '_blank');
          if (printWindow) {
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
              printWindow.print();
            }, 300);
          }
        }
      }
    } finally {
      setIsExporting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{title}</h3>
              <p className="text-xs text-indigo-100/80">Select target format and download records</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white rounded-lg p-1.5 hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Choose Output Format
          </label>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setSelectedFormat('csv')}
              className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                selectedFormat === 'csv'
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-600/20 font-semibold'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                CSV
              </div>
              <span className="text-xs">Gradebook</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormat('json')}
              className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                selectedFormat === 'json'
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-600/20 font-semibold'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                JSON
              </div>
              <span className="text-xs">Data Dump</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedFormat('html')}
              className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                selectedFormat === 'html'
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-600/20 font-semibold'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                PDF
              </div>
              <span className="text-xs">Print Report</span>
            </button>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Format Details
            </div>
            {selectedFormat === 'csv' && (
              <p>Generates standard comma-delimited columns compatible with Canvas, Blackboard, and Google Classroom.</p>
            )}
            {selectedFormat === 'json' && (
              <p>Full raw AST of optical mappings, confidence scores, criteria tags, and student answers.</p>
            )}
            {selectedFormat === 'html' && (
              <p>Formatted student report card ready for direct browser printing or saving as PDF.</p>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {isExporting ? 'Generating...' : 'Download Export'}
          </button>
        </div>
      </div>
    </div>
  );
};
