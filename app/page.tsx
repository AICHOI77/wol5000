'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Card {
  img: string
  label: string
  title: string
  desc: string
}

interface Section {
  title: string
  subtitle: string
  cards: Card[]
}

interface HeroBanner {
  img: string
  title: string
  subtitle: string
}

// Hero 배너 카루셀 컴포넌트
function HeroCarousel({ banners }: { banners: HeroBanner[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }, [banners.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }, [banners.length])

  // 자동 슬라이드 (5초)
  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, banners.length, nextSlide])

  return (
    <section className="relative h-[320px] md:h-[420px] mt-[69px]">
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${banner.img})` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60" />

          {/* Content */}
          <div className="relative z-10 h-full flex justify-center items-center text-center px-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-3">
                {banner.title}
              </h2>
              <p className="text-sm md:text-base text-gray-300">
                {banner.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => {
              prevSlide()
              setIsAutoPlaying(false)
            }}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 lg:p-3 rounded-full transition-all"
            aria-label="이전 배너"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={() => {
              nextSlide()
              setIsAutoPlaying(false)
            }}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 lg:p-3 rounded-full transition-all"
            aria-label="다음 배너"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {/* Progress Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`h-1 rounded-full transition-all ${
                index === currentIndex ? 'bg-red-600 w-8' : 'bg-white/50 w-2'
              }`}
              aria-label={`배너 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

// 섹션 카루셀 컴포넌트 (Swiper 기반)
function SectionCarousel({ section }: { section: Section }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-gray-800">
      <div>
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold mb-2">{section.title}</h3>
          <p className="text-gray-400 text-sm md:text-base">{section.subtitle}</p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
          }}
          className="pb-12"
        >
          {section.cards.map((card, j) => (
            <SwiperSlide key={j}>
              <div className="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-all duration-300 cursor-pointer group">
                {/* 16:9 YouTube Thumbnail Ratio */}
                <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <img
                    src={card.img}
                    alt={card.title}
                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <span className="text-xs bg-red-600 px-2 py-1 rounded">
                    {card.label}
                  </span>
                  <h4 className="font-semibold mt-3 line-clamp-2">
                    {card.title}
                  </h4>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default function HomePage() {
  // Hero 배너 데이터
  const heroBanners: HeroBanner[] = [
    {
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
      title: 'AI로 월 5천 만드는 시스템',
      subtitle: '10개의 AI 자동화 시스템. 실행은 AI가 합니다.',
    },
    {
      img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop',
      title: '자영업 매출, AI 퍼널이 올립니다',
      subtitle: '마케팅 → 예약 → 결제까지 한 번에',
    },
    {
      img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
      title: '퇴근 후에도 수익이 멈추지 않는 구조',
      subtitle: 'AI가 대신 실행합니다',
    },
  ]

  const sections = [
    {
      title: 'AI SaaS 수익화 시스템',
      subtitle: 'AI가 돈 버는 구조를 만든다',
      cards: [
        {
          img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop',
          label: '무료',
          title: 'AI SaaS 자동수익 시스템 구축하기',
          desc: '1인 사업가도 10개의 SaaS를 자동 운영하는 구조',
        },
        {
          img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
          label: '무료',
          title: 'ChatGPT로 SaaS MVP 제작하기',
          desc: '코드 없이 수익형 SaaS 빠르게 제작하기',
        },
        {
          img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop',
          label: '무료',
          title: 'Claude로 SaaS 자동화 설계',
          desc: 'AI가 전체 비즈니스 로직을 설계한다',
        },
      ],
    },
    {
      title: '자영업 매출 증대 시스템',
      subtitle: '손님이 자동으로 찾아오는 구조',
      cards: [
        {
          img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=225&fit=crop',
          label: '자동화',
          title: '리뷰 자동화 시스템',
          desc: '고객 후기 수집부터 홍보까지 AI가 처리',
        },
        {
          img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=225&fit=crop',
          label: '자동화',
          title: '예약·결제 통합 시스템',
          desc: '매장 예약부터 결제까지 자동화 구축',
        },
        {
          img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=225&fit=crop',
          label: '자동화',
          title: '고객 유입 마케팅 엔진',
          desc: 'SNS·채팅·광고 유입을 자동으로 연결',
        },
      ],
    },
    {
      title: 'AI 창업 시스템',
      subtitle: 'AI가 당신의 사업 아이템을 만든다',
      cards: [
        {
          img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=225&fit=crop',
          label: '창업',
          title: 'AI 창업 자동진단',
          desc: '아이디어 검증과 시장성 분석을 자동화',
        },
        {
          img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=225&fit=crop',
          label: '창업',
          title: 'AI SaaS 창업 훈련소',
          desc: '실전형 창업 AI 코칭 프로그램',
        },
        {
          img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop',
          label: '창업',
          title: 'AI로 만드는 1인 스타트업',
          desc: 'AI가 비즈니스 모델을 만들어준다',
        },
      ],
    },
    {
      title: '유튜브 자동화 시스템',
      subtitle: '영상 100개를 대신 만드는 구조',
      cards: [
        {
          img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
          label: '유튜브',
          title: 'AI 영상 자동생성 시스템',
          desc: '스크립트부터 업로드까지 AI 자동화',
        },
        {
          img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop',
          label: '유튜브',
          title: '유튜브 숏폼 자동화 구조',
          desc: '하루 10개 숏폼 자동 제작 시스템',
        },
        {
          img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
          label: '유튜브',
          title: 'AI 스크립트 → 영상 변환',
          desc: 'AI가 대본을 읽고 영상으로 제작',
        },
      ],
    },
  ]

  return (
    <main className="bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex justify-between items-center px-4 sm:px-6 lg:px-12 py-5">
          <Link href="/" className="text-xl lg:text-2xl font-bold text-red-500">
            월5천플랫폼
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 lg:gap-8 text-sm">
            <a href="#" className="hover:text-red-500 transition-colors">지점형</a>
            <a href="#" className="hover:text-red-500 transition-colors">사업형</a>
            <a href="#" className="hover:text-red-500 transition-colors">N잡</a>
            <a href="#" className="hover:text-red-500 transition-colors">코인</a>
            <a href="#" className="hover:text-red-500 transition-colors">AI Agent</a>
            <a href="#" className="hover:text-red-500 transition-colors">무료강의 일정</a>
            <a href="#" className="hover:text-red-500 transition-colors">커뮤니티</a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex gap-2">
            <button className="border border-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors">
              로그인
            </button>
            <button className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
              회원가입
            </button>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <HeroCarousel banners={heroBanners} />

      {/* Dynamic Sections */}
      {sections.map((sec, i) => (
        <SectionCarousel key={i} section={sec} />
      ))}

      {/* Footer */}
      <footer className="bg-gray-950 py-10 text-center text-sm text-gray-500">
        <p>© 2025 월5천플랫폼 | 회사소개 | 개인정보처리방침 | SNS 링크</p>
      </footer>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  )
}
