import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta = {
  title: "컴포넌트/배지",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "두 단어 이하의 짧은 정보를 담아요. 문장을 넣으면 버튼과 구분되지 않아요. solid는 진행 중인 상태 전용이라 한 화면에 하나만 둬요.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "brand", "outline", "neutral", "muted"],
      description: "solid 진행 중 / brand 기수 / outline 트랙 구분 / neutral 태그 / muted 끝난 상태",
    },
  },
  args: { children: "4기" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  name: "전체",
  render: () => (
    <div className="flex items-center gap-2">
      <Badge variant="solid">모집 중</Badge>
      <Badge variant="brand">4기</Badge>
      <Badge variant="outline">프론트엔드</Badge>
      <Badge variant="neutral">회고</Badge>
      <Badge variant="muted">마감</Badge>
    </div>
  ),
};

export const Solid: Story = { args: { variant: "solid", children: "모집 중" } };
export const Brand: Story = { args: { variant: "brand", children: "4기" } };
export const Outline: Story = { args: { variant: "outline", children: "프론트엔드" } };
export const Neutral: Story = { args: { variant: "neutral", children: "회고" } };
export const Muted: Story = { args: { variant: "muted", children: "마감" } };
