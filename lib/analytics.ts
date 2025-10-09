/**
 * Analytics Wrapper (PostHog + Vercel Analytics)
 */

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

/**
 * Track KPI event
 */
export function trackEvent(event: AnalyticsEvent): void {
  // PostHog
  if (typeof window !== 'undefined' && (window as any).posthog) {
    (window as any).posthog.capture(event.name, event.properties)
  }

  // Vercel Analytics
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', event.name, event.properties)
  }

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', event)
  }
}

/**
 * Lead submitted event
 */
export function trackLeadSubmitted(slot: string, module: string): void {
  trackEvent({
    name: 'lead_submitted',
    properties: { slot, module }
  })
}

/**
 * Agent action completed event
 */
export function trackAgentAction(
  slot: string,
  module: string,
  duration_ms: number
): void {
  trackEvent({
    name: 'agent_action_done',
    properties: { slot, module, duration_ms }
  })
}

/**
 * Booking created event
 */
export function trackBookingCreated(channel: 'reserve' | 'cs'): void {
  trackEvent({
    name: 'booking_created',
    properties: { channel }
  })
}

/**
 * Webinar click event
 */
export function trackWebinarClick(slot: string): void {
  trackEvent({
    name: 'webinar_click',
    properties: { slot }
  })
}

/**
 * Shorts plan generated event
 */
export function trackShortsPlanGenerated(): void {
  trackEvent({
    name: 'shorts_plan_generated'
  })
}

/**
 * UTM click event
 */
export function trackUTMClick(source: string, campaign: string): void {
  trackEvent({
    name: 'utm_click',
    properties: { source, campaign }
  })
}
