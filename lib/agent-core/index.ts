// AI Agent Core Pipeline: 입력 → 판단 → 액션 → 요약

export interface AgentInput {
  module: string
  slot: string
  data: Record<string, any>
}

export interface AgentOutput {
  success: boolean
  summary: string
  data?: Record<string, any>
  error?: string
}

export interface AgentAction {
  validate: (input: AgentInput) => Promise<boolean>
  execute: (input: AgentInput) => Promise<AgentOutput>
  summarize: (output: AgentOutput) => string
}

/**
 * Agent Pipeline: 입력 → 검증 → 실행 → 요약
 */
export async function runAgentPipeline(
  input: AgentInput,
  action: AgentAction
): Promise<AgentOutput> {
  try {
    // 1) 입력 검증
    const isValid = await action.validate(input)
    if (!isValid) {
      return {
        success: false,
        summary: '입력 데이터 검증 실패',
        error: 'Validation failed'
      }
    }

    // 2) 액션 실행
    const output = await action.execute(input)

    // 3) 요약 생성
    const summary = action.summarize(output)

    return {
      ...output,
      summary
    }
  } catch (error) {
    return {
      success: false,
      summary: '처리 중 오류 발생',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
