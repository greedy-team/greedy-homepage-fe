import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FilterChip } from "./FilterChip";

const meta = {
  title: "컴포넌트/필터 칩",
  component: FilterChip,
  parameters: {
    docs: {
      description: {
        component:
          "목록 바로 위에서 항목을 거를 때 써요. 선택된 칩은 초록 배경이에요. 이 초록 배경은 현재 위치 신호(검정 + 밑줄)와는 별개의 장치예요.",
      },
    },
  },
  argTypes: {
    selected: { control: "boolean", description: "선택 상태" },
  },
  args: { children: "행사" },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

function FilterRowDemo() {
  const [selected, setSelected] = useState("전체");
  const kinds = ["전체", "행사", "엠티", "데모데이", "밋업", "스터디"];
  return (
    <div className="flex gap-2">
      {kinds.map((k) => (
        <FilterChip key={k} selected={selected === k} onClick={() => setSelected(k)}>
          {k}
        </FilterChip>
      ))}
    </div>
  );
}

export const Row: Story = {
  name: "필터 줄",
  render: () => <FilterRowDemo />,
};

export const Selected: Story = { name: "선택됨", args: { selected: true, children: "전체" } };
