import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";
import { MobileMenu } from "./MobileMenu";

/** 실제 쓰임새처럼 헤더 바와 본문이 있는 화면 안에서 보여줘요. 시트가 열리면 스크림이 본문을 가려요 */
function PhoneScreen({ recruiting }: { recruiting: boolean }) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="relative z-40 flex h-16 items-center justify-between border-b border-border bg-bg px-5">
        <Image src="/greedy-wordmark.svg" alt="그리디" width={90} height={22} />
        <MobileMenu recruiting={recruiting} pathname="/activities" />
      </header>
      <div className="flex flex-col gap-3 p-5" aria-hidden>
        <div className="h-40 rounded-lg bg-gray-100" />
        <div className="h-4 w-3/5 rounded-full bg-gray-100" />
        <div className="h-4 w-2/5 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}

const meta = {
  title: "레이아웃/모바일 메뉴",
  component: MobileMenu,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "좁은 화면의 햄버거 버튼과 메뉴 시트예요. 햄버거를 누르면 시트가 열리고, 반투명 스크림 클릭이나 ESC로 닫혀요. 실제로는 GNB가 md 미만에서 이걸 보여줘요.",
      },
      story: { inline: false, iframeHeight: 460 },
    },
  },
  argTypes: {
    recruiting: { control: "boolean", description: "모집 상태에 따라 시트 버튼이 바뀜" },
  },
  args: { pathname: "/activities" },
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recruiting: Story = {
  name: "모집 중 (햄버거를 눌러 보세요)",
  args: { recruiting: true },
  render: (args) => <PhoneScreen recruiting={args.recruiting} />,
};

export const Idle: Story = {
  name: "평시 (햄버거를 눌러 보세요)",
  args: { recruiting: false },
  render: (args) => <PhoneScreen recruiting={args.recruiting} />,
};
