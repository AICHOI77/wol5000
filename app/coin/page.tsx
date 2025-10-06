import { categories, dummyTestimonials } from '@/app/lib/data'
import CategoryHero from '@/app/components/category-hero'
import SystemRail from '@/app/components/system-rail'
import Testimonials from '@/app/components/testimonials'
import LeadForm from '@/app/components/lead-form'
import Header from '@/app/components/header'

export const metadata = {
  title: '코인 AI 리포트/알림 자동화 - AI5000',
  description: '코인 가격 알림, 리밸런싱, 지갑 모니터링, 백테스트 리포트를 AI로 자동화하세요. ⚠️ 투자 손실 위험 존재.',
}

export default function CoinPage() {
  const cat = categories.coin

  return (
    <>
      <Header />
      <main className="bg-black text-white pt-16 lg:pt-20">
        {/* Hero */}
        <CategoryHero
          title={cat.title}
          subtitle={cat.subtitle}
          ctaText="코인 알림 시스템 받기"
          ctaHref="#lead"
          disclaimer={cat.disclaimer}
        />

        {/* 추천 시스템 */}
        <section id="systems" className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-3xl font-bold mb-6">
            코인 리포트/알림 <span className="text-[#E50914]">자동화 시스템</span>
          </h2>
          <p className="text-neutral-400 mb-6">
            ⚠️ 본 시스템은 투자 조언이 아닙니다. 데이터 모니터링 및 알림 자동화 도구로만 활용하세요.
          </p>
          <SystemRail items={cat.systems} />
        </section>

        {/* 실사용 후기 */}
        <section className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            사용자 <span className="text-[#E50914]">활용 사례</span>
          </h2>
          <Testimonials items={dummyTestimonials} />
        </section>

        {/* 리드 폼 */}
        <section id="lead" className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          <LeadForm category="coin" />
        </section>

        {/* CTA 배너 */}
        <div className="bg-gradient-to-r from-[#E50914] via-red-600 to-[#E50914] text-white text-center py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h3 className="text-3xl lg:text-4xl font-bold">
              당신의 자금이 AI 안에서 <span className="text-black">일하게</span> 하세요.
              <br />
              데이터 리포트·알림 자동화 중심
            </h3>
            <p className="text-xl">코인 전용 AI 모니터링 - 월5천원</p>
            <p className="text-sm text-yellow-200">
              ⚠️ 투자 손실 위험 존재. 리포트·알림 자동화 도구로만 활용하세요.
            </p>
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
                시스템 구성 보기
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
- coin.ai5000.kr → app/coin/page.tsx
- Cloudflare DNS: CNAME coin cname.vercel-dns.com

법적 고지사항 추가 필요:
- 투자 손실 위험 명시
- 금융 조언이 아님을 명확히 표시
- 데이터 모니터링 도구로만 활용 안내
*/
