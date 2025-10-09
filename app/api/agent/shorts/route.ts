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
    const { slot, industry, keywords, scripts } = body

    // 1) agent_sessions 테이블에 실행 기록 저장
    await supabaseAdmin.from('agent_sessions').insert({
      slot,
      module: 'shorts',
      input: { industry, keywords },
      output: { scripts }
    })

    // 2) n8n webhook으로 Google Sheets/Airtable 저장
    if (process.env.N8N_WEBHOOK_BASE) {
      await fetch(`${process.env.N8N_WEBHOOK_BASE}/shorts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot,
          industry,
          keywords,
          scripts,
          created_at: new Date().toISOString()
        })
      }).catch(err => console.error('n8n webhook error:', err))
    }

    return NextResponse.json({
      success: true,
      message: '숏츠 스크립트가 생성되었습니다'
    })
  } catch (error) {
    console.error('Shorts API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
