'use client';
import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

type Message = {
  role: 'user' | 'agent';
  text: string;
};

type ChatViewProps = {
  messages: Message[];
  loading: boolean;
};

export default function ChatView({ messages, loading }: ChatViewProps) {
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.scrollTo(0, viewRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <div
      ref={viewRef}
      className="h-[70vh] overflow-y-auto rounded-lg bg-zinc-900/30 border border-zinc-800/60 p-6 backdrop-blur-sm scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
    >
      {messages.map((m, i) => (
        <MessageBubble key={i} role={m.role} text={m.text} />
      ))}
      {loading && (
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-[#E50914] animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="h-2 w-2 rounded-full bg-[#E50914] animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="h-2 w-2 rounded-full bg-[#E50914] animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
          <span>답변 생성 중</span>
        </div>
      )}
    </div>
  );
}
