import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stat } from "./Stat";

const meta = {
  title: "컴포넌트/스탯",
  component: Stat,
  parameters: {
    docs: {
      description: {
        component:
          "숫자로 신뢰를 만드는 통계 한 칸이에요. 어림 표기(~, +) 없이 확인된 값만 써요. 스탯 밴드처럼 surface 배경 위에 여러 개를 나란히 둬요.",
      },
    },
  },
  argTypes: {
    value: { control: "text", description: "확인된 값만" },
    label: { control: "text" },
  },
  args: { value: "50", label: "누적 멤버" },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "기본" };

export const Band: Story = {
  name: "스탯 밴드",
  render: () => (
    <div className="flex w-180 justify-center gap-16 rounded-lg bg-surface py-10">
      <Stat value="50" label="누적 멤버" />
      <Stat value="4기" label="진행 기수" />
      <Stat value="FE, BE" label="트랙" />
      <Stat value="12" label="팀 프로젝트" />
    </div>
  ),
};
