# 디자인 시스템 규칙

UI를 만들 때 지키는 규칙이에요. 페이지가 늘어도 화면이 한 사람 손처럼 보이게 하는 장치예요.

## 토큰

- 색은 토큰만 써요. hex 값을 코드에 직접 쓰지 않아요. 필요한 색이 토큰에 없으면 토큰 추가를 먼저 논의해요.
- 빨강(danger)은 오류 표시에만 써요. 다른 곳에 쓰면 정작 오류가 눈에 띄지 않아요.
- 글자 크기는 8단계만 써요: hero 56, display 40, h1 32, h2 24, h3 20, body 16, body-sm 14, caption 12. 중간 크기가 필요하면 크기 대신 굵기로 조절해요.
- 라운드는 8(입력창), 12(버튼과 카드), 20(사진과 큰 카드), full만 써요.
- 간격은 4의 배수만 써요.
- 이미지 비율은 16:9, 4:3, 1:1만 써요.

## 컴포넌트

- 새 UI를 만들기 전에 `src/shared/ui`에 이미 있는지 확인해요.
- 배리언트는 cva로 `variant`, `size` 프롭을 선언해요. 예: `variant=primary, size=md`.
- 숨기고 보이는 건 감싸는 요소로 제어해요. 컴포넌트에 `className="hidden"`을 줘도 기본 display에 밀려서 숨겨지지 않아요.
- 초록 배경(primary) 버튼은 한 화면에서 한 가지 행동만 가리켜요. 화면에서 제일 밀어주는 행동이 무엇인지 색이 말해줘요. 같은 행동이면 여러 자리에 있어도 괜찮아요.
- 화면 이동은 `a`(Link), 상태 변경은 `button`으로 만들어요. 버튼 모양이어도 이동이면 링크예요.
- 컴포넌트의 상태와 배리언트는 스토리북에서 확인해요.

## 동작

- GNB는 `position: sticky`가 필수예요. 별도 모집 배너 없이 GNB의 버튼이 항상 보인다는 전제로 화면이 설계됐어요.
- 모집 상태는 `src/shared/config/site.ts`의 `IS_RECRUITING` 하나로 처리해요. 자세한 동작은 [ADR 004](adr/004-모집-상태-스위치.md)에 있어요.
- 누르는 것은 눌리는 영역이 최소 44px이에요. 겉모습은 그보다 작아도 되고, 가상 요소로 영역만 넓혀요. 버튼과 칩이 그렇게 하고 있어서 크기를 그냥 써도 지켜져요.
- 누르는 것에는 공통 포커스 링을 붙여요. `src/shared/lib/cn.ts`의 `focusRing`이에요. 키보드로 쓰는 사람이 지금 어디에 있는지 봐야 해요.
- 캐러셀은 자동 재생하지 않아요.
- 화면을 덮는 라이트박스는 사진 크게 보기에만 써요. ESC·스크림 클릭·✕로 닫고, 열리면 포커스를 안에 가두고 닫히면 열었던 자리로 되돌려요.
- 모션은 투명도와 위치만 움직여요. `prefers-reduced-motion`이면 꺼요. 애니메이션 라이브러리는 쓰지 않아요.

## 변경 절차

- 페이지를 구현하면서 디자인 시스템(토큰, `src/shared/ui`)을 같이 고치지 않아요. 페이지 PR에는 페이지 코드만 담아요.
- 컴포넌트 수정이나 추가가 불가피하면 "디자인 시스템 변경" 이슈를 만들고, 그 변경만 담은 별도 PR을 먼저 올려요. 모든 페이지가 함께 쓰는 기반이라 조용히 바꾸면 다른 화면이 깨져요.

## 토큰 목록

토큰의 진실원천은 [src/shared/styles/tokens.css](../src/shared/styles/tokens.css)예요. 아래 표는 읽기 편하게 정리한 사본이에요.

### 색

| 토큰 | 값 | 비고 |
| --- | --- | --- |
| green-50 ~ green-900 | #E6F4F0 ~ #013D2D | 그리디 그린 10단계 |
| white, gray-50 ~ gray-900 | #FFFFFF ~ #171717 | 그레이 (50, 100, 200, 300, 500, 700, 900) |
| red-600 | #DC2626 | 오류 표시 전용 |

Tailwind 기본 팔레트는 꺼 두었어요. 위 토큰 밖의 색 클래스는 아예 동작하지 않아요.

### 시맨틱 별칭

