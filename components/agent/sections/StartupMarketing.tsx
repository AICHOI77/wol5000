"use client"

// 더미 스케줄 데이터
const schedules = [
  { id: 1, channel: 'Instagram', title: '가을 컬러 할인 이벤트', date: '2025-10-09', status: 'scheduled' },
  { id: 2, channel: 'Instagram', title: '신규 고객 웰컴 쿠폰', date: '2025-10-10', status: 'scheduled' },
  { id: 3, channel: 'Blog', title: '헤어 트렌드 가이드', date: '2025-10-11', status: 'scheduled' }
]

// 더미 생성된 카피
const copies = [
  { id: 1, title: '가을 프로모션', text: '🍂 가을맞이 특별 할인! 컷+드라이 30% OFF. 이번 주말까지만!' },
  { id: 2, title: '신규 고객 환영', text: '✨ 처음 방문하시는 분들께 10% 할인 쿠폰 드립니다. 지금 예약하세요!' },
  { id: 3, title: '재방문 감사', text: '💝 다시 찾아주셔서 감사합니다. 재방문 고객님께 특별 쿠폰을 드려요!' }
]

// 더미 콘텐츠 초안
const drafts = [
  { id: 1, type: 'YouTube', title: '2025 가을 헤어 트렌드 TOP 5', thumbnail: '🎬', status: 'draft' },
  { id: 2, type: 'Blog', title: '집에서 하는 간단 헤어케어 루틴', thumbnail: '📝', status: 'draft' }
]

export default function StartupMarketing() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">마케팅·콘텐츠 자동화</h2>
          <p className="text-white/60 text-sm mt-1">SNS 포스팅, 카피라이팅, 콘텐츠 제작 자동화</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#E50914] hover:bg-[#B00610] text-white font-medium transition-all">
          + 새 캠페인 생성
        </button>
      </div>

      {/* Schedule Cards */}
      <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">예약된 포스팅</h3>
          <span className="text-white/60 text-sm">{schedules.length}건 대기중</span>
        </div>

        <div className="space-y-3">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                  📱
                </div>
                <div>
                  <div className="text-white font-medium">{schedule.title}</div>
                  <div className="text-white/60 text-sm mt-1">
                    {schedule.channel} · {schedule.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium">
                  예약됨
                </span>
                <button className="text-[#E50914] hover:text-[#B00610] text-sm font-medium">
                  수정
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Copy Generator */}
      <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">AI 카피 생성</h3>
          <button
            onClick={() => alert('새로운 카피를 생성합니다 (더미)')}
            className="px-4 py-2 rounded-xl bg-[#E50914]/20 hover:bg-[#E50914] text-[#E50914] hover:text-white text-sm font-medium transition-all"
          >
            카피 다시 생성
          </button>
        </div>

        <div className="space-y-3">
          {copies.map((copy) => (
            <div
              key={copy.id}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-white font-medium">{copy.title}</div>
                <button className="text-[#E50914] hover:text-[#B00610] text-sm">
                  복사
                </button>
              </div>
              <p className="text-white/80 text-sm">{copy.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Drafts */}
      <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">콘텐츠 초안</h3>
          <span className="text-white/60 text-sm">{drafts.length}건 대기중</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 overflow-hidden transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-[#E50914]/20 to-purple-500/20 flex items-center justify-center text-6xl">
                {draft.thumbnail}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-xs font-medium">
                    {draft.type}
                  </span>
                  <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                    초안
                  </span>
                </div>
                <div className="text-white font-medium mb-3">{draft.title}</div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 rounded-lg bg-[#E50914] hover:bg-[#B00610] text-white text-sm font-medium transition-all">
                    편집하기
                  </button>
                  <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-all">
                    미리보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">이번 달 포스팅</div>
          <div className="text-3xl font-bold text-white">24건</div>
          <div className="text-xs text-green-400 mt-1">↑ 지난달 대비 +8</div>
        </div>

        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">평균 도달률</div>
          <div className="text-3xl font-bold text-[#E50914]">2,340</div>
          <div className="text-xs text-green-400 mt-1">↑ +12%</div>
        </div>

        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">전환율</div>
          <div className="text-3xl font-bold text-green-400">4.2%</div>
          <div className="text-xs text-green-400 mt-1">↑ +0.8%p</div>
        </div>
      </div>
    </div>
  )
}
