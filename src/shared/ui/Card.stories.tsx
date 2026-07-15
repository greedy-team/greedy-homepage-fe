import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "./Card";

const meta = {
  title: "컴포넌트/카드",
  component: Card,
  parameters: {
    docs: {
      description: {
        component: "카드는 이 두 종류만 써요. 종류가 늘면 페이지마다 카드가 제각각이 돼요.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "highlight"],
      description: "default 기본 / highlight 옅은 브랜드색 강조",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <h3 className="text-h3 text-text">출석 체크 슬랙봇</h3>
      <p className="mt-2 text-body-sm text-text-subtle">매주 미션 제출 현황을 정리해요</p>
    </Card>
  ),
};

export const Highlight: Story = {
  render: () => (
    <Card variant="highlight" className="w-80">
      <h3 className="text-h3 text-text">5기 모집 중</h3>
      <p className="mt-2 text-body-sm text-text-subtle">서류 접수 8월 11일까지</p>
    </Card>
  ),
};
