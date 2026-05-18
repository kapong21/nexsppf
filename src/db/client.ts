// Drizzle + pg client — singleton, lazy-initialized.
//
// Per src/lib/auth.ts and src/lib/warranty-registration.ts, business logic
// takes Repository implementations as parameters. This file is the canonical
// place where the real Drizzle-backed repositories are wired up for use in
// Server Actions, route handlers, and CLI scripts.
//
// Tests should NOT import this — they mock repositories directly.

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

let _pool: Pool | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function ensureDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Cannot connect to PostgreSQL. ' +
      'Provide DATABASE_URL via .env.local or runtime environment.',
    );
  }
  return url;
}

export function getPool(): Pool {
  if (!_pool) {
    // Fluid Compute / long-lived Node processes reuse this pool across
    // requests. Caps prevent a traffic spike from exhausting Postgres
    // connections; idle timeout reclaims sockets the pool no longer needs.
    _pool = new Pool({
      connectionString: ensureDatabaseUrl(),
      max: Number(process.env.DATABASE_POOL_MAX ?? 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return _pool;
}

export function getDb() {
  if (!_db) {
    _db = drizzle(getPool(), { schema });
  }
  return _db;
}

// For graceful shutdown in scripts / tests.
export async function closeDb(): Promise<void> {
  if (_pool) {
    await _pool.end();
    _pool = null;
    _db = null;
  }
}
