/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  async redirects() {
    return [
      // إعادة توجيه الصفحات المكررة
      {
        source: '/admin/reports',
        destination: '/reports',
        permanent: true,
      },
      {
        source: '/manager/reports',
        destination: '/reports',
        permanent: true,
      },
      {
        source: '/admin/engagements',
        destination: '/engagements',
        permanent: true,
      },
      {
        source: '/manager/engagements',
        destination: '/engagements',
        permanent: true,
      },
    ]
  },
  env: {
    APP_VERSION: '2.0.0',
    RESTRUCTURE_PHASE: 'UI/UX',
  },
}

export default nextConfig
