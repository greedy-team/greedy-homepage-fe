# entities

도메인 데이터와 그 타입이 여기에 들어가요. `project`, `member`, `activity`처럼 하나가 폴더 하나예요.

```
entities/<도메인>/
  api/     데이터를 가져오는 함수 (지금은 정적, 명세 확정 후 fetch)
  model/   타입
  ui/      그 도메인 전용 표시 (예: 프로젝트 카드)
```

## 규칙

- `shared`만 가져다 써요.
