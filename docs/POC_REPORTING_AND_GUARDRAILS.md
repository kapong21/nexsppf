# POC Reporting and Guardrails

Last Updated: 2026-05-05T10:39:04.024409+00:00
Project: nexsppf-web
Owner: Tor S / NEXS admin
Executor: treee-tech-lead

## Required report after every POC
After each POC, report these 5 items:

1. What was done
2. Files changed
3. How it was tested
4. Results of:
   - `npm test`
   - `npm run typecheck`
   - `npm run build`
   - security audit when relevant: `npm audit --audit-level=moderate`
5. Screenshot or UI description if UI exists

## Non-negotiable guardrails

1. Do not use unapproved public claims.
2. Do not show full customer personal data on public warranty pages.
3. Public warranty page must mask sensitive data, especially phone/license/customer identifiers.
4. Do not hardcode only 3 products.
5. System must support BEGIN / PRIME / PRO / ULTIMATE from the start.
6. Optional PRO variants must be supported as internal variants/grouped under PRO where needed:
   - R75 / PRO 7.5
   - R85 / PRO 8.5
7. Do not assume `model_code` is one character.
8. Parse `model_code` from everything before the first hyphen `-`.
9. Store `serial_code` as primary identity, not the full QR URL.
10. No production deploy without explicit approval from Tor S / NEXS admin.

## Current reporting baseline
Current POC status as of this update:
- POC-001 through POC-007 completed locally.
- POC-008 pending.
- Latest local commit: `fd8ac8d01d8c365c3a43423a73dff8eccec56a41`.
- Latest verification: `npm test` 6 files / 28 tests passed, `npm run typecheck` passed, `npm run build` passed, `npm audit --audit-level=moderate` found 0 vulnerabilities.
- No GitHub push and no production deploy yet.

