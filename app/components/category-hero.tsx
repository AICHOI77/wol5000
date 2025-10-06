interface CategoryHeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  disclaimer?: string
}

export default function CategoryHero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  disclaimer,
}: CategoryHeroProps) {
  return (
    <section className="relative min-h-[500px] lg:min-h-[600px] bg-black flex items-center overflow-hidden">
      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/20 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#E50914] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 좌측 카피 */}
          <div className="space-y-6 animate-slide-in">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              {title}
            </h1>
            <p className="text-xl lg:text-2xl text-neutral-300">
              {subtitle}
            </p>

            {disclaimer && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                <p className="text-yellow-200 text-sm">{disclaimer}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={ctaHref}
                className="btn-primary inline-block text-center text-lg"
              >
                {ctaText}
              </a>
              <a
                href="#systems"
                className="btn-secondary inline-block text-center text-lg"
              >
                시스템 둘러보기
              </a>
            </div>
          </div>

          {/* 우측 그래픽 placeholder */}
          <div className="hidden lg:block">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* 플레이스홀더 그래픽 */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/30 to-transparent rounded-3xl backdrop-blur-sm border border-white/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-[#E50914] rounded-full blur-2xl opacity-50" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">🤖</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
