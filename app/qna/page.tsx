'use client';
import React, { useState } from 'react';
import { chat, QnaAction } from '@/lib/qna/api';
import Sidebar from '@/components/qna/Sidebar';
import ChatView from '@/components/qna/ChatView';
import ActionButtons from '@/components/qna/ActionButtons';

type Message = { role: 'user' | 'agent'; text: string };

const CATEGORIES = ['공지', '결제/환불', '접속/자료', '자동화(n8n/솔라피/CK)', '장애/버그'];
const SUGGESTIONS = [
  '환불 규정 알려줘',
  '알림톡이 안옵니다',
  '오늘 20:00 줌 링크',
  'ConvertKit 태그 추가',
  'n8n 강의 10개 스케줄 복제',
];
const QUICK_ACTIONS = ['오늘 20:00 Q&A 예약', '티켓 만들기(사람 연결)', '가이드 북 열기'];

export default function QnaPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', text: '무엇을 도와드릴까요? (예: "환불 규정", "오늘 줌 링크", "알림톡 안와요")' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastActions, setLastActions] = useState<QnaAction[]>([]);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [lastQ, setLastQ] = useState('');
  const [lastA, setLastA] = useState('');

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setInput('');
    setMessages(m => [...m, { role: 'user', text: q }]);
    setLoading(true);
    setLastQ(q);

    try {
      const res = await chat(q, sessionId);
      const sources = res.sources.map(s => `• ${s.title} (${s.anchor})`).join('\n');
      const answerText = `${res.answer}\n\n— 출처 —\n${sources}`;
      setMessages(m => [...m, { role: 'agent', text: answerText }]);
      setLastA(answerText);
      setLastActions(res.actions);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(m => [...m, { role: 'agent', text: '오류가 발생했습니다. 다시 시도해주세요.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFeedback = (like: boolean) => {
    console.log({ like, lastQ, lastA });
    alert(like ? '피드백 감사합니다! 👍' : '개선하겠습니다 👎');
  };

  const handleTicket = () => {
    console.log('티켓 생성 요청');
    alert('사람 연결 요청이 접수되었습니다. 곧 연락드리겠습니다.');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix-style Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-8 py-6">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-[#E50914]">월5천</div>
            <div className="text-sm font-medium">Q&A 에이전트</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#46d369] animate-pulse"></span>
              온라인
            </span>
            <span className="text-white/60">v0.1</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1800px] px-8 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar
              categories={CATEGORIES}
              suggestions={SUGGESTIONS}
              quickActions={QUICK_ACTIONS}
              onSuggestionClick={setInput}
              onQuickActionClick={action => {
                if (action.includes('티켓')) handleTicket();
                else alert(`"${action}" 기능은 곧 구현됩니다.`);
              }}
            />
          </div>

          {/* Chat Area */}
          <section className="lg:col-span-9 space-y-4">
            <ChatView messages={messages} loading={loading} />

            {/* Action Buttons */}
            {lastActions.length > 0 && (
              <div className="rounded-lg bg-zinc-900/50 border border-zinc-800 p-4 backdrop-blur-sm">
                <div className="mb-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">다음 액션</div>
                <ActionButtons actions={lastActions} />
              </div>
            )}

            {/* Input Area */}
            <div className="relative">
              <input
                className="w-full rounded-lg bg-zinc-900/80 border border-zinc-800 px-5 py-4 text-base outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700 disabled:opacity-50 transition-all placeholder:text-zinc-500"
                placeholder="질문을 입력하세요..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-[#E50914] px-6 py-2 text-sm font-semibold hover:bg-[#f40612] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-900/20"
              >
                {loading ? '전송 중...' : '전송'}
              </button>
            </div>

            {/* Feedback */}
            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <span>도움이 되었나요?</span>
              <button
                onClick={() => handleFeedback(true)}
                className="rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
              >
                👍
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className="rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
              >
                👎
              </button>
              <span className="ml-auto">
                해결 안됨?{' '}
                <button onClick={handleTicket} className="text-[#E50914] hover:underline transition-all font-medium">
                  사람 연결
                </button>
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
