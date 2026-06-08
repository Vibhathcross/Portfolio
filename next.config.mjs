/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimized for Vercel hosting — server-side rendering enabled
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
