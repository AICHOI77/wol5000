"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase, AgentProduct } from '@/db/supabase'
import Header from '@/app/components/header'

interface AgentManagementPageProps {
  params: { slug: string }
}

export default function AgentManagementPage({ params }: AgentManagementPageProps) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [agent, setAgent] = useState<AgentProduct | null>(null)
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'stats' | 'logs'>('overview')

  useEffect(() => {
    async function loadData() {
      try {
        // 사용자 인증 확인
        const { data: { user: currentUser } } = await supabase.auth.getUser()

        if (!currentUser) {
          router.push('/admin?redirect=/dashboard')
          return
        }

        setUser(currentUser)

        // Agent 정보 가져오기
        const { data: agentData, error: agentError } = await supabase
          .from('agent_products')
          .select('*')
          .eq('slug', params.slug)
          .single()

        if (agentError || !agentData) {
          console.error('Agent not found:', agentError)
          return
        }

        setAgent(agentData)

        // 구매 확인
        const { data: purchase } = await supabase
          .from('user_purchases')
          .select('*')
          .eq('user_id', currentUser.id)
          .eq('product_id', agentData.id)
          .eq('status', 'active')
          .maybeSingle()

        if (!purchase) {
          // 구매하지 않은 경우
          router.push(`/agent/${params.slug}`)
          return
        }

        setHasAccess(true)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.slug, router])

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

  if (!agent || !hasAccess) {
    return null // 리다이렉트 중
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0B0B0F] text-white pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/dashboard" className="hover:text-white">
              대시보드
            </Link>
            <span>/</span>
            <span className="text-white">{agent.title}</span>
          </div>

          {/* Agent Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold">{agent.title}</h1>
                <span className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium">
                  활성
                </span>
              </div>
              <p className="text-white/70">{agent.description}</p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              ⚙️ 설정
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="rounded-xl bg-[#111318] p-6 border border-white/10">
              <div className="text-white/60 text-sm mb-2">오늘 처리</div>
              <div className="text-3xl font-bold">0건</div>
              <div className="text-xs text-white/40 mt-1">어제 대비 0%</div>
            </div>
            <div className="rounded-xl bg-[#111318] p-6 border border-white/10">
              <div className="text-white/60 text-sm mb-2">이번 달</div>
              <div className="text-3xl font-bold">0건</div>
              <div className="text-xs text-white/40 mt-1">지난달 대비 0%</div>
            </div>
            <div className="rounded-xl bg-[#111318] p-6 border border-white/10">
              <div className="text-white/60 text-sm mb-2">성공률</div>
              <div className="text-3xl font-bold text-green-400">0%</div>
              <div className="text-xs text-white/40 mt-1">평균 응답시간 0초</div>
            </div>
            <div className="rounded-xl bg-[#111318] p-6 border border-white/10">
              <div className="text-white/60 text-sm mb-2">예상 절감</div>
              <div className="text-3xl font-bold text-[#E50914]">0원</div>
              <div className="text-xs text-white/40 mt-1">인건비 기준</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-white/10">
            <div className="flex gap-6">
              {[
                { id: 'overview', label: '개요' },
                { id: 'settings', label: '설정' },
                { id: 'stats', label: '통계' },
                { id: 'logs', label: '활동 로그' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 px-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#E50914] border-b-2 border-[#E50914]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Features */}
              <div className="rounded-xl bg-[#111318] p-8 border border-white/10 space-y-6">
                <h2 className="text-2xl font-bold">사용 가능한 기능</h2>
                {agent.features && agent.features.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {agent.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white/5"
                      >
                        <span className="text-[#E50914] text-xl">✓</span>
                        <div className="flex-1">
                          <div className="font-medium">{feature}</div>
                          <div className="text-sm text-white/60 mt-1">
                            활성화됨
                          </div>
                        </div>
                        <button className="text-sm text-[#E50914] hover:text-[#B00610]">
                          설정
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/60">기능 정보가 없습니다.</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl bg-[#111318] p-8 border border-white/10 space-y-6">
                <h2 className="text-2xl font-bold">빠른 작업</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <button className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left space-y-3">
                    <div className="text-3xl">🔗</div>
                    <div className="font-bold">API 연동</div>
                    <div className="text-sm text-white/60">
                      외부 시스템과 연결하기
                    </div>
                  </button>
                  <button className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left space-y-3">
                    <div className="text-3xl">📊</div>
                    <div className="font-bold">보고서 생성</div>
                    <div className="text-sm text-white/60">
                      성과 리포트 다운로드
                    </div>
                  </button>
                  <button className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left space-y-3">
                    <div className="text-3xl">🧪</div>
                    <div className="font-bold">테스트 실행</div>
                    <div className="text-sm text-white/60">
                      Agent 동작 테스트
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="rounded-xl bg-[#111318] p-8 border border-white/10 space-y-8">
              <h2 className="text-2xl font-bold">Agent 설정</h2>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="block font-medium">Agent 이름</label>
                  <input
                    type="text"
                    defaultValue={agent.title}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E50914] outline-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block font-medium">상태</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#E50914] outline-none">
                    <option>활성</option>
                    <option>일시정지</option>
                    <option>비활성</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block font-medium">알림 설정</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>이메일 알림 받기</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>SMS 알림 받기</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#B00610] font-medium transition-all">
                    설정 저장
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="rounded-xl bg-[#111318] p-8 border border-white/10 space-y-6">
              <h2 className="text-2xl font-bold">성과 통계</h2>
              <div className="text-white/60 text-center py-12">
                통계 데이터를 수집하는 중입니다...
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="rounded-xl bg-[#111318] p-8 border border-white/10 space-y-6">
              <h2 className="text-2xl font-bold">활동 로그</h2>
              <div className="text-white/60 text-center py-12">
                아직 활동 기록이 없습니다.
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
