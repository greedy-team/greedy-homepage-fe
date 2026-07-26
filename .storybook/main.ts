import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
  // Vite의 publicDir 복사를 꺼요. staticDirs와 같은 public을 동시에 복사해서,
  // public에 하위 폴더가 있으면 mkdir가 경쟁하다 EEXIST로 빌드가 깨져요. 복사는 staticDirs 한 곳만 해요.
  viteFinal: (viteConfig) => {
    viteConfig.publicDir = false;
    return viteConfig;
  },
};

export default config;
