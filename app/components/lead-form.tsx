'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'

interface LeadFormProps {
  category: string
}

export default function LeadForm({ category }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: category,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || '신청이 완료되었습니다!')
        setFormData({ name: '', phone: '', interest: category })
      } else {
        setStatus('error')
        setMessage(data.error || '오류가 발생했습니다.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('서버 연결에 실패했습니다.')
    }

    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

  return (
    <div className="card-netflix p-8 lg:p-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-[#E50914]">무료 진단</span> 신청
        </h2>
        <p className="text-neutral-400">
          내 업종/상황에 맞는 시스템을 추천받으세요. 상담은 100% 무료입니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        {/* 이름 */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            이름
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E50914] transition-colors"
            placeholder="홍길동"
          />
        </div>

        {/* 연락처 */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-2">
            연락처
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E50914] transition-colors"
            placeholder="010-1234-5678"
          />
        </div>

        {/* 관심 카테고리 */}
        <div>
          <label htmlFor="interest" className="block text-sm font-semibold mb-2">
            관심 분야
          </label>
          <select
            id="interest"
            value={formData.interest}
            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E50914] transition-colors"
          >
            <option value="biz">자영업</option>
            <option value="startup">AI 창업</option>
            <option value="njob">N잡</option>
            <option value="coin">코인</option>
            <option value="agent">AI Agent</option>
            <option value="etc">기타</option>
          </select>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#E50914] hover:bg-[#c40810] text-white font-bold py-4 rounded-2xl shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {status === 'loading' ? (
            <span>전송 중...</span>
          ) : (
            <>
              <span>무료 진단 신청하기</span>
              <Send size={20} />
            </>
          )}
        </button>

        {/* 상태 메시지 */}
        {message && (
          <div
            className={`text-center p-4 rounded-xl ${
              status === 'success'
                ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}
          >
            {message}
          </div>
        )}
      </form>

      {/* TODO: Supabase 연동 안내 */}
      {/*
      현재는 콘솔 로깅만 수행합니다.
      실제 운영 시 app/lib/supabase.ts에서 클라이언트 설정 후
      app/api/leads/route.ts에서 다음과 같이 연동:

      const { data, error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          interest: formData.interest,
          category: category,
          created_at: new Date()
        }])
      */}

      <p className="text-center text-sm text-neutral-500 mt-6">
        개인정보는 상담 목적으로만 사용되며, 상담 완료 후 파기됩니다.
      </p>
    </div>
  )
}
