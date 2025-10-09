"use client"

// 더미 주문 데이터
const orders = [
  { id: 'ORD-1021', name: '김민수', item: '컷+드라이', when: '2025-10-08 15:00', status: 'paid', amount: 39000 },
  { id: 'ORD-1020', name: '이서연', item: '염색', when: '2025-10-08 13:00', status: 'pending', amount: 99000 },
  { id: 'ORD-1019', name: '박지훈', item: '파마', when: '2025-10-07 18:30', status: 'paid', amount: 120000 },
  { id: 'ORD-1018', name: '최수진', item: '트리트먼트', when: '2025-10-07 16:00', status: 'paid', amount: 45000 },
  { id: 'ORD-1017', name: '정민아', item: '컷+염색', when: '2025-10-07 14:00', status: 'paid', amount: 130000 },
  { id: 'ORD-1016', name: '강태윤', item: '헤어케어', when: '2025-10-06 11:00', status: 'paid', amount: 60000 }
]

const statusLabels: Record<string, { label: string; color: string }> = {
  paid: { label: '결제완료', color: 'bg-green-500/20 text-green-400' },
  pending: { label: '대기중', color: 'bg-yellow-500/20 text-yellow-400' },
  cancelled: { label: '취소됨', color: 'bg-red-500/20 text-red-400' }
}

export default function StartupOrders() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">예약·결제 관리</h2>
          <p className="text-white/60 text-sm mt-1">실시간 예약 현황 및 결제 내역</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#E50914] hover:bg-[#B00610] text-white font-medium transition-all">
          + 수동 예약 추가
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-xl bg-[#E50914] text-white text-sm font-medium">
          전체
        </button>
        <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-sm transition-all">
          결제완료
        </button>
        <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-sm transition-all">
          대기중
        </button>
        <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-sm transition-all">
          취소됨
        </button>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#111318] border border-white/10 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-white/70 font-medium text-sm">주문ID</th>
                <th className="text-left px-6 py-4 text-white/70 font-medium text-sm">고객명</th>
                <th className="text-left px-6 py-4 text-white/70 font-medium text-sm">서비스</th>
                <th className="text-left px-6 py-4 text-white/70 font-medium text-sm">예약일시</th>
                <th className="text-left px-6 py-4 text-white/70 font-medium text-sm">상태</th>
                <th className="text-right px-6 py-4 text-white/70 font-medium text-sm">금액</th>
                <th className="text-right px-6 py-4 text-white/70 font-medium text-sm">작업</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >
                  <td className="px-6 py-4 text-white/60 font-mono text-sm">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    {order.name}
                  </td>
                  <td className="px-6 py-4 text-white/80">
                    {order.item}
                  </td>
                  <td className="px-6 py-4 text-white/60 text-sm">
                    {order.when}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${statusLabels[order.status].color}`}>
                      {statusLabels[order.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-white font-bold">
                    {order.amount.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#E50914] hover:text-[#B00610] text-sm font-medium">
                      상세
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">총 예약</div>
          <div className="text-3xl font-bold text-white">{orders.length}건</div>
        </div>

        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">결제 완료</div>
          <div className="text-3xl font-bold text-green-400">
            {orders.filter(o => o.status === 'paid').length}건
          </div>
        </div>

        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">총 매출</div>
          <div className="text-3xl font-bold text-[#E50914]">
            {orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.amount, 0).toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  )
}
