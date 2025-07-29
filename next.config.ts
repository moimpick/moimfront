import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 정적 사이트 생성 (Capacitor 앱 빌드 필요)
  output: "export",

  // 이미지 최적화 비활성화 (정적 빌드용)
  images: {
    unoptimized: true,
  },

  // 후행 슬래시 추가
  trailingSlash: true,

  // 환경별 API URL 설정
  env: {
    API_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://your-backend.herokuapp.com/api" // 운영환경 백엔드 URL
        : "http://localhost:8080/api", // 개발환경 Spring Boot
  },
};

export default nextConfig;
