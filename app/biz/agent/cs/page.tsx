'use client'

import { useState } from 'react'
import { runAgentPipeline } from '@/lib/agent-core'
import { csAction } from '@/lib/agent-core/actions/cs'
import { trackLeadSubmitted, trackAgentAction } from '@/lib/analytics'

interface MessageTemplate {
  timing: 'before_day' | 'same_day' | 'reminder'
  subject: string
  content: string
  variables: string[]
}

export default function CSPage() {
  const [formData, setFormData] = useState({
    industry: '',
    business_name: '',
    address: ''
  })
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState<MessageTemplate[] | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const startTime = Date.now()

    try {
      const output = await runAgentPipeline(
        {
          slot: 'biz',
          module: 'cs',
          data: formData
        },
        csAction
      )

      if (output.success && output.data?.templates) {
        setTemplates(output.data.templates)
        const executionTime = Date.now() - startTime
        trackLeadSubmitted('biz', 'cs')
        trackAgentAction('biz', 'cs', executionTime)
      }
    } catch (error) {
      console.error('CS template error:', error)
    } finally {
      setLoading(false)
    }
  }

  const timingLabels = {
    before_day: { label: '전날 알림', icon: '🔔', color: 'bg-blue-500' },
    same_day: { label: '당일 리마인더', icon: '⏰', color: 'bg-yellow-500' },
    reminder: { label: '재방문 쿠폰', icon: '🎁', color: 'bg-green-500' }
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">방문율/CS 자동화</h1>
        <p className="text-neutral-400 mb-8">
          예약 후 3단계 메시지 (전날/당일/리마인드) 자동 발송 시나리오
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 비즈니스 정보 입력 */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900 p-8 rounded-2xl">
              <div>
                <label className="block text-sm font-medium mb-2">업종</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  <option value="카페">카페/디저트</option>
                  <option value="음식점">음식점</option>
                  <option value="뷰티">뷰티/미용</option>
                  <option value="피트니스">피트니스</option>
                  <option value="병원">병원/클리닉</option>
                  <option value="학원">학원/교육</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">상호명</label>
                <input
                  type="text"
                  required
                  placeholder="예: 강남 스마일 치과"
                  className="w-full px-4 py-3 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                  value={formData.business_name}
                  onChange={(e) =>
                    setFormData({ ...formData, business_name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">주소</label>
                <input
                  type="text"
                  required
                  placeholder="예: 서울시 강남구 테헤란로 123"
                  className="w-full px-4 py-3 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#E50914] to-[#FF1744] rounded-lg font-bold hover:from-[#B00610] hover:to-[#E50914] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '템플릿 생성 중...' : '💬 3단계 메시지 템플릿 생성'}
              </button>
            </form>

            {/* 시나리오 플로우 */}
            <div className="mt-8 bg-neutral-900 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">📋 발송 시나리오</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-2xl">
                    🔔
                  </div>
                  <div>
                    <div className="font-bold">전날 알림</div>
                    <div className="text-xs text-neutral-500">예약 1일 전 17:00</div>
                  </div>
                </div>

                <div className="ml-6 border-l-2 border-neutral-700 h-8"></div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-2xl">
                    ⏰
                  </div>
                  <div>
                    <div className="font-bold">당일 리마인더</div>
                    <div className="text-xs text-neutral-500">예약 3시간 전</div>
                  </div>
                </div>

                <div className="ml-6 border-l-2 border-neutral-700 h-8"></div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-2xl">
                    🎁
                  </div>
                  <div>
                    <div className="font-bold">재방문 쿠폰</div>
                    <div className="text-xs text-neutral-500">방문 후 6시간 뒤</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 메시지 템플릿 */}
          <div>
            {templates ? (
              <div className="space-y-4">
                {templates.map((template, index) => {
                  const config = timingLabels[template.timing]
                  return (
                    <div
                      key={index}
                      className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#E50914] transition-colors"
                    >
                      <div className={`${config.color} p-4 flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{config.icon}</span>
                          <div>
                            <h3 className="font-bold">{config.label}</h3>
                            <p className="text-sm opacity-90">{template.subject}</p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setEditingIndex(editingIndex === index ? null : index)
                          }
                          className="px-3 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/30"
                        >
                          {editingIndex === index ? '닫기' : '편집'}
                        </button>
                      </div>

                      <div className="p-6">
                        {editingIndex === index ? (
                          <textarea
                            className="w-full h-32 px-4 py-3 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914] font-mono text-sm"
                            value={template.content}
                            onChange={(e) => {
                              const newTemplates = [...templates]
                              newTemplates[index].content = e.target.value
                              setTemplates(newTemplates)
                            }}
                          />
                        ) : (
                          <div className="whitespace-pre-line text-neutral-300">
                            {template.content}
                          </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-neutral-800">
                          <div className="text-xs text-neutral-500 mb-2">사용 가능한 변수</div>
                          <div className="flex flex-wrap gap-2">
                            {template.variables.map((variable, i) => (
                              <code
                                key={i}
                                className="px-2 py-1 bg-neutral-800 rounded text-xs text-green-400"
                              >
                                {variable}
                              </code>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(template.content)
                          }}
                          className="mt-4 w-full py-2 bg-neutral-800 rounded-lg text-sm hover:bg-neutral-700"
                        >
                          📋 템플릿 복사
                        </button>
                      </div>
                    </div>
                  )
                })}

                <div className="bg-gradient-to-r from-[#E50914] to-[#FF1744] p-6 rounded-2xl">
                  <h4 className="font-bold mb-3">📈 예상 효과</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-bold">+40%</div>
                      <div className="text-sm">노쇼율 감소</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">+25%</div>
                      <div className="text-sm">재방문율 증가</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-900 p-12 rounded-2xl text-center text-neutral-500 h-full flex items-center justify-center">
                <div>
                  <p className="text-6xl mb-4">💬</p>
                  <p>비즈니스 정보를 입력하고</p>
                  <p className="font-bold text-white">메시지 템플릿을 생성하세요</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
