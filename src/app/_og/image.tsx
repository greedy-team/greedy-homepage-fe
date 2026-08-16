import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { OG_SIZE, OgCard, type OgCardProps } from "./OgCard";

/** Satori는 외부 파일 참조가 안 돼서 워드마크를 흰색 데이터 주소로 만들어 넘겨요 */
async function wordmarkSrc(): Promise<string> {
  const svg = await readFile(join(process.cwd(), "public/greedy-wordmark.svg"), "utf8");
  const white = svg.replace(/fill="[^"]*"/g, 'fill="#FFFFFF"');
  return `data:image/svg+xml;base64,${Buffer.from(white).toString("base64")}`;
}

function loadFont(file: string): Promise<Buffer> {
  return readFile(join(process.cwd(), "node_modules/pretendard/dist/public/static", file));
}

/**
 * 라우트의 opengraph-image가 쓰는 공통 생성기. 템플릿 슬롯 값만 넘기면 카드가 나와요.
 * OG를 따로 설계하지 않은 새 페이지도 ogImage({ title }) 한 줄이면 기본 동적형 카드를 가져요.
 */
export async function ogImage(props: Omit<OgCardProps, "wordmarkSrc">): Promise<ImageResponse> {
  const [regular, bold, mark] = await Promise.all([
    loadFont("Pretendard-Regular.otf"),
    loadFont("Pretendard-Bold.otf"),
    wordmarkSrc(),
  ]);
  return new ImageResponse(<OgCard {...props} wordmarkSrc={mark} />, {
    ...OG_SIZE,
    fonts: [
      { name: "Pretendard", data: regular, weight: 400, style: "normal" },
      { name: "Pretendard", data: bold, weight: 700, style: "normal" },
    ],
  });
}
