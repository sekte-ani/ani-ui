/**
 * Spacing tokens derived from the design system styleguide.
 * Single source of truth for all spacing-related data.
 */

export const spacingScale = {
  "spacing-1":  "8px",
  "spacing-2":  "16px",
  "spacing-3":  "24px",
  "spacing-4":  "32px",
  "spacing-5":  "40px",
  "spacing-6":  "56px",
  "spacing-7":  "72px",
  "spacing-8":  "80px",
  "spacing-9":  "96px",
  "spacing-10": "120px",
} as const

export type SpacingToken = keyof typeof spacingScale

export interface SpacingSpec {
  token: SpacingToken
  value: string
  rem: string
}

export const spacingSpecs: SpacingSpec[] = [
  { token: "spacing-1",  value: "8px",   rem: "0.5rem" },
  { token: "spacing-2",  value: "16px",  rem: "1rem" },
  { token: "spacing-3",  value: "24px",  rem: "1.5rem" },
  { token: "spacing-4",  value: "32px",  rem: "2rem" },
  { token: "spacing-5",  value: "40px",  rem: "2.5rem" },
  { token: "spacing-6",  value: "56px",  rem: "3.5rem" },
  { token: "spacing-7",  value: "72px",  rem: "4.5rem" },
  { token: "spacing-8",  value: "80px",  rem: "5rem" },
  { token: "spacing-9",  value: "96px",  rem: "6rem" },
  { token: "spacing-10", value: "120px", rem: "7.5rem" },
]

// ── Letter-spacing (tracking) tokens ──────────────────────────────────────────

export const trackingScale = {
  tighter: "-0.05em",
  tight:   "-0.025em",
  normal:  "0em",
  wide:    "0.025em",
  wider:   "0.05em",
  widest:  "0.1em",
} as const

export type TrackingToken = keyof typeof trackingScale

export const trackingClassMap: Record<TrackingToken, string> = {
  tighter: "tracking-tighter",
  tight:   "tracking-tight",
  normal:  "tracking-normal",
  wide:    "tracking-wide",
  wider:   "tracking-wider",
  widest:  "tracking-widest",
}
