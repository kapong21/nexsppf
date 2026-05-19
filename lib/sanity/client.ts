import { createClient, type SanityClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

/**
 * Sanity client — returns `null` when env vars are missing so pages can
 * gracefully fall back to static data in `data/brand.ts`. This keeps the
 * build green even before the Sanity workspace is provisioned (D3).
 */
export const sanity: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-10-01',
      useCdn: true,
      perspective: 'published',
    })
  : null;

export const sanityEnabled = sanity !== null;
