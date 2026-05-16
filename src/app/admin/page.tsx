'use client';

import { useState } from 'react';
import { Pill } from '../preview-redesign/variant-b-preview';

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

type AdminTab = 'import' | 'dealers' | 'policy';

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<AdminTab>('import');

  return (
    <main className="variant-b-shell variant-b-admin-shell">
      <div className="variant-b-admin-frame">
        <div className="variant-b-admin-head">
          <div>
            <p className="variant-b-eyebrow">Admin Console</p>
            <h1>NEXS Operations</h1>
          </div>
          <div className="variant-b-admin-head-meta">
            <Pill tone="active">Admin · Operations</Pill>
            <a className="variant-b-small-cta" href="/">
              ออกจากระบบ
            </a>
          </div>
        </div>

        <div className="variant-b-admin-tabs" role="tablist">
          {(
            [
              ['import', 'Serial Import'],
              ['dealers', 'Dealer Oversight'],
              ['policy', 'Policy Config'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              className={`variant-b-admin-tab ${tab === key ? 'is-active' : ''}`}
              onClick={() => setTab(key)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'import' && <AdminImport />}
        {tab === 'dealers' && <AdminDealers />}
        {tab === 'policy' && <AdminPolicy />}
      </div>
    </main>
  );
}

function AdminImport() {
  return (
    <div className="variant-b-admin-grid">
      <div className="variant-b-admin-card">
        <h3>Serial Import · Dry Run</h3>
        <p>อัปโหลด CSV เพื่อตรวจสอบ duplicate และ map model code ก่อน import จริง</p>
        <div className="variant-b-admin-dropzone">
          <span className="variant-b-admin-dropzone-name">serials_2026Q1.csv</span>
          <span>วาง CSV ที่นี่ หรือเลือกไฟล์</span>
        </div>
        <div className="variant-b-admin-actions">
          <button className="variant-b-small-cta" type="button">
            Reset
          </button>
          <button className="variant-b-primary-cta" type="button">
            Run dry-run
          </button>
        </div>
      </div>
      <div className="variant-b-admin-card">
        <h3>Validation Result</h3>
        <div className="variant-b-admin-stats">
          {[
            ['1,248', 'Total'],
            ['1,231', 'Valid'],
            ['17', 'Issues'],
          ].map(([value, label]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="variant-b-admin-table">
          {(
            [
              ['B-1100MXY0401001A', 'BEGIN', 'valid', '—'],
              ['P-2200ABC0344008X', 'PRIME', 'valid', '—'],
              ['PRO-9988QQQ0401123Z', 'PRO', 'duplicate', 'Found in batch 2025-04'],
              ['R75-7700XYZ0398002K', 'PRO · R75', 'valid', 'Internal variant'],
              ['U-5511LLL0398099Q', 'ULTIMATE', 'valid', '—'],
            ] as const
          ).map(([code, model, status, note]) => (
            <div key={code} className="variant-b-admin-table-row">
              <span className="variant-b-admin-table-mono">{code}</span>
              <span>{model}</span>
              <span>
                <Pill tone={status === 'duplicate' ? 'warn' : 'active'}>{status}</Pill>
              </span>
              <span className="variant-b-admin-table-note">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminDealers() {
  return (
    <div className="variant-b-admin-card variant-b-admin-card-wide">
      <div className="variant-b-admin-card-head">
        <div>
          <p className="variant-b-eyebrow">Dealers</p>
          <strong className="variant-b-admin-card-title">32 ตัวแทนจำหน่ายในระบบ</strong>
        </div>
        <div className="variant-b-admin-search">
          <SearchIcon />
          <input placeholder="ค้นหา dealer..." />
          <button className="variant-b-primary-cta" type="button">
            + เพิ่ม Dealer
          </button>
        </div>
      </div>
      <div className="variant-b-admin-table dealers">
        <div className="variant-b-admin-table-head">
          <span>Dealer</span>
          <span>Region</span>
          <span>Active warr.</span>
          <span>This month</span>
          <span>Support</span>
          <span>Status</span>
        </div>
        {(
          [
            ['NEXS Authorized · Bangkok Central', 'BKK', '146', '12', '0', 'Active'],
            ['NEXS Authorized · Phuket', 'South', '98', '8', '2', 'Active'],
            ['NEXS Authorized · Chiang Mai', 'North', '72', '6', '1', 'Active'],
            ['NEXS Authorized · Khon Kaen', 'NE', '41', '3', '0', 'Active'],
            ['NEXS Pending · Hua Hin', 'Central', '0', '0', '0', 'Pending'],
          ] as const
        ).map(([name, region, warranties, monthly, support, status]) => (
          <div key={name} className="variant-b-admin-table-row dealers">
            <span className="variant-b-admin-table-name">{name}</span>
            <span className="variant-b-admin-table-muted">{region}</span>
            <span className="variant-b-admin-table-mono">{warranties}</span>
            <span className="variant-b-admin-table-mono">{monthly}</span>
            <span className="variant-b-admin-table-mono">{support}</span>
            <span>
              <Pill tone={status === 'Pending' ? 'warn' : 'active'}>{status}</Pill>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPolicy() {
  return (
    <div className="variant-b-admin-grid">
      <div className="variant-b-admin-card">
        <h3>Public Visibility Policy</h3>
        <p>กำหนดการเปิดเผยข้อมูลเชิงพาณิชย์บนเว็บ public</p>
        <div className="variant-b-admin-actions" style={{ justifyContent: 'flex-start' }}>
          <Pill tone="active">Hide pricing · Active</Pill>
        </div>
        <p className="variant-b-admin-note">
          Business rules ไม่ hardcode ในโค้ด — ปรับผ่าน policy config ในอนาคต
        </p>
      </div>
      <div className="variant-b-admin-card">
        <h3>Approved Public Claims</h3>
        <p>เปิด/ปิด claim ที่ได้รับอนุมัติ ก่อนแสดงบนเว็บ public</p>
        <div className="variant-b-admin-policy-list">
          {(
            [
              ['QR-based warranty verification', true],
              ['Digital warranty card', true],
              ['Warranty-backed after-sales support', true],
              ['Restricted technical claim · A', false],
              ['Restricted technical claim · B', false],
              ['Restricted color range claim', false],
            ] as const
          ).map(([label, approved]) => (
            <div key={label} className="variant-b-admin-policy-row">
              <span style={{ color: approved ? 'var(--vb-text)' : 'var(--vb-muted)' }}>{label}</span>
              <Pill tone={approved ? 'active' : 'neutral'}>{approved ? 'Approved' : 'Pending'}</Pill>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
