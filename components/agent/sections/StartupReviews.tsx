"use client"

// 더미 리뷰 데이터
const reviews = [
  { id: 1, name: '박지훈', rating: 5, comment: '친절하고 빠라요. 다음에도 꼭 올게요!', coupon: '5%', sentAt: '2025-10-06' },
  { id: 2, name: '최수진', rating: 5, comment: '시술 결과가 정말 마음에 들어요. 추천합니다!', coupon: '10%', sentAt: '2025-10-05' },
  { id: 3, name: '정민아', rating: 4, comment: '깔끔하고 좋았습니다. 조금 대기 시간이 있었지만 만족해요', coupon: '5%', sentAt: '2025-10-04' },
  { id: 4, name: '강태윤', rating: 5, comment: '원장님이 정말 꼼꼼하게 해주세요', coupon: '10%', sentAt: '2025-10-03' },
  { id: 5, name: '윤서아', rating: 5, comment: '가격 대비 최고! 재방문 의사 100%', coupon: '5%', sentAt: '2025-10-02' }
]

export default function StartupReviews() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">리뷰·재방문 관리</h2>
          <p className="text-white/60 text-sm mt-1">고객 리뷰 수집 및 재방문 유도 자동화</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-[#E50914] hover:bg-[#B00610] text-white font-medium transition-all">
          리뷰 요청 보내기
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">총 리뷰</div>
          <div className="text-3xl font-bold text-white">{reviews.length}</div>
        </div>

        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">평균 평점</div>
          <div className="text-3xl font-bold text-yellow-400">
            {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
          </div>
        </div>

        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">쿠폰 발송</div>
          <div className="text-3xl font-bold text-[#E50914]">{reviews.length}</div>
        </div>

        <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="text-white/60 text-sm mb-2">재방문율</div>
          <div className="text-3xl font-bold text-green-400">68%</div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] hover:border-[#E50914]/50 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E50914] to-[#B00610] flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold">{review.name}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-white/20'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-white/60 text-sm">{review.sentAt}</div>
                <div className="text-xs text-white/40 mt-1">쿠폰 발송됨</div>
              </div>
            </div>

            <p className="text-white/80 mb-4">{review.comment}</p>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-[#E50914]/20 text-[#E50914] text-sm font-medium">
                  {review.coupon} 할인 쿠폰 발송
                </span>
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm transition-all">
                  답글 작성
                </button>
                <button
                  onClick={() => alert('리뷰 요청을 다시 보냅니다 (더미)')}
                  className="px-4 py-2 rounded-xl bg-[#E50914]/20 hover:bg-[#E50914] text-[#E50914] hover:text-white text-sm font-medium transition-all"
                >
                  리뷰 요청 재발송
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Automation Settings */}
      <div className="rounded-2xl bg-[#111318] border border-white/10 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <h3 className="text-lg font-bold text-white mb-4">재방문 자동화 설정</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
            <span className="text-white">방문 후 24시간 뒤 리뷰 요청 자동 발송</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
            <span className="text-white">5점 리뷰 고객에게 10% 쿠폰 자동 발송</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
            <span className="text-white">30일 미방문 고객에게 재방문 유도 메시지</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
        </div>
      </div>
    </div>
  )
}
