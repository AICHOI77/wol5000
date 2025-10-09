'use client';
import React from 'react';

type SidebarProps = {
  categories: string[];
  suggestions: string[];
  quickActions: string[];
  onSuggestionClick: (text: string) => void;
  onQuickActionClick: (action: string) => void;
};

export default function Sidebar({
  categories,
  suggestions,
  quickActions,
  onSuggestionClick,
  onQuickActionClick,
}: SidebarProps) {
  return (
    <aside className="space-y-5">
      {/* 카테고리 */}
      <Section title="카테고리">
        <div className="space-y-2">
          {categories.map(c => (
            <div
              key={c}
              className="group rounded-md bg-zinc-900/40 border border-zinc-800/50 px-3 py-2.5 text-sm hover:bg-[#E50914]/10 hover:border-[#E50914]/50 cursor-pointer transition-all duration-300"
            >
              <span className="group-hover:text-[#E50914] transition-colors duration-300">{c}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 추천 질문 */}
      <Section title="추천 질문">
        <div className="flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => onSuggestionClick(s)}
              className="rounded-full bg-zinc-900/60 border border-zinc-800 px-3 py-1.5 text-xs hover:bg-[#E50914]/20 hover:border-[#E50914] hover:text-[#E50914] hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-[#E50914]/20"
            >
              {s}
            </button>
          ))}
        </div>
      </Section>

      {/* 빠른 액션 */}
      <Section title="빠른 액션">
        <div className="space-y-2">
          {quickActions.map(a => (
            <button
              key={a}
              onClick={() => onQuickActionClick(a)}
              className="group w-full rounded-md bg-zinc-900/60 border border-zinc-800 px-3 py-2.5 text-sm hover:bg-[#E50914]/10 hover:border-[#E50914]/50 transition-all duration-300 text-left font-medium hover:shadow-md hover:shadow-[#E50914]/10 hover:translate-x-1"
            >
              <span className="group-hover:text-[#E50914] transition-colors duration-300">{a}</span>
            </button>
          ))}
        </div>
      </Section>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-zinc-900/30 border border-zinc-800/60 p-4 backdrop-blur-sm hover:border-zinc-700 transition-colors duration-300">
      <div className="mb-3 text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-[#E50914]"></span>
        {title}
      </div>
      {children}
    </div>
  );
}
