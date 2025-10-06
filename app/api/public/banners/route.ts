import { NextResponse } from 'next/server'
import { supabase } from '@/db/supabase'

export const revalidate = 300 // 5분 캐시

export async function GET() {
  try {
    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .eq('is_active', true)
      .or(`starts_at.is.null,starts_at.lte.${now}`)
      .or(`ends_at.is.null,ends_at.gte.${now}`)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching public banners:', error)
      return NextResponse.json({ banners: [] }, { status: 200 })
    }

    return NextResponse.json({ banners: data || [] }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ banners: [] }, { status: 200 })
  }
}
