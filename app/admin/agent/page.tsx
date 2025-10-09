'use client'

import { useState } from 'react'

type AgentType = 'cs' | 'youtube' | 'live' | 'sales' | 'biz'

interface AgentResult {
  [key: string]: string | number
}

const AGENT_MENU = [
  { id: 'cs', icon: '💬', label: '텔레그램 고객성공' },
  { id: 'youtube', icon: '📺', label: '유튜브 자동화' },
  { id: 'live', icon: '🎥', label: 'Zoom / Live 관리' },
  { id: 'sales', icon: '🚀', label: '스텔스 세일즈 퍼널' },
  { id: 'biz', icon: '🏪', label: '자영업/창업 퍼널 관리' }
] as const

const AGENT_DATA = {
  cs: {
    title: '텔레그램 고객응대 자동화',
    description: 'FAQ, 클레임, 환불, 일정 안내 자동응답 시스템',
    dummyResult: {
      intent: 'refund',
      answer: '환불 절차는 3단계로 진행됩니다: 접수-검토-처리',
      next_step: '고객에 알림톡 발송'
    }
  },
  youtube: {
    title: '유튜브 영상 자동화',
    description: '주제 생성 → 대본 → 썸네일(Figma) → 예약업로드',
    dummyResult: {
      topic: 'AI로 월5천 버는 자영업 시스템',
      script_status: '완료',
      thumbnail_url: 'https://dummyimage.com/1280x720/000/fff&text=W5000+AI',
      upload_status: 'scheduled'
    }
  },
  live: {
    title: 'Zoom / Live 자동화',
    description: '토요일 22:30 Q&A 및 평일 20:00 줌 자동 생성/리마인드',
    dummyResult: {
      meeting: 'Q&A Live',
      time: 'Sat 22:30',
      participants: 30,
      recording: 'enabled',
      status: 'scheduled'
    }
  },
  sales: {
    title: '스텔스 세일즈 자동화',
    description: '20시 다중 트랙 세일즈 송출 + 전환 추적',
    dummyResult: {
      tracks: 3,
      status: 'active',
      conversion_rate: '4.2%',
      next_action: '알림톡 후속발송'
    }
  },
  biz: {
    title: '자영업/창업 퍼널 관리',
    description: '퍼널 진단 → 코스 추천 → 스텔스 연결 자동화',
    dummyResult: {
      segment: '자영업 매출증대',
      leads_today: 42,
      webinar_clicks: 120,
      purchases: 8
    }
  }
}

export default function AdminAgentPage() {
  const [activeAgent, setActiveAgent] = useState<AgentType>('cs')
  const [result, setResult] = useState<AgentResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRunSimulation = () => {
    setLoading(true)
    console.log(`🤖 Running simulation for: ${activeAgent}`)

    setTimeout(() => {
      const agentData = AGENT_DATA[activeAgent]
      setResult(agentData.dummyResult)
      console.log('✅ Simulation Result:', agentData.dummyResult)
      setLoading(false)
    }, 1200)
  }

  const handleFullAutomation = () => {
    alert('Full Automation 기능은 n8n 워크플로우 연동 후 제공됩니다.')
  }

  const currentAgent = AGENT_DATA[activeAgent]

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI 운영 에이전트 허브 <span className="text-[#E50914]">(MVP)</span></h1>
            <p className="text-sm text-neutral-400 mt-1">내부 운영자용 자동화 시스템 통합 관리</p>
          </div>
          <button
            onClick={handleFullAutomation}
            disabled
            className="px-6 py-3 bg-neutral-800 text-neutral-500 rounded-lg font-bold cursor-not-allowed"
          >
            Full Automation Start (준비 중)
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 p-6">
          {/* Left Sidebar */}
          <aside className="bg-neutral-900 rounded-2xl p-4 h-fit border border-neutral-800">
            <div className="mb-4 px-3 py-2">
              <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Agent Navigation</h2>
            </div>
            <nav className="space-y-2">
              {AGENT_MENU.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveAgent(item.id as AgentType)
                    setResult(null)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeAgent === item.id
                      ? 'bg-[#E50914] text-white shadow-lg shadow-[#E50914]/20'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-neutral-800">
              <div className="px-3 space-y-2 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>실시간 연동 준비</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>n8n 워크플로우 대기</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Content */}
          <main>
            <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800">
              {/* Agent Card Header */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">
                      {AGENT_MENU.find((m) => m.id === activeAgent)?.icon}
                    </span>
                    <h2 className="text-3xl font-bold">{currentAgent.title}</h2>
                  </div>
                  <p className="text-neutral-400 text-lg">{currentAgent.description}</p>
                </div>
                <button
                  onClick={handleRunSimulation}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-[#E50914] to-[#FF1744] rounded-lg font-bold text-lg hover:from-[#B00610] hover:to-[#E50914] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#E50914]/30 whitespace-nowrap"
                >
                  {loading ? '실행 중...' : 'Run Simulation'}
                </button>
              </div>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-8"></div>

              {/* Result Display */}
              {result ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">
                      시뮬레이션 결과
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {Object.entries(result).map(([key, value]) => (
                        <div key={key} className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                          <div className="text-xs text-neutral-500 uppercase mb-1">{key}</div>
                          <div className="text-lg font-bold text-white">
                            {typeof value === 'string' && value.startsWith('http') ? (
                              <a
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline text-sm break-all"
                              >
                                {value}
                              </a>
                            ) : (
                              value
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* JSON Output */}
                  <div>
                    <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">
                      JSON 출력
                    </h3>
                    <pre className="bg-black rounded-xl p-6 overflow-auto border border-neutral-800 text-green-400 text-sm">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="text-6xl mb-6">
                    {AGENT_MENU.find((m) => m.id === activeAgent)?.icon}
                  </div>
                  <p className="text-neutral-500 text-lg">
                    "Run Simulation" 버튼을 클릭하여
                    <br />
                    에이전트 시뮬레이션을 시작하세요
                  </p>
                </div>
              )}
            </div>

            {/* Tech Info */}
            <div className="mt-6 bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">
                기술 스택 & 연동 정보
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-neutral-800 rounded-lg p-4">
                  <div className="text-neutral-500 mb-2">자동화 엔진</div>
                  <div className="font-bold">n8n Workflow</div>
                </div>
                <div className="bg-neutral-800 rounded-lg p-4">
                  <div className="text-neutral-500 mb-2">데이터베이스</div>
                  <div className="font-bold">Supabase</div>
                </div>
                <div className="bg-neutral-800 rounded-lg p-4">
                  <div className="text-neutral-500 mb-2">알림/메시징</div>
                  <div className="font-bold">Solapi + Telegram Bot</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-neutral-500">
                💾 현재는 더미 데이터로 동작합니다. 실제 API 연동은 n8n 워크플로우 설정 후 활성화됩니다.
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
