import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import {
  DIGITAL_WARRANTY_CARD_MOCKS,
  PUBLIC_NAV_ITEMS,
  UI_ROUTES,
} from '../src/content/ui-skeleton';
import {
  PUBLIC_PRODUCT_GROUPS,
  SITE_COPY,
  collectPublicContentText,
  findForbiddenPublicClaimTerms,
} from '../src/content/site-content';

const repoRoot = process.cwd();
const appRoot = join(repoRoot, 'src/app');

export const PUBLIC_PRICE_PATTERNS: readonly RegExp[] = [
  /฿\s*\d/i,
  /\bTHB\s*\d/i,
  /\d[\d,]*(?:\.\d+)?\s*บาท/i,
];

function flattenText(value: unknown): string[] {
  if (typeof value === 'string' || typeof value === 'number') {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => flattenText(item));
  }

  if (value && typeof value === 'object') {
    return Object.values(value).flatMap((item) => flattenText(item));
  }

  return [];
}

function listTextFiles(path: string): string[] {
  const entry = statSync(path);
  if (entry.isFile()) {
    return /\.(tsx?|mdx?)$/.test(path) ? [path] : [];
  }

  return readdirSync(path)
    .flatMap((name) => listTextFiles(join(path, name)))
    .sort();
}

function findPricePatternMatches(content: string): string[] {
  return PUBLIC_PRICE_PATTERNS.filter((pattern) => pattern.test(content)).map((pattern) => pattern.source);
}

const configuredPublicContent = [
  collectPublicContentText({ siteCopy: SITE_COPY, products: PUBLIC_PRODUCT_GROUPS }),
  ...flattenText(UI_ROUTES),
  ...flattenText(PUBLIC_NAV_ITEMS),
  ...flattenText(DIGITAL_WARRANTY_CARD_MOCKS),
].join('\n');

const failures: string[] = [];
const configuredForbiddenTerms = findForbiddenPublicClaimTerms(configuredPublicContent);
if (configuredForbiddenTerms.length > 0) {
  failures.push(`Configured public content contains forbidden terms: ${configuredForbiddenTerms.join(', ')}`);
}

const configuredPricePatterns = findPricePatternMatches(configuredPublicContent);
if (configuredPricePatterns.length > 0) {
  failures.push(`Configured public content matches public price patterns: ${configuredPricePatterns.join(', ')}`);
}

for (const file of listTextFiles(appRoot)) {
  const content = readFileSync(file, 'utf8');
  const forbiddenTerms = findForbiddenPublicClaimTerms(content);
  const pricePatterns = findPricePatternMatches(content);

  if (forbiddenTerms.length > 0) {
    failures.push(`${relative(repoRoot, file)} contains forbidden terms: ${forbiddenTerms.join(', ')}`);
  }

  if (pricePatterns.length > 0) {
    failures.push(`${relative(repoRoot, file)} matches public price patterns: ${pricePatterns.join(', ')}`);
  }
}

if (failures.length > 0) {
  console.error('Public content guardrail failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log('Public content guardrail passed: no forbidden claims or public price patterns found.');
}
