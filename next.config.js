/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.nilsdenon.com"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
