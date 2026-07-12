import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BottomCta } from "./BottomCta";

const meta = {
  title: "레이아웃/하단 고정 CTA",
  component: BottomCta,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "화면 하단에 고정되는 버튼이에요. 모집 중에, 랜딩에서만 써요. 다른 화면까지 따라가면 소개보다 광고로 읽혀요. 좁은 화면 전용이라 쓰는 곳에서 md:hidden을 함께 주고, 노출 시점(히어로를 지나면 표시)도 쓰는 화면에서 정해요.",
      },
      story: { inline: false, iframeHeight: 180 },
    },
  },
  argTypes: {
    href: { control: "text" },
    label: { control: "text" },
    caption: { control: "text", description: "버튼 아래 작은 안내" },
  },
  args: { href: "#", label: "5기 지원하기", caption: "서류 접수 8월 11일까지" },
} satisfies Meta<typeof BottomCta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "기본" };
