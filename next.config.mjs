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
  },
}

export default nextConfig