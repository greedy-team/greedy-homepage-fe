import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";
import { Lightbox } from "./Lightbox";

const meta = {
  title: "컴포넌트/라이트박스",
  component: Lightbox,
  parameters: {
    docs: {
      description: {
        component:
          "사진을 크게 보는 라이트박스예요. 화면을 덮는 만큼 사진 보기에만 쓰고, 남발하지 않아요. ESC·스크림 클릭·✕로 닫고, ←/→와 화살표로 넘겨요. 좁은 화면은 화살표 대신 스와이프예요.",
      },
    },
  },
  argTypes: {
    photos: { description: "src와 alt 쌍의 배열. 한 장이면 화살표가 없어요" },
    initialIndex: { control: "number", description: "처음 보여줄 사진" },
    caption: { control: "text", description: "사진 아래 캡션" },
  },
} satisfies Meta<typeof Lightbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const PHOTOS = [
  { src: "/greedy-emblem.png", alt: "그리디 엠블럼 1" },
  { src: "/greedy-emblem.png", alt: "그리디 엠블럼 2" },
  { src: "/greedy-emblem.png", alt: "그리디 엠블럼 3" },
];

function Opener(props: Omit<React.ComponentProps<typeof Lightbox>, "onClose">) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        사진 크게 보기
      </Button>
      {open && <Lightbox {...props} onClose={() => setOpen(false)} />}
    </>
  );
}

export const Photos: Story = {
  name: "여러 장",
  args: { photos: PHOTOS, caption: "그리디콘 2026 · 팀 프로젝트 발표", onClose: () => {} },
  render: (args) => <Opener photos={args.photos} initialIndex={args.initialIndex} caption={args.caption} />,
};

export const SinglePhoto: Story = {
  name: "한 장 (화살표 없음)",
  args: { photos: PHOTOS.slice(0, 1), caption: "그리디콘 2026", onClose: () => {} },
  render: (args) => <Opener photos={args.photos} caption={args.caption} />,
};
