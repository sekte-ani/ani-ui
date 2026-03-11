/**
 * Border radius tokens derived from the design system styleguide.
 * Single source of truth for all border-radius-related data.
 *
 * - `RADIUS_SCALE`          → Design token definitions
 * - `radiusClassMap`        → Tailwind `rounded-brand-*` classes
 * - `RadiusToken`           → Union type of all token keys
 */

// ── Token list ────────────────────────────────────────────────────────────────

export const RADIUS_TOKENS = [
  "none",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "full",
] as const

export type RadiusToken = (typeof RADIUS_TOKENS)[number]

// ── Detailed scale (used for documentation display) ───────────────────────────

export interface RadiusSpec {
  token: RadiusToken
  value: string
  label: string
}

export const RADIUS_SCALE: RadiusSpec[] = [
  { token: "none", value: "0px",    label: "None" },
  { token: "sm",   value: "4px",    label: "Small" },
  { token: "md",   value: "8px",    label: "Medium" },
  { token: "lg",   value: "12px",   label: "Large" },
  { token: "xl",   value: "16px",   label: "X-Large" },
  { token: "2xl",  value: "24px",   label: "2X-Large" },
  { token: "full", value: "9999px", label: "Full (Pill)" },
]

// ── CSS-variable map (for inline styles) ──────────────────────────────────────

export const radiusMap: Record<RadiusToken, string> = {
  none: "var(--brand-radius-none)",
  sm:   "var(--brand-radius-sm)",
  md:   "var(--brand-radius-md)",
  lg:   "var(--brand-radius-lg)",
  xl:   "var(--brand-radius-xl)",
  "2xl": "var(--brand-radius-2xl)",
  full: "var(--brand-radius-full)",
}

// ── Tailwind rounded class map ────────────────────────────────────────────────

export const radiusClassMap: Record<RadiusToken, string> = {
  none: "rounded-brand-none",
  sm:   "rounded-brand-sm",
  md:   "rounded-brand-md",
  lg:   "rounded-brand-lg",
  xl:   "rounded-brand-xl",
  "2xl": "rounded-brand-2xl",
  full: "rounded-brand-full",
}
