# AI 시스템 플랫폼 - 월5천 AI 자동화 시스템

넷플릭스 스타일의 블랙·레드 컬러 시스템으로 구현된 AI 시스템 세팅 플랫폼 랜딩 페이지입니다.

## 🎨 디자인 시스템

- **배경**: #000000 (블랙)
- **포인트**: #E50914 (넷플릭스 레드)
- **서브**: #B3B3B3 (라이트 그레이)
- **텍스트**: #FFFFFF (화이트)
- **폰트**: Pretendard, Inter, system-ui

## 🚀 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: TailwindCSS
- **아이콘**: lucide-react
- **배포**: Vercel
- **DB (예정)**: Supabase

## 📦 설치 및 실행

### 1. 프로젝트 클론/다운로드

```bash
cd ai-system-platform
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. 빌드

```bash
npm run build
npm start
```

## 📂 프로젝트 구조

```
ai-system-platform/
├── app/
│   ├── components/
│   │   ├── header.tsx              # 헤더 (메뉴, 로그인)
│   │   ├── hero-carousel.tsx       # 히어로 슬라이딩 배너
│   │   ├── icon-grid.tsx           # 아이콘 메뉴 그리드
│   │   ├── rail-carousel.tsx       # 넷플릭스형 가로 스크롤
│   │   ├── earlybird-banner.tsx    # 얼리버드 배너
│   │   ├── calendar-list.tsx       # 달력 + 일정 리스트
│   │   ├── teachers-slider.tsx     # 강사진 슬라이더
│   │   └── footer-cta.tsx          # CTA + 마키 + 푸터
│   ├── lib/
│   │   ├── data.ts                 # 더미 데이터
│   │   └── supabase.ts             # Supabase 설정 (확장용)
│   ├── api/
│   │   └── leads/route.ts          # 리드 수집 API
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 주요 기능

### 1. 히어로 섹션
- 3개 슬라이드 자동 재생 (5초 간격)
- 키보드 내비게이션 (좌우 화살표)
- 인디케이터 페이징

### 2. 아이콘 그리드
- 8개 주요 서비스 메뉴
- 반응형 레이아웃 (모바일 2열, 데스크톱 4열)
- 호버 애니메이션

### 3. 넷플릭스형 카루셀
- 가로 스크롤 (드래그, 마우스 휠)
- 호버 시 플레이 버튼 오버레이
- 무료 강의 6개 카드

### 4. 얼리버드 배너
- 풀배너 레드 배경
- 애니메이션 효과
- 할인율 뱃지 (펄스 애니메이션)

### 5. 강의 일정
- 좌측: 인터랙티브 달력 (월 전환)
- 우측: 일정 리스트 (태그, 시간 표시)

### 6. 강사진 슬라이더
- 5명 전문가 프로필
- 가로 스크롤 네비게이션
- 호버 효과

### 7. CTA 섹션
- 대형 액션 배너
- 키워드 마키 애니메이션
- 푸터 정보

## 🔌 API 엔드포인트

### POST /api/leads
리드 수집 (무료 진단 신청)

**요청 예시:**
```json
{
  "name": "홍길동",
  "phone": "010-1234-5678",
  "interest": "자영업 퍼널"
}
```

**응답 예시:**
```json
{
  "success": true,
  "message": "신청이 완료되었습니다. 곧 연락드리겠습니다.",
  "data": {
    "name": "홍길동",
    "interest": "자영업 퍼널"
  }
}
```

## 🚀 Vercel 배포

### 1. GitHub 레포지토리 생성

```bash
git init
git add .
git commit -m "Initial commit: AI System Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-system-platform.git
git push -u origin main
```

### 2. Vercel 배포

1. [Vercel](https://vercel.com) 접속 및 로그인
2. "New Project" 클릭
3. GitHub 레포지토리 선택 (ai-system-platform)
4. 프로젝트 설정:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. "Deploy" 클릭

### 3. 도메인 연결

#### Vercel에서:
1. 프로젝트 Settings → Domains
2. 커스텀 도메인 추가 (예: ai5000.kr)
3. DNS 설정 정보 확인

#### Cloudflare에서:
1. DNS 관리 → CNAME 레코드 추가
   - Type: `CNAME`
   - Name: `@` (또는 www)
   - Target: `cname.vercel-dns.com`
   - Proxy status: DNS only (회색 구름)
2. SSL/TLS 설정 → Full
3. 전파 대기 (최대 48시간, 보통 몇 분)

## 🔧 환경 변수 (Supabase 연동 시)

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 📊 Supabase 테이블 설계

```sql
-- leads 테이블
create table leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  interest text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- events 테이블
create table events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  date date not null,
  time text,
  tag text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- instructors 테이블
create table instructors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  img_url text,
  expertise text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS 설정
alter table leads enable row level security;
create policy "Enable insert for all users" on leads
  for insert with check (true);
```

## 🔗 n8n 자동화 워크플로우

### 리드 수집 워크플로우
1. **Webhook 수신** → POST /api/leads 호출
2. **Supabase Insert** → leads 테이블 저장
3. **Slack 알림** → #leads 채널 알림 발송
4. **Calendly 링크 발송** → 이메일/SMS 자동 발송
5. **CRM 등록** → 자동 고객 등록

## 🎨 UI 스크린샷 생성

개발 서버 실행 후 다음 섹션 캡처:

1. **Hero**: `http://localhost:3000#hero`
2. **Icons**: `http://localhost:3000#icons`
3. **Free Shows**: `http://localhost:3000#free-shows`
4. **Earlybird**: `http://localhost:3000#earlybird`
5. **Schedule**: `http://localhost:3000#schedule`
6. **Teachers**: `http://localhost:3000#teachers`

## 📝 TODO (확장 기능)

- [ ] 리드 수집 폼 모달 구현
- [ ] Supabase 실제 연동
- [ ] n8n Webhook 연동
- [ ] 강사진 상세 페이지
- [ ] 강의 예약 시스템
- [ ] 로그인/회원가입 기능
- [ ] 관리자 대시보드
- [ ] SEO 최적화 (메타태그, 스키마)
- [ ] Google Analytics 연동
- [ ] 다국어 지원 (i18n)

## 🔄 중 카테고리 확장

같은 템플릿으로 다른 타겟 대상 페이지 생성:

```
/jaeyungeop     # 자영업
/changup        # 창업
/njob           # N잡
/senior         # 시니어
/tuza           # 투자
```

각 페이지는 카피와 이미지만 교체하면 됩니다.

## 📄 라이선스

MIT License

## 👨‍💻 개발자

AI5000 Platform Team

---

**문의**: contact@ai5000.kr
