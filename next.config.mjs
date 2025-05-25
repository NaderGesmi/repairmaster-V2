/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Enable ESLint checking
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Enable TypeScript checking
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/katakuri740/**',
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig