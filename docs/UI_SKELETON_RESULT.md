# UI Skeleton Result — nexppf-web

Last Updated: 2026-05-05T13:50:00+00:00
Status: Local implementation; not pushed/deployed yet

## Summary

Added static UI skeleton foundation for nexppf-web using the existing content and image-slot configuration.

This is not connected to real PostgreSQL/auth yet.

## Pages Added / Updated

- `/` Home
- `/products` Products page
- `/warranty` Warranty search skeleton
- `/r/[serial]` Digital Warranty Card mock
- `/login` Dealer/Admin login skeleton

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
- `src/app/login/page.tsx`
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

## Guardrails

- No supplier/material/performance claims added.
- PRO is public as required.
- Operational photos are not used as marketing assets.
- Image references use centralized slots/config.
- Current UI is static and does not touch production/customer data.

## Verification

Run before completion:

- `npm test`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm audit --audit-level=moderate`

## Limitations

- No real DB integration yet.
- No real auth/session yet.
- Warranty page does not submit/search real serial yet.
- Digital Warranty Card uses mock state selection only.
- No production deploy performed.
