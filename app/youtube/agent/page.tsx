'use client'

import { useState } from 'react'

interface Topic {
  id: number
  title: string
  angle: string
  keyword: string
}

interface Script {
  topic_id: number
  hook: string
  body: string
  outro: string
}

interface Thumbnail {
  topic_id: number
  thumbnail_url: string
  variant: number
}

interface Video {
  topic_id: number
  video_id: string
  scheduled_time: string
  status: string
}

// Dummy Data
const DUMMY_TOPICS: Topic[] = [
  { id: 1, title: "AI로 하루 2시간만 일하고 월1000 버는 법", angle: "자영업 자동화", keyword: "AI 자동수익" },
  { id: 2, title: "유튜브 수익을 10배로 올린 썸네일 공식", angle: "콘텐츠", keyword: "썸네일" },
  { id: 3, title: "월5천 만드는 GPT 업무 자동화", angle: "AI 창업", keyword: "GPT자동화" },
  { id: 4, title: "숏츠로 하루 100만원 벌기", angle: "숏폼 마케팅", keyword: "숏츠수익" },
  { id: 5, title: "자영업 매출 3배 올린 AI 시스템", angle: "매출자동화", keyword: "자영업AI" }
]

const DUMMY_SCRIPTS: Script[] = [
  {
    topic_id: 1,
    hook: "사람이 아니라 AI가 돈을 버는 시대입니다.",
    body: "이 영상에서는 하루 2시간만 투자해도 AI가 자동으로 수익을 만들어주는 시스템을 공개합니다. 첫째, GPT로 콘텐츠를 자동 생성하고, 둘째, n8n으로 워크플로우를 자동화하며, 셋째, Supabase로 데이터를 관리합니다...",
    outro: "지금 바로 AI 시스템을 세팅하세요. 링크는 설명란에 있습니다."
  },
  {
    topic_id: 2,
    hook: "썸네일 하나로 조회수가 10배 차이납니다.",
    body: "유튜브 알고리즘을 뚫는 썸네일 공식을 공개합니다. 색상 대비, 텍스트 크기, 감정 표현 3가지만 지키면 클릭률이 급상승합니다...",
    outro: "다음 영상에서는 실제 제작 과정을 보여드리겠습니다."
  },
  {
    topic_id: 3,
    hook: "GPT 하나로 업무 시간을 80% 줄였습니다.",
    body: "반복 업무를 GPT로 자동화하는 방법을 단계별로 설명합니다. 이메일 답장, 보고서 작성, 데이터 정리까지 모두 자동화 가능합니다...",
    outro: "월5천으로 시작할 수 있는 AI 자동화 시스템, 지금 시작하세요."
  }
]

const DUMMY_THUMBNAILS: Thumbnail[] = [
  { topic_id: 1, thumbnail_url: "https://dummyimage.com/1280x720/E50914/fff&text=AI+Auto+Money", variant: 1 },
  { topic_id: 1, thumbnail_url: "https://dummyimage.com/1280x720/FF1744/fff&text=2H+Work+1000K", variant: 2 },
  { topic_id: 1, thumbnail_url: "https://dummyimage.com/1280x720/000000/E50914&text=Automation+System", variant: 3 }
]

const DUMMY_VIDEOS: Video[] = [
  { topic_id: 1, video_id: "yt_dummy123", scheduled_time: "2025-10-09T20:00:00Z", status: "scheduled" },
  { topic_id: 2, video_id: "yt_dummy456", scheduled_time: "2025-10-10T20:00:00Z", status: "scheduled" },
  { topic_id: 3, video_id: "yt_dummy789", scheduled_time: "2025-10-11T20:00:00Z", status: "scheduled" }
]

