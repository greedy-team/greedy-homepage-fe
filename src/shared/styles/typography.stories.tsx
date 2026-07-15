import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const STEPS = [
  { cls: "text-hero", name: "hero", spec: "56 Bold 1.2", note: "랜딩 히어로 전용" },
  { cls: "text-display", name: "display", spec: "40 Bold 1.3" },
  { cls: "text-h1", name: "h1", spec: "32 Bold 1.35" },
  { cls: "text-h2", name: "h2", spec: "24 SemiBold 1.4" },
  { cls: "text-h3", name: "h3", spec: "20 SemiBold 1.4" },
  { cls: "text-body", name: "body", spec: "16 Regular 1.6" },
  { cls: "text-body-sm", name: "body-sm", spec: "14 Regular 1.6" },
  { cls: "text-caption", name: "caption", spec: "12 Regular 1.5" },
];

const meta = {
  title: "파운데이션/타이포그래피",
  parameters: {
    docs: {
      description: {
        component:
          "글자 크기는 이 8단계만 써요. 중간 크기가 필요하면 크기 대신 굵기로 조절해요. 기본 크기 클래스(text-sm 등)는 꺼져 있어요.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  name: "단계",
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {STEPS.map((s) => (
        <div key={s.name} className="flex items-baseline gap-6 border-b border-border pb-4">
          <div className="w-36 shrink-0">
            <p className="text-body-sm font-semibold text-text">{s.name}</p>
            <p className="text-caption text-text-subtle">{s.spec}</p>
            {s.note && <p className="text-caption text-text-subtle">{s.note}</p>}
          </div>
          <p className={`${s.cls} text-text`}>함께 성장하는 개발 동아리</p>
        </div>
      ))}
    </div>
  ),
};
