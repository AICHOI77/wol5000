# AI 자동화 수익 무료 비밀강의 - 랜딩페이지

넷플릭스 UI/UX 디자인의 고전환율 랜딩페이지

## 🚀 빠른 시작

### 로컬 실행

```bash
cd /Users/wol10/Documents/wol5000/app/aisaas/landing
python3 -m http.server 8000
```

브라우저에서 접속: **http://localhost:8000**

## 📁 파일 구조

```
landing/
├── index.html           # 메인 HTML (10개 섹션)
├── style.css            # 넷플릭스 스타일 CSS
├── script.js            # 20가지 전환 효과 JavaScript
├── assets/
│   └── images/
│       ├── images1.png  # 매출 인증 1
│       ├── images2.png  # 시스템 인증 2
│       ├── images3.png  # 12종 선물 템플릿
│       ├── images4.png  # 수강생 사례 1
│       └── images5.png  # 수강생 사례 2
└── README.md
```

## ✅ 구현된 20가지 전환 효과

1. **Hover Gradient CTA** - CTA 버튼 호버 시 그라디언트 애니메이션
2. **Scroll Gradient Background** - 스크롤에 따른 배경 그라디언트 변화
3. **Sequential Reveal** - 요소들 순차적 등장 (IntersectionObserver)
4. **Floating Benefit Bubble** - 떠다니는 혜택 버블 애니메이션
5. **Micro Vibration** - CTA 호버 시 미세 진동 효과
6. **Sticky CTA + Progress Bar** - 스크롤 시 고정 CTA + 진행률 표시
7. **Scroll Triggered CTA** - 스크롤 깊이 30% 이상 시 CTA 표시
8. **Countdown-linked CTA Text** - 15분 카운트다운과 연동된 CTA 텍스트 (localStorage)
9. **Exit Intent Title Blink** - 이탈 의도 감지 시 브라우저 탭 제목 깜빡임
10. **Idle Auto CTA Pop** - 30초 idle 시 자동 팝업 모달
11. **Live Counter Simulation** - 실시간 접속자 수 시뮬레이션 (100-150명)
12. **Toast Notification** - 랜덤 신청 알림 토스트 (한글 이름, 8초 간격)
13. **Proof Auto Slider** - 인증 이미지 자동 슬라이더 (5초 간격)
14. **Dynamic UTM Headline** - UTM 파라미터 기반 헤드라인 동적 변경
15. **Randomized Testimonials** - Fisher-Yates 셔플 후기 슬라이더
16. **ROI Simulator** - 수익 시뮬레이터 모달 (시간당 5만원 계산)
17. **Limited Slots Counter** - 잔여 자리 카운터 (47명 → 감소, 20명 이하 경고)
18. **Revenue Line Graph** - Canvas 기반 Before/After 수익 그래프
19. **Before→After Slide** - Before/After 슬라이더 인터랙션
20. **CTA Double Tap Guard** - 더블클릭 방지 (첫 클릭 확인 → 두 번째 클릭 실행)

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary Black**: `#0b0b0b` (배경)
- **Netflix Red**: `#e50914` (강조, CTA)
- **White**: `#f5f5f5` (텍스트)
- **Dark Gray**: `#1a1a1a` (카드 배경)
- **Medium Gray**: `#333` (보더)

### 타이포그래피
- **폰트**: Noto Sans KR (Google Fonts)
- **제목**: 48px-64px, 굵은 폰트
- **본문**: 18px-20px, 일반 폰트

## 🧪 테스트 명령어

브라우저 콘솔에서 다음 명령어로 각 효과를 테스트할 수 있습니다:

```javascript
// 토스트 알림 테스트
window.testEffects.showToast()

// Idle 팝업 테스트
window.testEffects.showIdlePopup()

// 카운트다운 리셋
window.testEffects.resetCountdown()

// ROI 모달 테스트
window.testEffects.showROIModal()
```

## 📊 섹션 구조

1. **Hero (Section 1)** - 로고, 진행률 93%, 메인 헤드라인, CTA
2. **Timer (Section 2)** - 15분 카운트다운, 실시간 접속자, CTA
3. **Proof (Section 3)** - 5장 인증 이미지 자동 슬라이더
4. **Offer (Section 4)** - 12종 무료 선물 템플릿, 절대 배포 금지 배지
5. **Benefits (Section 5)** - 5가지 혜택 카드, 후기 슬라이더
6. **Seminar (Section 6)** - 3가지 선물, Before/After 그래프, 잔여 자리
7. **Exclusive (Section 7)** - 라이브 전용 콘텐츠, NO/YES 배지
8. **Secrets (Section 8)** - 3가지 비밀 카드
9. **Cases (Section 9)** - 수강생 사례, ROI 시뮬레이터
10. **Final CTA (Section 10)** - 최종 신청 버튼, 카운트다운

## 🌐 배포 방법

### Vercel 배포

```bash
npm i -g vercel
cd /Users/wol10/Documents/wol5000/app/aisaas/landing
vercel
```

### Netlify 배포

```bash
npm i -g netlify-cli
cd /Users/wol10/Documents/wol5000/app/aisaas/landing
netlify deploy --prod
```

### GitHub Pages 배포

1. GitHub 저장소 생성
2. `landing/` 폴더 내용을 저장소에 푸시
3. Settings > Pages > Source를 `main` 브랜치로 설정

## 📱 반응형 디자인

- **Desktop**: 980px 최대 너비
- **Tablet/Mobile**: 768px 이하 반응형 레이아웃
- **모바일 최적화**: 터치 이벤트, 작은 화면 대응

## 🔧 커스터마이징

### 카운트다운 시간 변경
`script.js` 115번째 줄:
```javascript
const COUNTDOWN_DURATION = 15 * 60 * 1000; // 15분 → 원하는 시간으로 변경
```

### 색상 변경
`style.css` 상단의 CSS 변수 수정:
```css
:root {
    --primary-bg: #0b0b0b;
    --netflix-red: #e50914;
    --text-primary: #f5f5f5;
}
```

### 실시간 접속자 범위 변경
`script.js` 236-241번째 줄:
```javascript
let count = 127; // 초기값
count = Math.max(100, Math.min(150, count + change)); // 100-150 범위
```

## 📝 주의사항

- 모든 CTA는 "무료 신청" 형태로 통일됨
- 가격/결제 요소 없음 (무료 세미나 프로모션)
- 카운트다운 타이머는 localStorage 사용 (15분 세션)
- 모든 이미지는 실제 파일로 교체됨 (SVG 폴백 제거)

## 🎯 전환율 최적화 포인트

- **사회적 증거**: 실시간 토스트 알림, 접속자 수
- **희소성**: 카운트다운, 잔여 자리 카운터
- **긴급성**: Exit intent, Idle 팝업
- **신뢰성**: 인증 이미지 슬라이더, 수강생 사례
- **가치 제공**: 12종 무료 선물, ROI 시뮬레이터
- **사용자 경험**: 순차적 등장, 부드러운 애니메이션

---

**제작 완료**: 2025-10-25
**버전**: 1.0.0
**라이선스**: MIT
