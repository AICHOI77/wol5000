'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Module {
  key: string
  name: string
  path: string
  icon: string
  description: string
  features: string[]
  color: string
}

const modules: Module[] = [
  {
    key: 'reserve',
    name: '예약 자동화 퍼널',
    path: '/biz/agent/reserve',
    icon: '📅',
    description: '예약폼 → 알림톡 → 캘린더까지 1액션 자동화',
    features: [
      '업종별 맞춤 예약폼',
      'Solapi 알림톡 자동 발송',
      'Google Calendar 연동',
      '노쇼율 40% 감소'
    ],
    color: 'from-blue-600 to-blue-800'
  },
  {
    key: 'shorts',
    name: '숏츠·영상 마케팅',
    path: '/biz/agent/shorts',
    icon: '🎬',
    description: '키워드 → 3개 숏츠 스크립트 자동 생성',
    features: [
      '3개 스크립트 동시 생성',
      '훅/본문/CTA 완성',
      '해시태그 자동 추천',
      '썸네일 카피 제공'
    ],
    color: 'from-purple-600 to-purple-800'
  },
  {
    key: 'traffic',
    name: '압도적 트래픽',
    path: '/biz/agent/traffic',
    icon: '🚀',
    description: '채널 체크 → 7일/14일 실행계획 + UTM 링크',
    features: [
      '지도/리뷰/SNS 통합 플랜',
      'UTM 파라미터 자동 생성',
      '우선순위 자동 정렬',
      'CSV 다운로드 지원'
    ],
    color: 'from-green-600 to-green-800'
  },
  {
    key: 'cs',
    name: '방문율/CS 자동화',
    path: '/biz/agent/cs',
    icon: '💬',
    description: '3단계 메시지 자동화로 재방문율 25% 증가',
    features: [
      '전날 알림 자동 발송',
      '당일 리마인더',
      '재방문 쿠폰 발급',
      '템플릿 실시간 편집'
    ],
    color: 'from-red-600 to-red-800'
  }
]

export default function BizAgentPage() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-black py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            자영업 AI 에이전트 <span className="text-[#E50914]">MVP</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 mb-8">
            하루 예약 3건 → 10건으로 만드는 4가지 자동화 시스템
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>24시간 자동 운영</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>업종별 맞춤 설정</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>n8n 워크플로우 연동</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <div
              key={module.key}
              className="group relative bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-[#E50914] transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setSelectedModule(module)}
              onMouseLeave={() => setSelectedModule(null)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{module.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold">{module.name}</h3>
                      <p className="text-sm text-neutral-400">{module.description}</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {module.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-neutral-300">
                      <span className="text-[#E50914]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={module.path}
                  className="block w-full py-3 bg-gradient-to-r from-[#E50914] to-[#FF1744] rounded-lg text-center font-bold hover:from-[#B00610] hover:to-[#E50914] transition-all group-hover:scale-105"
                >
                  시작하기 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Flow */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          🔄 통합 자동화 플로우
        </h2>
        <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                📅
              </div>
              <h3 className="font-bold mb-2">1. 예약 접수</h3>
              <p className="text-sm text-neutral-400">
                고객 정보 자동 수집 + 알림톡 발송
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🎬
              </div>
              <h3 className="font-bold mb-2">2. 콘텐츠 생성</h3>
              <p className="text-sm text-neutral-400">
                숏츠 스크립트 자동 생성 + 배포
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🚀
              </div>
              <h3 className="font-bold mb-2">3. 트래픽 증폭</h3>
              <p className="text-sm text-neutral-400">
                채널별 플랜 실행 + UTM 추적
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                💬
              </div>
              <h3 className="font-bold mb-2">4. CS 자동화</h3>
              <p className="text-sm text-neutral-400">
                3단계 메시지 + 재방문 유도
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#E50914] to-[#FF1744] rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            📊 예상 성과
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">+300%</div>
              <div className="text-sm opacity-90">온라인 노출</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">+150%</div>
              <div className="text-sm opacity-90">예약 건수</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">-40%</div>
              <div className="text-sm opacity-90">노쇼율</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">+25%</div>
              <div className="text-sm opacity-90">재방문율</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          🛠️ 기술 스택
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="font-bold mb-4">Frontend</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>• Next.js 15 (App Router)</li>
              <li>• TypeScript + Tailwind CSS</li>
              <li>• shadcn/ui Components</li>
              <li>• Framer Motion</li>
            </ul>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="font-bold mb-4">Backend</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>• Supabase (Database + Auth)</li>
              <li>• n8n (Workflow Automation)</li>
              <li>• Solapi (SMS/알림톡)</li>
              <li>• Google Calendar API</li>
            </ul>
          </div>

          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
            <h3 className="font-bold mb-4">Analytics</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>• PostHog (이벤트 추적)</li>
              <li>• Vercel Analytics</li>
              <li>• UTM 파라미터 추적</li>
              <li>• agent_sessions 로깅</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-neutral-900 rounded-2xl p-12 border border-neutral-800">
          <h2 className="text-4xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-neutral-400 mb-8">
            4가지 AI 에이전트로 자영업 매출을 자동화하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/biz/agent/reserve"
              className="px-8 py-4 bg-gradient-to-r from-[#E50914] to-[#FF1744] rounded-lg font-bold hover:from-[#B00610] hover:to-[#E50914]"
            >
              예약 자동화부터 시작
            </Link>
            <a
              href="https://calendly.com/wol5000/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-neutral-800 rounded-lg font-bold hover:bg-neutral-700"
            >
              데모 신청하기
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
