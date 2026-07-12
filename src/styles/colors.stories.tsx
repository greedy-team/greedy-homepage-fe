import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/** 스와치는 CSS 변수를 그대로 그려서 tokens.css와 항상 같은 값을 보여줘요 */
function Swatch({ token, note }: { token: string; note?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-16 w-28 rounded-md border border-border"
        style={{ background: `var(--color-${token})` }}
      />
      <p className="text-caption font-semibold text-text">{token}</p>
      {note && <p className="text-caption text-text-subtle">{note}</p>}
    </div>
  );
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-h3 text-text">{title}</h3>
      <div className="flex flex-wrap gap-4">{children}</div>
    </section>
  );
}

const meta = {
  title: "파운데이션/색",
  parameters: {
    docs: {
      description: {
        component:
          "색은 이 토큰만 써요. 화면에서는 원색보다 시맨틱 별칭을 먼저 쓰고, 빨강은 오류 표시에만 써요. 값의 원본은 src/styles/tokens.css예요.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  name: "팔레트",
  render: () => (
    <div className="flex flex-col gap-10 p-4">
      <Row title="그리디 그린">
        {["green-50", "green-100", "green-200", "green-300", "green-400", "green-500", "green-600", "green-700", "green-800", "green-900"].map(
          (t) => (
            <Swatch key={t} token={t} note={t === "green-600" ? "브랜드 원색" : undefined} />
          ),
        )}
      </Row>
      <Row title="그레이">
        {["white", "gray-50", "gray-100", "gray-200", "gray-300", "gray-500", "gray-700", "gray-900"].map((t) => (
          <Swatch key={t} token={t} />
        ))}
      </Row>
      <Row title="오류 전용">
        <Swatch token="red-600" note="오류 표시에만" />
      </Row>
    </div>
  ),
};

export const Semantic: Story = {
  name: "시맨틱",
  render: () => (
    <div className="flex flex-col gap-10 p-4">
      <Row title="시맨틱 별칭 (화면에서는 이 이름을 먼저 써요)">
        <Swatch token="brand" note="주 행동" />
        <Swatch token="brand-soft" note="옅은 강조" />
        <Swatch token="bg" note="페이지 배경" />
        <Swatch token="surface" note="구분되는 면" />
        <Swatch token="border" note="테두리" />
        <Swatch token="text" note="본문 글자" />
        <Swatch token="text-subtle" note="보조 글자" />
        <Swatch token="disabled" note="비활성" />
        <Swatch token="danger" note="오류" />
      </Row>
    </div>
  ),
};
