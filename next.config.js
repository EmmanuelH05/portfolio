// About, Research and Experience are pages of their own. Work lives on the home page and contact in
// the footer, so these two still point there.
const sectionRedirects = [
  ['/contact', '/#contact'],
  ['/projects', '/#work'],
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
