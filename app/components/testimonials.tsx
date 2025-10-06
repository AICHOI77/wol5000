'use client'

import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useState } from 'react'

interface TestimonialItem {
  name: string
  quote: string
  tag: string
  avatar: string
}

interface TestimonialsProps {
  items: TestimonialItem[]
}

export default function Testimonials({ items }: TestimonialsProps) {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((prev) => (prev + 1) % items.length)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div className="relative">
      <div className="card-netflix p-8 lg:p-12">
        {/* 슬라이드 */}
        <div className="relative min-h-[200px] flex items-center justify-center">
          {items.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === current ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-6">
                {/* 아바타 */}
                <div className="relative">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-20 h-20 rounded-full border-4 border-[#E50914]"
                  />
                  <div className="absolute -top-2 -right-2 bg-[#E50914] rounded-full p-2">
                    <Quote size={16} fill="white" />
                  </div>
                </div>

                {/* 인용구 */}
                <blockquote className="text-xl lg:text-2xl font-medium max-w-3xl">
                  "{item.quote}"
                </blockquote>

                {/* 작성자 */}
                <div className="space-y-1">
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-sm text-[#E50914]">{item.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 네비게이션 */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={prev}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            aria-label="이전 후기"
          >
            <ChevronLeft size={20} />
          </button>

          {/* 인디케이터 */}
          <div className="flex space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current
                    ? 'bg-[#E50914] w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`후기 ${index + 1}로 이동`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            aria-label="다음 후기"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
