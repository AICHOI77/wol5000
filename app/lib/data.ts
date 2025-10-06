// 더미 데이터 - Supabase 연동 전까지 사용

export const heroSlides = [
  {
    title: "강의가 아니라, 월5천 시스템을 받으세요",
    subtitle: "10개의 AI 자동화 시스템. 실행은 AI가 합니다.",
    cta: { label: "무료 진단 신청", href: "#lead" },
  },
  {
    title: "자영업 매출, AI 퍼널이 올립니다",
    subtitle: "마케팅→예약→결제까지 한 번에",
    cta: { label: "내 업종 맞춤 시스템", href: "#systems" },
  },
  {
    title: "퇴근 후에도 수익이 멈추지 않는 구조",
    subtitle: "AI가 대신 실행합니다",
    cta: { label: "5천 패키지 구성 보기", href: "#bundle" },
  },
];

export const iconMenus = [
  { label: "무료강의 일정", href: "#schedule", icon: "📅" },
  { label: "얼리버드 진행중", href: "#earlybird", icon: "🚀" },
  { label: "수강후기", href: "#reviews", icon: "⭐" },
  { label: "전자책", href: "#ebook", icon: "📚" },
  { label: "수익 인증", href: "#proof", icon: "💰" },
  { label: "강사진", href: "#teachers", icon: "👥" },
  { label: "커뮤니티", href: "#community", icon: "💬" },
  { label: "시스템 세팅", href: "#setup", icon: "⚙️" },
];

export const freeShows = [
  {
    thumb: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop",
    title: "AI 자영업 퍼널 라이브 데모",
    tag: "무료",
    description: "실시간으로 퍼널 생성부터 수익화까지",
  },
  {
    thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    title: "쿠팡 제휴 자동화 30분 세팅",
    tag: "무료",
    description: "수익 자동화 시스템 완성",
  },
  {
    thumb: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=225&fit=crop",
    title: "병원 예약봇 퍼널 공개",
    tag: "무료",
    description: "업종별 맞춤 시스템 구축",
  },
  {
    thumb: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop",
    title: "5천 패키지 Q&A",
    tag: "무료",
    description: "모든 궁금증을 해결해드립니다",
  },
  {
    thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=225&fit=crop",
    title: "N잡러를 위한 자동화 세팅",
    tag: "무료",
    description: "퇴근 후 수익 시스템",
  },
  {
    thumb: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop",
    title: "1인 사업자 수익 구조 설계",
    tag: "무료",
    description: "AI가 만드는 수익 모델",
  },
];

export const schedule = [
  {
    date: "2025-10-12",
    title: "AI 구매대행 무료 클래스",
    tag: "웹세미나",
    time: "20:00",
  },
  {
    date: "2025-10-19",
    title: "해외 소스 수익화 프로젝트",
    tag: "워크샵",
    time: "15:00",
  },
  {
    date: "2025-10-21",
    title: "고마진 프로젝트 실습",
    tag: "실습",
    time: "19:00",
  },
  {
    date: "2025-10-26",
    title: "영상편집 외주 자동화",
    tag: "클래스",
    time: "14:00",
  },
];

export const teachers = [
  {
    name: "최대표",
    role: "AI 시스템 아키텍트",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
    expertise: "시스템 설계 · AI 자동화",
  },
  {
    name: "파트너 A",
    role: "자영업 퍼널 전문가",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
    expertise: "퍼널 설계 · 전환율 최적화",
  },
  {
    name: "파트너 B",
    role: "콘텐츠 자동화",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop",
    expertise: "콘텐츠 생성 · 배포 자동화",
  },
  {
    name: "파트너 C",
    role: "예약/결제봇",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
    expertise: "결제 시스템 · 예약 자동화",
  },
  {
    name: "파트너 D",
    role: "CRM/리포트",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    expertise: "고객관리 · 데이터 분석",
  },
];

