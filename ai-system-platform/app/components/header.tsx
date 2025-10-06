'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { label: '무료강의 일정', href: '#schedule' },
    { label: '얼리버드', href: '#earlybird' },
    { label: '수강후기', href: '#reviews' },
    { label: '전자책', href: '#ebook' },
    { label: '수익인증', href: '#proof' },
    { label: '강사진', href: '#teachers' },
    { label: '커뮤니티', href: '#community' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* 로고 */}
          <a
            href="/"
            className="text-2xl lg:text-3xl font-bold text-gradient"
            aria-label="AI 시스템 플랫폼 홈"
          >
            AI5000
          </a>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="주요 메뉴">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* 로그인/회원가입 */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              className="btn-secondary text-sm px-4 py-2"
              aria-label="로그인"
            >
              로그인
            </button>
            <button
              className="btn-primary text-sm px-4 py-2"
              aria-label="회원가입"
            >
              회원가입
            </button>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기/닫기"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 animate-slide-in">
            <nav className="flex flex-col space-y-4" aria-label="모바일 메뉴">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-neutral-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                <button className="btn-secondary text-sm w-full">로그인</button>
                <button className="btn-primary text-sm w-full">회원가입</button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
