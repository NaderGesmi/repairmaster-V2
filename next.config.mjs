/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable static exports for Netlify
  output: 'export',
  // Disable server-side features since we're using static export
  trailingSlash: true,
  distDir: '.next',
}

export default nextConfig