import { AgentInput, AgentOutput, AgentAction } from '../index'

interface MessageTemplate {
  timing: 'before_day' | 'same_day' | 'reminder'
  subject: string
  content: string
  variables: string[]
}

/**
 * 방문율/CS 자동화 액션
 * 입력: 업종, 메시지 프리셋
 * 출력: 3단계 메시지 템플릿 + 쿠폰 시나리오
 */
export const csAction: AgentAction = {
  async validate(input: AgentInput): Promise<boolean> {
    const { industry } = input.data

    if (!industry) {
      return false
    }

    return true
  },

  async execute(input: AgentInput): Promise<AgentOutput> {
    const { industry, business_name, address } = input.data

    try {
      const templates: MessageTemplate[] = [
        {
          timing: 'before_day',
          subject: '내일 예약 안내',
          content: `안녕하세요 {이름}님! ${business_name}입니다 😊\n\n내일 {시간}에 예약이 확정되었습니다.\n위치: ${address}\n\n궁금하신 점이 있으시면 언제든 연락주세요!`,
          variables: ['{이름}', '{시간}']
        },
        {
          timing: 'same_day',
          subject: '오늘 예약 리마인더',
          content: `{이름}님, 오늘 {시간} 예약 잊지 않으셨죠? 😊\n\n${business_name}에서 기다리겠습니다!\n주소: ${address}\n주차 가능 여부: [주차장 안내]`,
          variables: ['{이름}', '{시간}']
        },
        {
          timing: 'reminder',
          subject: '재방문 쿠폰 드립니다',
          content: `{이름}님, ${business_name} 방문해주셔서 감사합니다! 🎁\n\n다음 방문 시 사용 가능한 10% 할인 쿠폰을 드립니다.\n쿠폰코드: WELCOME10\n유효기간: 발급일로부터 30일\n\n또 뵙길 기대할게요!`,
          variables: ['{이름}']
        }
      ]

      // n8n webhook으로 Solapi 3단계 발송 예약
      await fetch(process.env.N8N_WEBHOOK_BASE + '/cs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot: input.slot,
          industry,
          business_name,
          templates
        })
      })

      return {
        success: true,
        summary: '3단계 메시지 템플릿 생성 완료',
        data: { templates }
      }
    } catch (error) {
      return {
        success: false,
        summary: '템플릿 생성 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  },

  summarize(output: AgentOutput): string {
    if (output.success) {
      const templates = output.data?.templates as MessageTemplate[]
      return `✅ ${output.summary}\n\n` +
        templates.map((t, i) => {
          const timingKr = {
            'before_day': '전날 알림',
            'same_day': '당일 리마인더',
            'reminder': '재방문 쿠폰'
          }[t.timing]
          return `${i + 1}. ${timingKr}\n   "${t.subject}"\n   변수: ${t.variables.join(', ')}`
        }).join('\n\n')
    } else {
      return `❌ ${output.summary}`
    }
  }
}
