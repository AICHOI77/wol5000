import { ArrowRight, Sparkles } from 'lucide-react'

export default function FooterCTA() {
  return (
    <section className="section-container" aria-label="행동 유도">
      {/* 메인 CTA 배너 */}
      <div className="card-netflix p-8 lg:p-12 mb-12 relative overflow-hidden">
        {/* 배경 효과 */}
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-red/20 to-black">
          <div className="absolute top-0 right-0 w-96 h-96 bg-netflix-red rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-netflix-red mr-2" size={32} />
            <h2 className="text-3xl lg:text-5xl font-bold">
              돈을 벌려면 실행을 해야 합니다
            </h2>
          </div>

          <p className="text-xl lg:text-2xl text-neutral-300 mb-8">
            이제 그 실행이 <span className="text-netflix-red font-bold">자동화</span>
            됩니다 — 월5천 AI 플랫폼
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#lead"
              className="btn-primary inline-flex items-center justify-center text-lg px-8 py-4"
              aria-label="무료 진단 신청"
            >
              무료 진단 신청
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a
              href="#bundle"
              className="btn-secondary inline-flex items-center justify-center text-lg px-8 py-4"
              aria-label="5천 시스템 신청"
            >
              5천 시스템 신청
              <ArrowRight className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* 키워드 마키 */}
      <div className="overflow-hidden py-8 border-y border-white/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[
            'MARKETING',
            'YOUTUBE',
            'FUNNEL',
            'SYSTEM',
            'AI',
            'AUTOMATION',
            'REVENUE',
            'MARKETING',
            'YOUTUBE',
            'FUNNEL',
            'SYSTEM',
            'AI',
          ].map((word, index) => (
            <span
              key={index}
              className="mx-8 text-4xl lg:text-6xl font-bold text-white/10"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <footer className="mt-12 pt-8 border-t border-white/10">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-2">AI5000</h3>
            <p className="text-sm text-neutral-400">
              AI 자동화 시스템으로 새로운 수익을 만듭니다
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">
              이용약관
            </a>
            <a href="#" className="hover:text-white transition-colors">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-white transition-colors">
              제휴문의
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-neutral-500">
          <p>© 2025 AI5000. All rights reserved.</p>
          <p className="mt-2">
            본 플랫폼의 모든 시스템과 콘텐츠는 저작권법에 의해 보호됩니다.
          </p>
        </div>
      </footer>
    </section>
  )
}
