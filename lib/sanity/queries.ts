import { groq } from 'next-sanity';
import { sanity } from './client';

export const productsQuery = groq`*[_type == "product"] | order(orderRank asc) {
  _id, code, group, name, role, badge, tagline, benefit, warranty, publicSpecs
}`;

export const faqQuery = groq`*[_type == "faq"] | order(orderRank asc) { _id, q, a }`;

/**
 * Safe fetch that returns `null` when Sanity isn't configured. Callers should
 * fall back to static data in `data/brand.ts` in that case.
 */
export async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanity) return null;
  try {
    return await sanity.fetch<T>(query, params, { next: { revalidate: 60, tags: ['sanity'] } });
  } catch (err) {
    console.error('[sanity] fetch failed:', err);
    return null;
  }
}
