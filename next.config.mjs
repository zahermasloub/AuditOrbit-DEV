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
  },
  async rewrites() {
    return [
      // تمرير API
      {
        source: '/ops/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_BASE ? `${process.env.NEXT_PUBLIC_API_BASE}/:path*` : 'http://localhost:8000/:path*',
      },
      // تمرير MinIO API
      {
        source: '/ops/minio/:path*',
        destination: process.env.S3_ENDPOINT || 'http://localhost:9000/:path*',
      },
      // تمرير MinIO Console
      {
        source: '/ops/minio-console/:path*',
        destination: 'http://localhost:9001/:path*',
      },
    ]
  },
}

export default nextConfig
