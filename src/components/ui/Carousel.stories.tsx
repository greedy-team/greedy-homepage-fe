import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Carousel } from "./Carousel";
import { Card } from "./Card";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Badge } from "./Badge";

const meta = {
  title: "컴포넌트/캐러셀",
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component:
          "옆으로 넘겨 보는 목록이에요. 자동 재생은 하지 않아요. 반복해서 보는 움직임은 피로해요. 데스크톱은 화살표, 모바일은 스와이프로 넘겨요.",
      },
    },
  },
  argTypes: {
    itemClassName: { control: "text", description: "한 칸의 너비 클래스" },
  },
  decorators: [
    (Story) => (
      <div className="w-180">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const PROJECTS = [
  { name: "출석 체크 슬랙봇", desc: "매주 미션 제출 현황을 정리해요", gen: "4기" },
  { name: "동아리방 예약", desc: "겹치지 않게 자리를 예약해요", gen: "4기" },
  { name: "밋업 아카이브", desc: "발표 자료를 한곳에 모아요", gen: "3기" },
  { name: "모각코 타이머", desc: "함께 집중하는 시간을 재요", gen: "3기" },
  { name: "세종 맛집 지도", desc: "동아리방 근처 맛집을 모아요", gen: "2기" },
];

export const Default: Story = {
  name: "기본",
  args: { children: null },
  render: (args) => (
    <Carousel {...args}>
      {PROJECTS.map((p) => (
        <Card key={p.name} className="flex flex-col gap-3">
          <ImagePlaceholder ratio="16/9" label="화면" />
          <Badge variant="brand">{p.gen}</Badge>
          <div>
            <p className="text-h3 text-text">{p.name}</p>
            <p className="mt-1 text-body-sm text-text-subtle">{p.desc}</p>
          </div>
        </Card>
      ))}
    </Carousel>
  ),
};
