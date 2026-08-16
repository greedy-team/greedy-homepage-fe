import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OG_SIZE, OgCard } from "./OgCard";

const meta = {
  title: "공유 카드/OG 템플릿",
  component: OgCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "링크 공유 카드(1200×630)의 공통 골격이에요. 왼쪽 위 워드마크 서명에 라벨·제목·설명·사진 슬롯만 바꿔 써요. " +
          "홈은 정적 기본형(public/og.png)을 쓰고, 목록 페이지는 페이지형, 멤버·프로젝트 상세는 각각의 형이에요. " +
          "OG를 따로 설계하지 않은 새 페이지는 ogImage({ title }) 한 줄로 제목만 얹은 카드를 가져요. " +
          "구성 근거는 Figma \"OG 이미지\" 섹션의 구성과 이유에 있어요.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: OG_SIZE.width / 2, height: OG_SIZE.height / 2, overflow: "hidden" }}>
        <div style={{ width: OG_SIZE.width, height: OG_SIZE.height, transform: "scale(0.5)", transformOrigin: "top left" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  // 스토리북에는 파일 시스템이 없어서, 정적 서빙되는 워드마크를 받아 흰색 데이터 주소로 만들어요
  loaders: [
    async () => {
      const svg = await (await fetch("/greedy-wordmark.svg")).text();
      const white = svg.replace(/fill="[^"]*"/g, 'fill="#FFFFFF"');
      return { wordmarkSrc: `data:image/svg+xml;utf8,${encodeURIComponent(white)}` };
    },
  ],
  render: (args, { loaded }) => <OgCard {...args} wordmarkSrc={loaded.wordmarkSrc} />,
  args: { wordmarkSrc: "" },
} satisfies Meta<typeof OgCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  name: "기본형 (홈)",
  // 기본형은 정적 파일(public/og.png)이 정본이라 그 파일을 그대로 보여줘요
  args: { title: "그리디" },
  render: () => (
    // eslint-disable-next-line @next/next/no-img-element -- 스토리 미리보기라 next/image가 필요 없어요
    <img src="/og.png" alt="기본형 OG 카드" width={1200} height={630} />
  ),
};

export const Page: Story = {
  name: "페이지형",
  args: { title: "멤버", sub: "그리디를 함께 만들어 온 사람들이에요" },
};

export const Member: Story = {
  name: "멤버형",
  args: {
    label: "멤버",
    title: "박찬빈",
    sub: "4기 운영진 · FE",
    imageSrc: "https://github.com/INSANE-P.png",
  },
};

export const Project: Story = {
  name: "프로젝트형",
  args: {
    label: "팀 프로젝트",
    title: "세종 줍줍",
    sub: "지도에서 잃어버린 물건을 찾아주는 분실물 서비스예요.",
  },
};

export const Fallback: Story = {
  name: "기본 동적형 (설정 없는 페이지)",
  args: { title: "스터디" },
};
