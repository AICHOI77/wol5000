'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { heroSlides } from '../lib/data'

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  return (
    <section
      className="relative h-[600px] lg:h-[700px] overflow-hidden"
      aria-label="메인 배너"
    >
      {/* 슬라이드 */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== currentSlide}
        >
          {/* 배경 그라디언트 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10" />

          {/* 배경 이미지 (placeholder) */}
          <div className="absolute inset-0 bg-gradient-to-br from-netflix-red/20 to-black">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 right-20 w-96 h-96 bg-netflix-red rounded-full blur-3xl" />
              <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="relative z-20 h-full flex items-center">
            <div className="section-container">
              <div className="max-w-2xl animate-slide-in">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl lg:text-2xl text-neutral-300 mb-8">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={slide.cta.href}
                    className="btn-primary inline-block text-center"
                    aria-label={slide.cta.label}
                  >
                    {slide.cta.label}
                  </a>
                  <a
                    href="#free-shows"
                    className="btn-secondary inline-block text-center"
                    aria-label="무료 강의 보기"
                  >
                    무료 강의 보기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 네비게이션 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all"
        aria-label="다음 슬라이드"
      >
        <ChevronRight size={24} />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-netflix-red w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  )
}
