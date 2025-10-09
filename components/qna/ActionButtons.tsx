'use client';
import React from 'react';
import { QnaAction, runAction } from '@/lib/qna/api';

type ActionButtonsProps = {
  actions: QnaAction[];
};

export default function ActionButtons({ actions }: ActionButtonsProps) {
  const handleAction = async (action: QnaAction) => {
    console.log('Action clicked:', action);
    try {
      const res = await runAction(action);
      if (res.ok) {
        alert('곧 실제 API(ㅇㅇ/action)로 연결됩니다');
      }
    } catch (error) {
      console.error('Action failed:', error);
    }
  };

  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2.5">
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={() => handleAction(action)}
          className="rounded-md bg-zinc-800/80 border border-zinc-700 px-4 py-2 text-sm font-medium hover:bg-zinc-700 hover:border-zinc-600 hover:scale-105 transition-all shadow-sm"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
