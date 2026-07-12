import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Gnb } from "./Gnb";

const meta = {
  title: "레이아웃/GNB",
  component: Gnb,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "모든 페이지 맨 위에 고정으로 붙어요. 현재 페이지는 검정 글자와 초록 밑줄로 표시하고, 오른쪽 버튼은 모집 상태에 따라 바뀌어요. md 미만에서는 햄버거로 접혀요 - 접힌 모습은 '모바일 메뉴' 스토리에서, 실제 반응형 전환은 Canvas 탭에서 뷰포트를 바꿔 확인해요.",
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/activities" },
    },
  },
  argTypes: {
    recruiting: { control: "boolean", description: "모집 상태. 실제 값은 site.ts의 IS_RECRUITING" },
  },
} satisfies Meta<typeof Gnb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recruiting: Story = { name: "모집 중", args: { recruiting: true } };

export const Idle: Story = { name: "평시", args: { recruiting: false } };
