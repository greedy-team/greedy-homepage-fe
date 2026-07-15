import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyState } from "./EmptyState";
import { Button } from "./Button";

const meta = {
  title: "컴포넌트/빈 상태",
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component:
          "아직 데이터가 없는 자리예요. 해당 없는 항목은 숨기지만, 앞으로 채워질 자리는 빈 상태로 보여줘요.",
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
  args: { title: "아직 기록이 없어요" },
  decorators: [
    (Story) => (
      <div className="w-120">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "기본",
  args: { description: "이번 기수 데모데이가 끝나면 프로젝트가 올라와요" },
};

export const WithAction: Story = {
  name: "행동 있음",
  args: { title: "쓴 글이 아직 없어요", description: "첫 회고를 남겨 보세요" },
  render: (args) => (
    <EmptyState {...args}>
      <Button variant="ghost" size="sm" href="#">
        글 쓰러 가기
      </Button>
    </EmptyState>
  ),
};
