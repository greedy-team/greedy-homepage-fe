// OG 카드는 화면 밖(이미지 생성기)에서 그려져 CSS 토큰이 닿지 않아요.
// tokens.css와 같은 값을 상수로 복사해 써요 (green-600 · green-50).
const COLORS = {
  background: "#017356",
  soft: "#e6f4f0",
  white: "#ffffff",
} as const;

export const OG_SIZE = { width: 1200, height: 630 };

export type OgCardProps = {
  /** 구분 라벨 (예: "멤버", "팀 프로젝트"). 없으면 표시하지 않아요 */
  label?: string;
  title: string;
  /** 한 줄 설명. 없으면 제목이 세로 중앙으로 내려와요 */
  sub?: string;
  /** 오른쪽 원형 이미지(멤버 사진) 주소 */
  imageSrc?: string;
  /** 왼쪽 위 서명으로 쓰는 흰 워드마크 주소 */
  wordmarkSrc: string;
};

/**
 * 링크 공유 카드의 공통 골격이에요. 왼쪽 위 워드마크 서명 + 라벨·제목·설명 슬롯.
 * 장식은 더하지 않고 초대형 제목과 여백이 카드를 채워요. 구성 근거는 Figma "OG 이미지" 섹션에 있어요.
 * ImageResponse(Satori)가 그리는 트리라 flex·절대 배치·단색만 써요.
 */
export function OgCard({ label, title, sub, imageSrc, wordmarkSrc }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: COLORS.background,
        fontFamily: "Pretendard",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- 이미지 생성기 내부라 next/image를 못 써요 */}
      <img src={wordmarkSrc} alt="" style={{ position: "absolute", top: 72, left: 80, height: 36 }} />
      {imageSrc && (
        // eslint-disable-next-line @next/next/no-img-element -- 이미지 생성기 내부라 next/image를 못 써요
        <img
          src={imageSrc}
          alt=""
          width={264}
          height={264}
          style={{ position: "absolute", top: 208, left: 856, borderRadius: 132 }}
        />
      )}
      {label && (
        <div style={{ position: "absolute", left: 82, top: 208, fontSize: 28, fontWeight: 700, color: COLORS.soft }}>
          {label}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: 78,
          top: sub ? (label ? 254 : 262) : 300,
          fontSize: 120,
          fontWeight: 700,
          color: COLORS.white,
        }}
      >
        {title}
      </div>
      {sub && (
        <div style={{ position: "absolute", left: 82, top: 448, fontSize: 32, color: COLORS.soft }}>{sub}</div>
      )}
    </div>
  );
}
