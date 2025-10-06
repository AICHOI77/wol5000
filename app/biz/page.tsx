import { categories, dummyTestimonials } from '@/app/lib/data'
import CategoryHero from '@/app/components/category-hero'
import SystemRail from '@/app/components/system-rail'
import Testimonials from '@/app/components/testimonials'
import LeadForm from '@/app/components/lead-form'
import Header from '@/app/components/header'

export const metadata = {
  title: '자영업 AI 퍼널 자동화 - AI5000',
  description: '병원·미용실·인테리어 등 자영업 매출을 AI 퍼널로 자동화하세요. 마케팅→예약→결제까지 한 번에.',
}

export default function BizPage() {
  const cat = categories.biz

  return (
    <>
      <Header />
      <main className="bg-black text-white pt-16 lg:pt-20">
        {/* Hero */}
        <CategoryHero
          title={cat.title}
          subtitle={cat.subtitle}
          ctaText="내 업종 맞춤 시스템 받기"
          ctaHref="#lead"
        />

        {/* 추천 시스템 */}
        <section id="systems" className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-3xl font-bold mb-6">
            자영업 맞춤 <span className="text-[#E50914]">AI 시스템</span>
          </h2>
          <SystemRail items={cat.systems} />
        </section>

        {/* 실사용 후기 */}
        <section className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            실제 자영업자 <span className="text-[#E50914]">후기</span>
          </h2>
          <Testimonials items={dummyTestimonials} />
        </section>

        {/* 리드 폼 */}
        <section id="lead" className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          <LeadForm category="biz" />
        </section>

        {/* CTA 배너 */}
        <div className="bg-gradient-to-r from-[#E50914] via-red-600 to-[#E50914] text-white text-center py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h3 className="text-3xl lg:text-4xl font-bold">
              돈을 벌려면 실행을 해야 합니다.
              <br />
              이제 그 실행이 <span className="text-black">자동화</span>됩니다.
            </h3>
            <p className="text-xl">자영업 전용 AI 시스템 - 월5천원</p>
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
                5천 패키지 구성 보기
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
- biz.ai5000.kr → app/biz/page.tsx
- Cloudflare DNS: CNAME biz cname.vercel-dns.com
- Vercel: Settings → Domains → Add biz.ai5000.kr
- next.config.js에서 도메인별 리다이렉트 설정 가능
*/
