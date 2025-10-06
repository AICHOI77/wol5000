'use client'

import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // 카테고리 메뉴 (좌측/중앙)
  const categoryMenus = [
    { label: '자영업', href: '/biz' },
    { label: 'AI창업', href: '/startup' },
    { label: 'N잡', href: '/njob' },
    { label: '코인', href: '/coin' },
    { label: 'AI Agent', href: '/agent' },
  ]

  // 기존 메뉴 (우측 - 데스크톱에서만 표시)
  const menuItems = [
    { label: '무료강의 일정', href: '#schedule' },
    { label: '얼리버드', href: '#earlybird' },
    { label: '수강후기', href: '#reviews' },
    { label: '강사진', href: '#teachers' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* 로고 */}
          <a
            href="/"
            className="flex items-center space-x-2"
            aria-label="월5천플랫폼 홈"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#E50914] rounded-lg flex items-center justify-center">
              <span className="text-white text-xl lg:text-2xl font-bold">W</span>
            </div>
            <span className="text-xl lg:text-2xl font-bold text-white">월5천플랫폼</span>
          </a>

          {/* 데스크톱 카테고리 메뉴 */}
          <nav className="hidden lg:flex items-center space-x-6" aria-label="카테고리">
            {categoryMenus.map((item) => {
              const isActive = pathname === item.href
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#E50914]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
            <span className="text-neutral-600">|</span>
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
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
              {/* 카테고리 메뉴 */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-neutral-500 uppercase">카테고리</p>
                {categoryMenus.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`block ${
                        isActive
                          ? 'text-[#E50914] font-bold'
                          : 'text-neutral-300 hover:text-white'
                      } transition-colors`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>

              {/* 기존 메뉴 */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <p className="text-xs font-bold text-neutral-500 uppercase">메뉴</p>
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-neutral-300 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

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
