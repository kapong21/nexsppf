import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = process.cwd();
const routeFiles = [
  'src/app/page.tsx',
  'src/app/clear-ppf/page.tsx',
  'src/app/matte-ppf/page.tsx',
  'src/app/color-ppf/page.tsx',
  'src/app/compare/page.tsx',
  'src/app/technology/page.tsx',
  'src/app/about-nexs/page.tsx',
  'src/app/for-dealers/page.tsx',
  'src/app/faq/page.tsx',
  'src/app/contact/page.tsx',
];

const forbiddenPublicPatterns = [/฿/i, /dealer\s*price/i, /supplier\s*cost/i, /starting\s*price/i, /Shine\s*(and|&)\s*Shield/i];

describe('final marketing route foundation', () => {
  it('has the locked public marketing routes from the source-of-truth set', () => {
    for (const routeFile of routeFiles) {
      expect(existsSync(join(repoRoot, routeFile)), `${routeFile} should exist`).toBe(true);
    }
  });

  it('does not rewrite locked public routes to preview-only pages', () => {
    const configPath = join(repoRoot, 'next.config.ts');
    const content = existsSync(configPath) ? readFileSync(configPath, 'utf8') : '';

    for (const source of ['/', '/products', '/warranty', '/dealer', '/contact']) {
      const escapedSource = source.replace('/', '\\/');
      const previewRewritePattern = new RegExp(
        `source:\\s*["']${escapedSource}["'][\\s\\S]*?destination:\\s*["']\\/preview-redesign`,
      );
      expect(content, `${source} must render its own route, not /preview-redesign`).not.toMatch(previewRewritePattern);
    }
  });

  it('keeps public route source free of pricing and rejected brand language', () => {
    for (const routeFile of routeFiles.filter((file) => existsSync(join(repoRoot, file)))) {
      const content = readFileSync(join(repoRoot, routeFile), 'utf8');
      for (const pattern of forbiddenPublicPatterns) {
        expect(content, `${routeFile} should not match ${pattern}`).not.toMatch(pattern);
      }
    }
  });

  it('styles footer navigation with spacing so links do not run together', () => {
    const css = readFileSync(join(repoRoot, 'src/app/globals.css'), 'utf8');

    expect(css).toMatch(/\.site-footer-nav\s*\{[\s\S]*?display:\s*flex/);
    expect(css).toMatch(/\.site-footer-nav\s*\{[\s\S]*?gap:\s*[^;]+;/);
    expect(css).toMatch(/\.site-footer-nav\s*\{[\s\S]*?flex-wrap:\s*wrap/);
  });
});
