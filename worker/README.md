# dongyub39-visit-logger

`dongyub39.github.io`에 방문한 사람의 IP, 국가(및 도시), 접속 경로를 Cloudflare D1에
기록하는 Worker입니다. GitHub Pages는 정적 호스팅이라 자체 로그가 없기 때문에, 이
Worker가 접속용 1x1 투명 픽셀 요청을 받아 기록을 남깁니다.

## 1. 최초 설정 (한 번만)

Cloudflare 계정이 이미 있다는 전제로 진행합니다. `worker/` 디렉토리에서 실행하세요.

```bash
cd worker
npx wrangler login
```

D1 데이터베이스 생성:

```bash
npx wrangler d1 create dongyub39-visits
```

출력된 `database_id` 값을 `wrangler.toml`의 `REPLACE_WITH_DATABASE_ID` 자리에 붙여넣으세요.

테이블 생성:

```bash
npx wrangler d1 execute dongyub39-visits --remote --file=./schema.sql
```

`/stats` 페이지 접근용 비밀번호(토큰) 설정:

```bash
npx wrangler secret put STATS_TOKEN
# 프롬프트가 뜨면 원하는 비밀번호를 입력하세요 (예: 긴 랜덤 문자열)
```

## 2. 배포

```bash
npx wrangler deploy
```

배포가 끝나면 아래와 같은 URL이 출력됩니다:

```
https://dongyub39-visit-logger.<당신의-서브도메인>.workers.dev
```

## 3. 프론트엔드에 연결

레포 루트의 [`src/utils/visitLogger.ts`](../src/utils/visitLogger.ts) 에서
`LOG_ENDPOINT` 값을 위에서 발급된 URL + `/hit`로 교체합니다.

```ts
const LOG_ENDPOINT = 'https://dongyub39-visit-logger.<당신의-서브도메인>.workers.dev/hit'
```

수정 후 커밋 & 푸시하면 GitHub Actions가 사이트를 다시 빌드/배포합니다. 이후부터
사이트에 접속하는 사람의 IP/국가/도시/경로가 D1에 쌓입니다.

## 4. 통계 확인

브라우저에서 아래 주소로 접속하면 국가별 집계와 최근 100건 로그를 볼 수 있습니다.

```
https://dongyub39-visit-logger.<당신의-서브도메인>.workers.dev/stats?token=<STATS_TOKEN에서-설정한-값>
```

JSON으로 받고 싶다면 `&format=json`을 붙이세요.

## 5. 로컬에서 직접 쿼리하기

```bash
npx wrangler d1 execute dongyub39-visits --remote --command "SELECT * FROM visits ORDER BY ts DESC LIMIT 20"
```

## 참고 / 주의사항

- **IP는 개인정보입니다.** `/stats` 토큰은 절대 공개 저장소에 커밋하지 마세요
  (`wrangler secret`으로 관리하므로 코드에는 남지 않습니다). 토큰을 아는 사람만
  로그를 볼 수 있으니 안전하게 보관하세요.
- 필요하면 오래된 로그를 주기적으로 지우는 것을 권장합니다:
  ```bash
  npx wrangler d1 execute dongyub39-visits --remote --command "DELETE FROM visits WHERE ts < datetime('now', '-180 days')"
  ```
- 광고 차단기(uBlock 등)나 브라우저의 트래킹 방지 기능이 픽셀 요청을 막을 수 있어
  실제 방문자 수보다 적게 집계될 수 있습니다. 대략적인 지표로 참고하세요.
