/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    legacyBrowsers: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    NEXT_PUBLIC_ZOHO_CLIENT_ID: process.env.NEXT_PUBLIC_ZOHO_CLIENT_ID,
    NEXT_PUBLIC_ZOHO_REDIRECT_URI: process.env.NEXT_PUBLIC_ZOHO_REDIRECT_URI,
    NEXT_PUBLIC_ZOHO_API_DOMAIN: process.env.NEXT_PUBLIC_ZOHO_API_DOMAIN,
    NEXT_PUBLIC_ZOHO_AUTH_DOMAIN: process.env.NEXT_PUBLIC_ZOHO_AUTH_DOMAIN,
    NEXT_PUBLIC_ZOHO_CALENDAR_ID: process.env.NEXT_PUBLIC_ZOHO_CALENDAR_ID,
    ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET,
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  },
}

module.exports = nextConfig