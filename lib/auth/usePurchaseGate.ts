"use client"

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase-browser'

interface UsePurchaseGateOptions {
  slugs: string[] // 허용할 상품 slug 배열 (예: ['startup200', 'biz200'])
}

interface UsePurchaseGateResult {
  loading: boolean
  hasAccess: boolean
  user: any | null
}

export function usePurchaseGate({ slugs }: UsePurchaseGateOptions): UsePurchaseGateResult {
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function checkAccess() {
      try {
        // 1. 사용자 인증 확인
        const { data: { user: currentUser }, error: authError } = await supabaseBrowser.auth.getUser()

        if (authError || !currentUser) {
          setUser(null)
          setHasAccess(false)
          setLoading(false)
          return
        }

        setUser(currentUser)

        // 2. agent_products에서 slug로 product IDs 조회
        const { data: products, error: productError } = await supabaseBrowser
          .from('agent_products')
          .select('id')
          .in('slug', slugs)

        if (productError || !products || products.length === 0) {
          console.error('Product lookup error:', productError)
          setHasAccess(false)
          setLoading(false)
          return
        }

        const productIds = products.map(p => p.id)

        // 3. user_purchases에서 구매 내역 확인
        const { data: purchases, error: purchaseError } = await supabaseBrowser
          .from('user_purchases')
          .select('*')
          .eq('user_id', currentUser.id)
          .in('product_id', productIds)
          .eq('status', 'active')

        if (purchaseError) {
          console.error('Purchase check error:', purchaseError)
          setHasAccess(false)
          setLoading(false)
          return
        }

        // 4. 구매 내역이 하나라도 있으면 접근 허용
        setHasAccess(purchases && purchases.length > 0)
      } catch (error) {
        console.error('Access gate error:', error)
        setHasAccess(false)
      } finally {
        setLoading(false)
      }
    }

    checkAccess()
  }, [slugs])

  return { loading, hasAccess, user }
}
