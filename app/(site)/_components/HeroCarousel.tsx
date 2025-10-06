'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Banner } from '@/db/supabase'

export default function HeroCarousel() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // 배너 데이터 fetch
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/public/banners', {
          next: { revalidate: 300 }, // 5분 캐시
        })
        const data = await response.json()
        setBanners(data.banners || [])
      } catch (error) {
        console.error('Failed to fetch banners:', error)
        setBanners([])
      }
    }

    fetchBanners()
  }, [])

  // 다음 슬라이드
  const nextSlide = useCallback(() => {
    if (banners.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }, [banners.length])

  // 이전 슬라이드
  const prevSlide = useCallback(() => {
    if (banners.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }, [banners.length])

  // 자동 슬라이드 (5초)
  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, banners.length, nextSlide])

  if (banners.length === 0) {
    return (
      <div className="relative w-full h-[400px] md:h-[600px] bg-gradient-to-b from-neutral-900 to-black flex items-center justify-center">
        <p className="text-neutral-500">배너를 불러오는 중...</p>
      </div>
    )
  }

  const currentBanner = banners[currentIndex]

  const BannerContent = () => (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
      {/* 배너 이미지 */}
      <Image
        src={currentBanner.image_url}
        alt={currentBanner.alt}
        fill
        priority={currentIndex === 0}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 100vw"
      />

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />

      {/* 텍스트 오버레이 (향후 캡션 추가 대비) */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
          {currentBanner.title}
        </h2>
      </div>

      {/* 네비게이션 버튼 */}
      {banners.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault()
              prevSlide()
              setIsAutoPlaying(false)
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
            aria-label="이전 배너"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              nextSlide()
              setIsAutoPlaying(false)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
            aria-label="다음 배너"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* 인디케이터 도트 */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`배너 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  )

  // 링크가 있으면 Link로 감싸기
  if (currentBanner.link_url) {
    return (
      <Link href={currentBanner.link_url}>
        <BannerContent />
      </Link>
    )
  }

  return <BannerContent />
}
