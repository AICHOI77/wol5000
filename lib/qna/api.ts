// API 래퍼 for Q&A Agent
// TODO: baseURL = 'ㅇㅇ' 로 교체 (chat, action)
// TODO: supabase 저장(qna_sessions, qna_events)
// TODO: 벡터검색 연결(sources 근거 실데이터)

export type Source = {
  title: string;
  href: string;
  anchor: string;
};

export type QnaAction = {
  type: 'solapi.send' | 'ck.tag' | 'zoom.invite' | 'ticket.create';
  label: string;
  payload: any;
};

export type ChatRes = {
  answer: string;
  sources: Source[];
  actions: QnaAction[];
};

// 더미 API - 실제 API로 교체 필요
export async function chat(message: string, sessionId: string): Promise<ChatRes> {
  await new Promise(r => setTimeout(r, 400));

  return {
    answer: `요약: ${message} 해결 방법은 3단계입니다.\n1) 설정 확인 및 재연결 시도\n2) 토큰/키 갱신 및 권한 체크\n3) 실패 시 사람 연결(티켓 생성)\n\n자세한 근거는 아래 '출처'를 참고하세요.`,
    sources: [
      { title: 'AI SaaS 199 - 결제/환불 가이드', href: '#', anchor: '섹션 2.1' },
      { title: 'n8n 워크플로 기본 설정', href: '#', anchor: '섹션 4.3' },
      { title: '자동화 통합 가이드', href: '#', anchor: '섹션 5.2' },
    ],
    actions: [
      { type: 'solapi.send', label: '알림톡으로 링크 보내줘', payload: { templateId: 'T_AI199_01' } },
      { type: 'ck.tag', label: 'ConvertKit 태그 추가', payload: { tag: 'AI199_HELPED' } },
      { type: 'zoom.invite', label: '오늘 20:00 Q&A 예약하기', payload: { when: '20:00' } },
    ],
  };
}

export async function runAction(action: QnaAction): Promise<{ ok: boolean }> {
  await new Promise(r => setTimeout(r, 300));
  console.log('runAction called:', action);
  return { ok: true };
}
