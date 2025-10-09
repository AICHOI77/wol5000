'use client'

import { useState } from 'react'
import { runAgentPipeline } from '@/lib/agent-core'
import { shortsAction } from '@/lib/agent-core/actions/shorts'
import { trackLeadSubmitted, trackAgentAction, trackShortsPlanGenerated } from '@/lib/analytics'

interface ShortsScript {
  title: string
  hook: string
  body: string
  cta: string
  hashtags: string[]
  thumbnail_copy: string
}

export default function ShortsPage() {
  const [formData, setFormData] = useState({
    industry: '',
    keywords: ['', '', '']
  })
  const [loading, setLoading] = useState(false)
  const [scripts, setScripts] = useState<ShortsScript[] | null>(null)

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...formData.keywords]
    newKeywords[index] = value
    setFormData({ ...formData, keywords: newKeywords })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const startTime = Date.now()

    try {
      const output = await runAgentPipeline(
        {
          slot: 'biz',
          module: 'shorts',
          data: {
            industry: formData.industry,
            keywords: formData.keywords.filter(k => k.trim() !== '')
          }
        },
        shortsAction
      )

      if (output.success && output.data?.scripts) {
        setScripts(output.data.scripts)
        const duration = Date.now() - startTime
        trackLeadSubmitted('biz', 'shorts')
        trackAgentAction('biz', 'shorts', duration)
        trackShortsPlanGenerated()
      }
    } catch (error) {
      console.error('Shorts generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">숏츠·영상 마케팅</h1>
        <p className="text-neutral-400 mb-8">
          키워드 입력 → 3개 숏츠 스크립트 자동 생성 + 썸네일 카피
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 입력 폼 */}
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
                <label className="block text-sm font-medium mb-2">
                  핵심 키워드 3개
                </label>
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <input
                      key={index}
                      type="text"
                      required
                      placeholder={`키워드 ${index + 1} (예: 다이어트, 단백질, 운동)`}
                      className="w-full px-4 py-3 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                      value={formData.keywords[index]}
                      onChange={(e) => handleKeywordChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-[#E50914] to-[#FF1744] rounded-lg font-bold hover:from-[#B00610] hover:to-[#E50914] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '스크립트 생성 중...' : '🎬 3개 숏츠 스크립트 생성'}
              </button>
            </form>

            {/* FAQ */}
            <div className="mt-8 bg-neutral-900 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">💡 활용 가이드</h3>
              <div className="space-y-3 text-sm text-neutral-400">
                <div>
                  <strong className="text-white">업로드 루틴:</strong>
                  <p>주 3회 (월/수/금) 또는 매일 일정한 시간대 고정</p>
                </div>
                <div>
                  <strong className="text-white">크로스포스트:</strong>
                  <p>유튜브 Shorts → 인스타 Reels → 틱톡 동시 업로드</p>
                </div>
                <div>
                  <strong className="text-white">썸네일 팁:</strong>
                  <p>첫 3초 훅: 강렬한 질문 or 숫자 or 반전</p>
                </div>
              </div>
            </div>
          </div>

          {/* 결과 카드 */}
          <div>
            {scripts ? (
              <div className="space-y-6">
                {scripts.map((script, index) => (
                  <div
                    key={index}
                    className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 hover:border-[#E50914] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-[#E50914]">
                        숏츠 #{index + 1}
                      </h3>
                      <button
                        onClick={() => {
                          const text = `${script.title}\n\n훅: ${script.hook}\n본문: ${script.body}\nCTA: ${script.cta}\n\n${script.hashtags.join(' ')}`
                          navigator.clipboard.writeText(text)
                        }}
                        className="px-3 py-1 bg-neutral-800 rounded-lg text-sm hover:bg-neutral-700"
                      >
                        📋 복사
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-neutral-500 uppercase">제목</span>
                        <p className="font-bold">{script.title}</p>
                      </div>

                      <div>
                        <span className="text-xs text-neutral-500 uppercase">훅 (첫 3초)</span>
                        <p className="text-yellow-400">{script.hook}</p>
                      </div>

                      <div>
                        <span className="text-xs text-neutral-500 uppercase">본문</span>
                        <p className="text-neutral-300">{script.body}</p>
                      </div>

                      <div>
                        <span className="text-xs text-neutral-500 uppercase">CTA</span>
                        <p className="text-[#E50914] font-medium">{script.cta}</p>
                      </div>

                      <div>
                        <span className="text-xs text-neutral-500 uppercase">해시태그</span>
                        <p className="text-blue-400">{script.hashtags.join(' ')}</p>
                      </div>

                      <div className="pt-3 border-t border-neutral-800">
                        <span className="text-xs text-neutral-500 uppercase">썸네일 카피</span>
                        <p className="font-bold text-lg">{script.thumbnail_copy}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-gradient-to-r from-[#E50914] to-[#FF1744] p-6 rounded-2xl text-center">
                  <h4 className="font-bold mb-2">📊 배포 체크리스트</h4>
                  <div className="text-sm space-y-1">
                    <p>✅ 유튜브 Shorts 업로드</p>
                    <p>✅ 인스타그램 Reels 크로스포스트</p>
                    <p>✅ 틱톡 동영상 업로드</p>
                    <p>✅ 프로필 링크 확인</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-900 p-12 rounded-2xl text-center text-neutral-500 h-full flex items-center justify-center">
                <div>
                  <p className="text-6xl mb-4">🎬</p>
                  <p>키워드를 입력하고</p>
                  <p className="font-bold text-white">숏츠 스크립트를 생성하세요</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
