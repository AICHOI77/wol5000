"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, AgentProduct, UserPurchase } from '@/db/supabase'
import Header from '@/app/components/header'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [purchasedAgents, setPurchasedAgents] = useState<AgentProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserAndAgents() {
      try {
        // 사용자 인증 확인
        const { data: { user: currentUser } } = await supabase.auth.getUser()

        if (!currentUser) {
          // 로그인하지 않은 경우 로그인 페이지로
          router.push('/admin?redirect=/dashboard')
          return
        }

        setUser(currentUser)

        // 구매한 Agent 목록 가져오기
        const { data: purchases, error: purchaseError } = await supabase
          .from('user_purchases')
          .select(`
            *,
            agent_products (*)
          `)
          .eq('user_id', currentUser.id)
          .eq('status', 'active')

        if (!purchaseError && purchases) {
          const agents = purchases
            .map(p => (p as any).agent_products)
            .filter(Boolean)
          setPurchasedAgents(agents)
        }
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserAndAgents()
  }, [router])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#0B0B0F] text-white pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto p-6 lg:p-10">
            <div className="text-center py-20 text-white/60">로딩 중...</div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0B0B0F] text-white pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
          {/* Dashboard Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">내 대시보드</h1>
            <p className="text-white/70">
              구매하신 AI Agent를 관리하고 사용할 수 있습니다.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#111318] p-6 border border-white/10">
              <div className="text-white/60 text-sm mb-2">보유 Agent</div>
              <div className="text-3xl font-bold text-[#E50914]">
                {purchasedAgents.length}
              </div>
            </div>
            <div className="rounded-xl bg-[#111318] p-6 border border-white/10">
              <div className="text-white/60 text-sm mb-2">활성 상태</div>
              <div className="text-3xl font-bold text-green-400">
                {purchasedAgents.length}
              </div>
            </div>
            <div className="rounded-xl bg-[#111318] p-6 border border-white/10">
              <div className="text-white/60 text-sm mb-2">총 투자액</div>
              <div className="text-3xl font-bold text-white">
                {purchasedAgents.reduce((sum, agent) => sum + agent.price, 0).toLocaleString()}원
              </div>
            </div>
          </div>

          {/* Purchased Agents */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">내 AI Agent</h2>
              <Link
                href="/agent"
                className="text-[#E50914] hover:text-[#B00610] font-medium"
              >
                + 새 Agent 구매
              </Link>
            </div>

            {purchasedAgents.length === 0 ? (
              <div className="rounded-xl bg-[#111318] p-12 border border-white/10 text-center space-y-4">
                <div className="text-5xl">🤖</div>
                <h3 className="text-xl font-bold">아직 구매한 Agent가 없습니다</h3>
                <p className="text-white/60">
                  AI Agent를 구매하고 자동화된 비즈니스를 시작하세요.
                </p>
                <Link
                  href="/agent"
                  className="inline-block rounded-xl bg-[#E50914] px-6 py-3 font-medium hover:bg-[#B00610] transition-all"
                >
                  Agent 둘러보기
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {purchasedAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="rounded-xl bg-[#111318] border border-white/10 overflow-hidden hover:border-[#E50914] transition-all group"
                  >
                    {/* Agent Card */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-medium">
                              활성
                            </span>
                            <span className="px-2 py-1 rounded bg-[#E50914]/20 text-[#E50914] text-xs font-medium uppercase">
                              {agent.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold">{agent.title}</h3>
                          <p className="text-white/60 text-sm">{agent.description}</p>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div>
                          <div className="text-white/50 text-xs mb-1">오늘 처리</div>
                          <div className="text-lg font-bold">0건</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-xs mb-1">이번 달</div>
                          <div className="text-lg font-bold">0건</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4">
                        <Link
                          href={`/dashboard/agent/${agent.slug}`}
                          className="flex-1 text-center rounded-xl bg-[#E50914] px-4 py-3 font-medium hover:bg-[#B00610] transition-all"
                        >
                          관리하기
                        </Link>
                        <button
                          className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                          title="설정"
                        >
                          ⚙️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl bg-[#111318] p-6 border border-white/10 space-y-4">
            <h3 className="text-lg font-bold">빠른 실행</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left space-y-2">
                <div className="text-2xl">📊</div>
                <div className="font-medium">통계 보기</div>
              </button>
              <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left space-y-2">
                <div className="text-2xl">⚙️</div>
                <div className="font-medium">설정</div>
              </button>
              <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left space-y-2">
                <div className="text-2xl">💳</div>
                <div className="font-medium">결제 관리</div>
              </button>
              <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left space-y-2">
                <div className="text-2xl">📖</div>
                <div className="font-medium">가이드</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
