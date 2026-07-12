import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./Avatar";

const meta = {
  title: "컴포넌트/아바타",
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          "멤버의 얼굴이에요. 깃허브 프로필 사진을 원형으로 잘라 쓰고, 사진이 없으면 이름 첫 글자를 연초록 배경에 보여줘요.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"], description: "sm 32 / md 40 / lg 64 (프로필 헤더)" },
    src: { control: "text", description: "프로필 사진 주소" },
    name: { control: "text" },
  },
  args: { name: "김민준" },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = { name: "이니셜", args: { size: "md" } };

export const WithPhoto: Story = {
  name: "사진",
  args: { src: "https://github.com/greedy-team.png", name: "그리디", size: "md" },
};

export const Sizes: Story = {
  name: "크기",
  render: (args) => (
    <div className="flex items-end gap-4">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};
