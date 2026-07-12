import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ImagePlaceholder } from "./ImagePlaceholder";

const meta = {
  title: "컴포넌트/이미지 자리",
  component: ImagePlaceholder,
  parameters: {
    docs: {
      description: {
        component:
          "아직 이미지가 없는 자리예요. 비율은 16:9, 4:3, 1:1 세 가지만 써요. 실제 이미지가 들어와도 같은 비율을 지켜요.",
      },
    },
  },
  argTypes: {
    ratio: { control: "select", options: ["16/9", "4/3", "1/1"] },
    label: { control: "text", description: "자리에 표시할 이름" },
  },
} satisfies Meta<typeof ImagePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ratios: Story = {
  name: "비율",
  render: () => (
    <div className="flex w-180 items-start gap-4">
      <ImagePlaceholder ratio="16/9" label="16:9" className="w-64" />
      <ImagePlaceholder ratio="4/3" label="4:3" className="w-48" />
      <ImagePlaceholder ratio="1/1" label="1:1" className="w-36" />
    </div>
  ),
};

export const Default: Story = {
  name: "기본",
  args: { ratio: "16/9", label: "활동 대표 사진", className: "w-96" },
};
