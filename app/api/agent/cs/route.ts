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
    const { slot, industry, business_name, templates } = body

    // 1) agent_sessions 테이블에 실행 기록 저장
    await supabaseAdmin.from('agent_sessions').insert({
      slot,
      module: 'cs',
      input: { industry, business_name },
      output: { templates }
    })

    // 2) n8n webhook으로 3단계 메시지 자동화 시작
    if (process.env.N8N_WEBHOOK_BASE) {
      await fetch(`${process.env.N8N_WEBHOOK_BASE}/cs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot,
          industry,
          business_name,
          templates,
          created_at: new Date().toISOString()
        })
      }).catch(err => console.error('n8n webhook error:', err))
    }

    return NextResponse.json({
      success: true,
      message: 'CS 자동화 템플릿이 생성되었습니다'
    })
  } catch (error) {
    console.error('CS API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
