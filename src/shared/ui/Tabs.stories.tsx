import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "./Tabs";

const meta = {
  title: "컴포넌트/탭",
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          "화면 안에서 큰 구획을 전환할 때 써요. 현재 위치는 굵은 검정 글자와 초록 밑줄로 표시해요. 목록을 거르는 용도라면 필터 칩을 써요.",
      },
    },
  },
  argTypes: {
    items: { description: "label과 value 쌍의 배열" },
    value: { description: "선택된 탭의 value" },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function TrackTabsDemo() {
  const [value, setValue] = useState("fe");
  return (
    <Tabs
      items={[
        { label: "프론트엔드", value: "fe" },
        { label: "백엔드", value: "be" },
      ]}
      value={value}
      onChange={setValue}
    />
  );
}

function GenerationTabsDemo() {
  const [value, setValue] = useState("all");
  return (
    <Tabs
      items={[
        { label: "전체", value: "all" },
        { label: "1기", value: "1" },
        { label: "2기", value: "2" },
        { label: "3기", value: "3" },
        { label: "4기", value: "4" },
      ]}
      value={value}
      onChange={setValue}
    />
  );
}

export const Track: Story = {
  name: "트랙 탭",
  args: { items: [], value: "" },
  render: () => <TrackTabsDemo />,
};

export const Generation: Story = {
  name: "기수 탭",
  args: { items: [], value: "" },
  render: () => <GenerationTabsDemo />,
};
