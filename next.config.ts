import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Configure image formats for better optimization
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize images in production
    minimumCacheTTL: 60,
  },
  // Optimize for production
  reactStrictMode: true,
};

export default nextConfig;
