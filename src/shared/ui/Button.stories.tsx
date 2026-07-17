import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "컴포넌트/버튼",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "화면에서 제일 밀어주는 행동에 primary를 써요. 초록 배경 버튼은 한 화면에 하나만 둬요. 화면 이동이면 href를 주고, 상태 변경이면 onClick을 써요.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "ghost", "white", "outline-white"],
      description: "primary는 주 행동, ghost는 보조 행동. white 계열은 그린 밴드 위 전용",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "sm은 표나 카드 안, lg는 랜딩의 주요 버튼. 어느 크기든 눌리는 영역은 44px라 그냥 써도 돼요",
    },
    href: { control: "text", description: "값을 주면 버튼 모양의 링크(a)로 렌더링" },
    disabled: { control: "boolean" },
  },
  args: { children: "지원하기" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };

export const Ghost: Story = { args: { variant: "ghost", children: "모집 알림 받기" } };

export const White: Story = {
  args: { variant: "white", children: "지원하기" },
  globals: { backgrounds: { value: "brand" } },
};

export const OutlineWhite: Story = {
  args: { variant: "outline-white", children: "활동 보기" },
  globals: { backgrounds: { value: "brand" } },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-3">
      <Button {...args} size="sm">
        sm 32
      </Button>
      <Button {...args} size="md">
        md 40
      </Button>
      <Button {...args} size="lg">
        lg 48
      </Button>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true, children: "마감됐어요" } };

export const AsLink: Story = {
  args: { href: "#", children: "버튼 모양의 링크" },
  parameters: {
    docs: { description: { story: "히어로의 지원하기처럼, 모양은 버튼이지만 이동이라 a 태그로 렌더링돼요." } },
  },
};

export const DoDont: Story = {
  name: "규칙: 초록 버튼은 하나",
  parameters: {
    docs: {
      description: {
        story: "primary가 두 개면 어느 쪽이 주 행동인지 색이 말해주지 못해요. 보조 행동은 ghost로 내려요.",
      },
    },
  },
  render: () => (
    <div className="flex gap-6">
      <div className="rounded-md border border-border p-6">
        <p className="mb-4 text-body-sm font-semibold text-brand">이렇게 해요</p>
        <div className="flex gap-3">
          <Button variant="primary">지원하기</Button>
          <Button variant="ghost">활동 보기</Button>
        </div>
      </div>
      <div className="rounded-md border border-border p-6">
        <p className="mb-4 text-body-sm font-semibold text-danger">이러지 않아요</p>
        <div className="flex gap-3">
          <Button variant="primary">지원하기</Button>
          <Button variant="primary">활동 보기</Button>
        </div>
      </div>
    </div>
  ),
};
