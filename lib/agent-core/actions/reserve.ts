import { AgentInput, AgentOutput, AgentAction } from '../index'

/**
 * 예약 자동화 액션
 * 입력: 업종, 희망일시, 연락처
 * 출력: 예약 확인 메시지
 */
export const reserveAction: AgentAction = {
  async validate(input: AgentInput): Promise<boolean> {
    const { name, phone, industry, desired_at } = input.data

    if (!name || !phone || !industry || !desired_at) {
      return false
    }

    // 전화번호 형식 검증 (010-XXXX-XXXX)
    const phoneRegex = /^010-\d{4}-\d{4}$/
    if (!phoneRegex.test(phone)) {
      return false
    }

    // 날짜 검증 (미래 날짜만 허용)
    const desiredDate = new Date(desired_at)
    if (desiredDate < new Date()) {
      return false
    }

    return true
  },

  async execute(input: AgentInput): Promise<AgentOutput> {
    const { name, phone, industry, desired_at, note } = input.data

    try {
      // Supabase에 예약 정보 저장
      const response = await fetch('/api/agent/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot: input.slot,
          name,
          phone,
          industry,
          desired_at,
          note
        })
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          summary: '예약 등록 실패',
          error: result.error
        }
      }

      return {
        success: true,
        summary: `${name}님의 예약이 접수되었습니다`,
        data: {
          booking_id: result.booking_id,
          confirmation_message: `${desired_at}에 예약이 확정되었습니다. 알림톡이 발송됩니다.`
        }
      }
    } catch (error) {
      return {
        success: false,
        summary: '예약 처리 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  },

  summarize(output: AgentOutput): string {
    if (output.success) {
      return `✅ ${output.summary}\n${output.data?.confirmation_message || ''}`
    } else {
      return `❌ ${output.summary}\n상담원에게 문의해주세요.`
    }
  }
}
