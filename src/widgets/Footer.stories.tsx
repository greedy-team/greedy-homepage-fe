import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./Footer";

const meta = {
  title: "레이아웃/푸터",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "모든 페이지 맨 아래에 붙어요. 연락처와 채널로 가는 조용한 링크만 둬요. 링크 값은 site.ts의 LINKS예요.",
      },
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "기본" };
