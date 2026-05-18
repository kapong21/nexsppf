import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  submitDealerApplicationActionWithDeps,
} from '@/app/actions/submit-dealer-application';
import { submitLeadActionWithDeps } from '@/app/actions/submit-lead';
import type {
  DealerApplicationRepository,
  LeadRepository,
} from '@/lib/lead-capture';
import { createRateLimiter } from '@/lib/rate-limit';

function makeFormData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  return fd;
}

function makeLeadRepo(): LeadRepository & {
  createLead: ReturnType<typeof vi.fn>;
} {
  const createLead = vi.fn(async (input) => ({
    id: 'lead-stored',
    formType: input.formType,
    status: 'new' as const,
    createdAt: new Date('2026-05-18T00:00:00Z'),
  }));
  return { createLead };
}

function makeDealerRepo(): DealerApplicationRepository & {
  createDealerApplication: ReturnType<typeof vi.fn>;
} {
  const createDealerApplication = vi.fn(async () => ({
    id: 'dealer-stored',
    status: 'new' as const,
    createdAt: new Date('2026-05-18T00:00:00Z'),
  }));
  return { createDealerApplication };
}

describe('submitLeadActionWithDeps', () => {
  let clock = 0;
  const limiter = createRateLimiter({ minIntervalMs: 5_000, maxPerHour: 10 }, () => clock);

  beforeEach(() => {
    clock = 0;
    limiter.reset();
  });

  it('persists a valid lead and forwards IP + UA from the request context', async () => {
    const repo = makeLeadRepo();
    const result = await submitLeadActionWithDeps(
      makeFormData({
        formType: 'contact',
        name: 'Somchai',
        phone: '081-234-5678',
        province: 'Bangkok',
        consent: 'true',
      }),
      {
        repository: repo,
        rateLimiter: limiter,
        context: { ipAddress: '203.0.113.5', userAgent: 'Mozilla/5.0' },
      },
    );

    expect(result).toEqual({ ok: true, id: 'lead-stored' });
    expect(repo.createLead).toHaveBeenCalledOnce();
    const passed = repo.createLead.mock.calls[0][0];
    expect(passed.ipAddress).toBe('203.0.113.5');
    expect(passed.userAgent).toBe('Mozilla/5.0');
    expect(passed.formType).toBe('contact');
  });

  it('silently absorbs a honeypot-tripped submission without touching the repo', async () => {
    const repo = makeLeadRepo();
    const result = await submitLeadActionWithDeps(
      makeFormData({
        formType: 'contact',
        name: 'BotName',
        phone: '081-234-5678',
        province: 'Bangkok',
        consent: 'true',
        website: 'https://spammer.example.com', // honeypot
      }),
      {
        repository: repo,
        rateLimiter: limiter,
        context: { ipAddress: '203.0.113.5' },
      },
    );

    expect(result.ok).toBe(true);
    expect(repo.createLead).not.toHaveBeenCalled();
  });

  it('returns too_soon on a rapid second submit from the same IP', async () => {
    const repo = makeLeadRepo();
    const fd = () =>
      makeFormData({
        formType: 'contact',
        phone: '081-234-5678',
        province: 'Bangkok',
        consent: 'true',
      });

    clock = 1_000;
    const first = await submitLeadActionWithDeps(fd(), {
      repository: repo,
      rateLimiter: limiter,
      context: { ipAddress: '203.0.113.5' },
    });
    expect(first.ok).toBe(true);

    clock = 2_000; // 1s later
    const second = await submitLeadActionWithDeps(fd(), {
      repository: repo,
      rateLimiter: limiter,
      context: { ipAddress: '203.0.113.5' },
    });
    expect(second).toEqual({ ok: false, errors: { _global: 'too_soon' } });
    expect(repo.createLead).toHaveBeenCalledOnce();
  });

  it('rate-limits per IP + form-type — quote does not share quota with contact', async () => {
    const repo = makeLeadRepo();
    const ctx = { ipAddress: '203.0.113.5' };
    clock = 1_000;
    await submitLeadActionWithDeps(
      makeFormData({ formType: 'contact', phone: '081-234-5678', province: 'BKK', consent: 'true' }),
      { repository: repo, rateLimiter: limiter, context: ctx },
    );
    clock = 2_000;
    const result = await submitLeadActionWithDeps(
      makeFormData({ formType: 'quote', phone: '081-234-5678', province: 'BKK', consent: 'true' }),
      { repository: repo, rateLimiter: limiter, context: ctx },
    );
    expect(result.ok).toBe(true);
  });

  it('returns the domain validation error verbatim when consent is missing', async () => {
    const repo = makeLeadRepo();
    const result = await submitLeadActionWithDeps(
      makeFormData({ formType: 'contact', phone: '081-234-5678', province: 'BKK' }),
      {
        repository: repo,
        rateLimiter: limiter,
        context: { ipAddress: '203.0.113.99' },
      },
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.consent).toBe('pdpa_consent_required');
    expect(repo.createLead).not.toHaveBeenCalled();
  });
});

describe('submitDealerApplicationActionWithDeps', () => {
  let clock = 0;
  const limiter = createRateLimiter({ minIntervalMs: 5_000, maxPerHour: 10 }, () => clock);

  beforeEach(() => {
    clock = 0;
    limiter.reset();
  });

  it('persists a valid dealer application with IP + UA', async () => {
    const repo = makeDealerRepo();
    const result = await submitDealerApplicationActionWithDeps(
      makeFormData({
        businessName: 'NEXS Authorized Test',
        phone: '081-234-5678',
        province: 'Bangkok',
        consent: 'on',
      }),
      {
        repository: repo,
        rateLimiter: limiter,
        context: { ipAddress: '203.0.113.5', userAgent: 'Mozilla/5.0' },
      },
    );

    expect(result).toEqual({ ok: true, id: 'dealer-stored' });
    expect(repo.createDealerApplication).toHaveBeenCalledOnce();
    const passed = repo.createDealerApplication.mock.calls[0][0];
    expect(passed.ipAddress).toBe('203.0.113.5');
  });

  it('discards a honeypot submission silently', async () => {
    const repo = makeDealerRepo();
    const result = await submitDealerApplicationActionWithDeps(
      makeFormData({
        businessName: 'X',
        phone: '081-234-5678',
        province: 'Bangkok',
        consent: 'on',
        website: 'spam',
      }),
      { repository: repo, rateLimiter: limiter, context: {} },
    );
    expect(result.ok).toBe(true);
    expect(repo.createDealerApplication).not.toHaveBeenCalled();
  });
});
