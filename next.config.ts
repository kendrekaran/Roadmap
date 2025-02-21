import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // Add other domains as needed
  },
  reactStrictMode: true,
  swcMinify: true
};

export default nextConfig;
