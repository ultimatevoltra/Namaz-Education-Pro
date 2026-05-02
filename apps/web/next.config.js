/** @type {import('next').NextConfig} */

const deploymentUrl =
  process.env.NEXTAUTH_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  (process.env.RAILWAY_STATIC_URL ? `https://${process.env.RAILWAY_STATIC_URL}` : null) ||
  process.env.RENDER_EXTERNAL_URL ||
  'http://localhost:3000';

if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = deploymentUrl;
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
  experimental: { optimizePackageImports: ['@namaz/*'] },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || deploymentUrl
  }
};

module.exports = nextConfig;
