import { z } from 'zod'

// 배너 생성/수정 스키마
export const bannerSchema = z.object({
  title: z.string().min(1, '제목을 입력하세요').max(100, '제목은 100자 이하로 입력하세요'),
  image_url: z.string().url('올바른 이미지 URL을 입력하세요'),
  alt: z.string().min(1, 'alt 텍스트를 입력하세요').max(200, 'alt는 200자 이하로 입력하세요'),
  link_url: z.string().url('올바른 URL을 입력하세요').optional().nullable(),
  sort_order: z.number().int().min(0, '정렬 순서는 0 이상이어야 합니다').default(0),
  is_active: z.boolean().default(true),
  starts_at: z.string().datetime().optional().nullable(),
  ends_at: z.string().datetime().optional().nullable(),
})

export type BannerFormData = z.infer<typeof bannerSchema>

// 파일 업로드 검증
export const validateBannerImage = (file: File): { valid: boolean; error?: string } => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 2 * 1024 * 1024 // 2MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'JPG, PNG, WebP 형식만 업로드 가능합니다.' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: '파일 크기는 2MB 이하여야 합니다.' }
  }

  return { valid: true }
}

// 이미지 사이즈 권장 안내 텍스트
export const BANNER_IMAGE_GUIDE = '권장 사이즈: 1920x800 (비율 12:5), 2MB 이하 JPG/PNG/WebP'
