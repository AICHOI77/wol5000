'use client'

import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { freeShows } from '../lib/data'

export default function RailCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      const newScrollPosition =
        scrollRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount)
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="section-container" id="free-shows" aria-label="무료 강의">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold">
          무료 강의 <span className="text-netflix-red">실시간 공개</span>
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            aria-label="이전 강의 보기"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            aria-label="다음 강의 보기"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 카루셀 */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-4 scroll-snap-x scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {freeShows.map((show, index) => (
          <div
            key={index}
            className="flex-none w-72 lg:w-80 scroll-snap-child group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            role="article"
            aria-label={show.title}
          >
            <div className="card-netflix card-hover relative overflow-hidden">
              {/* 썸네일 */}
              <div className="relative aspect-video bg-gradient-to-br from-netflix-red/30 to-black">
                <img
                  src={show.thumb}
                  alt={show.title}
                  className="w-full h-full object-cover"
                />

                {/* 태그 */}
                <div className="absolute top-3 left-3 bg-netflix-red px-3 py-1 rounded-full text-xs font-bold">
                  {show.tag}
                </div>

                {/* 호버 오버레이 */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center animate-slide-in">
                    <button
                      className="bg-netflix-red hover:bg-netflix-red-dark p-4 rounded-full transition-all hover:scale-110"
                      aria-label={`${show.title} 재생`}
                    >
                      <Play size={32} fill="white" />
                    </button>
                  </div>
                )}
              </div>

              {/* 정보 */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 group-hover:text-netflix-red transition-colors">
                  {show.title}
                </h3>
                <p className="text-sm text-neutral-400">{show.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
