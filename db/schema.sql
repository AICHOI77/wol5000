-- Supabase 배너 테이블 스키마
-- 실행: Supabase Dashboard > SQL Editor에서 실행

-- 1. banners 테이블 생성
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt TEXT NOT NULL,
  link_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 인덱스 생성 (공개 API 쿼리 최적화)
CREATE INDEX IF NOT EXISTS idx_banners_active_sort
ON banners(is_active, sort_order, created_at);

CREATE INDEX IF NOT EXISTS idx_banners_dates
ON banners(starts_at, ends_at)
WHERE is_active = TRUE;

-- 3. RLS(Row Level Security) 활성화
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- 4. 공개 읽기 정책 (is_active=true인 배너만)
CREATE POLICY "Public banners are viewable by everyone"
ON banners FOR SELECT
USING (
  is_active = TRUE
  AND (starts_at IS NULL OR starts_at <= NOW())
  AND (ends_at IS NULL OR ends_at >= NOW())
);

-- 5. 관리자 전체 접근 정책 (임시: 인증된 사용자 모두 허용)
-- TODO: 실제 배포 시 관리자 role 기반으로 변경 필요
CREATE POLICY "Authenticated users can manage banners"
ON banners FOR ALL
USING (auth.role() = 'authenticated');

-- 6. Storage 버킷 생성 (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('banners', 'banners', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage 정책 (public read, authenticated write)
CREATE POLICY "Public can view banner images"
ON storage.objects FOR SELECT
USING (bucket_id = 'banners');

CREATE POLICY "Authenticated users can upload banner images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'banners'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete banner images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'banners'
  AND auth.role() = 'authenticated'
);

-- 8. 초기 더미 데이터 (선택사항)
INSERT INTO banners (title, image_url, alt, link_url, sort_order, is_active) VALUES
('AI 자동화 시스템 런칭', 'https://placehold.co/1920x800/E50914/FFFFFF?text=Banner+1', 'AI 자동화 시스템', '/biz', 1, TRUE),
('월 5천원으로 시작하는 AI 창업', 'https://placehold.co/1920x800/000000/E50914?text=Banner+2', 'AI 창업 패키지', '/startup', 2, TRUE),
('N잡 자동화 솔루션', 'https://placehold.co/1920x800/111318/FFFFFF?text=Banner+3', 'N잡 자동화', '/njob', 3, TRUE);
