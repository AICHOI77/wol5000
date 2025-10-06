/**
 * Supabase 배너 시드 데이터 스크립트
 *
 * 사용법:
 * 1. .env.local에 Supabase 환경 변수 설정 확인
 * 2. node db/seed-banners.js 실행
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl)
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceRoleKey ? '설정됨' : '없음')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// 더미 배너 데이터 (3개)
const dummyBanners = [
  {
    title: 'AI 자동화 시스템 런칭 - 월 5천원으로 시작하세요',
    image_url: 'https://placehold.co/1920x800/E50914/FFFFFF?text=AI+Automation+System',
    alt: 'AI 자동화 시스템 런칭 배너',
    link_url: '/biz',
    sort_order: 1,
    is_active: true,
    starts_at: null,
    ends_at: null,
  },
  {
    title: '월 5천원으로 시작하는 AI 창업 - 지금 바로 시작하세요',
    image_url: 'https://placehold.co/1920x800/000000/E50914?text=AI+Startup+Package',
    alt: 'AI 창업 패키지 배너',
    link_url: '/startup',
    sort_order: 2,
    is_active: true,
    starts_at: null,
    ends_at: null,
  },
  {
    title: 'N잡 자동화 솔루션 - 자는 동안에도 수익 창출',
    image_url: 'https://placehold.co/1920x800/111318/FFFFFF?text=N-Job+Automation',
    alt: 'N잡 자동화 솔루션 배너',
    link_url: '/njob',
    sort_order: 3,
    is_active: true,
    starts_at: null,
    ends_at: null,
  },
]

async function seedBanners() {
  console.log('🌱 배너 시드 데이터 생성을 시작합니다...\n')

  try {
    // 기존 배너 확인
    const { data: existingBanners, error: fetchError } = await supabase
      .from('banners')
      .select('id')

    if (fetchError) {
      console.error('❌ 배너 조회 실패:', fetchError.message)
      process.exit(1)
    }

    if (existingBanners && existingBanners.length > 0) {
      console.log(`⚠️  이미 ${existingBanners.length}개의 배너가 존재합니다.`)
      console.log('기존 배너를 모두 삭제하고 새로 생성하시겠습니까? (y/n)')

      // 간단한 프롬프트 대신 자동으로 진행
      console.log('기존 배너를 유지하고 새 배너를 추가합니다.\n')
    }

    // 배너 삽입
    const { data: insertedBanners, error: insertError } = await supabase
      .from('banners')
      .insert(dummyBanners)
      .select()

    if (insertError) {
      console.error('❌ 배너 생성 실패:', insertError.message)
      process.exit(1)
    }

    console.log(`✅ ${insertedBanners.length}개의 배너가 성공적으로 생성되었습니다!\n`)

    insertedBanners.forEach((banner, index) => {
      console.log(`${index + 1}. ${banner.title}`)
      console.log(`   - ID: ${banner.id}`)
      console.log(`   - 링크: ${banner.link_url}`)
      console.log(`   - 정렬: ${banner.sort_order}`)
      console.log(`   - 노출: ${banner.is_active ? '✅' : '❌'}`)
      console.log('')
    })

    console.log('🎉 배너 시드 데이터 생성이 완료되었습니다!')
    console.log('👉 어드민 페이지에서 확인하세요: http://localhost:3000/admin/banners')
    console.log('👉 메인 페이지에서 확인하세요: http://localhost:3000')

  } catch (error) {
    console.error('❌ 예상치 못한 오류 발생:', error.message)
    process.exit(1)
  }
}

// 스크립트 실행
seedBanners()
