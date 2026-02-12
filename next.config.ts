import type { NextConfig } from "next"
import withPWAInit from "next-pwa"

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
  disable: process.env.NODE_ENV === "development", // disable in dev
})

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
    images: {
    domains: [],  // image domain
  },
  typescript: {
    ignoreBuildErrors: true,
  },
    turbopack: {},
  reactStrictMode: false, // only while debugging
}

export default withPWA(nextConfig)

