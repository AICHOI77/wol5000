'use client'

import { LayoutDashboard, ShoppingBag, Users, ShoppingCart, LogOut, Menu, X, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Toaster } from '@/components/ui/toaster'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const menuItems = [
    { label: '대시보드', href: '/admin', icon: LayoutDashboard },
    { label: '배너관리', href: '/admin/banners', icon: ImageIcon },
    { label: '회원관리', href: '/admin/users', icon: Users },
    { label: '상품관리', href: '/admin/products', icon: ShoppingBag },
    { label: '신청내역', href: '/admin/orders', icon: ShoppingCart },
  ]

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      {/* 상단 헤더 - 고정 */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-[#111318] border-b border-white/10">
        <div className="flex items-center justify-between h-full px-4">
          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-white hover:text-[#E50914] transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* 로고 */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center font-bold text-white">
              A
            </div>
            <h1 className="text-xl font-bold text-white hidden sm:block">
              AI5000 Admin
            </h1>
          </div>

          {/* 로그아웃 버튼 */}
          <button className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors">
            <LogOut size={20} />
            <span className="hidden sm:inline">로그아웃</span>
          </button>
        </div>
      </header>

      <div className="flex pt-16">
        {/* 좌측 사이드바 */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#111318] border-r border-white/10 transform transition-transform duration-300 lg:transform-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 pt-16 lg:pt-0`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-[#E50914] text-white shadow-lg'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* 모바일 오버레이 */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 p-4 lg:p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
