/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Enable ESLint checking
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Enable TypeScript checking
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  // Remove static export configuration
  trailingSlash: true,
}

export default nextConfig