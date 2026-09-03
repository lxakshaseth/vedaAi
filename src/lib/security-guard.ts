export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const MAX_PDF_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

/**
 * Validates uploaded PDF file size and MIME type
 */
export function validateAssessmentFile(file: File): ValidationResult {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    return { isValid: false, error: 'Only PDF documents are supported for evaluation' };
  }

  if (file.size > MAX_PDF_SIZE_BYTES) {
    return { isValid: false, error: 'File size exceeds maximum allowed limit of 25MB' };
  }

  return { isValid: true };
}

/**
 * Validates LLM API key pattern
 */
export function validateApiKeyFormat(apiKey: string, provider: 'groq' | 'gemini'): ValidationResult {
  if (!apiKey || apiKey.trim().length === 0) {
    return { isValid: false, error: 'API key cannot be empty' };
  }

  const trimmed = apiKey.trim();

  if (provider === 'groq') {
    if (!trimmed.startsWith('gsk_')) {
      return { isValid: false, error: 'Groq API keys typically start with "gsk_"' };
    }
  } else if (provider === 'gemini') {
    if (trimmed.length < 20) {
      return { isValid: false, error: 'Invalid Google Gemini API key length' };
    }
  }

  return { isValid: true };
}

/**
 * Simple in-memory rate limiter to prevent duplicate spam clicks
 */
class ClientRateLimiter {
  private lastInvocationTime: Map<string, number> = new Map();

  public canExecute(actionKey: string, cooldownMs: number = 2000): boolean {
    const now = Date.now();
    const last = this.lastInvocationTime.get(actionKey) || 0;
    if (now - last < cooldownMs) {
      return false;
    }
    this.lastInvocationTime.set(actionKey, now);
    return true;
  }
}

export const rateLimiter = new ClientRateLimiter();
