'use client'

import { useState } from 'react'
import { runAgentPipeline } from '@/lib/agent-core'
import { reserveAction } from '@/lib/agent-core/actions/reserve'
import { trackLeadSubmitted, trackAgentAction } from '@/lib/analytics'

export default function ReservePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    industry: '',
    desired_at: '',
    note: ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const startTime = Date.now()

    try {
      const output = await runAgentPipeline(
        {
          slot: 'biz',
          module: 'reserve',
          data: formData
        },
        reserveAction
      )

      setResult(output.summary)

      if (output.success) {
        const duration = Date.now() - startTime
        trackLeadSubmitted('biz', 'reserve')
        trackAgentAction('biz', 'reserve', duration)
      }
    } catch (error) {
      setResult('❌ 처리 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">예약 자동화 퍼널</h1>
        <p className="text-neutral-400 mb-8">
          랜딩 → 예약폼 → 알림톡 → 캘린더까지 1액션으로 자동화
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900 p-8 rounded-2xl">
          <div>
            <label className="block text-sm font-medium mb-2">이름</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">전화번호 (010-XXXX-XXXX)</label>
            <input
              type="text"
              required
              pattern="010-\d{4}-\d{4}"
              placeholder="010-1234-5678"
              className="w-full px-4 py-3 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">업종 선택</label>
            <select
              required
              className="w-full px-4 py-3 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            >
              <option value="">선택하세요</option>
              <option value="cafe">카페/디저트</option>
              <option value="restaurant">음식점</option>
              <option value="beauty">뷰티/미용</option>
              <option value="fitness">피트니스</option>
              <option value="clinic">병원/클리닉</option>
              <option value="academy">학원/교육</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">희망 일시</label>
            <input
              type="datetime-local"
              required
              className="w-full px-4 py-3 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              value={formData.desired_at}
              onChange={(e) => setFormData({ ...formData, desired_at: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">요청사항 (선택)</label>
            <textarea
              rows={3}
              className="w-full px-4 py-3 bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-[#E50914] to-[#FF1744] rounded-lg font-bold hover:from-[#B00610] hover:to-[#E50914] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : '예약 신청하기'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-neutral-900 rounded-2xl whitespace-pre-line">
            {result}
          </div>
        )}
      </div>
    </div>
  )
}
