import { describe, expect, it } from 'vitest';
import { redactPII } from '@/lib/safe-log';

describe('safe-log — redactPII', () => {
  it('masks email addresses', () => {
    expect(redactPII('contact me at somchai@example.com please'))
      .toBe('contact me at <email> please');
  });

  it('masks phone-like digit runs', () => {
    expect(redactPII('call 081-234-5678 thanks')).toBe('call <phone> thanks');
  });

  it('masks both when wrapped in an Error', () => {
    const err = new Error('failed for somchai@example.com / 081-234-5678');
    expect(redactPII(err)).toBe('Error: failed for <email> / <phone>');
  });

  it('preserves non-PII text untouched', () => {
    expect(redactPII('database timeout after 30 seconds')).toContain('database timeout');
  });
});
