import { categories, dummyTestimonials } from '@/app/lib/data'
import CategoryHero from '@/app/components/category-hero'
import SystemRail from '@/app/components/system-rail'
import Testimonials from '@/app/components/testimonials'
import LeadForm from '@/app/components/lead-form'
import Header from '@/app/components/header'

export const metadata = {
  title: 'AI Agent 고용 시스템 - AI5000',
  description: 'CS봇, 세일즈봇, 예약봇, 콘텐츠봇을 한 곳에서 세팅하세요. AI Agent를 직원처럼 고용합니다.',
}

export default function AgentPage() {
  const cat = categories.agent

  return (
    <>
      <Header />
      <main className="bg-black text-white pt-16 lg:pt-20">
        {/* Hero */}
        <CategoryHero
          title={cat.title}
          subtitle={cat.subtitle}
          ctaText="AI Agent 고용하기"
          ctaHref="#lead"
        />

        {/* 추천 시스템 */}
        <section id="systems" className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-3xl font-bold mb-6">
            고용 가능한 <span className="text-[#E50914]">AI Agent</span>
          </h2>
          <SystemRail items={cat.systems} />
        </section>

        {/* 실사용 후기 */}
        <section className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            AI Agent 도입 <span className="text-[#E50914]">성과</span>
          </h2>
          <Testimonials items={dummyTestimonials} />
        </section>

        {/* 리드 폼 */}
        <section id="lead" className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          <LeadForm category="agent" />
        </section>

        {/* CTA 배너 */}
        <div className="bg-gradient-to-r from-[#E50914] via-red-600 to-[#E50914] text-white text-center py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h3 className="text-3xl lg:text-4xl font-bold">
              AI Agent를 <span className="text-black">'직원'처럼</span> 고용하세요.
              <br />
              24시간 쉬지 않고 일합니다.
            </h3>
            <p className="text-xl">AI Agent 고용 패키지 - 월5천원</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="#lead"
                className="bg-black hover:bg-neutral-900 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105"
              >
                무료 진단 신청
              </a>
              <a
                href="/bundle"
                className="bg-white hover:bg-neutral-100 text-[#E50914] px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105"
              >
                Agent 구성 보기
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

/*
TODO: 서브도메인 연결 계획
- agent.ai5000.kr → app/agent/page.tsx
- Cloudflare DNS: CNAME agent cname.vercel-dns.com

확장 계획:
- 각 Agent별 상세 페이지 (/agent/cs, /agent/sales 등)
- Agent 커스터마이징 설정 UI
- Agent 성과 대시보드 연동
*/
