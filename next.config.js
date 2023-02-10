/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["qiqanjfzoupbhfzfwtrr.supabase.co"],
    minimumCacheTTL: 0,
  },
}

module.exports = nextConfig
