import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 멤버 아바타는 깃허브 프로필 사진을 써요. github.com/{id}.png는 avatars 도메인으로 리다이렉트돼요
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
};

export default nextConfig;
