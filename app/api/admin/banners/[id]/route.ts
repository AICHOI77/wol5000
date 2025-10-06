import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/db/supabase'
import { bannerSchema } from '@/lib/validation/banner'

// PATCH: 배너 수정
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = bannerSchema.partial().parse(body)

    const { data, error } = await supabaseAdmin
      .from('banners')
      .update(validatedData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating banner:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ banner: data }, { status: 200 })
  } catch (error: any) {
    console.error('Validation or unexpected error:', error)
    return NextResponse.json(
      { error: error.errors || error.message || 'Internal server error' },
      { status: 400 }
    )
  }
}

// DELETE: 배너 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabaseAdmin
      .from('banners')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting banner:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
