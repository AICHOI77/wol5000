import { NextRequest, NextResponse } from 'next/server'

// POST /api/leads - 리드 수집 (더미)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, interest } = body

    // 유효성 검사
    if (!name || !phone || !interest) {
      return NextResponse.json(
        { error: '이름, 전화번호, 관심분야는 필수입니다.' },
        { status: 400 }
      )
    }

    // 콘솔 로깅 (개발용)
    console.log('📩 새로운 리드 수집:', {
      name,
      phone,
      interest,
      timestamp: new Date().toISOString(),
    })

    // TODO: Supabase 연동
    // const { data, error } = await supabase
    //   .from('leads')
    //   .insert([{ name, phone, interest, created_at: new Date() }])

    // TODO: n8n Webhook 연동
    // await fetch('https://your-n8n-webhook-url', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, phone, interest }),
    // })
    //
    // n8n 워크플로우:
    // 1. Webhook 수신
    // 2. Supabase에 리드 저장
    // 3. Slack 알림 발송
    // 4. Calendly 예약 링크 이메일/SMS 발송
    // 5. CRM 자동 등록

    // 성공 응답
    return NextResponse.json(
      {
        success: true,
        message: '신청이 완료되었습니다. 곧 연락드리겠습니다.',
        data: { name, interest },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('리드 수집 에러:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// GET /api/leads - 리드 목록 조회 (관리자용)
export async function GET() {
  // TODO: 실제 구현 시 인증 필요
  return NextResponse.json(
    {
      message: '리드 목록 조회는 관리자 인증이 필요합니다.',
      // TODO: Supabase에서 리드 목록 가져오기
      // const { data, error } = await supabase
      //   .from('leads')
      //   .select('*')
      //   .order('created_at', { ascending: false })
    },
    { status: 401 }
  )
}
