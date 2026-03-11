/**
 * Text-shadow tokens for the design system.
 * Unlike box-shadow (shadow.variants.ts), these apply to text characters.
 *
 * - `TEXT_SHADOW_SCALE`       → Design token definitions
 * - `textShadowClassMap`      → Custom `text-shadow-brand-*` classes
 * - `TextShadowToken`         → Union type of all token keys
 */

// ── Token list ────────────────────────────────────────────────────────────────

export const TEXT_SHADOW_TOKENS = [
  "none",
  "sm",
  "base",
  "md",
  "lg",
  "xl",
  "glow",
  "crisp",
  "outline",
] as const

export type TextShadowToken = (typeof TEXT_SHADOW_TOKENS)[number]

// ── Detailed scale (used for documentation display) ───────────────────────────

export interface TextShadowSpec {
  token: TextShadowToken
  cssVar: string
  className: string
  value: string
  label: string
  description: string
}

export const TEXT_SHADOW_SCALE: TextShadowSpec[] = [
  {
    token: "none",
    cssVar: "--brand-text-shadow-none",
    className: "text-shadow-brand-none",
    value: "none",
    label: "None",
    description: "No text shadow",
  },
  {
    token: "sm",
    cssVar: "--brand-text-shadow-sm",
    className: "text-shadow-brand-sm",
    value: "0 1px 2px rgb(0 0 0 / 0.15)",
    label: "SM",
    description: "Subtle shadow for slight depth on light backgrounds",
  },
  {
    token: "base",
    cssVar: "--brand-text-shadow-base",
    className: "text-shadow-brand-base",
    value: "0 1px 3px rgb(0 0 0 / 0.25)",
    label: "Base",
    description: "Default text shadow for readable text on images",
  },
  {
    token: "md",
    cssVar: "--brand-text-shadow-md",
    className: "text-shadow-brand-md",
    value: "0 2px 4px rgb(0 0 0 / 0.30)",
    label: "MD",
    description: "Medium depth for hero headings over photos",
  },
  {
    token: "lg",
    cssVar: "--brand-text-shadow-lg",
    className: "text-shadow-brand-lg",
    value: "0 3px 6px rgb(0 0 0 / 0.35)",
    label: "LG",
    description: "Pronounced shadow for high-contrast text",
  },
  {
    token: "xl",
    cssVar: "--brand-text-shadow-xl",
    className: "text-shadow-brand-xl",
    value: "0 4px 8px rgb(0 0 0 / 0.40)",
    label: "XL",
    description: "Heavy shadow for maximum readability over busy backgrounds",
  },
  {
    token: "glow",
    cssVar: "--brand-text-shadow-glow",
    className: "text-shadow-brand-glow",
    value: "0 0 8px rgb(76 157 174 / 0.60), 0 0 20px rgb(76 157 174 / 0.30)",
    label: "Glow",
    description: "Brand-colored glow effect for accent text",
  },
  {
    token: "crisp",
    cssVar: "--brand-text-shadow-crisp",
    className: "text-shadow-brand-crisp",
    value: "1px 1px 0 rgb(0 0 0 / 0.20)",
    label: "Crisp",
    description: "Hard-edge offset shadow for a retro / embossed look",
  },
  {
    token: "outline",
    cssVar: "--brand-text-shadow-outline",
    className: "text-shadow-brand-outline",
    value: "-1px -1px 0 rgb(0 0 0 / 0.30), 1px -1px 0 rgb(0 0 0 / 0.30), -1px 1px 0 rgb(0 0 0 / 0.30), 1px 1px 0 rgb(0 0 0 / 0.30)",
    label: "Outline",
    description: "All-direction outline for text on any background",
  },
]

// ── CSS-variable map (for inline styles) ──────────────────────────────────────

export const textShadowMap: Record<TextShadowToken, string> = Object.fromEntries(
  TEXT_SHADOW_SCALE.map((s) => [s.token, `var(${s.cssVar})`])
) as Record<TextShadowToken, string>

// ── Tailwind class map ────────────────────────────────────────────────────────

export const textShadowClassMap: Record<TextShadowToken, string> = Object.fromEntries(
  TEXT_SHADOW_SCALE.map((s) => [s.token, s.className])
) as Record<TextShadowToken, string>
