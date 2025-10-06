import { categories, dummyTestimonials } from '@/app/lib/data'
import CategoryHero from '@/app/components/category-hero'
import SystemRail from '@/app/components/system-rail'
import Testimonials from '@/app/components/testimonials'
import LeadForm from '@/app/components/lead-form'
import Header from '@/app/components/header'

export const metadata = {
  title: 'N잡 AI 자동화 - AI5000',
  description: '퇴근 후에도 수익이 멈추지 않습니다. 쿠팡 제휴, 블로그, 쇼츠 자동화로 N잡 수익 구조를 만드세요.',
}

export default function NjobPage() {
  const cat = categories.njob

  return (
    <>
      <Header />
      <main className="bg-black text-white pt-16 lg:pt-20">
        {/* Hero */}
        <CategoryHero
          title={cat.title}
          subtitle={cat.subtitle}
          ctaText="N잡 시스템 받기"
          ctaHref="#lead"
        />

        {/* 추천 시스템 */}
        <section id="systems" className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-3xl font-bold mb-6">
            N잡 맞춤 <span className="text-[#E50914]">자동화 시스템</span>
          </h2>
          <SystemRail items={cat.systems} />
        </section>

        {/* 실사용 후기 */}
        <section className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            N잡러 <span className="text-[#E50914]">실제 수익 후기</span>
          </h2>
          <Testimonials items={dummyTestimonials} />
        </section>

        {/* 리드 폼 */}
        <section id="lead" className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          <LeadForm category="njob" />
        </section>

        {/* CTA 배너 */}
        <div className="bg-gradient-to-r from-[#E50914] via-red-600 to-[#E50914] text-white text-center py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h3 className="text-3xl lg:text-4xl font-bold">
              퇴근 후에도 AI가 <span className="text-black">대신 일합니다.</span>
              <br />
              잠자는 시간에도 수익이 발생합니다.
            </h3>
            <p className="text-xl">N잡 전용 AI 자동화 - 월5천원</p>
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
                N잡 패키지 보기
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
- njob.ai5000.kr → app/njob/page.tsx
- Cloudflare DNS: CNAME njob cname.vercel-dns.com
*/
