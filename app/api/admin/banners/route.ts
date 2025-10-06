import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/db/supabase'
import { bannerSchema } from '@/lib/validation/banner'

// GET: 어드민용 전체 배너 목록
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('banners')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching banners:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ banners: data || [] }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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
