import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "파운데이션/라운드와 간격",
  parameters: {
    docs: {
      description: {
        component:
          "라운드는 세 단계와 full만 써요. 간격은 4의 배수만 써요(Tailwind 기본 스케일이 4px 단위예요).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Radius: Story = {
  name: "라운드",
  render: () => (
    <div className="flex items-end gap-6 p-4">
      {[
        { cls: "rounded-sm", name: "sm 8", note: "입력창" },
        { cls: "rounded-md", name: "md 12", note: "버튼, 카드" },
        { cls: "rounded-lg", name: "lg 20", note: "사진, 큰 카드" },
        { cls: "rounded-full", name: "full", note: "배지, 아바타" },
      ].map((r) => (
        <div key={r.name} className="flex flex-col items-center gap-2">
          <div className={`${r.cls} h-20 w-28 border border-border bg-brand-soft`} />
          <p className="text-caption font-semibold text-text">{r.name}</p>
          <p className="text-caption text-text-subtle">{r.note}</p>
        </div>
      ))}
    </div>
  ),
};

export const Spacing: Story = {
  name: "간격",
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      {[1, 2, 3, 4, 6, 8, 10, 12, 16].map((n) => (
        <div key={n} className="flex items-center gap-4">
          <p className="w-24 text-caption text-text-subtle">
            {n} = {n * 4}px
          </p>
          <div className="h-4 bg-green-200" style={{ width: `${n * 4}px` }} />
        </div>
      ))}
      <p className="mt-2 text-body-sm text-text-subtle">
        요소의 관계가 가까울수록 좁은 간격을 써요. 4의 배수가 아닌 값은 쓰지 않아요.
      </p>
    </div>
  ),
};
