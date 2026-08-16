import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 워크스페이스 루트를 이 프로젝트로 고정. 상위 디렉터리의 pnpm-workspace.yaml로 루트가 잘못 잡히는 경고를 막아요.
  turbopack: { root: import.meta.dirname },
  // 라우트와 안 맞는 주소에 app/global-not-found.tsx를 쓰게 해요. not-found.tsx만으로는
  // notFound()를 부른 경우만 잡히고, 그 밖의 주소는 Next 기본 화면이 나와요.
  experimental: { globalNotFound: true },
  images: {
    // 멤버 아바타는 깃허브 프로필 사진을 써요. github.com/{id}.png는 avatars 도메인으로 리다이렉트돼요
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "objectstorage.ap-chuncheon-1.oraclecloud.com" },
    ],
  },
};

export default nextConfig;
