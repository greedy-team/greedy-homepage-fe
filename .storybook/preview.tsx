import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    options: {
      // 사이드바 순서: 파운데이션 → 컴포넌트
      storySort: {
        order: ["시작하기", "파운데이션", ["색", "타이포그래피", "라운드와 간격", "모션"], "레이아웃", "컴포넌트"],
      },
    },
    backgrounds: {
      options: {
        bg: { name: "bg (흰색)", value: "#ffffff" },
        surface: { name: "surface (회색)", value: "#fafafa" },
        brand: { name: "brand (그린)", value: "#017356" },
      },
    },
    viewport: {
      options: {
        mobile: { name: "모바일 360", styles: { width: "360px", height: "780px" } },
        desktop: { name: "데스크톱 1440", styles: { width: "1440px", height: "900px" } },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
