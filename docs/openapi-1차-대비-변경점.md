# API 명세 변경점 — 1차 초안 대비

이 문서는 **1차 초안**(그리디 허브 마이그레이션 레포 `docs/openapi.yaml`, 0.1.0-draft, 2026-07-14 ERD 정합본)과
**현재 확정안**(이 레포 [docs/openapi.yaml](openapi.yaml), 0.2.0-draft)의 차이를 정리해요.

왜 바뀌었나요: 1차 초안 이후 프론트가 세 도메인 전부 **실제 fetch·병합·화면 렌더까지 구현을 끝냈어요**
(MSW 목서버로 1차 스펙대로 응답을 흉내 내서 검증). 그 과정에서 "스펙엔 있지만 화면이 안 쓰는 것",
"스펙대로면 데이터가 유실되는 것", "수급이 불가능한 것"이 드러나서 반영했어요.
**이제 이 레포의 openapi.yaml이 기준이고, 마이그레이션 레포 것은 더 이상 안 고쳐요.**

## §1 공통 — 변경 없음

- 목록 응답: 1차는 `{ "items": [...] }` 객체 래핑이었지만 **배열을 그대로 반환**으로 바꿨어요(래핑은 백엔드가 확정한 게 아니라 초안에서 온 예측이라, 단순한 배열로 정리).
- 목록에 필터 파라미터 없음, 필터링·정렬은 프론트 담당 → 그대로.
- 읽기 GET만, 쓰기는 Phase 2 → 그대로.
- 에러 응답 형태(`{ error: { code, message } }`) → 그대로.

1차에 기록돼 있던 다음 결정들도 그대로 유지돼요(새 기준 문서에 승계):

- **stats(홈 통계)·study(커리큘럼)는 백엔드 제외** — 프론트 파생값·상수로 처리(2026-07-14 확정).
- **기수는 generationNumber(정수)로만 노출** — Generation 엔티티는 백엔드 내부 유지, API엔 숫자만.
- **projectType(FESTIVAL/TASK_FORCE/GENERATION)은 응답 제외** — 백엔드 내부 분류, 화면 미사용.

## §2 projects

| 항목 | 1차 | 현재 | 이유 |
| --- | --- | --- | --- |
| 목록 응답 스키마 | `ProjectSummary`(5필드 축소판) | **`ProjectDetail` 전체** | 프로젝트가 6건뿐이라 절약 효과가 없고, 프론트 병합 로직이 목록에서도 상세 필드(스택·팀원 등)를 써요. 목록·상세 스키마가 같으면 백엔드 구현도 DTO 하나로 끝나요. |
| `backendStack`/`frontendStack` | 닫힌 enum (Java·Spring Boot·MySQL·PostgreSQL·Redis 등) | **자유 문자열로 소비**(enum도 허용) | 우리 dto.ts는 `string[]`로 받아요. enum 유지해도 괜찮은데 두 조건이 필요해요: ① enum 값에 우리 실데이터 스택이 다 있어야 함(JPA·QueryDSL·Flyway·MOTIS·OpenAI API·Kakao Maps API·Leaflet·Storybook — 빠지면 응답에서 유실). ② 직렬화 값이 표시용이어야 함(`SPRING_BOOT` 말고 "Spring Boot") 또는 프론트가 라벨 매핑. 상세는 §5-1. |
| `id` 배정 | 언급 없음 | **1~6 고정** (따라행=1, 모꼬지=2, 슬기로운 세종생활=3, 세종 줍줍=4, 두구두구=5, MeetLink=6) | 프론트가 URL 슬러그↔백엔드 id 매핑표를 하드코딩해요. 시드 데이터를 이 순서로 넣어야 해요. |
| `mainFunction` | nullable 문자열 | 그대로 (단, **프론트 미사용** 명시) | 화면의 기능 소개는 불릿 리스트인데 백엔드는 한 문장뿐이라, 화면은 프론트 큐레이션을 써요. 필드 자체는 유지 — 나중에 리스트로 바뀌면 쓸 수 있어요. |
| `ProjectImage` 엔티티 신설 요청 | 신설 요청으로 기재 | **요청 철회(흡수)** | API가 요구하는 건 `imageUrls: string[]` 응답뿐이에요. 이미지를 별도 엔티티로 저장할지 `List<String>`으로 저장할지는 백엔드 내부 선택 — 계약에서 강제하지 않아요. |
| 그 외 필드 전부 | — | 변경 없음 | purpose·siteUrl·양쪽 GithubUrl·imageUrls·memberPreview(외부 기여자=memberId null 포함) 그대로 검증 완료. |

## §3 members

