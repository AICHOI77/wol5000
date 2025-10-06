'use client'

import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { useState } from 'react'
import { schedule } from '../lib/data'

export default function CalendarList() {
  const [currentMonth, setCurrentMonth] = useState(10) // October 2025
  const [currentYear] = useState(2025)

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ]

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      if (direction === 'prev') {
        return prev === 1 ? 12 : prev - 1
      } else {
        return prev === 12 ? 1 : prev + 1
      }
    })
  }

  // 간단한 달력 생성 (더미 데이터용)
  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay()
    const days = []

    // 빈 칸
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // 날짜
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // 이벤트 날짜 추출
  const eventDates = schedule.map((item) => {
    const date = new Date(item.date)
    return date.getDate()
  })

  return (
    <section className="section-container" id="schedule" aria-label="강의 일정">
      <h2 className="text-2xl lg:text-3xl font-bold mb-8">
        <span className="text-netflix-red">무료 강의</span> 일정
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 달력 */}
        <div className="card-netflix p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <Calendar className="mr-2 text-netflix-red" size={24} />
              {currentYear}년 {monthNames[currentMonth - 1]}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => changeMonth('prev')}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
                aria-label="이전 달"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => changeMonth('next')}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
                aria-label="다음 달"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* 요일 */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-neutral-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* 날짜 */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all ${
                  day
                    ? eventDates.includes(day)
                      ? 'bg-netflix-red font-bold cursor-pointer hover:scale-110'
                      : 'bg-white/5 hover:bg-white/10 cursor-pointer'
                    : ''
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* 일정 리스트 */}
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="card-netflix p-6 card-hover cursor-pointer"
              role="article"
              aria-label={`${item.date} ${item.title}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-netflix-red px-3 py-1 rounded-full text-xs font-bold">
                      {item.tag}
                    </span>
                    <span className="flex items-center text-sm text-neutral-400">
                      <Clock size={14} className="mr-1" />
                      {item.time}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-400">{item.date}</p>
                </div>
              </div>
              <button className="btn-secondary text-sm w-full">신청하기</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
