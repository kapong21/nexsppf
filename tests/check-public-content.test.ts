import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const repoRoot = join(__dirname, '..');

describe('public content scanner script', () => {
  it('is exposed as npm run check:content', () => {
    const packageJson = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>;
    };

    expect(packageJson.scripts['check:content']).toBe('tsx scripts/check-public-content.ts');
  });

  it('contains public claim and pricing guardrail checks', () => {
    const script = readFileSync(join(repoRoot, 'scripts/check-public-content.ts'), 'utf8');

    expect(script).toContain('findForbiddenPublicClaimTerms');
    expect(script).toContain('PUBLIC_PRICE_PATTERNS');
    expect(script).toContain('collectPublicContentText');
  });
});
