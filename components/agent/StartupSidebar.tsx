"use client"

interface StartupSidebarProps {
  active: 'overview' | 'orders' | 'reviews' | 'marketing'
  onChange: (tab: 'overview' | 'orders' | 'reviews' | 'marketing') => void
}

const menuItems = [
  { id: 'overview' as const, label: '대시보드', icon: '📊' },
  { id: 'orders' as const, label: '예약·결제', icon: '💳' },
  { id: 'reviews' as const, label: '리뷰·재방문', icon: '⭐' },
  { id: 'marketing' as const, label: '마케팅·콘텐츠', icon: '📱' }
]

export default function StartupSidebar({ active, onChange }: StartupSidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[260px] space-y-2">
        <div className="sticky top-24">
          <div className="rounded-2xl bg-[#111318] border border-white/10 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active === item.id
                      ? 'bg-[#E50914] text-white font-medium'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Tabs */}
      <div className="md:hidden mb-6">
        <div className="rounded-2xl bg-[#111318] border border-white/10 p-2">
          <div className="grid grid-cols-2 gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl transition-all ${
                  active === item.id
                    ? 'bg-[#E50914] text-white font-medium'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
