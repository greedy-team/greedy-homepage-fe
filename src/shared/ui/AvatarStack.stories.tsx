import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AvatarStack } from "./AvatarStack";

const meta = {
  title: "컴포넌트/아바타 스택",
  component: AvatarStack,
  parameters: {
    docs: {
      description: {
        component: "함께한 사람들을 겹쳐서 보여줘요. max를 넘는 인원은 +n으로 접혀요.",
      },
    },
  },
  argTypes: {
    max: { control: "number", description: "이 수를 넘으면 +n으로" },
  },
  args: {
    people: [
      { name: "김민준" },
      { name: "홍지우" },
      { name: "박서연" },
      { name: "이도현" },
      { name: "최유나" },
      { name: "정하늘" },
    ],
  },
} satisfies Meta<typeof AvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "기본" };

export const Few: Story = {
  name: "적을 때",
  args: { people: [{ name: "김민준" }, { name: "홍지우" }] },
};
