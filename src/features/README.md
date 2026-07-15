# features

동아리원이 붙이는 기능이 여기에 들어가요. 기능 하나가 폴더 하나예요.

```
features/<기능>/
  ui/      화면
  model/   상태·로직 (필요할 때만)
  api/     서버 호출 (필요할 때만)
```

## 규칙

- `entities`와 `shared`만 가져다 써요. 다른 `features`는 import하지 않아요.
- 자세한 절차는 [CONTRIBUTING.md](../../CONTRIBUTING.md)의 "기능 추가하기"를 봐요.
