'use client'

import { useState } from 'react'
import { runAgentPipeline } from '@/lib/agent-core'
import { trafficAction } from '@/lib/agent-core/actions/traffic'
import { trackLeadSubmitted, trackAgentAction } from '@/lib/analytics'

interface TrafficPlan {
  day: number
  channel: string
  action: string
  priority: 'high' | 'medium' | 'low'
  utm_params: string
}

export default function TrafficPage() {
  const [channels, setChannels] = useState({
    naver_map: false,
    reviews: false,
    instagram: false,
    facebook: false,
    ads: false
  })
  const [duration, setDuration] = useState<7 | 14>(7)
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<TrafficPlan[] | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const startTime = Date.now()

    try {
      const output = await runAgentPipeline(
        {
          slot: 'biz',
          module: 'traffic',
          data: { channels, duration }
        },
        trafficAction
      )

      if (output.success && output.data?.plan) {
        setPlan(output.data.plan)
        const executionTime = Date.now() - startTime
        trackLeadSubmitted('biz', 'traffic')
        trackAgentAction('biz', 'traffic', executionTime)
      }
    } catch (error) {
      console.error('Traffic plan error:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadCSV = () => {
    if (!plan) return

    const csv = [
      ['Day', 'Channel', 'Action', 'Priority', 'UTM Params'],
      ...plan.map(p => [p.day, p.channel, p.action, p.priority, p.utm_params])
    ]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `traffic-plan-${duration}days.csv`
    a.click()
  }

  const priorityColor = {
    high: 'text-red-400 border-red-400',
    medium: 'text-yellow-400 border-yellow-400',
    low: 'text-green-400 border-green-400'
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">압도적 트래픽</h1>
        <p className="text-neutral-400 mb-8">
          현재 채널 상태 → 7일/14일 실행계획 + UTM 링크 자동 생성
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 채널 체크리스트 */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900 p-8 rounded-2xl">
              <div>
                <label className="block text-sm font-medium mb-4">
                  현재 운영 중인 채널 선택
                </label>
                <div className="space-y-3">
                  {[
                    { key: 'naver_map', label: '🗺️ 네이버 지도', desc: '위치 기반 검색' },
                    { key: 'reviews', label: '⭐ 리뷰 관리', desc: '고객 후기 답변' },
                    { key: 'instagram', label: '📸 인스타그램', desc: '릴스/피드 운영' },
                    { key: 'facebook', label: '👥 페이스북', desc: '커뮤니티 관리' },
                    { key: 'ads', label: '💰 유료 광고', desc: '네이버/카카오 CPC' }
                  ].map(({ key, label, desc }) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 p-4 bg-neutral-800 rounded-lg cursor-pointer hover:bg-neutral-700 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={channels[key as keyof typeof channels]}
                        onChange={(e) =>
                          setChannels({ ...channels, [key]: e.target.checked })
                        }
                        className="w-5 h-5 rounded border-neutral-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{label}</div>
                        <div className="text-xs text-neutral-500">{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">기간 선택</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDuration(7)}
                    className={`py-3 rounded-lg font-medium ${
                      duration === 7
                        ? 'bg-[#E50914] text-white'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    7일 플랜
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuration(14)}
                    className={`py-3 rounded-lg font-medium ${
                      duration === 14
                        ? 'bg-[#E50914] text-white'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    14일 플랜
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !Object.values(channels).some(v => v)}
                className="w-full py-4 bg-gradient-to-r from-[#E50914] to-[#FF1744] rounded-lg font-bold hover:from-[#B00610] hover:to-[#E50914] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '플랜 생성 중...' : '🚀 트래픽 플랜 생성'}
              </button>
            </form>
          </div>

          {/* 실행 플랜 */}
          <div>
            {plan ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{duration}일 실행 플랜</h3>
                  <button
                    onClick={downloadCSV}
                    className="px-4 py-2 bg-neutral-800 rounded-lg text-sm hover:bg-neutral-700"
                  >
                    📥 CSV 다운로드
                  </button>
                </div>

                <div className="space-y-3">
                  {plan.map((item, index) => (
                    <div
                      key={index}
                      className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 hover:border-[#E50914] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-neutral-700">
                            D+{item.day}
                          </span>
                          <div>
                            <h4 className="font-bold">{item.channel}</h4>
                            <p className="text-sm text-neutral-400">{item.action}</p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            priorityColor[item.priority]
                          }`}
                        >
                          {item.priority.toUpperCase()}
                        </span>
                      </div>

                      <div className="bg-neutral-800 p-3 rounded-lg">
                        <span className="text-xs text-neutral-500 block mb-1">UTM 파라미터</span>
                        <code className="text-xs text-green-400 break-all">
                          {item.utm_params}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-[#E50914] to-[#FF1744] p-6 rounded-2xl">
                  <h4 className="font-bold mb-3">📊 예상 효과</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold">+300%</div>
                      <div className="text-sm">노출 증가</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">+150%</div>
                      <div className="text-sm">클릭 증가</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">+50%</div>
                      <div className="text-sm">전환 증가</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-900 p-12 rounded-2xl text-center text-neutral-500 h-full flex items-center justify-center">
                <div>
                  <p className="text-6xl mb-4">🚀</p>
                  <p>채널을 선택하고</p>
                  <p className="font-bold text-white">트래픽 플랜을 생성하세요</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
