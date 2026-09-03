import { AssessmentResult, GradedQuestion } from '@/types/assessment';

/**
 * Calculates letter grade based on percentage score
 */
export function calculateLetterGrade(percentage: number): string {
  if (percentage >= 93) return 'A';
  if (percentage >= 90) return 'A-';
  if (percentage >= 87) return 'B+';
  if (percentage >= 83) return 'B';
  if (percentage >= 80) return 'B-';
  if (percentage >= 77) return 'C+';
  if (percentage >= 73) return 'C';
  if (percentage >= 70) return 'C-';
  if (percentage >= 60) return 'D';
  return 'F';
}

/**
 * Converts assessment results to CSV format for gradebook import
 */
export function exportToGradebookCSV(assessments: AssessmentResult[]): string {
  const headers = [
    'Student Name',
    'Student ID',
    'Total Score',
    'Max Score',
    'Percentage (%)',
    'Letter Grade',
    'Questions Count',
    'Completed At',
  ];

  const rows = assessments.map((assessment) => {
    const totalScore = assessment.summary?.totalScore ?? 0;
    const maxScore = assessment.summary?.maxScore ?? 100;
    const percentage = assessment.summary?.percentage ?? (maxScore > 0 ? (totalScore / maxScore) * 100 : 0);
    const letterGrade = assessment.summary?.grade || calculateLetterGrade(percentage);
    const studentName = (assessment as any).studentName || 'Student';
    const studentId = (assessment as any).studentId || 'N/A';
    const questionsCount = assessment.questions?.length ?? 0;
    const completedAt = (assessment as any).createdAt || new Date().toISOString();

    return [
      `"${studentName.replace(/"/g, '""')}"`,
      `"${studentId}"`,
      totalScore,
      maxScore,
      percentage.toFixed(1),
      letterGrade,
      questionsCount,
      `"${completedAt}"`,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Generates an itemized breakdown CSV of question scores
 */
export function exportQuestionAnalysisCSV(assessment: AssessmentResult): string {
  const headers = [
    'Question Label',
    'Question Text',
    'Awarded Marks',
    'Max Marks',
    'Accuracy (%)',
    'Status',
    'Feedback / Rubric Match',
  ];

  const rows = (assessment.questions || []).map((q: GradedQuestion) => {
    const awarded = q.marksAwarded ?? 0;
    const max = q.question?.maxMarks ?? 1;
    const accuracy = max > 0 ? ((awarded / max) * 100).toFixed(1) : '0';
    const feedback = (q.feedback || '').replace(/"/g, '""');
    const label = q.question?.fullLabel || q.question?.numberLabel || 'Q';
    const text = (q.question?.text || '').replace(/"/g, '""');

    return [
      `"${label}"`,
      `"${text}"`,
      awarded,
      max,
      accuracy,
      `"${q.status}"`,
      `"${feedback}"`,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Triggers a browser file download for text/csv/json
 */
export function downloadFile(content: string, fileName: string, contentType: string = 'text/plain') {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type: `${contentType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates a clean HTML transcript for printing or saving as PDF
 */
export function generatePrintableReportHTML(assessment: AssessmentResult): string {
  const totalScore = assessment.summary?.totalScore ?? 0;
  const maxScore = assessment.summary?.maxScore ?? 100;
  const percentage = assessment.summary?.percentage ?? (maxScore > 0 ? (totalScore / maxScore) * 100 : 0);
  const letterGrade = assessment.summary?.grade || calculateLetterGrade(percentage);
  const studentName = (assessment as any).studentName || 'Student';

  const questionsHTML = (assessment.questions || [])
    .map(
      (q) => `
    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; font-weight: 600; color: #1e293b; margin-bottom: 6px;">
        <span>${q.question?.fullLabel || 'Question'}: ${q.question?.text || ''}</span>
        <span style="color: #4f46e5;">${q.marksAwarded} / ${q.question?.maxMarks || 0} marks</span>
      </div>
      <div style="background: #f8fafc; padding: 10px; border-radius: 6px; font-size: 13px; color: #475569; margin-top: 8px;">
        <strong>Student Answer:</strong> ${q.studentAnswerText || '<em>No answer provided</em>'}
      </div>
      <div style="margin-top: 8px; font-size: 13px; color: #334155;">
        <strong>Feedback:</strong> ${q.feedback || 'Evaluated standard response.'}
      </div>
    </div>
  `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Assessment Report - ${studentName}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; color: #0f172a; padding: 24px; max-width: 800px; margin: 0 auto; }
          .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; background: #e0e7ff; color: #3730a3; font-weight: 600; font-size: 12px; }
          .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
          .stat-box { background: #f1f5f9; padding: 12px; border-radius: 8px; text-align: center; }
          .stat-value { font-size: 20px; font-weight: 700; color: #1e293b; }
          .stat-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
        </style>
      </head>
      <body>
        <div class="header">
          <span class="badge">Veda AI Evaluation Report</span>
          <h1 style="margin: 8px 0 4px 0; font-size: 24px;">${studentName}</h1>
          <p style="color: #64748b; margin: 0; font-size: 14px;">Evaluated on ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-value">${totalScore} / ${maxScore}</div>
            <div class="stat-label">Total Score</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${percentage.toFixed(1)}%</div>
            <div class="stat-label">Percentage</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${letterGrade}</div>
            <div class="stat-label">Letter Grade</div>
          </div>
        </div>

        <h3 style="font-size: 18px; margin-bottom: 12px; color: #1e293b;">Question Breakdown</h3>
        ${questionsHTML}

        <footer style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
          Generated with Veda AI • Automated Pedagogical Evaluation Engine
        </footer>
      </body>
    </html>
  `;
}
