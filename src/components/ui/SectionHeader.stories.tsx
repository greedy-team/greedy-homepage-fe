import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeader } from "./SectionHeader";

const meta = {
  title: "컴포넌트/섹션 헤더",
  component: SectionHeader,
  parameters: {
    docs: {
      description: {
        component: "섹션의 제목 줄이에요. 더보기는 텍스트 링크로만 달아요.",
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text", description: "제목 아래 한 줄 설명" },
    moreHref: { control: "text", description: "값을 주면 더보기 링크 표시" },
    moreLabel: { control: "text" },
  },
  args: { title: "활동" },
  decorators: [
    (Story) => (
      <div className="w-160">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "기본" };

export const WithSubtitle: Story = {
  name: "부제목",
  args: { title: "그리디의 한 학기", subtitle: "스터디에서 데모데이까지, 이렇게 성장해요" },
};

export const WithMore: Story = {
  name: "더보기",
  args: { title: "프로젝트", moreHref: "#" },
};
