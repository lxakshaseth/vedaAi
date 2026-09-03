export interface AuditRecord {
  id: string;
  timestamp: string;
  assessmentId: string;
  studentName: string;
  questionNumber: number;
  previousScore: number;
  newScore: number;
  changedBy: string; // Teacher or AI
  reason: string;
}

const STORAGE_KEY = 'veda_assessment_audit_log';

export function getAuditRecords(): AuditRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load audit records', e);
    return [];
  }
}

export function recordGradeOverride(
  assessmentId: string,
  studentName: string,
  questionNumber: number,
  previousScore: number,
  newScore: number,
  reason: string = 'Manual teacher calibration',
  changedBy: string = 'Instructor'
): AuditRecord {
  const newRecord: AuditRecord = {
    id: 'audit_' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toISOString(),
    assessmentId,
    studentName,
    questionNumber,
    previousScore,
    newScore,
    changedBy,
    reason,
  };

  if (typeof window !== 'undefined') {
    try {
      const records = getAuditRecords();
      const updated = [newRecord, ...records].slice(0, 100);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist audit record', e);
    }
  }

  return newRecord;
}
