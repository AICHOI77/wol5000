import { createClient } from '@supabase/supabase-js'

// 환경변수가 없거나 빈 문자열이면 더미 값 사용
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const rawAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

// 유효한 URL인지 확인
const isValidUrl = (url: string | undefined): boolean => {
  if (!url || url === '') return false
  if (url.includes('your_supabase') || url === 'your_supabase_project_url') return false
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const supabaseUrl = isValidUrl(rawUrl) ? rawUrl! : 'https://placeholder.supabase.co'
const supabaseAnonKey = rawAnonKey && rawAnonKey !== '' ? rawAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'

// Supabase 미설정 여부 확인
export const isSupabaseConfigured = isValidUrl(rawUrl)

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey)

// Helper: 현재 로그인 사용자 가져오기
export async function getCurrentUser() {
  const { data: { user }, error } = await supabaseBrowser.auth.getUser()
  if (error) {
    console.error('Auth error:', error)
    return null
  }
  return user
}

// Helper: 특정 상품 구매 여부 확인
export async function checkProductAccess(userId: string, productSlugs: string[]) {
  try {
    // 상품 ID 조회
    const { data: products, error: productError } = await supabaseBrowser
      .from('agent_products')
      .select('id')
      .in('slug', productSlugs)

    if (productError || !products || products.length === 0) {
      return false
    }

    const productIds = products.map(p => p.id)

    // 구매 내역 확인
    const { data: purchases, error: purchaseError } = await supabaseBrowser
      .from('user_purchases')
      .select('*')
      .eq('user_id', userId)
      .in('product_id', productIds)
      .eq('status', 'active')

    if (purchaseError) {
      console.error('Purchase check error:', purchaseError)
      return false
    }

    return purchases && purchases.length > 0
  } catch (error) {
    console.error('Access check error:', error)
    return false
  }
}
