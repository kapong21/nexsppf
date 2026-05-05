import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = join(__dirname, '..');

describe('Apple-inspired light premium theme contract', () => {
  it('uses approved light theme variables instead of dark full-page theme', () => {
    const css = readFileSync(join(repoRoot, 'src/app/globals.css'), 'utf8');

    expect(css).toContain('--bg: #ffffff;');
    expect(css).toContain('--bg-soft: #f5f5f7;');
    expect(css).toContain('--text: #1d1d1f;');
    expect(css).toContain('--muted: #6e6e73;');
    expect(css).toContain('--line: #d2d2d7;');
    expect(css).not.toContain('--bg: #05070a;');
  });

  it('keeps product accent colors as the main color-coded areas', () => {
    const css = readFileSync(join(repoRoot, 'src/app/globals.css'), 'utf8');

    expect(css).toContain('linear-gradient(140deg, var(--accent-1), var(--accent-2))');
    expect(css).toContain('box-shadow: var(--shadow);');
  });
});
