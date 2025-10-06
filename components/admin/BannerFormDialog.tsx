'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { validateBannerImage, BANNER_IMAGE_GUIDE } from '@/lib/validation/banner'
import { supabase } from '@/db/supabase'
import { Upload, Plus } from 'lucide-react'
import Image from 'next/image'

interface BannerFormDialogProps {
  onSuccess?: () => void
}

export default function BannerFormDialog({ onSuccess }: BannerFormDialogProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    alt: '',
    link_url: '',
    sort_order: 0,
    is_active: true,
    starts_at: '',
    ends_at: '',
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일 검증
    const validation = validateBannerImage(file)
    if (!validation.valid) {
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: validation.error,
      })
      return
    }

    setUploading(true)

    try {
      // 파일명 생성: {uuid}-{timestamp}.{ext}
      const fileExt = file.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}-${Date.now()}.${fileExt}`

      // Supabase Storage 업로드
      const { data, error } = await supabase.storage
        .from('banners')
        .upload(fileName, file)

      if (error) {
        throw error
      }

      // Public URL 획득
      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(fileName)

      setFormData(prev => ({ ...prev, image_url: publicUrl }))
      setPreviewUrl(publicUrl)

      toast({
        variant: 'success',
        title: '업로드 성공',
        description: '이미지가 성공적으로 업로드되었습니다.',
      })
    } catch (error: any) {
      console.error('Upload error:', error)
      toast({
        variant: 'destructive',
        title: '업로드 실패',
        description: error.message || '이미지 업로드 중 오류가 발생했습니다.',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.image_url) {
      toast({
        variant: 'destructive',
        title: '필수 입력',
        description: '이미지를 업로드하세요.',
      })
      return
    }

    if (!formData.title || !formData.alt) {
      toast({
        variant: 'destructive',
        title: '필수 입력',
        description: '제목과 alt 텍스트를 입력하세요.',
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/admin/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          link_url: formData.link_url || null,
          starts_at: formData.starts_at || null,
          ends_at: formData.ends_at || null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '배너 생성 실패')
      }

      toast({
        variant: 'success',
        title: '배너 생성 완료',
        description: '새 배너가 성공적으로 추가되었습니다.',
      })

      // 폼 초기화
      setFormData({
        title: '',
        image_url: '',
        alt: '',
        link_url: '',
        sort_order: 0,
        is_active: true,
        starts_at: '',
        ends_at: '',
      })
      setPreviewUrl(null)
      setOpen(false)
      onSuccess?.()
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: '생성 실패',
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus size={20} />
          <span>배너 추가</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>새 배너 등록</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* 이미지 업로드 */}
          <div className="space-y-2">
            <Label>배너 이미지 *</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                {uploading && <span className="text-sm text-neutral-400">업로드 중...</span>}
              </div>
              <p className="text-xs text-neutral-400">{BANNER_IMAGE_GUIDE}</p>
            </div>
            {previewUrl && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="배너 제목"
              required
            />
          </div>

          {/* Alt */}
          <div className="space-y-2">
            <Label htmlFor="alt">Alt 텍스트 *</Label>
            <Input
              id="alt"
              value={formData.alt}
              onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
              placeholder="이미지 설명 (접근성)"
              required
            />
          </div>

          {/* 링크 URL */}
          <div className="space-y-2">
            <Label htmlFor="link_url">링크 URL (선택)</Label>
            <Input
              id="link_url"
              type="url"
              value={formData.link_url}
              onChange={(e) => setFormData(prev => ({ ...prev, link_url: e.target.value }))}
              placeholder="https://example.com"
            />
          </div>

          {/* 정렬 순서 */}
          <div className="space-y-2">
            <Label htmlFor="sort_order">정렬 순서</Label>
            <Input
              id="sort_order"
              type="number"
              min="0"
              value={formData.sort_order}
              onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
            />
          </div>

          {/* 시작일/종료일 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="starts_at">시작일 (선택)</Label>
              <Input
                id="starts_at"
                type="datetime-local"
                value={formData.starts_at}
                onChange={(e) => setFormData(prev => ({ ...prev, starts_at: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ends_at">종료일 (선택)</Label>
              <Input
                id="ends_at"
                type="datetime-local"
                value={formData.ends_at}
                onChange={(e) => setFormData(prev => ({ ...prev, ends_at: e.target.value }))}
              />
            </div>
          </div>

          {/* 노출 여부 */}
          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="is_active">즉시 노출</Label>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              취소
            </Button>
            <Button type="submit" disabled={loading || uploading}>
              {loading ? '저장 중...' : '배너 추가'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
