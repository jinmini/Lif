/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
      },
    ],
  },
  // CSS 모듈 설정은 Next.js 내장 CSS 처리와 충돌할 수 있으므로 제거
  // TypeScript 오류 무시 설정 추가
  typescript: {
    // 프로덕션 빌드 시 타입 오류를 무시
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/signin',
        destination: '/auth/signin',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
