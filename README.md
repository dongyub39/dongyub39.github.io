# dongyub39.github.io

로보틱스 및 AI 연구자를 위한 개인 포트폴리오 웹사이트

## 기술 스택

- **React 18** + **TypeScript**
- **Vite** (빌드 도구)
- **Tailwind CSS** (스타일링)
- **Framer Motion** (애니메이션)
- **Lucide React** (아이콘)

## 기능

- ✅ 반응형 디자인 (모바일, 태블릿, 데스크톱)
- ✅ 다크 모드 / 라이트 모드 토글
- ✅ Publications 섹션 (Jon Barron 스타일 그리드 레이아웃)
- ✅ Projects 섹션 (Major Projects + Toy Projects)
- ✅ Masonry 레이아웃 갤러리
- ✅ 스무스 스크롤 네비게이션
- ✅ GitHub Pages 자동 배포

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 데이터 수정

### 논문 추가/수정
`src/data/publications.json` 파일을 편집하세요.

### 프로젝트 추가/수정
`src/data/projects.json` 파일을 편집하세요.

### 갤러리 사진 추가/수정
`src/data/gallery.json` 파일을 편집하고, `public/images/gallery/` 폴더에 이미지를 추가하세요.

## 이미지 준비

다음 이미지들을 `public/images/` 폴더에 추가하세요:

- `profile.jpg` - 프로필 사진 (권장: 400x400px 이상)
- `publications/` - 논문 썸네일
- `projects/` - 프로젝트 이미지
- `gallery/` - 갤러리 사진

## GitHub Pages 배포

1. GitHub 리포지토리 설정에서 Pages를 활성화하세요.
2. Source를 "GitHub Actions"로 설정하세요.
3. `main` 브랜치에 푸시하면 자동으로 배포됩니다.

**참고:** `vite.config.ts`의 `base` 경로를 확인하세요. 
- 리포지토리 이름이 `dongyub39.github.io`인 경우: `base: '/'`
- 다른 이름인 경우: `base: '/리포지토리-이름/'`

## 커스터마이징

### 색상 변경
`tailwind.config.js`의 `accent` 색상을 수정하세요.

### 개인 정보 수정
- `src/components/Hero.tsx` - 이름, 소속, 소개, 소셜 링크
- `src/components/Publications.tsx` - `YOUR_NAME` 상수
- `src/components/Footer.tsx` - 연락처 정보

## 라이선스

MIT License
