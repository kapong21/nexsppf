# Curated Visual System Result — nexppf-web

Last Updated: 2026-05-05T17:35:00+00:00
Status: Local implementation only; not pushed to GitHub; not deployed to production.

## Intent

This pass converts the latest NEXS reference posters/images into a curated web-native visual system instead of placing poster assets directly on the website.

Primary direction:
- Use reference materials as art direction and storytelling inspiration only.
- Recreate concepts as clean, mobile-first web sections.
- Avoid cluttered poster layouts, embedded text, direct claim copy, risky domains, price tables, and unapproved technical/performance claims.
- Keep the public homepage premium, readable, sales-supporting, and trust-building.

## What Was Added

### Homepage: Why PPF

A new `Why PPF` education section was added after the hero section.

It adapts the useful concept from the reference poster into four short cards:
1. `รอยเล็ก ๆ เกิดขึ้นได้ทุกวัน`
2. `ความสวยของรถค่อย ๆ ลดลง`
3. `PPF เป็นชั้นปกป้องผิวสีรถ`
4. `ปกป้องตั้งแต่แรกเพื่อความมั่นใจ`

The section uses a CSS-created `paint-layer-stack` visual instead of a poster/image dump.

### Homepage: Why NEXS Brand Story

The previous generic Why NEXS grid was replaced with a curated brand story section.

It adapts safe brand-story concepts into four cards:
1. `เข้าใจผิวรถจากการใช้งานจริง`
2. `ออกแบบให้เลือกรุ่นง่าย`
3. `ปกป้องโดยไม่ลดทอนความสวย`
4. `มีระบบดูแลหลังติดตั้ง`

The section uses a CSS-created `visual-orbit` system visual to show NEXS connecting product, dealer workflow, QR/Serial, and warranty trust.

### Public Copy Cleanup

The homepage contact eyebrow was changed from internal English wording:
- Removed: `Lead Generation`
- Added: `ปรึกษา NEXS`

## What Was Intentionally Not Used

The following reference ideas were rejected for public v1 because they are risky, cluttered, or not approved:

- Direct poster screenshots/images as page sections
- Long poster-style paragraphs
- Embedded poster text
- Price lineup / dealer price / promotion copy
- `Self-Healing`
- `UV & Stain Resistant`
- `Crystal Clear Finish`
- `Hydrophobicity`
- `Yellowing Resistance`
- `Gloss >90` / `Gloss >94`
- `10-Year Warranty`
- `nexsfilm.com`
- Supplier/material/origin claims such as Germany TPU / USA TPU / China TPU
- Lab/global testing/foreign climate claims unless NEXS admin approves later

## Files Changed

- `src/app/page.tsx`
  - Added `WhyPpfSection()`
  - Added `BrandStorySection()`
  - Inserted `WhyPpfSection` after hero
  - Replaced old Why NEXS grid with curated brand-story section
  - Changed homepage lead eyebrow to `ปรึกษา NEXS`

- `src/content/site-content.ts`
  - Added `SITE_COPY.visualSystem.whyPpf`
  - Added `SITE_COPY.visualSystem.brandStory`
  - Expanded forbidden public claim terms for reference-derived risks

- `src/app/globals.css`
  - Added curated section layout
  - Added curated cards
  - Added CSS-only paint-layer visual
  - Added CSS-only NEXS orbit/system visual
  - Added responsive behavior for curated sections

- `tests/curated-visual-system.test.ts`
  - Added tests for Why PPF, Why NEXS, clutter guardrails, CSS-only visuals, and blocked reference-derived terms.

## Guardrails Preserved

- No public price shown.
- No public dealer price/cost/margin/discount/promotion shown.
- No unapproved supplier/material/performance claim added.
- No reference poster used directly.
- No public customer-sensitive data added.
- Product tiers remain BEGIN / PRIME / PRO / ULTIMATE.
- Warranty years remain 5 / 6 / 8 / 9.
- Work remains local only until explicit push/deploy approval.

## Verification Plan

Before reporting complete, run:

- `npm test -- tests/curated-visual-system.test.ts`
- `git diff --check`
- `npm test`
- `npm run check:content`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- Local HTTP 200 checks for public routes
- Browser visual QA screenshot

## Production Status

Not production-ready until NEXS/Tor S approval covers:
- final public copy
- image rights
- legal/privacy/warranty policy content
- GitHub push approval
- production deploy approval