export default function YouTubeAgentPage() {
  const [topicsResult, setTopicsResult] = useState<Topic[] | null>(null)
  const [scriptsResult, setScriptsResult] = useState<Script[] | null>(null)
  const [thumbnailsResult, setThumbnailsResult] = useState<Thumbnail[] | null>(null)
  const [videosResult, setVideosResult] = useState<Video[] | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  const simulateTopicGeneration = () => {
    setLoading('topics')
    console.log('🎯 Topic Generator - Simulating GPT API call...')

    setTimeout(() => {
      setTopicsResult(DUMMY_TOPICS)
      console.log('✅ Generated Topics:', DUMMY_TOPICS)
      setLoading(null)
    }, 1500)
  }

  const simulateScriptBuilding = () => {
    setLoading('scripts')
    console.log('📝 Script Builder - Simulating GPT script generation...')

    setTimeout(() => {
      setScriptsResult(DUMMY_SCRIPTS)
      console.log('✅ Generated Scripts:', DUMMY_SCRIPTS)
      setLoading(null)
    }, 2000)
  }

  const simulateThumbnailGeneration = () => {
    setLoading('thumbnails')
    console.log('🎨 Thumbnail Generator - Simulating Figma API call...')

    setTimeout(() => {
      setThumbnailsResult(DUMMY_THUMBNAILS)
      console.log('✅ Generated Thumbnails:', DUMMY_THUMBNAILS)
      setLoading(null)
    }, 1800)
  }

  const simulateUploadScheduling = () => {
    setLoading('videos')
    console.log('📤 Upload Scheduler - Simulating YouTube Data API...')

    setTimeout(() => {
      setVideosResult(DUMMY_VIDEOS)
      console.log('✅ Scheduled Videos:', DUMMY_VIDEOS)
      setLoading(null)
    }, 1600)
  }

  const startFullAutomation = () => {
    console.log('🚀 Full Automation Started - Will integrate with n8n workflow...')
    alert('Full Automation 기능은 n8n 워크플로우 연동 후 제공됩니다.')
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            유튜브 자동화 에이전트 <span className="text-[#E50914]">MVP</span>
          </h1>
          <p className="text-xl text-neutral-400 mb-2">
            100개 영상 자동 생성 및 예약 업로드 시스템
          </p>
          <p className="text-sm text-neutral-500">
            🤖 AI 주제 생성기 → 📝 대본 작성기 → 🎨 썸네일 생성기 → 📤 업로드 예약기
          </p>
        </div>

        {/* Section 1: Topic Generator */}
        <div className="bg-neutral-900 rounded-2xl p-8 mb-6 border border-neutral-800">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">① 주제 생성기</h2>
              <p className="text-neutral-400">
                GPT를 이용해 100개의 영상 주제를 자동 생성합니다
              </p>
              <div className="mt-2 text-sm text-neutral-500">
                입력: category, target_audience, tone → 출력: JSON (id, title, angle, keyword)
              </div>
            </div>
            <button
              onClick={simulateTopicGeneration}
              disabled={loading === 'topics'}
              className="px-6 py-3 bg-gradient-to-r from-[#E50914] to-[#FF1744] rounded-lg font-bold hover:from-[#B00610] hover:to-[#E50914] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading === 'topics' ? '생성 중...' : '시뮬레이션 실행'}
            </button>
          </div>

          {topicsResult && (
            <div className="bg-neutral-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-neutral-400 mb-4">생성된 주제 (5개 예시)</h3>
              <div className="space-y-3">
                {topicsResult.map((topic) => (
                  <div key={topic.id} className="bg-neutral-900 p-4 rounded-lg border border-neutral-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-neutral-500">#{topic.id}</span>
                          <span className="px-2 py-1 bg-[#E50914] rounded text-xs">{topic.angle}</span>
                          <span className="px-2 py-1 bg-blue-600 rounded text-xs">{topic.keyword}</span>
                        </div>
                        <h4 className="font-bold">{topic.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <pre className="mt-4 text-xs text-green-400 bg-black p-4 rounded-lg overflow-auto">
                {JSON.stringify(topicsResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Section 2: Script Builder */}
        <div className="bg-neutral-900 rounded-2xl p-8 mb-6 border border-neutral-800">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">② 대본 작성기</h2>
              <p className="text-neutral-400">
                각 주제별 5분 대본을 자동으로 생성합니다
              </p>
              <div className="mt-2 text-sm text-neutral-500">
                입력: topic_id → 출력: JSON (topic_id, hook, body, outro)
              </div>
            </div>
            <button
              onClick={simulateScriptBuilding}
              disabled={loading === 'scripts'}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg font-bold hover:from-purple-700 hover:to-purple-900 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading === 'scripts' ? '생성 중...' : '시뮬레이션 실행'}
            </button>
          </div>

          {scriptsResult && (
            <div className="bg-neutral-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-neutral-400 mb-4">생성된 대본 (3개 예시)</h3>
              <div className="space-y-4">
                {scriptsResult.map((script, index) => (
                  <div key={index} className="bg-neutral-900 p-4 rounded-lg border border-neutral-700">
                    <div className="text-xs text-neutral-500 mb-3">Topic #{script.topic_id}</div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-bold text-yellow-400 uppercase">훅</span>
                        <p className="text-sm mt-1">{script.hook}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-blue-400 uppercase">본문</span>
                        <p className="text-sm mt-1 text-neutral-300">{script.body}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-green-400 uppercase">아웃트로</span>
                        <p className="text-sm mt-1">{script.outro}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <pre className="mt-4 text-xs text-green-400 bg-black p-4 rounded-lg overflow-auto">
                {JSON.stringify(scriptsResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Section 3: Thumbnail Generator */}
        <div className="bg-neutral-900 rounded-2xl p-8 mb-6 border border-neutral-800">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">③ 썸네일 생성기</h2>
              <p className="text-neutral-400">
                Figma API를 통해 썸네일 이미지 3개를 자동 생성합니다
              </p>
              <div className="mt-2 text-sm text-neutral-500">
                입력: title, keyword, color_mode → 출력: PNG 이미지 미리보기
              </div>
            </div>
            <button
              onClick={simulateThumbnailGeneration}
              disabled={loading === 'thumbnails'}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 rounded-lg font-bold hover:from-green-700 hover:to-green-900 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading === 'thumbnails' ? '생성 중...' : '시뮬레이션 실행'}
            </button>
          </div>

          {thumbnailsResult && (
            <div className="bg-neutral-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-neutral-400 mb-4">생성된 썸네일 (3개 버전)</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {thumbnailsResult.map((thumb, index) => (
                  <div key={index} className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-700">
                    <img
                      src={thumb.thumbnail_url}
                      alt={`Thumbnail Variant ${thumb.variant}`}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="p-3">
                      <div className="text-xs text-neutral-500">
                        주제 #{thumb.topic_id} - 버전 {thumb.variant}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <pre className="text-xs text-green-400 bg-black p-4 rounded-lg overflow-auto">
                {JSON.stringify(thumbnailsResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Section 4: Upload Scheduler */}
        <div className="bg-neutral-900 rounded-2xl p-8 mb-6 border border-neutral-800">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">④ 업로드 예약기</h2>
              <p className="text-neutral-400">
                YouTube Data API를 통해 예약 업로드를 시뮬레이션합니다
              </p>
              <div className="mt-2 text-sm text-neutral-500">
                입력: video_path, metadata → 출력: JSON (video_id, scheduled_time, status)
              </div>
            </div>
            <button
              onClick={simulateUploadScheduling}
              disabled={loading === 'videos'}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg font-bold hover:from-blue-700 hover:to-blue-900 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading === 'videos' ? '예약 중...' : '시뮬레이션 실행'}
            </button>
          </div>

          {videosResult && (
            <div className="bg-neutral-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-neutral-400 mb-4">예약된 영상 (3개 예시)</h3>
              <div className="space-y-3">
                {videosResult.map((video, index) => (
                  <div key={index} className="bg-neutral-900 p-4 rounded-lg border border-neutral-700 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-neutral-500">영상 ID:</span>
                        <code className="text-xs text-blue-400">{video.video_id}</code>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500">Topic #{video.topic_id}</span>
                        <span className="text-xs text-neutral-500">•</span>
                        <span className="text-xs text-neutral-400">
                          {new Date(video.scheduled_time).toLocaleString('ko-KR')}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-600 rounded-full text-xs font-bold">
                      {video.status === 'scheduled' ? '예약됨' : video.status}
                    </span>
                  </div>
                ))}
              </div>
              <pre className="mt-4 text-xs text-green-400 bg-black p-4 rounded-lg overflow-auto">
                {JSON.stringify(videosResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Full Automation CTA */}
        <div className="bg-gradient-to-r from-[#E50914] to-[#FF1744] rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">🚀 전체 자동화</h2>
          <p className="text-lg mb-6 opacity-90">
            4가지 기능을 n8n 워크플로우로 통합하여<br />
            100개 영상을 완전 자동으로 생성·업로드합니다
          </p>
          <button
            onClick={startFullAutomation}
            className="px-8 py-4 bg-black text-white rounded-lg font-bold hover:bg-neutral-900 text-lg"
          >
            전체 자동화 시작 (준비 중)
          </button>
          <p className="text-sm mt-4 opacity-75">
            ⚙️ n8n 워크플로우 연동 예정
          </p>
        </div>

        {/* Tech Info */}
        <div className="mt-8 text-center text-sm text-neutral-500">
          <p>💾 Database: Supabase (topics, scripts, thumbnails, videos 테이블)</p>
          <p className="mt-1">🤖 MVP 데모 - 실제 API 호출 대신 더미 JSON 출력</p>
        </div>
      </div>
    </div>
  )
}
