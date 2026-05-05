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
      '/contact',
      '/login',
      '/dealer',
      '/admin',
    ]);
  });

  it('defines sales-first main navigation without admin-only routes', () => {
    expect(PUBLIC_NAV_ITEMS).toEqual([
      { label: 'หน้าแรก', href: '/' },
      { label: 'สินค้า', href: '/products' },
      { label: 'บัตรรับประกัน', href: '/warranty' },
      { label: 'สำหรับตัวแทนจำหน่าย', href: '/dealer' },
      { label: 'ติดต่อเรา', href: '/contact' },
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

  it('uses sales-first safe site copy for the home hero', () => {
    expect(SITE_COPY.homeHero.title).toBe('NEXS Paint Protection Film');
    expect(SITE_COPY.homeHero.subtitle).toContain('บัตรรับประกันดิจิทัล');
    expect(SITE_COPY.homeHero.subtitle).toContain('ตรวจสอบได้ผ่าน QR Code');
    expect(SITE_COPY.homeHero.eyebrow).toBe('NEXS Paint Protection Film');
    expect(SITE_COPY.homeHero.primaryCta).toBe('ดูสินค้า');
    expect(SITE_COPY.homeHero.secondaryCta).toBe('สอบถามราคา');
    expect(SITE_COPY.homeHero.tertiaryCta).toBe('ตรวจสอบบัตรรับประกัน');
  });

  it('defines lead generation copy for the public contact flow', () => {
    expect(SITE_COPY.leadForm.title).toBe('ติดต่อ NEXS');
    expect(SITE_COPY.leadForm.customerTypes).toEqual([
      'ลูกค้าสนใจติดตั้ง',
      'ร้านค้าสนใจสมัครตัวแทนจำหน่าย',
      'สอบถามเรื่องบัตรรับประกัน',
      'อื่น ๆ',
    ]);
    expect(SITE_COPY.leadForm.fields).toEqual([
      'name',
      'phone',
      'lineId',
      'province',
      'carModel',
      'interestedProduct',
      'customerType',
      'message',
      'pdpaConsent',
    ]);
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
