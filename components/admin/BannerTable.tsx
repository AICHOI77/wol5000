'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { Banner } from '@/db/supabase'
import { Trash2, ExternalLink } from 'lucide-react'

interface BannerTableProps {
  banners: Banner[]
  onUpdate: () => void
}

export default function BannerTable({ banners, onUpdate }: BannerTableProps) {
  const { toast } = useToast()
  const [updating, setUpdating] = useState<string | null>(null)

  const handleToggleActive = async (banner: Banner) => {
    setUpdating(banner.id)
    try {
      const response = await fetch(`/api/admin/banners/${banner.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !banner.is_active }),
      })

      if (!response.ok) throw new Error('Failed to update')

      toast({
        variant: 'success',
        title: '상태 변경 완료',
        description: `배너가 ${!banner.is_active ? '노출' : '숨김'} 처리되었습니다.`,
      })
      onUpdate()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '상태 변경 실패',
        description: '다시 시도해주세요.',
      })
    } finally {
      setUpdating(null)
    }
  }

  const handleUpdateSortOrder = async (banner: Banner, newOrder: number) => {
    try {
      const response = await fetch(`/api/admin/banners/${banner.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sort_order: newOrder }),
      })

      if (!response.ok) throw new Error('Failed to update')

      toast({
        variant: 'success',
        title: '정렬 순서 변경',
        description: '정렬 순서가 업데이트되었습니다.',
      })
      onUpdate()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '변경 실패',
        description: '다시 시도해주세요.',
      })
    }
  }

  const handleDelete = async (banner: Banner) => {
    if (!confirm(`"${banner.title}" 배너를 삭제하시겠습니까?`)) return

    try {
      const response = await fetch(`/api/admin/banners/${banner.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      toast({
        variant: 'success',
        title: '삭제 완료',
        description: '배너가 삭제되었습니다.',
      })
      onUpdate()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '삭제 실패',
        description: '다시 시도해주세요.',
      })
    }
  }

  return (
    <div className="bg-[#111318] rounded-2xl shadow-md border border-white/5 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">썸네일</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>링크</TableHead>
              <TableHead className="w-[100px]">정렬 순서</TableHead>
              <TableHead className="w-[100px]">노출 여부</TableHead>
              <TableHead>시작일</TableHead>
              <TableHead>종료일</TableHead>
              <TableHead className="text-right w-[100px]">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-neutral-400 py-8">
                  등록된 배너가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="relative w-20 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={banner.image_url}
                        alt={banner.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{banner.title}</TableCell>
                  <TableCell>
                    {banner.link_url ? (
                      <a
                        href={banner.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-[#E50914] hover:underline"
                      >
                        <span className="truncate max-w-[150px]">{banner.link_url}</span>
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="text-neutral-500">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      defaultValue={banner.sort_order}
                      onBlur={(e) => {
                        const newValue = parseInt(e.target.value) || 0
                        if (newValue !== banner.sort_order) {
                          handleUpdateSortOrder(banner, newValue)
                        }
                      }}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={banner.is_active}
                      onCheckedChange={() => handleToggleActive(banner)}
                      disabled={updating === banner.id}
                    />
                  </TableCell>
                  <TableCell className="text-neutral-400 text-sm">
                    {banner.starts_at
                      ? new Date(banner.starts_at).toLocaleString('ko-KR', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '-'}
                  </TableCell>
                  <TableCell className="text-neutral-400 text-sm">
                    {banner.ends_at
                      ? new Date(banner.ends_at).toLocaleString('ko-KR', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(banner)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
