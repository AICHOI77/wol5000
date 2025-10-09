"use client"

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/app/components/header'
import StartupSidebar from '@/components/agent/StartupSidebar'
import StartupOverview from '@/components/agent/sections/StartupOverview'
import StartupOrders from '@/components/agent/sections/StartupOrders'
import StartupReviews from '@/components/agent/sections/StartupReviews'
import StartupMarketing from '@/components/agent/sections/StartupMarketing'
import { usePurchaseGate } from '@/lib/auth/usePurchaseGate'

type TabType = 'overview' | 'orders' | 'reviews' | 'marketing'

export default function StartupAgentPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const { loading, hasAccess, user } = usePurchaseGate({ slugs: ['startup200', 'biz200'] })

  // 로딩 중
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0B0B0F] text-white pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center py-20 text-white/60">로딩 중...</div>
          </div>
        </main>
      </>
    )
  }

  // 비로그인 - 로그인 유도
  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0B0B0F] text-white pt-16 lg:pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="rounded-2xl bg-[#111318] border border-white/10 p-12 text-center space-y-6">
              <div className="text-6xl mb-4">🔐</div>
              <h1 className="text-3xl font-bold">로그인이 필요합니다</h1>
              <p className="text-white/70 text-lg">
                이 페이지는 로그인 후 이용하실 수 있습니다.
              </p>
              <div className="pt-6">
                <Link
                  href={`/admin?next=/user/agent/startup`}
                  className="inline-block px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#B00610] text-white font-medium transition-all"
                >
                  로그인하기
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  // 로그인했으나 미구매 - 잠금 카드
  if (!hasAccess) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0B0B0F] text-white pt-16 lg:pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="rounded-2xl bg-[#111318] border border-white/10 p-12 text-center space-y-6">
              <div className="text-6xl mb-4">🔒</div>
              <h1 className="text-3xl font-bold">접근 제한</h1>
              <p className="text-white/70 text-lg">
                이 화면은 <span className="text-[#E50914] font-bold">200만원 패키지</span> 구매자 전용입니다.
              </p>
              <div className="pt-6 space-y-3">
                <p className="text-white/60">
                  startup200 또는 biz200 패키지를 구매하시면 다음 기능을 이용하실 수 있습니다:
                </p>
                <ul className="text-left max-w-md mx-auto space-y-2 text-white/80">
                  <li>✓ 24시간 예약·결제 자동화</li>
                  <li>✓ 리뷰 수집 및 재방문 유도</li>
                  <li>✓ SNS 마케팅 콘텐츠 자동 생성</li>
                  <li>✓ AI 카피라이팅 및 스케줄러</li>
                  <li>✓ 실시간 매출 대시보드</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link
                  href="/agent"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all"
                >
                  패키지 보기
                </Link>
                <Link
                  href="/pay/startup200"
                  className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#B00610] text-white font-medium transition-all"
                >
                  지금 구매하기
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  // 권한 있음 - 대시보드 표시
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0B0B0F] text-white pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/dashboard" className="hover:text-white">
              대시보드
            </Link>
            <span>/</span>
            <span className="text-white">창업 Agent</span>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">AI 창업 시스템 200</h1>
            <p className="text-white/70">
              예약·결제·마케팅 완전 자동화 시스템
            </p>
          </div>

          {/* Mobile Tabs */}
          <StartupSidebar active={activeTab} onChange={setActiveTab} />

          {/* Layout: Sidebar + Content */}
          <div className="grid md:grid-cols-[260px,1fr] gap-6">
            {/* Desktop Sidebar */}
            <StartupSidebar active={activeTab} onChange={setActiveTab} />

            {/* Content Area */}
            <div className="min-h-[600px]">
              {activeTab === 'overview' && <StartupOverview />}
              {activeTab === 'orders' && <StartupOrders />}
              {activeTab === 'reviews' && <StartupReviews />}
              {activeTab === 'marketing' && <StartupMarketing />}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
