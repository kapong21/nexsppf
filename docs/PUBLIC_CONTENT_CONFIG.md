# Public Content Configuration — nexppf-web

Last Updated: 2026-05-05T12:39:00+00:00
Status: Local implementation foundation; not pushed/deployed

## Purpose

This document describes the safe public content configuration added for nexppf-web.

The goal is to keep public copy, product cards, image slot keys, and claim guardrails centralized before UI implementation.

## Files

- `src/content/site-content.ts`
- `tests/site-content.test.ts`

## Public Product Groups

The public products are configured as exactly 4 groups:

| Product | Model Code | Warranty | Image Slot |
|---|---|---:|---|
| BEGIN | B | 5 years | `begin_product_visual` |
| PRIME | P | 6 years | `prime_product_visual` |
| PRO | PRO | 8 years | `pro_product_visual` |
| ULTIMATE | U | 9 years | `ultimate_product_visual` |

PRO is included as a public product group.

## Safe Public Copy Areas

The configuration includes safe copy for:

- Home hero
- Warranty / QR verification section
- Dealer workflow section
- Product proof / serial record section
- Maintenance / after-sales section

## Approved Public Wording

Tracked approved wording categories:

- NEXS Paint Protection Film
- QR-based warranty verification
- Digital warranty card
- Professional dealer installation workflow
- Warranty-backed after-sales support
- Product tier names
- Approved warranty years

## Forbidden Claim Guardrail

The code tracks forbidden public claim terms and provides `findForbiddenPublicClaimTerms(content)`.

Examples of blocked terms:

- Bayer
- Wanhua
- Covestro
- Lubrizol
- Ashland
- self-healing
- anti-yellowing
- non-yellowing
- chemical resistance
- 1000+ colors
- optical clarity
- highest quality raw materials
- made in USA
- TPU source
- PCU
- factory cost
- dealer price
- retail installed price
- dealer roll price
- margin
- discount
- promotion
- supplier cost
- minimum advertised installed price

## Pricing Approval Gate

Current public content config intentionally contains no product prices.

For v1:
- Products page shows product tier, warranty year, positioning, and CTA only.
- Public UI must not show price, discount, promotion, dealer tier price, dealer roll price, factory cost, margin, supplier cost, or cost assumptions.
- Use CTA such as `สอบถามราคา`, `ติดต่อ Dealer`, `ตรวจสอบบัตรรับประกัน`, or `สมัครตัวแทนจำหน่าย` instead of price.
- If pricing is added later, it must come from approved config/admin policy with visibility control.

## Tests

`tests/site-content.test.ts` verifies:

1. All 4 public product groups are shown in order.
2. Warranty years are approved values.
3. Product codes and image slots match the requirement.
4. Approved wording categories are tracked.
5. Current public site copy/product content contains no forbidden claim terms.
6. Forbidden terms are explicitly tracked.
7. The guardrail detects forbidden claim terms in arbitrary content.

## Verification Snapshot

Latest verification after adding this config:

- `npm test`: 9 files passed, 47 tests passed
- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run build`: passed
- `npm audit --audit-level=moderate`: found 0 vulnerabilities

## Implementation Notes

- This is still a code-level config suitable for POC/UI foundation.
- Before production, product and claim policy should move toward DB/config-table driven management according to the no-hardcode rule.
- UI components should consume this content layer instead of embedding copy and image slot keys directly in page components.
