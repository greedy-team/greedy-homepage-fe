import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextLink } from "./TextLink";

const meta = {
  title: "컴포넌트/텍스트 링크",
  component: TextLink,
  parameters: {
    docs: {
      description: {
        component:
          "글자만 있는 링크예요. 버튼으로 만들지 글자로 둘지는 중요도로 정해요. 브랜드색은 행동 제안, 무채색은 조용한 이동이에요.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["action", "back", "quiet"],
      description: "action 다음 화면 제안 / back 되돌아가기 / quiet 조용한 이동",
    },
  },
  args: { href: "#" },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Action: Story = { args: { variant: "action", children: "더보기" } };
export const Back: Story = { args: { variant: "back", children: "활동 목록" } };
export const Quiet: Story = { args: { variant: "quiet", children: "지난 기수 보기" } };
