import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 워크스페이스 루트를 이 프로젝트로 고정. 상위 디렉터리의 pnpm-workspace.yaml로 루트가 잘못 잡히는 경고를 막아요.
  turbopack: { root: import.meta.dirname },
  images: {
    // 멤버 아바타는 깃허브 프로필 사진을 써요. github.com/{id}.png는 avatars 도메인으로 리다이렉트돼요
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
};

export default nextConfig;
