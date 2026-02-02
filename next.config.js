/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    // Ignore ESLint errors during build to prevent build failures
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during build (optional, but helps with deployment)
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
