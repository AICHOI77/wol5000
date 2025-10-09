import { AgentInput, AgentOutput, AgentAction } from '../index'

interface TrafficPlan {
  day: number
  channel: string
  action: string
  priority: 'high' | 'medium' | 'low'
  utm_params: string
}

/**
 * 압도적 트래픽 액션
 * 입력: 현재 채널 상태 (지도/리뷰/SNS/광고)
 * 출력: 7일/14일 실행계획 + UTM 링크
 */
export const trafficAction: AgentAction = {
  async validate(input: AgentInput): Promise<boolean> {
    const { channels } = input.data

    if (!channels || typeof channels !== 'object') {
      return false
    }

    return true
  },

  async execute(input: AgentInput): Promise<AgentOutput> {
    const { channels, duration = 7 } = input.data

    try {
      const plan: TrafficPlan[] = []

      // 지도 최적화
      if (channels.naver_map) {
        plan.push({
          day: 1,
          channel: '네이버 지도',
          action: '영업시간/메뉴/사진 업데이트',
          priority: 'high',
          utm_params: 'utm_source=naver&utm_medium=map&utm_campaign=profile_update'
        })
      }

      // 리뷰 관리
      if (channels.reviews) {
        plan.push({
          day: 2,
          channel: '리뷰 관리',
          action: '미답변 리뷰 3개 이상 답변 작성',
          priority: 'high',
          utm_params: 'utm_source=review&utm_medium=organic&utm_campaign=engagement'
        })
      }

      // SNS 운영
      if (channels.instagram || channels.facebook) {
        plan.push({
          day: 3,
          channel: 'SNS',
          action: '릴스/숏츠 1개 업로드 (프로필 링크 포함)',
          priority: 'medium',
          utm_params: 'utm_source=instagram&utm_medium=social&utm_campaign=reels'
        })
      }

      // 광고 세팅
      if (channels.ads) {
        plan.push({
          day: 5,
          channel: '네이버/카카오 광고',
          action: 'CPC 캠페인 세팅 및 1일 예산 설정',
          priority: 'medium',
          utm_params: 'utm_source=naver&utm_medium=cpc&utm_campaign=new_customer'
        })
      }

      // 블로그 포스팅
      plan.push({
        day: 7,
        channel: '블로그',
        action: '업종 관련 키워드 포스팅 1개',
        priority: 'low',
        utm_params: 'utm_source=blog&utm_medium=organic&utm_campaign=seo'
      })

      // n8n webhook으로 PostHog 이벤트 전송
      await fetch(process.env.N8N_WEBHOOK_BASE + '/traffic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot: input.slot,
          channels,
          plan
        })
      })

      return {
        success: true,
        summary: `${duration}일 트래픽 플랜 생성 완료`,
        data: { plan }
      }
    } catch (error) {
      return {
        success: false,
        summary: '트래픽 플랜 생성 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  },

  summarize(output: AgentOutput): string {
    if (output.success) {
      const plan = output.data?.plan as TrafficPlan[]
      return `✅ ${output.summary}\n\n` +
        plan.map(p => `Day ${p.day}: [${p.priority.toUpperCase()}] ${p.channel} - ${p.action}`).join('\n')
    } else {
      return `❌ ${output.summary}`
    }
  }
}
