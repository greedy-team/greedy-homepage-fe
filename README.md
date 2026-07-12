# 그리디 웹사이트

세종대학교 개발 동아리 그리디의 공식 웹사이트예요. 그리디가 어떤 동아리인지 소개하고, 함께한 활동과 사람과 프로젝트를 기록해요. 모집 기간에는 지원 창구가 되고, 평시에는 다음 기수 모집 알림을 신청할 수 있어요.

![그리디 웹사이트 미리보기](docs/preview.png)

## 페이지

- **홈** - 그리디의 한 학기(스터디, 코드 리뷰, 팀 프로젝트, 데모데이)와 동아리가 지키는 가치
- **활동** - 밋업, 축제, 데모데이처럼 함께한 순간의 기록
- **멤버** - 함께한 사람들과 각자의 활동 이력
- **스터디** - 트랙별 커리큘럼과 미션, 리뷰로 굴러가는 한 주의 리듬
- **프로젝트** - 팀을 꾸려 만든 서비스들

## 개발

### 실행

```bash
pnpm install
pnpm dev
```

http://localhost:3000 에서 확인해요.

### 기술 스택

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 + cva
- Storybook (디자인 시스템 문서화)
- 렌더링은 빌드 타임 + ISR (매 요청마다 API를 부르지 않아요)

왜 이 조합인지는 [docs/adr](docs/adr)에 기록되어 있어요.

### 폴더 구조

```
src/
  app/              라우트. 조립만 하고 로직은 두지 않아요
  components/
    ui/             디자인 시스템 컴포넌트 (Button, Badge, Card ...)
    layout/         GNB, 푸터처럼 모든 페이지가 쓰는 것
  data/             하드코딩 콘텐츠 (스터디 커리큘럼 등)
  services/         페이지가 데이터를 가져가는 유일한 통로
  api/              백엔드 API 호출과 응답 타입
  lib/              사이트 상수 (모집 상태, 링크)
```

콘텐츠(data)와 코드를 분리한 이유는 [ADR 003](docs/adr/003-콘텐츠-코드-분리.md)에 있어요.

### 문서 지도

| 문서 | 언제 읽나요 |
| --- | --- |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 코드 기여를 시작할 때 |
| [docs/design-system.md](docs/design-system.md) | UI를 만들거나 고칠 때 |
| [docs/adr](docs/adr) | "왜 이렇게 만들었지?"가 궁금할 때 |
| [AGENTS.md](AGENTS.md) | AI 도구로 작업할 때 (위 문서들로 안내하는 역할이에요) |
