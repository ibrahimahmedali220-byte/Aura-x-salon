/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Enterprise Security & Defense Layer for AURA & D'OR
 * Protects against XSS, Injection Attacks, Data Tampering, and Abuse.
 */

/**
 * Escapes HTML characters to neutralize XSS payloads
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Strips dangerous script tags, event handlers, protocols (javascript:, data:), and executable tokens
 */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== 'string') return '';

  let sanitized = input
    // Trim whitespace and limit maximum length to prevent buffer bloat
    .trim()
    .slice(0, maxLength)
    // Remove script tags and style tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove inline event handlers like onclick=, onerror=, onload=
    .replace(/on\w+\s*=\s*(?:["'][^"']*["']|[^\s>]+)/gi, '')
    // Neutralize dangerous pseudo-protocols
    .replace(/(javascript|vbscript|data):/gi, '')
    // Strip raw HTML tags
    .replace(/<[^>]*>/g, '');

  return sanitized;
}

/**
 * Strict Email validation and sanitization
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') return '';
  const trimmed = email.trim().toLowerCase().slice(0, 120);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(trimmed) ? trimmed : '';
}

/**
 * Phone number sanitizer (only allows digits, spaces, hyphens, plus and parentheses)
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return '';
  return phone.replace(/[^\d\s\-+()]/g, '').slice(0, 25);
}

/**
 * Verifies that a client-side payload does not contain SQL/NoSQL injection signatures
 */
export function isSafePayload(text: string): boolean {
  if (!text || typeof text !== 'string') return true;
  // Common injection attack tokens
  const injectionPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
    /\w*((\%27)|(\'))(\s)*((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
    /exec(\s|\+)+(s|x)p\w+/i,
    /UNION(\s+)SELECT/i,
    /SELECT.*FROM/i,
    /INSERT.*INTO/i,
    /DROP(\s+)TABLE/i,
    /<script/i,
    /javascript:/i,
  ];

  return !injectionPatterns.some((pattern) => pattern.test(text));
}

/**
 * In-Memory Sliding-Window Client Rate Limiter to prevent brute-force or spam submissions
 */
class ClientRateLimiter {
  private attempts: Map<string, number[]> = new Map();

  /**
   * Checks if an action is allowed based on maximum allowed requests per timeframe
   * @param actionKey Unique identifier for the action (e.g. 'booking_submit', 'otp_verify')
   * @param maxAttempts Maximum allowed attempts within timeframe
   * @param windowMs Timeframe window in milliseconds (default: 60,000ms = 1 minute)
   */
  public isAllowed(actionKey: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const timestamps = this.attempts.get(actionKey) || [];

    // Filter out expired timestamps
    const validTimestamps = timestamps.filter((time) => now - time < windowMs);

    if (validTimestamps.length >= maxAttempts) {
      return false; // Rate limit exceeded
    }

    validTimestamps.push(now);
    this.attempts.set(actionKey, validTimestamps);
    return true;
  }

  /**
   * Resets rate limit for a specific action key
   */
  public reset(actionKey: string): void {
    this.attempts.delete(actionKey);
  }
}

export const rateLimiter = new ClientRateLimiter();
