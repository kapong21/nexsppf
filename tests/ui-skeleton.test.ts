import { describe, expect, it } from 'vitest';
import { PUBLIC_PRODUCT_GROUPS, SITE_COPY } from '../src/content/site-content';
import {
  DIGITAL_WARRANTY_CARD_MOCKS,
  PUBLIC_NAV_ITEMS,
  UI_ROUTES,
  getUiRoute,
} from '../src/content/ui-skeleton';

describe('ui skeleton content contract', () => {
  it('defines required public, support, dealer, and admin routes', () => {
    expect(UI_ROUTES.map((route) => route.path)).toEqual([
      '/',
      '/products',
      '/warranty',
      '/r/[serial]',
      '/support/warranty',
      '/support/inspection',
      '/login',
      '/dealer',
      '/admin',
    ]);
  });

  it('defines main navigation without admin-only routes', () => {
    expect(PUBLIC_NAV_ITEMS).toEqual([
      { label: 'หน้าแรก', href: '/' },
      { label: 'สินค้า', href: '/products' },
      { label: 'บัตรรับประกัน', href: '/warranty' },
      { label: 'เข้าสู่ระบบตัวแทนจำหน่าย', href: '/login' },
    ]);
  });

  it('keeps product page source from public product config', () => {
    expect(PUBLIC_PRODUCT_GROUPS.map((product) => product.name)).toEqual([
      'BEGIN',
      'PRIME',
      'PRO',
      'ULTIMATE',
    ]);
  });

  it('uses safe site copy for the home hero', () => {
    expect(SITE_COPY.homeHero.title).toContain('บัตรรับประกันดิจิทัล');
    expect(SITE_COPY.homeHero.eyebrow).toBe('NEXS Paint Protection Film');
  });

  it('defines digital warranty card mock states without exposing sensitive data', () => {
    expect(DIGITAL_WARRANTY_CARD_MOCKS.map((mock) => mock.status)).toEqual([
      'active',
      'not_registered',
      'invalid',
    ]);

    for (const mock of DIGITAL_WARRANTY_CARD_MOCKS) {
      expect('customerEmail' in mock).toBe(false);
      expect('chassisNumber' in mock).toBe(false);
      if (mock.customerPhoneMasked) {
        expect(mock.customerPhoneMasked).toContain('xxx');
      }
    }
  });

  it('looks up route metadata and rejects unknown routes', () => {
    expect(getUiRoute('/products').title).toBe('Products');
    expect(() => getUiRoute('/unknown')).toThrow('Unknown UI route: /unknown');
  });
});
