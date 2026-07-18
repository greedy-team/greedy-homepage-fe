import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TimelineItem } from "./TimelineItem";
import { Card } from "./Card";
import { Badge } from "./Badge";

const meta = {
  title: "컴포넌트/타임라인 아이템",
  component: TimelineItem,
  parameters: {
    docs: {
      description: {
        component:
          "세로 타임라인의 한 칸이에요. 도트와 선이 시간의 흐름을 보여줘요. 좁은 화면에서는 도트와 라벨이 콘텐츠 위로 올라오고 연결선이 사라져요. 활동 목록과 스터디 커리큘럼에서 써요.",
      },
    },
  },
  argTypes: {
    date: { control: "text", description: "날짜나 주차 라벨. md부터 왼쪽, 좁은 화면은 위" },
    last: { control: "boolean", description: "마지막 항목이면 선을 끊어요" },
  },
} satisfies Meta<typeof TimelineItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const List: Story = {
  name: "목록",
  args: { children: null },
  render: () => (
    <div className="w-140">
      <TimelineItem date="2026.06">
        <Card className="flex flex-col gap-2">
          <Badge variant="outline">
            밋업
          </Badge>
          <p className="text-h3 text-text">초록 밋업</p>
          <p className="text-body-sm text-text-subtle">초록스터디와 함께한 연합 밋업이에요</p>
        </Card>
      </TimelineItem>
      <TimelineItem date="2026.05">
        <Card className="flex flex-col gap-2">
          <Badge variant="outline">
            행사
          </Badge>
          <p className="text-h3 text-text">대동제 부스</p>
          <p className="text-body-sm text-text-subtle">교내 축제에서 게임 부스를 열었어요</p>
        </Card>
      </TimelineItem>
      <TimelineItem date="2026.03" last>
        <Card className="flex flex-col gap-2">
          <Badge variant="outline">
            스터디
          </Badge>
          <p className="text-h3 text-text">모각코</p>
          <p className="text-body-sm text-text-subtle">카페에 모여 각자 미션을 구현했어요</p>
        </Card>
      </TimelineItem>
    </div>
  ),
};

export const Narrow: Story = {
  name: "좁은 화면 (라벨이 위로)",
  globals: { viewport: { value: "mobile1", isRotated: false } },
  args: { children: null },
  render: () => (
    <div className="flex flex-col">
      <TimelineItem date="2026.06">
        <Card className="flex flex-col gap-2 p-4">
          <p className="text-h3 text-text">초록 밋업</p>
          <p className="text-body-sm text-text-subtle">초록스터디와 함께한 연합 밋업이에요</p>
        </Card>
      </TimelineItem>
      <TimelineItem date="2026.05" last>
        <Card className="flex flex-col gap-2 p-4">
          <p className="text-h3 text-text">대동제 부스</p>
          <p className="text-body-sm text-text-subtle">교내 축제에서 게임 부스를 열었어요</p>
        </Card>
      </TimelineItem>
    </div>
  ),
};
