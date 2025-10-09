# 월5000 - AI Agent Platform

자영업 매출증대를 위한 AI 에이전트 모듈 시스템

## 📁 프로젝트 구조

```
wol5000/
├── app/
│   ├── biz/
│   │   └── agent/
│   │       ├── page.tsx    # MVP 통합 랜딩
│   │       ├── reserve/    # 예약 자동화
│   │       ├── shorts/     # 숏츠 마케팅
│   │       ├── traffic/    # 트래픽 플래너
│   │       └── cs/         # CS 자동화
│   └── api/
│       └── agent/          # Agent API 라우트
├── lib/
│   ├── agent-core/         # Agent 파이프라인
│   │   ├── index.ts
│   │   └── actions/
│   ├── analytics.ts        # PostHog/Vercel 래퍼
│   └── supabase.ts
├── configs/
│   └── slots/
│       └── biz.json        # 자영업 슬롯 설정
├── n8n/
│   └── flows/              # n8n 워크플로우
└── supabase-schema.sql     # 데이터베이스 스키마
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Supabase (필수)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# n8n Webhook (선택)
N8N_WEBHOOK_BASE=https://your-n8n-instance.com/webhook

# PostHog Analytics (선택)
POSTHOG_KEY=your_posthog_project_key

# Solapi SMS (선택)
SOLAPI_API_KEY=your_solapi_api_key

# Google Calendar (선택)
CALENDAR_CREDENTIALS=your_google_calendar_credentials

# ConvertKit (선택)
CONVERTKIT_API_KEY=your_convertkit_api_key
```

### 3. 데이터베이스 스키마 적용

Supabase 대시보드의 SQL Editor에서 `supabase-schema.sql` 파일을 실행하세요:

```sql
-- bookings, agent_sessions, audit_logs 테이블 생성
-- leads 테이블에 slot/module 컬럼 추가
-- RLS 정책 및 인덱스 설정
```

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 애플리케이션을 확인할 수 있습니다.

## 📦 모듈 시스템

### Agent Pipeline

모든 모듈은 동일한 파이프라인을 따릅니다:

```
입력 → 검증 → 실행 → 요약
```

**사용 예시:**

```typescript
import { runAgentPipeline } from '@/lib/agent-core'
import { reserveAction } from '@/lib/agent-core/actions/reserve'

const output = await runAgentPipeline(
  {
    slot: 'biz',
    module: 'reserve',
    data: { name, phone, industry, desired_at }
  },
  reserveAction
)
```

### 모듈 목록

#### MVP 통합 페이지
- **경로**: `/biz/agent`
- **기능**: 4가지 에이전트 모듈 통합 랜딩 페이지

#### 1. Reserve (예약 자동화)
- **경로**: `/biz/agent/reserve`
- **기능**: 예약폼 → Supabase 저장 → 알림톡 발송 → 캘린더 등록
- **API**: `POST /api/agent/reserve`
- **n8n**: `n8n/flows/reserve.json`

#### 2. Shorts (숏츠 마케팅)
- **경로**: `/biz/agent/shorts`
- **기능**: 키워드 입력 → 3개 스크립트 생성 → Google Sheets/Airtable 저장
- **액션**: `lib/agent-core/actions/shorts.ts`
- **n8n**: `n8n/flows/shorts.json`

#### 3. Traffic (트래픽 플래너)
- **경로**: `/biz/agent/traffic`
- **기능**: 채널 체크리스트 → 7일/14일 플랜 생성 → UTM 링크
- **액션**: `lib/agent-core/actions/traffic.ts`
- **n8n**: `n8n/flows/traffic.json`

#### 4. CS (CS 자동화)
- **경로**: `/biz/agent/cs`
- **기능**: 3단계 메시지 템플릿 (전날/당일/리마인드) → Solapi 발송
- **액션**: `lib/agent-core/actions/cs.ts`
- **n8n**: `n8n/flows/cs.json`

## 📊 Analytics (KPI 이벤트)

모든 주요 이벤트는 PostHog/Vercel Analytics로 자동 추적됩니다:

```typescript
import { trackLeadSubmitted, trackAgentAction } from '@/lib/analytics'

// Lead 제출
trackLeadSubmitted('biz', 'reserve')

// Agent 액션 완료
trackAgentAction('biz', 'reserve', duration_ms)

// Booking 생성
trackBookingCreated('reserve')

// Webinar 클릭
trackWebinarClick('biz')

// Shorts 플랜 생성
trackShortsPlanGenerated()

// UTM 클릭
trackUTMClick('naver', 'new_customer')
```

## 🔄 n8n 워크플로우 설정

### 1. n8n 인스턴스 설치

```bash
# Docker로 n8n 실행
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### 2. 워크플로우 Import

1. n8n 대시보드 접속 (http://localhost:5678)
2. Workflows → Import from File
3. `n8n/flows/` 디렉토리의 JSON 파일들을 하나씩 import

### 3. Webhook URL 설정

각 워크플로우의 Webhook URL을 `.env.local`에 설정:

```env
N8N_WEBHOOK_BASE=https://your-n8n-instance.com/webhook
```

## 🗄️ 데이터베이스 테이블

### bookings
예약 정보 저장

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID | PK |
| name | TEXT | 예약자 이름 |
| phone | TEXT | 전화번호 |
| industry | TEXT | 업종 |
| desired_at | TIMESTAMPTZ | 희망 일시 |
| status | TEXT | 상태 (pending/confirmed/cancelled) |

### agent_sessions
에이전트 실행 기록

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID | PK |
| slot | TEXT | 슬롯 (biz/startup/njob 등) |
| module | TEXT | 모듈 (reserve/shorts/traffic/cs) |
| input | JSONB | 입력 데이터 |
| output | JSONB | 출력 데이터 |

### audit_logs
발송 로그 및 감사 추적

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID | PK |
| category | TEXT | sms/email/webhook |
| ref_id | UUID | 참조 ID (bookings.id 등) |
| payload | JSONB | 발송 데이터 |
| result | TEXT | 결과 |

## 🚢 배포

### Vercel 배포

```bash
# Vercel 프로젝트 연결 (처음만)
npx vercel link

# 환경변수 설정
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
npx vercel env add SUPABASE_SERVICE_ROLE_KEY
npx vercel env add N8N_WEBHOOK_BASE
npx vercel env add POSTHOG_KEY

# Production 배포
npx vercel --prod
```

## 📝 슬롯 추가하기

새로운 슬롯(예: startup, njob)을 추가하려면:

1. `configs/slots/` 에 새 JSON 파일 생성
2. `app/[slot]/agent/` 디렉토리 구조 복사
3. `configs/slots/[slot].json` 설정 수정
4. 모듈별 액션 파일 수정

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

MIT License

## 📞 지원

문의사항이 있으시면 이슈를 생성해주세요.
