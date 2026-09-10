// The old standalone pages are sections of the home page now.
const sectionRedirects = [
  ['/about', '/#about'],
  ['/contact', '/#contact'],
  ['/projects', '/#work'],
  ['/experience', '/#experience'],
  ['/research', '/#research'],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    // Ignore ESLint errors during build to prevent build failures
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return sectionRedirects.map(([source, destination]) => ({ source, destination, permanent: false }));
  },
}

module.exports = nextConfig
