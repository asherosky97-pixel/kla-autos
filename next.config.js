/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'raw.githubusercontent.com'],
  },
  typescript: {
    // Validated separately via tsc --noEmit
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.cache = {
      type: 'memory',
    };
    return config;
  },
};

module.exports = nextConfig;

