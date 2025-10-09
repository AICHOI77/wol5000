import { AgentInput, AgentOutput, AgentAction } from '../index'

interface ShortsScript {
  title: string
  hook: string
  body: string
  cta: string
  hashtags: string[]
  thumbnail_copy: string
}

/**
 * 숏츠·영상 마케팅 액션
 * 입력: 업종, 키워드
 * 출력: 3개 숏츠 스크립트
 */
export const shortsAction: AgentAction = {
  async validate(input: AgentInput): Promise<boolean> {
    const { industry, keywords } = input.data

    if (!industry || !keywords || keywords.length === 0) {
      return false
    }

    return true
  },

  async execute(input: AgentInput): Promise<AgentOutput> {
    const { industry, keywords } = input.data

    try {
      // AI로 3개 숏츠 스크립트 생성
      const scripts: ShortsScript[] = [
        {
          title: `${industry} 고객이 가장 많이 묻는 질문 TOP3`,
          hook: '🤔 이거 궁금하셨죠?',
          body: `${keywords[0]}에 대한 답변을 3가지로 정리했습니다...`,
          cta: '더 알고 싶다면? 프로필 링크 클릭!',
          hashtags: ['#' + industry, '#' + keywords[0], '#팁', '#꿀팁'],
          thumbnail_copy: '고객이 가장 많이 묻는 질문'
        },
        {
          title: `${industry} 비포 애프터`,
          hook: '😱 진짜 이렇게 달라져요?',
          body: `${keywords[1]}을 적용한 결과...`,
          cta: '당신도 할 수 있어요! 상담 신청하기',
          hashtags: ['#' + industry, '#비포애프터', '#후기', '#리얼'],
          thumbnail_copy: 'BEFORE vs AFTER'
        },
        {
          title: `${industry} 실수 방지 체크리스트`,
          hook: '⚠️ 이것만은 피하세요!',
          body: `${keywords[2]} 할 때 절대 하면 안 되는 것들...`,
          cta: '전문가 팁 더 보기',
          hashtags: ['#' + industry, '#실수방지', '#꿀팁', '#체크리스트'],
          thumbnail_copy: '절대 하면 안 되는 것'
        }
      ]

      // n8n webhook으로 Google Sheets/Airtable 저장
      await fetch(process.env.N8N_WEBHOOK_BASE + '/shorts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot: input.slot,
          industry,
          keywords,
          scripts
        })
      })

      return {
        success: true,
        summary: '3개 숏츠 스크립트 생성 완료',
        data: { scripts }
      }
    } catch (error) {
      return {
        success: false,
        summary: '스크립트 생성 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  },

  summarize(output: AgentOutput): string {
    if (output.success) {
      const scripts = output.data?.scripts as ShortsScript[]
      return `✅ ${output.summary}\n\n` +
        scripts.map((s, i) => `${i + 1}. ${s.title}\n   ${s.hook}\n   ${s.hashtags.join(' ')}`).join('\n\n')
    } else {
      return `❌ ${output.summary}`
    }
  }
}
