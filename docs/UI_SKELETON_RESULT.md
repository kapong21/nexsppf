# UI Skeleton Result — nexppf-web

Last Updated: 2026-05-05T14:33:34+00:00
Status: Local implementation; not pushed/deployed yet

## Summary

Added static UI skeleton foundation for nexppf-web using the existing content and image-slot configuration.

This is not connected to real PostgreSQL/auth yet.

## Pages Added / Updated

- `/` Home
- `/products` Products page
- `/warranty` Warranty search skeleton
- `/r/[serial]` Digital Warranty Card mock
- `/support/warranty` lost warranty / lost QR support skeleton
- `/support/inspection` inspection request skeleton
- `/login` Dealer/Admin login skeleton
- `/dealer` dealer dashboard skeleton
- `/admin` admin dashboard skeleton

## Content Sources Used

- `src/content/site-content.ts`
- `src/content/image-assets.ts`
- `src/content/ui-skeleton.ts`

## Files Changed

- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/app/products/page.tsx`
- `src/app/warranty/page.tsx`
- `src/app/r/[serial]/page.tsx`
- `src/app/support/warranty/page.tsx`
- `src/app/support/inspection/page.tsx`
- `src/app/login/page.tsx`
- `src/app/dealer/page.tsx`
- `src/app/admin/page.tsx`
- `src/content/ui-skeleton.ts`
- `tests/ui-skeleton.test.ts`

## UI Description

### Home

Premium dark automotive landing page with:
- NEXS logo/header navigation
- hero image from approved image slots
- safe hero copy
- products overview section
- digital warranty card mock section
- dealer workflow section
- QR/serial proof section

### Products

Shows 4 public product groups:
- BEGIN
- PRIME
- PRO
- ULTIMATE

Each card uses approved warranty years, model code, color direction, and safe product copy.

### Warranty

Static warranty search skeleton with serial input and sample link to Digital Warranty Card mock.

### Digital Warranty Card

Mobile-first mock with 3 possible states driven by content config:
- active
- not_registered
- invalid

Mock card avoids customer email/chassis and uses masked phone/license only.

### Login

Dealer/Admin login skeleton for future server-side auth/session integration.

### Support Warranty

Static lost warranty / lost QR support skeleton with safe intake fields and no sensitive record exposure.

### Support Inspection

Static inspection request skeleton for initial customer intake before real claim/inspection workflow integration.

### Dealer Dashboard

Static dealer dashboard skeleton showing intended dealer-only modules: warranty registration, own records, and after-sales follow-up. Real backend must bind dealer records to verified session/dealerId.

### Admin Dashboard

Static admin dashboard skeleton showing intended admin-only modules: serial import, dealer oversight, support triage, and future approved policy configuration.

## Guardrails

- No supplier/material/performance claims added.
- PRO is public as required.
- Operational photos are not used as marketing assets.
- Image references use centralized slots/config.
- Current UI is static and does not touch production/customer data.

## Verification

Run before completion:

- `npm test`
- `npm run check:content`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`
- Local HTTP 200 check for `/`, `/products`, `/warranty`, `/support/warranty`, `/support/inspection`, `/dealer`, `/admin`, and `/r/PRO-1196MXY0401178Q`

## Limitations

- No real DB integration yet.
- No real auth/session yet.
- Warranty page does not submit/search real serial yet.
- Digital Warranty Card uses mock state selection only.
- No production deploy performed.
