import { categories, dummyTestimonials } from '@/app/lib/data'
import CategoryHero from '@/app/components/category-hero'
import SystemRail from '@/app/components/system-rail'
import Testimonials from '@/app/components/testimonials'
import LeadForm from '@/app/components/lead-form'
import Header from '@/app/components/header'

export const metadata = {
  title: 'AI 창업 시스템 - AI5000',
  description: '아이템 없이도 창업 가능합니다. AI 사주, AI 강의, 랜딩 자동화 등 월5천 시스템 10개 세팅.',
}

export default function StartupPage() {
  const cat = categories.startup

  return (
    <>
      <Header />
      <main className="bg-black text-white pt-16 lg:pt-20">
        {/* Hero */}
        <CategoryHero
          title={cat.title}
          subtitle={cat.subtitle}
          ctaText="창업 시스템 받기"
          ctaHref="#lead"
        />

        {/* 추천 시스템 */}
        <section id="systems" className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-3xl font-bold mb-6">
            AI 창업 <span className="text-[#E50914]">추천 시스템</span>
          </h2>
          <SystemRail items={cat.systems} />
        </section>

        {/* 실사용 후기 */}
        <section className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            AI 창업자 <span className="text-[#E50914]">성공 사례</span>
          </h2>
          <Testimonials items={dummyTestimonials} />
        </section>

        {/* 리드 폼 */}
        <section id="lead" className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          <LeadForm category="startup" />
        </section>

        {/* CTA 배너 */}
        <div className="bg-gradient-to-r from-[#E50914] via-red-600 to-[#E50914] text-white text-center py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h3 className="text-3xl lg:text-4xl font-bold">
              아이템이 없어도 괜찮습니다.
              <br />
              AI 시스템을 <span className="text-black">그대로 복제</span>하세요.
            </h3>
            <p className="text-xl">창업 전용 AI 패키지 - 월5천원</p>
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
                패키지 구성 보기
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
- startup.ai5000.kr → app/startup/page.tsx
- Cloudflare DNS: CNAME startup cname.vercel-dns.com
*/
