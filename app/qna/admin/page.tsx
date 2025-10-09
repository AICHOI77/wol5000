'use client';
import React, { useState } from 'react';

// 더미 데이터
const DUMMY_INDEX_STATUS = {
  totalDocs: 127,
  lastIndexed: '2025-10-09 05:30:00',
  vectorCount: 3421,
  status: '정상',
};

const DUMMY_TOP_QUESTIONS = [
  { q: '환불 규정 알려줘', count: 45, resolved: 42 },
  { q: '알림톡이 안옵니다', count: 38, resolved: 35 },
  { q: '오늘 20:00 줌 링크', count: 32, resolved: 32 },
  { q: 'ConvertKit 태그 추가', count: 28, resolved: 26 },
  { q: 'n8n 강의 10개 스케줄 복제', count: 24, resolved: 20 },
  { q: '결제 내역 확인 방법', count: 22, resolved: 21 },
  { q: 'Solapi 템플릿 설정', count: 19, resolved: 18 },
  { q: '접속이 안됩니다', count: 17, resolved: 15 },
  { q: '비밀번호 재설정', count: 15, resolved: 15 },
  { q: '강의 자료 다운로드', count: 14, resolved: 14 },
];

const DUMMY_UNRESOLVED = [
  { q: 'n8n 워크플로가 멈춤', ts: '2025-10-09 04:15', feedback: '👎' },
  { q: '알림톡 템플릿 오류', ts: '2025-10-09 03:42', feedback: '👎' },
  { q: 'ConvertKit 연동 실패', ts: '2025-10-09 02:30', feedback: '👎' },
  { q: '줌 링크 생성 안됨', ts: '2025-10-09 01:20', feedback: null },
];

export default function QnaAdminPage() {
  const [solapiTemplateId, setSolapiTemplateId] = useState('T_AI199_01');
  const [ckCampaignId, setCkCampaignId] = useState('CMP_DEFAULT');
  const [zoomMeetingId, setZoomMeetingId] = useState('ZOOM_QNA_DAILY');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix-style Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-8 py-6">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-[#E50914]">월5천</div>
            <div className="text-sm font-medium">Q&A 관리자</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium">ADMIN</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1800px] space-y-6 px-8 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 카드 1: 지식 색인 상태 */}
          <Card title="지식 색인 상태">
            <div className="space-y-3 text-sm">
              <Row label="총 문서" value={DUMMY_INDEX_STATUS.totalDocs} />
              <Row label="마지막 색인" value={DUMMY_INDEX_STATUS.lastIndexed} />
              <Row label="벡터 수" value={DUMMY_INDEX_STATUS.vectorCount} />
              <Row label="상태" value={DUMMY_INDEX_STATUS.status} valueClass="text-[#46d369]" />
            </div>
            <button
              disabled
              className="mt-4 w-full rounded-md bg-[#E50914]/20 border border-[#E50914]/30 px-4 py-2.5 text-sm font-semibold text-zinc-500 cursor-not-allowed"
            >
              재색인 (추후 구현)
            </button>
          </Card>

          {/* 카드 2: 액션 키 설정 */}
          <Card title="액션 키 설정">
            <div className="space-y-4 text-sm">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Solapi 템플릿 ID</label>
                <input
                  type="text"
                  value={solapiTemplateId}
                  onChange={e => setSolapiTemplateId(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900/60 px-3 py-2.5 outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700 transition-all"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">ConvertKit 캠페인 ID</label>
                <input
                  type="text"
                  value={ckCampaignId}
                  onChange={e => setCkCampaignId(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900/60 px-3 py-2.5 outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700 transition-all"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Zoom 미팅 ID</label>
                <input
                  type="text"
                  value={zoomMeetingId}
                  onChange={e => setZoomMeetingId(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900/60 px-3 py-2.5 outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700 transition-all"
                />
              </div>
            </div>
            <button
              disabled
              className="mt-4 w-full rounded-md bg-[#E50914]/20 border border-[#E50914]/30 px-4 py-2.5 text-sm font-semibold text-zinc-500 cursor-not-allowed"
            >
              저장 (추후 구현)
            </button>
          </Card>
        </div>

        {/* 카드 3: 최근 질문 Top 20 */}
        <Card title="최근 질문 Top 20">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-800">
                <tr>
                  <th className="pb-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">질문</th>
                  <th className="pb-3 text-right text-xs font-bold text-zinc-400 uppercase tracking-wider">횟수</th>
                  <th className="pb-3 text-right text-xs font-bold text-zinc-400 uppercase tracking-wider">해결</th>
                  <th className="pb-3 text-right text-xs font-bold text-zinc-400 uppercase tracking-wider">해결률</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_TOP_QUESTIONS.map((item, i) => {
                  const rate = ((item.resolved / item.count) * 100).toFixed(0);
                  return (
                    <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3">{item.q}</td>
                      <td className="py-3 text-right text-zinc-400">{item.count}</td>
                      <td className="py-3 text-right text-zinc-400">{item.resolved}</td>
                      <td className="py-3 text-right">
                        <span className={Number(rate) >= 90 ? 'text-[#46d369] font-semibold' : 'text-yellow-400 font-semibold'}>
                          {rate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 카드 4: 미해결/👎 로그 */}
        <Card title="미해결/👎 로그">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-zinc-800">
                <tr>
                  <th className="pb-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">질문</th>
                  <th className="pb-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">시각</th>
                  <th className="pb-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">피드백</th>
                  <th className="pb-3 text-left text-xs font-bold text-zinc-400 uppercase tracking-wider">액션</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_UNRESOLVED.map((item, i) => (
                  <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3">{item.q}</td>
                    <td className="py-3 text-zinc-400">{item.ts}</td>
                    <td className="py-3">{item.feedback || '-'}</td>
                    <td className="py-3">
                      <button className="text-xs text-[#E50914] hover:underline font-medium transition-all">
                        티켓 생성
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-zinc-900/30 border border-zinc-800/60 p-5 backdrop-blur-sm">
      <div className="mb-4 text-sm font-bold text-zinc-300 uppercase tracking-wider">{title}</div>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  valueClass = 'text-white',
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-zinc-400 text-sm">{label}</span>
      <span className={`${valueClass} font-semibold`}>{value}</span>
    </div>
  );
}
