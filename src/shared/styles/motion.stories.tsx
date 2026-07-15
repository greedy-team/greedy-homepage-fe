import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const DEMOS = [
  { name: "fast 150ms", varName: "--duration-fast", note: "호버, 눌림 같은 즉각 피드백" },
  { name: "base 250ms", varName: "--duration-base", note: "요소 등장, 탭 전환. 고민되면 이것" },
  { name: "slow 400ms", varName: "--duration-slow", note: "랜딩 스크롤 진입, 모달" },
];

const meta = {
  title: "파운데이션/모션",
  parameters: {
    docs: {
      description: {
        component:
          "투명도와 위치(위로 16px)만 움직여요. 크기, 회전, 바운스는 쓰지 않아요. 카드에 마우스를 올리면 실제 속도를 느낄 수 있어요. prefers-reduced-motion 설정에서는 모션을 꺼요.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Durations: Story = {
  name: "속도",
  render: () => (
    <div className="flex gap-6 p-4 pt-10 motion-reduce:[&_*]:transition-none">
      {DEMOS.map((d) => (
        <div
          key={d.name}
          className="w-56 cursor-pointer rounded-md border border-border bg-bg p-6 transition-[translate,opacity] ease-out hover:-translate-y-4 hover:opacity-80"
          style={{ transitionDuration: `var(${d.varName})` }}
        >
          <p className="text-h3 text-text">{d.name}</p>
          <p className="mt-2 text-body-sm text-text-subtle">{d.note}</p>
        </div>
      ))}
    </div>
  ),
};
