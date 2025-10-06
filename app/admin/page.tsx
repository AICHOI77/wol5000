export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">대시보드</h1>
        <p className="text-neutral-400">월5천 플랫폼 관리자 페이지에 오신 것을 환영합니다</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111318] rounded-2xl p-6 shadow-md border border-white/5">
          <div className="text-neutral-400 text-sm mb-1">총 회원수</div>
          <div className="text-3xl font-bold text-white">1,234</div>
          <div className="text-xs text-green-500 mt-2">+12% 이번 달</div>
        </div>

        <div className="bg-[#111318] rounded-2xl p-6 shadow-md border border-white/5">
          <div className="text-neutral-400 text-sm mb-1">총 상품수</div>
          <div className="text-3xl font-bold text-white">45</div>
          <div className="text-xs text-green-500 mt-2">+3개 추가됨</div>
        </div>

        <div className="bg-[#111318] rounded-2xl p-6 shadow-md border border-white/5">
          <div className="text-neutral-400 text-sm mb-1">신청내역</div>
          <div className="text-3xl font-bold text-white">892</div>
          <div className="text-xs text-green-500 mt-2">+8% 이번 달</div>
        </div>

        <div className="bg-[#111318] rounded-2xl p-6 shadow-md border border-white/5">
          <div className="text-neutral-400 text-sm mb-1">총 매출</div>
          <div className="text-3xl font-bold text-white">₩4,568만</div>
          <div className="text-xs text-green-500 mt-2">+15% 이번 달</div>
        </div>
      </div>

      {/* 안내 카드 */}
      <div className="bg-[#111318] rounded-2xl p-6 shadow-md border border-white/5">
        <h2 className="text-xl font-bold text-white mb-4">빠른 시작 가이드</h2>
        <div className="space-y-3 text-neutral-300">
          <p>✅ 좌측 메뉴에서 각 관리 페이지로 이동할 수 있습니다</p>
          <p>✅ 회원관리: 사용자 목록 조회 및 상태 관리</p>
          <p>✅ 상품관리: 상품 등록/삭제 및 목록 관리</p>
          <p>✅ 신청내역: 주문 목록 및 상태 변경</p>
        </div>
      </div>
    </div>
  )
}
