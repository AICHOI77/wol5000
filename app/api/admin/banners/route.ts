import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/db/supabase'
import { bannerSchema } from '@/lib/validation/banner'

// 더미 배너 데이터 (Supabase 미설정 시)
const dummyBanners = [
  {
    id: '1',
    title: 'AI 자동화 시스템 런칭',
    image_url: 'https://placehold.co/1920x800/E50914/FFFFFF?text=AI+Automation',
    alt: 'AI 자동화 시스템',
    link_url: '/biz',
    sort_order: 1,
    is_active: true,
    starts_at: null,
    ends_at: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'AI 창업 패키지',
    image_url: 'https://placehold.co/1920x800/000000/E50914?text=AI+Startup',
    alt: 'AI 창업',
    link_url: '/startup',
    sort_order: 2,
    is_active: true,
    starts_at: null,
    ends_at: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'N잡 자동화',
    image_url: 'https://placehold.co/1920x800/111318/FFFFFF?text=N-Job',
    alt: 'N잡 자동화',
    link_url: '/njob',
    sort_order: 3,
    is_active: true,
    starts_at: null,
    ends_at: null,
    created_at: new Date().toISOString(),
  },
]

// GET: 어드민용 전체 배너 목록
export async function GET() {
  // Supabase 미설정 시 더미 데이터 반환
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url') {
    return NextResponse.json({ banners: dummyBanners }, { status: 200 })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('banners')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching banners:', error)
      return NextResponse.json({ banners: dummyBanners }, { status: 200 })
    }

    return NextResponse.json({ banners: data || [] }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ banners: dummyBanners }, { status: 200 })
  }
}

// POST: 새 배너 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    const validatedData = bannerSchema.parse(body)

    const { data, error } = await supabaseAdmin
      .from('banners')
      .insert([validatedData])
      .select()
      .single()

    if (error) {
      console.error('Error creating banner:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ banner: data }, { status: 201 })
  } catch (error: any) {
    console.error('Validation or unexpected error:', error)
    return NextResponse.json(
      { error: error.errors || error.message || 'Internal server error' },
      { status: 400 }
    )
  }
}
