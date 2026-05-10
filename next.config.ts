import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/preview-redesign' },
        { source: '/products', destination: '/preview-redesign/products' },
        { source: '/warranty', destination: '/preview-redesign/warranty' },
        { source: '/dealer', destination: '/preview-redesign/dealer' },
        { source: '/contact', destination: '/preview-redesign/contact' },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
