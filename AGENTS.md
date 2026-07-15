<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 그리디 웹사이트 작업 안내

이 레포의 규칙은 주제별 문서에 있어요. 하려는 일에 맞는 문서를 먼저 읽어요.

| 하려는 일 | 먼저 읽어요 |
| --- | --- |
| UI, 페이지, 컴포넌트 작업 | [docs/design-system.md](docs/design-system.md) |
| 폴더 구조, 새 코드를 어디에 둘지 | [ADR 005](docs/adr/005-폴더-구조-축소형-FSD.md) |
| 데이터, API 연동 | [ADR 002](docs/adr/002-데이터는-빌드타임-ISR.md), [ADR 003](docs/adr/003-콘텐츠-코드-분리.md) |
| 모집 상태(지원하기, 알림 받기) 관련 | [ADR 004](docs/adr/004-모집-상태-스위치.md), `src/shared/config/site.ts` |
| 브랜치, 커밋, PR | [CONTRIBUTING.md](CONTRIBUTING.md) |
| 구조에 대한 "왜" | [docs/adr](docs/adr) |

## 항상 지키는 것

- 디자인 시스템(토큰, `src/shared/ui`)은 구현 중에 수정하지 않아요. 불가피하면 "디자인 시스템 변경" 이슈를 만들고 별도 PR로 먼저 올려요.
- 색과 글자 크기는 토큰만 써요. hex 값과 임의 크기를 코드에 직접 쓰지 않아요.
- 데이터와 문구는 컴포넌트 밖에서 와요. 서버에서 올 데이터는 `entities/<도메인>/api`의 함수로, 정적 문구는 `shared/config`나 그 기능 슬라이스에 둬요.
- import는 `app → widgets → features → entities → shared` 한 방향만 흘러요. `features`끼리는 참조하지 않아요. 어기면 lint가 막아요. (자세히는 [ADR 005](docs/adr/005-폴더-구조-축소형-FSD.md))
- 사용자에게 보이는 한국어는 해요체로 통일해요.