| 토큰 | 참조 | 용도 |
| --- | --- | --- |
| brand | green-600 | 주 행동 버튼, 브랜드 표면 |
| brand-soft | green-50 | 브랜드 배지, 옅은 강조 배경 |
| bg | white | 페이지 배경 |
| surface | gray-50 | 살짝 구분되는 면 (푸터, 스탯 밴드) |
| border | gray-200 | 테두리 |
| text | gray-900 | 본문 글자 |
| text-subtle | gray-500 | 보조 글자 |
| disabled | gray-300 | 비활성 |
| danger | red-600 | 오류 |

### 타이포 8단계

| 토큰 | 크기 | 굵기 | 행간 |
| --- | --- | --- | --- |
| hero | 56 | Bold | 1.2 (랜딩 히어로 전용) |
| display | 40 | Bold | 1.3 |
| h1 | 32 | Bold | 1.35 |
| h2 | 24 | SemiBold | 1.4 |
| h3 | 20 | SemiBold | 1.4 |
| body | 16 | Regular | 1.6 |
| body-sm | 14 | Regular | 1.6 |
| caption | 12 | Regular | 1.5 |

기본 글자 크기 클래스(text-sm 등)도 꺼 두었어요. `text-h2`처럼 토큰 이름으로 써요.

## 컴포넌트 목록

구현된 공용 컴포넌트예요. 상태와 배리언트별 실물은 `pnpm storybook`으로 확인해요.

| 컴포넌트 | 프롭 | 쓰임 |
| --- | --- | --- |
| Button | variant: primary, ghost, white, outline-white / size: sm, md, lg / href, disabled | 행동. href를 주면 버튼 모양의 링크(a)로 렌더링 |
| Badge | variant: solid, brand, outline, neutral, muted | 두 단어 이하의 정보. solid는 진행 중 상태 전용 |
| Card | variant: default, highlight | 목록과 그리드의 콘텐츠 상자 |
| SectionHeader | title, subtitle, moreHref, moreLabel | 섹션 제목 줄. 더보기는 텍스트 링크로만 |
| TextLink | variant: action, back, quiet / href | 글자 링크. 브랜드색은 제안, 무채색은 조용한 이동 |
| ImagePlaceholder | ratio: 16/9, 4/3, 1/1 / label | 이미지 자리. 실제 이미지도 같은 비율 유지 |
| Input | label, helper, error, disabled | 입력창. 라운드 8로 버튼(12)과 구분 |
| Tabs | items, value, onChange | 화면 구획 전환. 활성은 검정 글자 + 초록 밑줄 |
| FilterChip | selected | 목록 필터. 선택되면 초록 배경 |
| Avatar | src, name / size: sm, md, lg | 멤버 얼굴. 사진 없으면 이니셜 |
| AvatarStack | people, max | 겹친 아바타. 넘치면 +n |
| Stat | value, label | 통계 한 칸. 어림 표기 없이 확인된 값만 |
| Carousel | itemClassName | 수동 캐러셀. 한 화면 분량씩 넘기고 도트는 화면 수. 좁은 화면은 스와이프 |
| TimelineItem | date, last | 세로 타임라인 한 칸. 좁은 화면은 도트·라벨이 위로 오고 선이 사라져요 |
| NavArrowButton | direction, onClick, disabled | 한 방향 화살표 버튼 (캐러셀 양옆) |
| PrevNextNav | onPrev, onNext, prevDisabled, nextDisabled | 이전 다음 화살표 쌍 (상세 하단 이동) |
| EmptyState | title, description | 아직 데이터가 없는 자리 |
| Lightbox | photos, initialIndex, caption, onClose | 사진 크게 보기 전용 모달. ESC·스크림·✕로 닫고 ←/→·스와이프로 넘겨요. 남발하지 않아요 |

### 레이아웃 (src/widgets)

| 컴포넌트 | 프롭 | 쓰임 |
| --- | --- | --- |
| Gnb | recruiting | 모든 페이지 상단 고정. 현재 페이지는 검정 + 초록 밑줄, 오른쪽 버튼은 모집 상태를 따라요 |
| MobileMenu | recruiting, pathname | 햄버거와 메뉴 시트. 시트는 바 아래에서 열리고, 반투명 스크림과 ESC로 닫힘 |
| Footer | - | 페이지 하단. 조용한 링크(GitHub, Instagram, 문의하기)만 |
| BottomCta | href, label, caption | 하단 고정 버튼. 모집 중에 랜딩에서만, 쓰는 곳에서 md:hidden으로 좁은 화면 전용 유지 |

### 라운드와 모션

- 라운드: sm 8(입력창), md 12(버튼, 카드), lg 20(사진, 큰 카드), full(배지, 아바타)
- 모션: fast 150ms(호버, 눌림 피드백), base 250ms(등장, 탭 전환), slow 400ms(랜딩 스크롤 진입, 모달)
- 간격은 Tailwind 기본 스케일(4px 단위)을 그대로 써요
