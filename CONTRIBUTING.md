# 기여 가이드

그리디 웹사이트에 기여하는 방법이에요. 처음이라면 순서대로 따라오면 돼요.

## 준비

org 레포를 직접 건드리지 않고, **개인 계정으로 포크한 레포**에서 작업해요.

1. GitHub에서 `greedy-team/greedy-homepage-fe`를 **Fork** 해요.
2. 포크한 레포를 클론하고, 원본을 `upstream`으로 연결해요.

```bash
git clone https://github.com/<내-계정>/greedy-homepage-fe.git
cd greedy-homepage-fe
git remote add upstream https://github.com/greedy-team/greedy-homepage-fe.git

npm i -g pnpm   # pnpm이 없다면 한 번만
pnpm install
pnpm dev
```

패키지 매니저는 pnpm이에요. 버전은 `package.json`의 `packageManager`에 고정되어 있어요.

## 흐름

이슈 → (포크에서) 브랜치 → 포크로 push → upstream에 PR → 리뷰 → squash 머지. 모든 작업은 이슈에서 시작해요.

1. **이슈 만들기** - upstream(org) 레포에 템플릿(기능, 버그, 콘텐츠 갱신, 디자인 시스템 변경) 중 하나로 만들어요.
2. **최신에서 브랜치 따기** - `git fetch upstream && git switch -c 브랜치 upstream/main`. 원본 최신을 기준으로 시작해요.
3. **브랜치 이름** - `feat/12-study-page`처럼 `종류/이슈번호-설명` 형식이에요.
4. **작업하고 커밋하기** - 커밋 컨벤션은 아래를 봐 주세요.
5. **포크로 push** - `git push -u origin 브랜치`. `origin`은 내 포크예요.
6. **PR 올리기** - 내 포크 브랜치에서 upstream `main`으로 PR을 열어요. 템플릿 체크리스트를 채우고 스크린샷을 붙여요.
7. **리뷰 후 squash 머지** - PR 하나가 커밋 하나로 남아요. 히스토리가 그대로 프로젝트 연대기가 돼요.

## 디자인 시스템을 바꿀 때

토큰과 공용 컴포넌트(`src/shared/ui`)는 모든 페이지가 함께 쓰는 기반이에요. 페이지를 구현하면서 같이 고치지 않아요. 페이지 PR에는 페이지 코드만 담아요.

수정이나 추가가 불가피하면 "디자인 시스템 변경" 이슈를 먼저 만들고, 그 변경만 담은 별도 PR로 올려요.

## 기능 추가하기

새 기능은 `src/features/<기능>` 폴더 하나로 격리해서 붙여요. 다른 기능이나 페이지를 건드리지 않아요.

```
src/features/<기능>/
  ui/      화면 (컴포넌트)
  model/   상태·로직 (필요할 때만)
  api/     서버 호출 (필요할 때만)
```

1. `src/features/<기능>` 폴더를 만들고, 필요한 세그먼트(`ui`/`model`/`api`)만 둬요.
2. `shared`(디자인 시스템·유틸)와 `entities`(도메인 데이터)만 가져다 써요. **다른 `features`는 import하지 않아요.**
3. 페이지에 노출하려면 해당 라우트(`src/app/<route>`)에서 기능을 불러 조립해요.

import 방향(`app → widgets → features → entities → shared`)은 lint가 강제해요. 어기면 CI에서 막혀요. 레이어 설명은 [ADR 005](docs/adr/005-폴더-구조-축소형-FSD.md)에 있어요.

## 커밋 컨벤션

conventional commit 형식에 이슈 번호를 붙여요.

```
feat: 스터디 페이지 커리큘럼 타임라인 구현 (#12)
fix: 모바일에서 GNB 버튼이 잘리는 문제 수정 (#15)
chore: CI에 타입 검사 추가 (#3)
```

- 종류: `feat` `fix` `chore` `docs` `refactor` `style` `test`
- 본문 없이 제목 한 문장이 기본이에요. 설명이 필요하면 PR에 적어요.

## 브랜치 규칙

- upstream의 `main`은 보호 브랜치예요. 직접 푸시하지 않고 포크에서 올린 PR로만 합쳐요.
- 브랜치는 내 포크에 만들고 push해요. 포크마다 분리돼 있어 이름이 겹쳐도 충돌하지 않아요.
- 브랜치 이름: `종류/이슈번호-설명`. 소문자 영문과 하이픈만 쓰고, 종류는 커밋 타입과 같고, 설명은 2~3단어로 해요. ex) `feat/1-design-tokens`, `fix/15-gnb-overflow`

## 코드 규칙

UI 규칙(토큰, 컴포넌트, 동작)은 [docs/design-system.md](docs/design-system.md)에 있어요. 데이터를 다루는 방식은 [docs/adr](docs/adr)에, 구조에 대한 "왜"도 거기에 있어요.

## 콘텐츠만 고치고 싶다면

새 기수 멤버 추가, 프로젝트 정보 수정 같은 콘텐츠 갱신은 해당 도메인 데이터(`src/entities/<도메인>`)를 고치고 PR을 올리면 돼요. 직접 고치기 어려우면 "콘텐츠 갱신" 이슈 템플릿으로 남겨 주세요.
