import { AssessmentResult } from '@/types/assessment';

export interface VedaWorkspaceBackup {
  version: string;
  exportedAt: string;
  assessments: AssessmentResult[];
  settings: Record<string, unknown>;
  checksum: string;
}

const AUTOSAVE_DRAFT_KEY = 'veda_autosave_assessment_draft';
const BACKUP_HISTORY_KEY = 'veda_workspace_backups_manifest';

/**
 * Saves in-progress evaluation draft to local storage
 */
export function saveAutosaveDraft(assessment: AssessmentResult): void {
  if (typeof window === 'undefined') return;
  try {
    const payload = {
      savedAt: new Date().toISOString(),
      data: assessment,
    };
    localStorage.setItem(AUTOSAVE_DRAFT_KEY, JSON.stringify(payload));
  } catch (e) {
    console.error('Failed to autosave draft', e);
  }
}

/**
 * Retrieves the latest autosaved draft if present
 */
export function getAutosaveDraft(): { savedAt: string; data: AssessmentResult } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTOSAVE_DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Creates a complete exportable backup archive bundle of current workspace data
 */
export function createWorkspaceBackup(
  assessments: AssessmentResult[],
  settings: Record<string, unknown> = {}
): VedaWorkspaceBackup {
  const exportedAt = new Date().toISOString();
  const rawString = JSON.stringify({ assessments, settings, exportedAt });

  // Simple numeric checksum
  let hash = 0;
  for (let i = 0; i < rawString.length; i++) {
    hash = (hash << 5) - hash + rawString.charCodeAt(i);
    hash |= 0;
  }

  return {
    version: '1.0.0',
    exportedAt,
    assessments,
    settings,
    checksum: Math.abs(hash).toString(16),
  };
}

/**
 * Validates and restores a workspace backup bundle
 */
export function restoreWorkspaceBackup(rawJson: string): VedaWorkspaceBackup {
  const parsed = JSON.parse(rawJson) as VedaWorkspaceBackup;

  if (!parsed.version || !Array.isArray(parsed.assessments)) {
    throw new Error('Invalid Veda AI workspace backup file structure');
  }

  return parsed;
}
