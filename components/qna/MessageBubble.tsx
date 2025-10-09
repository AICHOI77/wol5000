'use client';
import React from 'react';

type MessageBubbleProps = {
  role: 'user' | 'agent';
  text: string;
};

export default function MessageBubble({ role, text }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`mb-6 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`${
          isUser
            ? 'bg-[#E50914] text-white shadow-lg shadow-red-900/30'
            : 'bg-zinc-800/60 text-zinc-100 border border-zinc-700/50'
        } max-w-[85%] whitespace-pre-wrap rounded-lg px-5 py-3.5 text-[15px] leading-relaxed backdrop-blur-sm`}
      >
        {text}
      </div>
    </div>
  );
}