| 항목 | 1차 | 현재 | 이유 |
| --- | --- | --- | --- |
| `GET /members/{id}` (상세) | 있음 (숫자 PK 또는 깃허브 슬러그) | **스펙에서 제외** | 프론트 멤버 페이지 URL이 이름 기반이라 백엔드 id와 연결고리가 없어요. 46명 전체 목록을 한 번 받아 이름으로 매칭하는 게 매핑표 관리보다 단순해요. 상세에만 있던 `description`(자기소개)·`teamProjects`(참여 프로젝트 조인)는 지금 화면이 안 써서 같이 빠졌어요 — **Phase 2(로그인 자기편집)에서 되살릴 가치가 있으니 백엔드 저장 필드는 유지 추천.** |
| `name` | 일반 필드 | **매칭 키로 승격** | 프론트가 이름으로 큐레이션과 병합해요. 노션 명단 표기와 정확히 일치해야 하고, 동명이인이 생기면 그때 id 매핑표를 프론트에 추가해요. |
| `ActivityType` enum | 회장·영입리드 없음 (⚠️로 표시만) | 동일 — **추가 여부 확인 요청** | 현재 화면의 역할 표기(회장, 운영진, 영입리드, 리드+리뷰어 겸임 등)는 이 enum으로 표현이 안 돼서, 프론트가 큐레이션 문구를 그대로 쓰고 있어요. CLUB_LEAD 등이 추가되면 백엔드 값으로 대체 가능해요. |
| 기수별 트랙 (`MemberActivity.stackPosition`) | 신설 요청으로 기재 | 동일 — **여전히 요청 상태** | "2기 FE → 3기 BE" 같은 이력이 `mainStackPosition` 하나로는 복원 불가. 이게 없으면 멤버 카드의 기수·트랙 이력은 계속 큐레이션 유지예요. |
| 백엔드 명단에 없는 사람 | 언급 없음 | **문제없음 명시** | 화면에는 백엔드 명단 밖 인원(외부 리뷰어 10명)도 있어요. 매칭 안 되면 큐레이션 그대로 나가는 구조라 백엔드가 신경 쓸 필요 없어요. |
| 나머지 목록 필드 | — | 변경 없음 | id·githubUrl·imageUrl·mainStackPosition·departments·memberActivities 형태 그대로. 실명단 46명 데이터로 검증 완료. |

## §4 activities — 사실상 재설계

활동은 1차 초안 때 백엔드 구현 전이었고 지금도 전이에요. 그 사이 데이터 수급 방식이
"디스코드 채널에서 파싱"으로 정해지면서, **안정적으로 얻을 수 없는 필드를 전부 뺐어요.**
이 스키마는 프론트의 확정 제안이고, 백엔드 컨펌이 필요해요.

| 항목 | 1차 | 현재 | 이유 |
| --- | --- | --- | --- |
| `GET /activities/{id}` (상세) | 있음 | **스펙에서 제외** | 멤버와 같은 이유 — 프론트가 목록을 받아 제목으로 매칭해요. 목록 항목에 상세 필드까지 다 있어서 별도 상세 조회가 필요 없어요. |
| `tag` (행사/세션/데모데이…) | enum | **삭제** | 화면이 안 써요(타임라인에 태그 표시 없음). |
| `generationNumber` | 있음 (기수 탭 필터용) | **삭제** | 기수 탭 필터를 화면에서 안 만들기로 했어요. |
| `summary` (목록용 요약) | 있음 | **삭제** | 디스코드 본문에서 별도 요약문을 안정적으로 뽑을 수 없어요. 목록 카드는 제목·날짜·대표사진만 써요. |
| `location` | nullable | **삭제** | 디스코드에서 구조화된 장소 값을 뽑을 수 없어요. |
| `participants` | 배열 | **삭제** | 같은 이유. 참가자 명단·아바타 표시는 화면에서 제거했어요. |
| `date` ("2026.05" 문자열) | 표시용 문자열 | **`startDate`/`endDate`** (ISO `YYYY-MM-DD`) | 표시 형식은 프론트가 파생하는 게 맞아요(목록 "2026.07", 상세 "2026년 7월 4일" 둘 다 startDate에서 만듦). 단일 날짜는 startDate=endDate. |
| `images` (`{id, url, sortOrder}` 객체 배열) | 있음 | **`imageUrls` 문자열 배열** | 정렬은 배열 순서로 충분해요. 객체 래핑·sortOrder 관리 불필요. |
| `title` | — | **`name`으로 개명** | member·project와 네이밍 통일. 프론트 매칭 키(제목 정확 일치 필요). |
| `imageCount`·`thumbnailUrls`(앞 3장) | 목록용 파생 필드 | **삭제, `thumbnailUrl` 1장** | 목록 카드가 대표사진 1장만 써요. |

## §5 백엔드에 확인이 필요한 것 (요약)

