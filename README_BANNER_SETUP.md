# 배너 관리 시스템 설정 가이드

## 1. Supabase 프로젝트 생성 및 설정

### 1.1 Supabase 프로젝트 생성
1. [Supabase Dashboard](https://app.supabase.com) 접속
2. "New Project" 클릭
3. 프로젝트명, 비밀번호, 리전(Seoul) 선택
4. 프로젝트 생성 완료 (2-3분 소요)

### 1.2 환경 변수 설정
프로젝트 생성 후 Settings > API에서 다음 정보 확인:

```bash
# .env.local 파일 업데이트
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

⚠️ **주의**: `SUPABASE_SERVICE_ROLE_KEY`는 절대 클라이언트에 노출하지 마세요!

## 2. 데이터베이스 스키마 생성

### 2.1 SQL Editor에서 실행
1. Supabase Dashboard > SQL Editor 접속
2. `db/schema.sql` 파일 내용 전체 복사
3. SQL Editor에 붙여넣기
4. "Run" 버튼 클릭

이 과정에서 다음이 자동 생성됩니다:
- ✅ `banners` 테이블
- ✅ 인덱스 (쿼리 최적화)
- ✅ RLS(Row Level Security) 정책
- ✅ Storage 버킷 `banners` (이미지 저장용)
- ✅ Storage 정책 (public read, authenticated write)
- ✅ 초기 더미 데이터 3개

## 3. 시드 데이터 생성 (옵션)

SQL에서 이미 더미 데이터가 추가되지만, 추가로 더 생성하려면:

```bash
# Node.js로 시드 스크립트 실행
node db/seed-banners.js
```

## 4. 기능 확인

### 4.1 어드민 페이지에서 배너 관리
- URL: [http://localhost:3000/admin/banners](http://localhost:3000/admin/banners)
- 배너 추가, 수정, 삭제, 노출 토글, 정렬 순서 변경 가능

### 4.2 메인 페이지에서 캐러셀 확인
- URL: [http://localhost:3000](http://localhost:3000)
- 자동 슬라이드 캐러셀 (5초 간격)
- 좌/우 네비게이션 버튼
- 인디케이터 도트

## 5. 배너 이미지 업로드 가이드

### 5.1 권장 사양
- **사이즈**: 1920x800 (비율 12:5 ≈ 2.4:1)
- **포맷**: JPG, PNG, WebP
- **용량**: 2MB 이하
- **최적화**: TinyPNG, ImageOptim 등으로 압축 권장

### 5.2 업로드 방법
1. 어드민 > 배너관리 > "배너 추가" 클릭
2. 이미지 파일 선택 (자동 업로드 → Supabase Storage)
3. 제목, alt 텍스트 입력 (필수)
4. 링크 URL (선택), 정렬 순서, 노출 여부 설정
5. "배너 추가" 버튼 클릭

### 5.3 이미지 최적화 팁
- **모바일 대응**: object-fit: cover로 자동 크롭
- **로딩 최적화**: 첫 번째 배너는 priority 로딩
- **Lazy Loading**: 나머지 배너는 lazy 로딩
- **WebP 사용**: 브라우저 호환성 좋고 용량 작음

## 6. API 엔드포인트

### 6.1 Public API (프론트 캐러셀용)
```
GET /api/public/banners
- 5분 캐시
- is_active=true인 배너만 반환
- starts_at/ends_at 기간 필터링
- sort_order ASC 정렬
```

### 6.2 Admin API (관리자용)
```
GET    /api/admin/banners        # 전체 배너 목록
POST   /api/admin/banners        # 새 배너 생성
PATCH  /api/admin/banners/[id]   # 배너 수정
DELETE /api/admin/banners/[id]   # 배너 삭제
```

## 7. 보안 및 권한 설정

### 7.1 현재 임시 설정
- ✅ 공개 배너: 모두 읽기 가능
- ⚠️ 관리자 기능: 인증된 사용자 모두 허용 (임시)

### 7.2 배포 전 필수 작업
```sql
-- RLS 정책 수정 (관리자 role 기반으로 변경)
DROP POLICY "Authenticated users can manage banners" ON banners;

CREATE POLICY "Only admins can manage banners"
ON banners FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');
```

또는 Server Actions로 권한 체크:
```typescript
// app/actions/banner-actions.ts
export async function createBanner(formData) {
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.user_metadata?.role !== 'admin') {
    throw new Error('Unauthorized')
  }
  // ... 배너 생성 로직
}
```

## 8. 문제 해결

### 8.1 이미지 업로드 실패
- Storage 버킷 `banners`가 존재하는지 확인
- Storage 정책이 올바른지 확인 (public read, authenticated write)
- 파일 크기 2MB 이하인지 확인

### 8.2 배너가 프론트에 안 보임
- is_active = true인지 확인
- starts_at/ends_at 기간이 현재 시각과 맞는지 확인
- 브라우저 캐시 새로고침 (Ctrl+Shift+R)

### 8.3 RLS 정책 오류
```sql
-- RLS 상태 확인
SELECT tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'banners';

-- 필요시 RLS 비활성화 (개발 중)
ALTER TABLE banners DISABLE ROW LEVEL SECURITY;
```

## 9. 다음 단계 (향후 개선)

- [ ] 드래그 앤 드롭으로 배너 순서 변경
- [ ] 배너 캡션/부제목 필드 추가
- [ ] A/B 테스트 기능 (조회수, 클릭률 추적)
- [ ] 배너 스케줄링 자동화 (cron job)
- [ ] 이미지 리사이징 자동화 (Supabase Edge Functions)
- [ ] 관리자 role 기반 권한 시스템

## 10. 참고 자료

- [Supabase Storage 문서](https://supabase.com/docs/guides/storage)
- [Next.js Image 최적화](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [RLS 정책 가이드](https://supabase.com/docs/guides/auth/row-level-security)
