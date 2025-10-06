'use client'

import { useState, useEffect } from 'react'
import BannerFormDialog from '@/components/admin/BannerFormDialog'
import BannerTable from '@/components/admin/BannerTable'
import { Banner } from '@/db/supabase'

export default function BannersAdminPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/admin/banners')
      const data = await response.json()
      setBanners(data.banners || [])
    } catch (error) {
      console.error('Failed to fetch banners:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">배너 관리</h1>
          <p className="text-neutral-400">
            메인 히어로 슬라이딩 배너를 관리합니다. (총 {banners.length}개)
          </p>
        </div>
        <BannerFormDialog onSuccess={fetchBanners} />
      </div>

      {/* 테이블 */}
      {loading ? (
        <div className="bg-[#111318] rounded-2xl shadow-md border border-white/5 p-12 text-center text-neutral-400">
          로딩 중...
        </div>
      ) : (
        <BannerTable banners={banners} onUpdate={fetchBanners} />
      )}
    </div>
  )
}
