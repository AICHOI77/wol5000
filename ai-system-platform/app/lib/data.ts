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

// TODO: Supabase 테이블 설계
// leads(id, name, phone, interest, created_at)
// events(id, title, date, tag, time)
// instructors(id, name, role, img_url, expertise)
