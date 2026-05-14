export type ImageContext = 'hero' | 'product' | 'gallery' | 'logo' | 'background';

export type ImageSlotConfig = {
  context: ImageContext;
  aspectRatio: string;
  sizes: string;
  priority: boolean;
};

export const IMAGE_SLOT_CONFIGS: Record<ImageContext, ImageSlotConfig> = {
  hero: {
    context: 'hero',
    aspectRatio: '16/9',
    sizes: '100vw',
    priority: true,
  },
  product: {
    context: 'product',
    aspectRatio: '4/3',
    sizes: '(max-width: 768px) 100vw, 50vw',
    priority: false,
  },
  gallery: {
    context: 'gallery',
    aspectRatio: '1/1',
    sizes: '(max-width: 768px) 50vw, 33vw',
    priority: false,
  },
  logo: {
    context: 'logo',
    aspectRatio: 'auto',
    sizes: '200px',
    priority: true,
  },
  background: {
    context: 'background',
    aspectRatio: '16/9',
    sizes: '100vw',
    priority: true,
  },
} as const;

export function buildSanityImageUrl(
  baseUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
    fit?: 'crop' | 'clip' | 'fill' | 'max' | 'min';
  } = {},
): string {
  const params = new URLSearchParams();
  if (options.width) params.set('w', String(options.width));
  if (options.height) params.set('h', String(options.height));
  if (options.quality) params.set('q', String(options.quality));
  if (options.format) params.set('fm', options.format);
  if (options.fit) params.set('fit', options.fit);
  const query = params.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}

export function getBlurDataUrl(): string {
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
}
