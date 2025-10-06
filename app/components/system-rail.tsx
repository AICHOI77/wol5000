'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'

interface SystemItem {
  thumb: string
  title: string
  tag: string
  description: string
}

interface SystemRailProps {
  items: SystemItem[]
}

export default function SystemRail({ items }: SystemRailProps) {
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
    <div className="relative">
      {/* 네비게이션 버튼 */}
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={() => scroll('left')}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
          aria-label="이전 시스템"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
          aria-label="다음 시스템"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 시스템 카드 레일 */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 pb-4 scroll-snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none w-80 lg:w-96 scroll-snap-child group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="card-netflix card-hover relative overflow-hidden h-full">
              {/* 썸네일 */}
              <div className="relative aspect-video bg-gradient-to-br from-[#E50914]/30 to-black">
                <img
                  src={item.thumb}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* 태그 */}
                <div className="absolute top-3 left-3 bg-[#E50914] px-3 py-1 rounded-full text-xs font-bold">
                  {item.tag}
                </div>

                {/* 호버 오버레이 */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center flex-col space-y-4 animate-slide-in">
                    <p className="text-center px-6 text-neutral-300">
                      {item.description}
                    </p>
                    <div className="flex space-x-3">
                      <button className="bg-[#E50914] hover:bg-[#c40810] px-6 py-2 rounded-xl font-semibold transition-all">
                        자세히
                      </button>
                      <button className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl font-semibold transition-all">
                        신청
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 정보 */}
              <div className="p-5">
                <h3 className="font-bold text-xl mb-2 group-hover:text-[#E50914] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-400">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