> 2026-07-20 백엔드 엔티티 PR(greedy-homepage-be #4, 머지 전)과 대조한 결과를 반영했어요.
> 그 PR은 **DB 엔티티 계층**이라 API 응답(DTO) 형태는 아직 안 정해졌어요 — 목록 래핑·상세 스키마 통일·
> 내부/외부 구분 같은 응답 관련 항목은 DTO/컨트롤러 PR 나올 때 같이 확인하면 돼요.
> Activity 엔티티는 우리 §4 제안(name·description·startDate·endDate + 이미지 분리)과 **정확히 일치**해요.

구현 전 컨펌 필요:

1. **[projects] backendStack/frontendStack enum 값·표시 라벨 확인** (§2) — enum 유지는 괜찮아요.
   다만 두 가지만: ① enum 값에 우리 실데이터 스택이 다 들어가야 해요(JPA·QueryDSL·Flyway·MOTIS·
   OpenAI API·Kakao Maps API·Leaflet·Storybook 등 — 빠지면 그 스택이 응답에서 사라짐).
   ② 직렬화 값이 표시용이면(`SPRING_BOOT` 아니라 "Spring Boot") 프론트가 그대로 쓰고, 아니면
   프론트에서 라벨 매핑표를 만들면 돼요. **현재 백엔드 enum은 비어 있음(`//Todo`)** — 채울 때 이 목록 반영 요청.
2. **[projects] id 1~6 고정 시드** (§2) — 프론트 슬러그↔id 매핑표와 맞물려요.
3. **[activities] 재설계 스키마 전체 컨펌** (§4) — 엔티티는 이미 일치. DTO도 이 필드셋 유지되는지만 확인.
4. **[공통] 목록 응답이 상세 스키마 그대로**(projects), **상세 엔드포인트 제외**(members·activities)로 가도 되는지 (§2·§3·§4). DTO PR 때.
5. **[projects] 팀원 응답에서 내부 멤버 / 외부 기여자 구분 가능 여부** (§2) — 백엔드는 member(NOT NULL)와
   external_contributor를 분리해 저장하는데(저장 방식은 백엔드 몫), **응답에서 둘을 구분만 할 수 있으면** 돼요.
   프론트가 그걸로 '외부' 뱃지·프로필 링크 유무를 정해요.

프론트가 따라가면 되는 것(백엔드 결정 나오면 프론트 반영):

6. **[members] StackPosition에 DESIGN 추가됨** — 백엔드가 DESIGN을 응답에 쓰면 따라가요. 프론트에 매핑
   한 줄(project/api.ts `STACK_POSITION_TO_MEMBER_POSITION`) 추가하고 디자이너 표기(예: "디자인")만 정하면 돼요.

당장 구현엔 안 걸리지만 답을 알아야 하는 것:

7. **[members] MemberRole에 회장(CLUB_LEAD)·영입리드 등 추가 여부** — 안 되면 역할 표기는 계속 프론트 큐레이션 (§3).
   (백엔드가 MemberActivityType → **MemberRole**로 개명함. 현재 값은 1차와 동일.)
8. **[members] MemberAction.stackPosition(기수별 트랙) 신설 여부** — 기존 요청 유지 (§3).
   (백엔드가 MemberActivity 엔티티 → **MemberAction**으로 개명함. 아직 stackPosition 없음.)
9. **[members] description·teamProjects 유지 여부** — description은 **Member 엔티티에 이미 있음**(확인됨).
   teamProjects(참여 프로젝트 조인)는 응답에 포함될지 DTO PR 때 확인. Phase 2 대비 (§3).
10. **[공통] Department enum 실제 학과 목록 확정** — 백엔드도 현재 비어 있음(`//Todo`).
11. **[공통] 이미지 URL의 호스트(도메인) 확정** — thumbnailUrl·imageUrl 등이 어떤 도메인(S3 버킷 주소 등)으로
    나올지 알려주세요. 프론트의 next/image는 허용 도메인을 빌드 설정에 미리 등록해야 해서(next.config.ts
    `remotePatterns`), 도메인이 확정돼야 이미지가 화면에 떠요. mock으로 미리 검증 불가능한 부분이라
    **실제 이미지 URL이 나오는 즉시 공유가 필요해요.**

참고 — 백엔드 내부 사항(우리 계약과 무관하지만 발견해서 공유):

- `ExternalMember` 엔티티에 `stackPosition` 필드가 있는데 `V1__init.sql`의 `external_member` 테이블엔 해당 컬럼이 없어요(entity↔schema 불일치). `ddl-auto: none`이라 실행 시 어긋날 수 있어요.
- 백엔드가 imageUrls를 별도 엔티티(ActivityImage·ProjectImage)로 분리했는데, 우리 계약은 `imageUrls: string[]` 응답만 요구해요 — 저장 방식은 백엔드 자유라 문제없어요.
