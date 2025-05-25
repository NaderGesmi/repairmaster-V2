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
    domains: ['res.cloudinary.com'], // allow Cloudinary domain for images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/katakuri740/**',
      }
    ],
    unoptimized: true, // disable Next.js image optimization for Netlify compatibility
  },
}

export default nextConfig