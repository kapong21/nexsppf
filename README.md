# NEXS PPF Warranty System

POC-first project for nexsppf.com.

## Local setup

1. Copy `.env.example` to `.env.local` and set real values locally only.
2. Install dependencies: `npm install`.
3. Run tests: `npm test`.
4. Run typecheck: `npm run typecheck`.
5. Run build: `npm run build`.

## Current phase
POC tasks 1-4: bootstrap, PostgreSQL schema, serial parser, QR resolver.

## Security
Do not commit real secrets or customer data. Business rules such as product tiers and warranty years must be stored as config/seed data, not hardcoded in request handlers.
