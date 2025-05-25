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
    domains: ['res.cloudinary.com'], // allow Cloudinary domain
    unoptimized: true, // disable Next.js image optimization for Netlify compatibility
  },
}

export default nextConfig