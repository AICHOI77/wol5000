'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { teachers } from '../lib/data'

export default function TeachersSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350
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
    <section className="section-container" id="teachers" aria-label="강사진">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold">
          <span className="text-netflix-red">전문가</span> 강사진
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            aria-label="이전 강사 보기"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            aria-label="다음 강사 보기"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 슬라이더 */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 pb-4 scroll-snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {teachers.map((teacher, index) => (
          <div
            key={index}
            className="flex-none w-64 scroll-snap-child"
            role="article"
            aria-label={`${teacher.name} - ${teacher.role}`}
          >
            <div className="card-netflix card-hover p-6 text-center">
              {/* 프로필 이미지 */}
              <div className="mb-4 mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-netflix-red">
                <img
                  src={teacher.img}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 정보 */}
              <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
              <p className="text-netflix-red font-semibold mb-3">{teacher.role}</p>
              <p className="text-sm text-neutral-400">{teacher.expertise}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
