import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PrevNextNav } from "./PrevNextNav";

const meta = {
  title: "컴포넌트/이전 다음 내비",
  component: PrevNextNav,
  parameters: {
    docs: {
      description: {
        component: "옆으로 넘기는 곳에서 쓰는 화살표 쌍이에요. 더 갈 곳이 없는 방향은 비활성으로 둬요.",
      },
    },
  },
  argTypes: {
    prevDisabled: { control: "boolean" },
    nextDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof PrevNextNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "기본" };

export const AtStart: Story = { name: "처음 위치", args: { prevDisabled: true } };
