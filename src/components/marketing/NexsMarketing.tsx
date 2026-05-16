import Link from 'next/link';

import { FILM_CATEGORIES, type FilmCategory } from '@/content/final-product-content';
import { BRAND_STRINGS } from '@/lib/design-tokens';

export function VisualStage({ tone = 'clear' }: { tone?: 'clear' | 'matte' | 'color' | 'carbon' | 'dealer' }) {
  return (
    <div className={`nexs-visual-stage ${tone}`} aria-hidden="true">
      <div className="studio-floor" />
      <div className="light-bar one" />
      <div className="light-bar two" />
      <div className="vehicle-silhouette">
        <span className="roof" />
        <span className="body" />
        <span className="wheel left" />
        <span className="wheel right" />
      </div>
      <div className="red-detail" />
    </div>
  );
}

export function MarketingHero({
  eyebrow,
  title,
  thaiTitle,
  subcopy,
  primaryHref = '/contact',
  primaryLabel = 'Get a Quote',
  secondaryHref = '/products',
  secondaryLabel = 'Explore Film Systems',
  tone = 'clear',
}: {
  eyebrow: string;
  title: string;
  thaiTitle: string;
  subcopy: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  tone?: 'clear' | 'matte' | 'color' | 'carbon' | 'dealer';
}) {
  return (
    <section className="nexs-hero">
      <div className="nexs-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <h2>{thaiTitle}</h2>
        <p className="lead">{subcopy}</p>
        <div className="actions">
          <Link className="button primary" href={primaryHref}>{primaryLabel}</Link>
          <Link className="button secondary" href={secondaryHref}>{secondaryLabel}</Link>
        </div>
        <div className="nexs-stat-strip" aria-label="NEXS highlights">
          <span>{BRAND_STRINGS.tagline}</span>
          <span>12 Film Options</span>
          <span>Lifetime up to 10 Years</span>
        </div>
      </div>
      <VisualStage tone={tone} />
    </section>
  );
}

export function CategoryOverview() {
  return (
    <section className="section section-tight">
      <div className="section-head">
        <div>
          <p className="eyebrow">Choose Your Film System</p>
          <h2>ฟิล์มรถยนต์ระดับพรีเมียม 3 กลุ่ม 12 ทางเลือก</h2>
        </div>
        <p>เลือกตามพื้นผิวที่ต้องการ: ฟิล์มใส ฟิล์มด้าน หรือฟิล์มสี พร้อม CTA สำหรับติดต่อทีมงาน</p>
      </div>
      <div className="category-system-grid">
        {FILM_CATEGORIES.map((category) => (
          <Link className={`category-system-card ${category.key}`} href={category.route} key={category.key}>
            <span>{category.options.length} options</span>
            <h3>{category.label}</h3>
            <p>{category.thaiLabel}</p>
            <small>{category.options.map((item) => item.name).join(' / ')}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ProductTierGrid({ category }: { category: FilmCategory }) {
  return (
    <section className="section section-tight">
      <div className="section-head">
        <div>
          <p className="eyebrow">{category.label}</p>
          <h2>{category.options.length} Film Options</h2>
        </div>
        <p>{category.heroThai}</p>
      </div>
      <div className={`tier-grid count-${category.options.length}`}>
        {category.options.map((option) => (
          <article className={`tier-card ${option.category}`} key={option.name}>
            <p className="product-badge">{option.badge}</p>
            <h3>{option.name}</h3>
            <p>{option.position}</p>
            <dl>
              {option.thickness && <div><dt>Thickness</dt><dd>{option.thickness}</dd></div>}
              {option.peelingSupport && <div><dt>รับประกันลอก</dt><dd>{option.peelingSupport}</dd></div>}
              {option.productWarranty && <div><dt>Product Warranty</dt><dd>{option.productWarranty}</dd></div>}
              {option.lifetime && <div><dt>Lifetime</dt><dd>{option.lifetime}</dd></div>}
            </dl>
            <p className="tier-note">{option.note}</p>
            <Link className="button secondary" href="/contact">Book Consultation</Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ComparisonMatrix() {
  const rows = FILM_CATEGORIES.flatMap((category) => category.options.map((option) => ({ category, option })));
  return (
    <section className="section section-tight">
      <div className="section-head">
        <div>
          <p className="eyebrow">Compare</p>
          <h2>Public comparison without pricing</h2>
        </div>
        <p>ตารางนี้แสดงเฉพาะข้อมูล public-safe สำหรับช่วยเลือกรุ่น ไม่แสดงข้อมูลเชิงพาณิชย์ภายใน</p>
      </div>
      <div className="product-comparison-table final-table">
        <table>
          <thead><tr><th>Product</th><th>System</th><th>Position</th><th>Product Warranty</th><th>Lifetime</th></tr></thead>
          <tbody>
            {rows.map(({ category, option }) => (
              <tr key={`${category.key}-${option.name}`}>
                <th scope="row"><strong>{option.name}</strong><small>{option.badge}</small></th>
                <td>{category.label}</td>
                <td>{option.position}</td>
                <td>{option.productWarranty ?? 'ตามเงื่อนไขรุ่นพิเศษ'}</td>
                <td>{option.lifetime ?? 'ตามเงื่อนไขรุ่นพิเศษ'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function LeadPanel({ title = 'Talk to NEXS' }: { title?: string }) {
  return (
    <section className="section section-tight">
      <div className="lead-panel">
        <div>
          <p className="eyebrow">Contact handle: nexsppf</p>
          <h2>{title}</h2>
          <p>ส่งข้อมูลให้ทีมงานติดต่อกลับ เพื่อแนะนำรุ่น ฟิล์มที่เหมาะกับรถ และตัวแทนจำหน่ายที่เหมาะสม</p>
        </div>
        <Link className="button primary" href="/contact">Get a Quote</Link>
      </div>
    </section>
  );
}
