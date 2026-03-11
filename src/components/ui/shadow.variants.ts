/**
 * Shadow / elevation tokens derived from the design system styleguide.
 * Single source of truth for all shadow-related data.
 *
 * - `SHADOW_SCALE`          → Design token definitions
 * - `shadowClassMap`        → Tailwind `shadow-brand-*` classes
 * - `ShadowToken`           → Union type of all token keys
 */

// ── Token list ────────────────────────────────────────────────────────────────

export const SHADOW_TOKENS = [
  "xs",
  "sm",
  "base",
  "md",
  "lg",
  "xl",
  "2xl",
  "inner",
] as const

export type ShadowToken = (typeof SHADOW_TOKENS)[number]

// ── Detailed scale (used for documentation display) ───────────────────────────

export interface ShadowSpec {
  token: ShadowToken
  cssVar: string
  tailwindClass: string
  value: string
  label: string
}

export const SHADOW_SCALE: ShadowSpec[] = [
  { token: "xs",    cssVar: "--brand-shadow-xs",    tailwindClass: "shadow-brand-xs",    value: "0 1px 2px 0 rgb(0 0 0 / 0.05)",                                             label: "XS" },
  { token: "sm",    cssVar: "--brand-shadow-sm",    tailwindClass: "shadow-brand-sm",    value: "0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)",            label: "SM" },
  { token: "base",  cssVar: "--brand-shadow-base",  tailwindClass: "shadow-brand-base",  value: "0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)",         label: "Base" },
  { token: "md",    cssVar: "--brand-shadow-md",    tailwindClass: "shadow-brand-md",    value: "0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)",         label: "MD" },
  { token: "lg",    cssVar: "--brand-shadow-lg",    tailwindClass: "shadow-brand-lg",    value: "0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)",       label: "LG" },
  { token: "xl",    cssVar: "--brand-shadow-xl",    tailwindClass: "shadow-brand-xl",    value: "0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)",      label: "XL" },
  { token: "2xl",   cssVar: "--brand-shadow-2xl",   tailwindClass: "shadow-brand-2xl",   value: "0 25px 50px -12px rgb(0 0 0 / 0.25)",                                        label: "2XL" },
  { token: "inner", cssVar: "--brand-shadow-inner", tailwindClass: "shadow-brand-inner", value: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",                                       label: "Inner" },
]

// ── CSS-variable map (for inline styles) ──────────────────────────────────────

export const shadowMap: Record<ShadowToken, string> = {
  xs:    "var(--brand-shadow-xs)",
  sm:    "var(--brand-shadow-sm)",
  base:  "var(--brand-shadow-base)",
  md:    "var(--brand-shadow-md)",
  lg:    "var(--brand-shadow-lg)",
  xl:    "var(--brand-shadow-xl)",
  "2xl": "var(--brand-shadow-2xl)",
  inner: "var(--brand-shadow-inner)",
}

// ── Tailwind shadow class map ─────────────────────────────────────────────────

export const shadowClassMap: Record<ShadowToken, string> = {
  xs:    "shadow-brand-xs",
  sm:    "shadow-brand-sm",
  base:  "shadow-brand-base",
  md:    "shadow-brand-md",
  lg:    "shadow-brand-lg",
  xl:    "shadow-brand-xl",
  "2xl": "shadow-brand-2xl",
  inner: "shadow-brand-inner",
}
