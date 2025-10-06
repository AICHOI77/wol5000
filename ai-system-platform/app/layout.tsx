import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 시스템 플랫폼 - 월5천 AI 자동화 시스템',
  description: '강의가 아니라 시스템을 받으세요. 10개의 AI 자동화 시스템으로 퇴근 후에도 수익이 멈추지 않습니다.',
  keywords: 'AI 시스템, 자동화, 퍼널, 수익화, N잡, 자영업',
  openGraph: {
    title: 'AI 시스템 플랫폼 - 월5천 AI 자동화 시스템',
    description: '10개의 AI 자동화 시스템. 실행은 AI가 합니다.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