// 카테고리별 데이터 (5개 하위 페이지용)
export const categories = {
  biz: {
    title: "자영업 매출, AI 퍼널이 한 번에 올립니다.",
    subtitle: "마케팅→예약→결제 자동화. 사람 대신 시스템이 일합니다.",
    systems: [
      {
        thumb: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=225&fit=crop",
        title: "병원 예약 자동화",
        tag: "퍼널",
        description: "상담→예약→결제까지 자동 연결"
      },
      {
        thumb: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=225&fit=crop",
        title: "미용실 예약봇",
        tag: "챗봇",
        description: "카톡으로 예약 자동 접수"
      },
      {
        thumb: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=225&fit=crop",
        title: "인테리어 리드봇",
        tag: "리드",
        description: "상담 문의를 자동 수집·분류"
      },
      {
        thumb: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=225&fit=crop",
        title: "리뷰/CRM 자동화",
        tag: "CRM",
        description: "고객 관리부터 후기까지 자동화"
      },
    ],
  },
  startup: {
    title: "아이템 없이도 창업 가능합니다.",
    subtitle: "'월5천 시스템' 10개를 그대로 세팅해 드립니다.",
    systems: [
      {
        thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=225&fit=crop",
        title: "AI 사주/타로",
        tag: "SaaS",
        description: "AI 상담 시스템 패키지"
      },
      {
        thumb: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=225&fit=crop",
        title: "AI 강의 시스템",
        tag: "에듀",
        description: "자동 강의 판매 플랫폼"
      },
      {
        thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
        title: "랜딩/결제 자동화",
        tag: "퍼널",
        description: "광고→결제까지 자동 세팅"
      },
      {
        thumb: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop",
        title: "유튜브 자동화",
        tag: "콘텐츠",
        description: "쇼츠 생성부터 업로드까지"
      },
    ],
  },
  njob: {
    title: "퇴근 후에도 수익이 멈추지 않는 구조.",
    subtitle: "AI가 대신 실행합니다. 제휴·콘텐츠·예약 자동화.",
    systems: [
      {
        thumb: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=225&fit=crop",
        title: "쿠팡 제휴봇",
        tag: "제휴",
        description: "자동 상품 추천·링크 생성"
      },
      {
        thumb: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=225&fit=crop",
        title: "블로그 자동 포스팅",
        tag: "콘텐츠",
        description: "AI 글 작성→예약 발행"
      },
      {
        thumb: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=225&fit=crop",
        title: "쇼츠 자동 업로드",
        tag: "영상",
        description: "AI 편집→유튜브 자동 업로드"
      },
      {
        thumb: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop",
        title: "미니 예약 퍼널",
        tag: "퍼널",
        description: "간단 서비스 예약 자동화"
      },
    ],
  },
  coin: {
    title: "당신의 자금이 AI 안에서 일하게 하세요.",
    subtitle: "리스크 경고를 전제로, 데이터 리포트/알림 자동화 중심.",
    disclaimer: "⚠️ 투자 손실 위험 존재. 리포트·알림 자동화 도구로만 활용하세요.",
    systems: [
      {
        thumb: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop",
        title: "가격·뉴스 알림봇",
        tag: "리포트",
        description: "주요 지표 실시간 모니터링"
      },
      {
        thumb: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=225&fit=crop",
        title: "루틴 리밸런싱 알림",
        tag: "알림",
        description: "포트폴리오 조정 알림"
      },
      {
        thumb: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
        title: "지갑 흐름 모니터",
        tag: "데이터",
        description: "온체인 자금 흐름 추적"
      },
      {
        thumb: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=225&fit=crop",
        title: "백테스트 리포트",
        tag: "리서치",
        description: "전략 검증 자동화"
      },
    ],
  },
  agent: {
    title: "AI Agent를 '고용'하세요.",
    subtitle: "CS봇·세일즈봇·예약봇·콘텐츠봇을 한 곳에서 세팅.",
    systems: [
      {
        thumb: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=225&fit=crop",
        title: "CS 에이전트",
        tag: "CS",
        description: "24시간 고객 응대 자동화"
      },
      {
        thumb: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop",
        title: "스텔스 세일즈 에이전트",
        tag: "세일즈",
        description: "자연스러운 상담→전환"
      },
      {
        thumb: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=225&fit=crop",
        title: "예약 에이전트",
        tag: "예약",
        description: "일정 조율 자동 처리"
      },
      {
        thumb: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop",
        title: "콘텐츠 에이전트",
        tag: "콘텐츠",
        description: "AI 콘텐츠 생성·배포"
      },
    ],
  },
};

// 후기/사례 데이터
export const dummyTestimonials = [
  {
    name: "김** 원장",
    quote: "광고→예약→결제가 하루 만에 연결됐습니다. 상담 전화가 90% 줄었어요.",
    tag: "자영업",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    name: "박** 대표",
    quote: "10개 시스템 세팅 후 운영이 정말 가벼워졌어요. 이제 콘텐츠만 집중합니다.",
    tag: "창업",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    name: "이** 직장인",
    quote: "퇴근 후에도 AI가 수익을 만들어줍니다. 정말 자동화가 되네요.",
    tag: "N잡",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  },
  {
    name: "최** 프리랜서",
    quote: "쿠팡 제휴 수익이 매달 자동으로 들어옵니다. 세팅은 단 30분.",
    tag: "N잡",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
];

// TODO: Supabase 테이블 설계
// leads(id, name, phone, interest, category, created_at)
// events(id, title, date, tag, time)
// instructors(id, name, role, img_url, expertise)
// categories(id, slug, title, subtitle, disclaimer)
// systems(id, category_id, thumb, title, tag, description)
// testimonials(id, name, quote, tag, avatar, created_at)
