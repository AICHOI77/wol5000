"use client"

// 더미 KPI 데이터
const kpiData = {
  todayBookings: 12,
  paid: 7,
  revenue: 1460000,
  retention: 0.32
}

// 더미 최근 로그
const recentLogs = [
  { id: 1, time: '14:23', event: '예약 접수', detail: '김민수님 - 컷+드라이 (10/8 15:00)' },
  { id: 2, time: '13:45', event: '결제 완료', detail: '이서연님 - 염색 99,000원' },
  { id: 3, time: '12:18', event: '리뷰 수신', detail: '박지훈님 - ⭐⭐⭐⭐⭐ "친절하고 빨라요"' },
  { id: 4, time: '11:30', event: '쿠폰 발송', detail: '최수진님에게 5% 할인 쿠폰 전송' },
  { id: 5, time: '10:05', event: '마케팅 포스팅', detail: '인스타그램 가을 프로모션 자동 게시' }
]

export default function StartupOverview() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">오늘 예약</div>
          <div className="text-3xl font-bold text-white">{kpiData.todayBookings}</div>
          <div className="text-xs text-green-400 mt-1">↑ 어제 대비 +3</div>
        </div>

        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">결제 건수</div>
          <div className="text-3xl font-bold text-white">{kpiData.paid}</div>
          <div className="text-xs text-green-400 mt-1">↑ 어제 대비 +2</div>
        </div>

        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">오늘 매출</div>
          <div className="text-3xl font-bold text-[#E50914]">
            {kpiData.revenue.toLocaleString()}원
          </div>
          <div className="text-xs text-green-400 mt-1">↑ 목표 대비 112%</div>
        </div>

        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">재방문률</div>
          <div className="text-3xl font-bold text-white">
            {(kpiData.retention * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-white/40 mt-1">지난달 대비 +5%p</div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">최근 활동</h2>
          <button className="text-sm text-[#E50914] hover:text-[#B00610]">
            전체 보기 →
          </button>
        </div>

        <div className="space-y-4">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="text-white/60 text-sm font-mono min-w-[50px]">
                {log.time}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{log.event}</div>
                <div className="text-white/60 text-sm mt-1">{log.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <button className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:border-[#E50914] transition-all text-left">
          <div className="text-3xl mb-3">📊</div>
          <div className="text-white font-bold mb-2">월간 리포트</div>
          <div className="text-white/60 text-sm">이번 달 성과 다운로드</div>
        </button>

        <button className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:border-[#E50914] transition-all text-left">
          <div className="text-3xl mb-3">⚙️</div>
          <div className="text-white font-bold mb-2">자동화 설정</div>
          <div className="text-white/60 text-sm">예약/결제 규칙 관리</div>
        </button>

        <button className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:border-[#E50914] transition-all text-left">
          <div className="text-3xl mb-3">🔔</div>
          <div className="text-white font-bold mb-2">알림 설정</div>
          <div className="text-white/60 text-sm">중요 이벤트 알림 관리</div>
        </button>
      </div>
    </div>
  )
}
