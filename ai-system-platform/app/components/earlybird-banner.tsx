import { Zap } from 'lucide-react'

export default function EarlybirdBanner() {
  return (
    <section className="section-container" id="earlybird" aria-label="얼리버드 이벤트">
      <div className="relative overflow-hidden rounded-3xl">
        {/* 배경 그라디언트 */}
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-red via-red-600 to-netflix-red-dark" />

        {/* 애니메이션 배경 */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>

        {/* 콘텐츠 */}
        <div className="relative z-10 p-8 lg:p-16">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* 좌측 카피 */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Zap className="mr-2" size={32} fill="white" />
                <span className="bg-white text-netflix-red px-4 py-1 rounded-full text-sm font-bold">
                  얼리버드 진행중
                </span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                월 5천원 시스템
                <br />
                <span className="text-black">지금 신청하면 3천원</span>
              </h2>

              <p className="text-lg lg:text-xl text-white/90 mb-6">
                AI 자동화 시스템 10개 패키지를 특별 가격으로
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-white text-netflix-red hover:bg-neutral-100 font-bold px-8 py-4 rounded-2xl shadow-lg transition-all hover:scale-105">
                  지금 신청하기
                </button>
                <button className="bg-black/30 hover:bg-black/50 text-white font-semibold px-8 py-4 rounded-2xl border border-white/30 transition-all">
                  패키지 구성 보기
                </button>
              </div>
            </div>

            {/* 우측 뱃지 */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-white flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="text-5xl lg:text-6xl font-bold text-netflix-red mb-2">
                      40%
                    </div>
                    <div className="text-sm font-bold text-black">할인</div>
                  </div>
                </div>

                {/* 펄스 애니메이션 */}
                <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
