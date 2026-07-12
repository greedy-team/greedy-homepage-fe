import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

/** 스와치는 CSS 변수를 그대로 그려서 tokens.css와 항상 같은 값을 보여줘요 */
function TokenSquare({ token, className }: { token: string; className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-sm border border-border ${className ?? "size-8"}`}
      style={{ background: `var(--color-${token})` }}
    />
  );
}

function Swatch({ token, note }: { token: string; note?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <TokenSquare token={token} className="h-16 w-28 rounded-md" />
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

/**
 * 시맨틱 토큰 목록. 행과 아래 선택표가 이 배열 하나에서 나와요.
 * refName은 tokens.css의 별칭 정의와 같이 고쳐요.
 */
const SEMANTIC: {
  token: string;
  refName: string;
  desc: string;
  when: string;
  example: React.ReactNode;
}[] = [
  {
    token: "brand",
    refName: "green-600",
    desc: "화면의 주 행동. primary 버튼과 선택된 필터 칩의 배경이에요",
    when: "화면에서 제일 밀어주는 행동이에요",
    example: (
      <Button variant="primary" size="sm">
        지원하기
      </Button>
    ),
  },
  {
    token: "brand-soft",
    refName: "green-50",
    desc: "옅은 브랜드 강조. 기수 배지의 배경, ghost 버튼의 호버색이에요",
    when: "브랜드 느낌만 옅게 입혀요",
    example: <Badge variant="brand">4기</Badge>,
  },
  {
    token: "text",
    refName: "gray-900",
    desc: "제목과 본문 글자. 화면의 기본 글자색이에요",
    when: "본문 글자를 써요",
    example: <p className="text-body font-semibold text-text">함께 성장해요</p>,
  },
  {
    token: "text-subtle",
    refName: "gray-500",
    desc: "보조 글자. 설명, 날짜, 캡션처럼 한 발 물러난 정보예요",
    when: "덜 중요한 보조 글자예요",
    example: <p className="text-body-sm text-text-subtle">스터디에서 데모데이까지</p>,
  },
  {
    token: "border",
    refName: "gray-200",
    desc: "카드와 입력창의 테두리, 구분선이에요",
    when: "요소를 구분하는 선이 필요해요",
    example: <span className="rounded-md border border-border bg-bg px-4 py-2 text-body-sm text-text">카드</span>,
  },
  {
    token: "bg",
    refName: "white",
    desc: "페이지의 바탕이에요",
    when: "페이지의 바탕이에요",
    example: <span className="rounded-md border border-border bg-bg px-4 py-2 text-caption text-text-subtle">bg</span>,
  },
  {
    token: "surface",
    refName: "gray-50",
    desc: "바탕에서 살짝 구분되는 면. 푸터와 스탯 밴드의 배경이에요",
    when: "바탕에서 살짝 구분되는 면이에요",
    example: <span className="rounded-md bg-surface px-4 py-2 text-caption text-text-subtle">surface</span>,
  },
  {
    token: "disabled",
    refName: "gray-300",
    desc: "누를 수 없는 상태. 비활성 버튼의 배경이에요",
    when: "지금은 누를 수 없는 상태예요",
    example: (
      <Button size="sm" disabled>
        마감됐어요
      </Button>
    ),
  },
  {
    token: "danger",
    refName: "red-600",
    desc: "오류 표시 전용. 다른 곳에 쓰면 정작 오류가 눈에 띄지 않아요",
    when: "값이 잘못됐다고 알려요",
    example: <Input error="이메일 형식이 아니에요" defaultValue="greedy@" className="w-56" />,
  },
];

export const Semantic: Story = {
  name: "시맨틱",
  render: () => (
    <div className="flex max-w-4xl flex-col gap-8 p-4">
      <div className="rounded-lg bg-surface p-6">
        <h3 className="text-h3 text-text">시맨틱 토큰은 색에 역할 이름을 붙인 별칭이에요</h3>
        <p className="mt-2 text-body text-gray-700">
          green-600처럼 <b>무슨 색인지</b>로 부르는 대신, brand처럼 <b>무슨 역할인지</b>로 불러요.
          나중에 브랜드 색이 바뀌어도 역할은 그대로라 코드를 고칠 필요가 없어요. 색을 고를 때는
          &ldquo;무슨 색이 예쁘지?&rdquo;가 아니라 &ldquo;이 요소의 역할이 뭐지?&rdquo;를 물어요.
        </p>
      </div>

      <div>
        {SEMANTIC.map((s) => (
          <div key={s.token} className="grid grid-cols-[200px_280px_1fr] items-center gap-6 border-b border-border py-4">
            <div className="flex items-center gap-3">
              <TokenSquare token={s.token} />
              <div>
                <p className="text-body-sm font-semibold text-text">{s.token}</p>
                <p className="text-caption text-text-subtle">= {s.refName}</p>
              </div>
            </div>
            <div className="flex items-center">{s.example}</div>
            <p className="text-body-sm text-text-subtle">{s.desc}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-h3 text-text">뭘 써야 할지 고민된다면</h3>
        <table className="mt-3 w-full max-w-xl border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 text-body-sm font-semibold text-text">이런 상황이라면</th>
              <th className="py-2 text-body-sm font-semibold text-text">이 토큰을 써요</th>
            </tr>
          </thead>
          <tbody>
            {SEMANTIC.map((s) => (
              <tr key={s.token} className="border-b border-border">
                <td className="py-2 text-body-sm text-gray-700">{s.when}</td>
                <td className="py-2 text-body-sm font-semibold text-brand">{s.token}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};
