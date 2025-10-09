import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slot, name, phone, industry, desired_at, note } = body

    // 1) bookings 테이블에 예약 정보 저장
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .insert({
        name,
        phone,
        industry,
        desired_at,
        note,
        status: 'pending'
      })
      .select()
      .single()

    if (bookingError) {
      console.error('Booking insert error:', bookingError)
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      )
    }

    // 2) leads 테이블에도 기록
    await supabaseAdmin.from('leads').insert({
      slot,
      module: 'reserve',
      name,
      phone,
      interest: industry,
      payload: { desired_at, note }
    })

    // 3) n8n webhook으로 Solapi 알림톡 발송
    if (process.env.N8N_WEBHOOK_BASE) {
      await fetch(`${process.env.N8N_WEBHOOK_BASE}/reserve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_id: booking.id,
          name,
          phone,
          desired_at,
          industry
        })
      })
    }

    return NextResponse.json({
      booking_id: booking.id,
      message: '예약이 접수되었습니다'
    })
  } catch (error) {
    console.error('Reserve API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
