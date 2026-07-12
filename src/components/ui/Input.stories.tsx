import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./Input";

const meta = {
  title: "컴포넌트/입력창",
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          "입력창 라운드는 8로, 버튼(12)과 구분해요. 값이 잘못됐을 때는 아래에 이유를 함께 적어요. 빨강은 오류 표시에만 써요.",
      },
    },
  },
  argTypes: {
    label: { control: "text", description: "입력창 위에 붙는 이름" },
    helper: { control: "text", description: "아래 회색 도움말" },
    error: { control: "text", description: "오류 이유. 있으면 테두리가 danger로" },
    disabled: { control: "boolean" },
  },
  args: { label: "이메일", placeholder: "greedy@sju.ac.kr" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "기본", args: { helper: "학교 이메일이 아니어도 돼요" } };

export const Error: Story = {
  name: "오류",
  args: { error: "이메일 형식이 아니에요", defaultValue: "greedy@" },
};

export const Disabled: Story = {
  name: "비활성",
  args: { disabled: true, defaultValue: "4기", label: "기수", helper: "지원 후에는 바꿀 수 없어요" },
};
