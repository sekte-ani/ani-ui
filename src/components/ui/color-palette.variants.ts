/**
 * Shared color tokens derived from the design system styleguide.
 * Single source of truth for all color-related data in the project.
 *
 * - `colorMap`      → CSS-variable references (for inline styles)
 * - `hexColorMap`   → Raw hex values (for swatches / canvas)
 * - `colorClassMap` → Tailwind `text-brand-*` classes (for className-based color)
 * - `bgColorClassMap` → Tailwind `bg-brand-*` classes
 * - `colorGroups`   → Detailed specs for documentation display
 */

// ── Token list ────────────────────────────────────────────────────────────────

export const COLOR_TOKENS = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
  "black",
  "white",
] as const

export type ColorToken = (typeof COLOR_TOKENS)[number]

// ── CSS-variable map (used by inline styles) ──────────────────────────────────

export const colorMap: Record<ColorToken, string> = {
  primary:   "var(--brand-primary)",
  secondary: "var(--brand-secondary)",
  info:      "var(--brand-info)",
  success:   "var(--brand-success)",
  warning:   "var(--brand-warning)",
  error:     "var(--brand-error)",
  black:     "var(--brand-black)",
  white:     "var(--brand-white)",
}

// ── Raw hex map (used where a resolved colour value is needed, e.g. swatches) ─

export const hexColorMap: Record<ColorToken, string> = {
  primary:   "#4C9DAE",
  secondary: "#D5E1E9",
  info:      "#d7dded",
  success:   "#27AE60",
  warning:   "#E2B93B",
  error:     "#EB5757",
  black:     "#252525",
  white:     "#FFFFFF",
}

// ── Tailwind text-color class map ─────────────────────────────────────────────

export const colorClassMap: Record<ColorToken, string> = {
  primary:   "text-brand-primary",
  secondary: "text-brand-secondary",
  info:      "text-brand-info",
  success:   "text-brand-success",
  warning:   "text-brand-warning",
  error:     "text-brand-error",
  black:     "text-brand-black",
  white:     "text-brand-white",
}

// ── Tailwind bg-color class map ───────────────────────────────────────────────

export const bgColorClassMap: Record<ColorToken, string> = {
  primary:   "bg-brand-primary",
  secondary: "bg-brand-secondary",
  info:      "bg-brand-info",
  success:   "bg-brand-success",
  warning:   "bg-brand-warning",
  error:     "bg-brand-error",
  black:     "bg-brand-black",
  white:     "bg-brand-white",
}

// ── Foreground text class (readable on the corresponding brand bg) ────────────

export const fgOnBrandBgClass: Record<ColorToken, string> = {
  primary:   "text-white",
  secondary: "text-gray-700",
  info:      "text-gray-700",
  success:   "text-white",
  warning:   "text-white",
  error:     "text-white",
  black:     "text-white",
  white:     "text-gray-700",
}

// ── Tailwind border-color class map ───────────────────────────────────────────

export const borderColorClassMap: Record<ColorToken, string> = {
  primary:   "border-brand-primary",
  secondary: "border-brand-secondary",
  info:      "border-brand-info",
  success:   "border-brand-success",
  warning:   "border-brand-warning",
  error:     "border-brand-error",
  black:     "border-brand-black",
  white:     "border-brand-white",
}

// ── Tailwind fill class map (SVG icons) ───────────────────────────────────────

export const fillColorClassMap: Record<ColorToken, string> = {
  primary:   "fill-brand-primary",
  secondary: "fill-brand-secondary",
  info:      "fill-brand-info",
  success:   "fill-brand-success",
  warning:   "fill-brand-warning",
  error:     "fill-brand-error",
  black:     "fill-brand-black",
  white:     "fill-brand-white",
}

// ── Detailed color spec (used by swatches / palette display) ──────────────────

export interface ColorSpec {
  name: string
  hex: string
  token: ColorToken
  label?: string
  /** Tailwind class for text on top of this background color */
  textClass?: string
}

export interface ColorGroup {
  title: string
  description: string
  colors: ColorSpec[]
}

export const colorGroups: ColorGroup[] = [
  {
    title: "Brand Colors",
    description:
      "Warna identitas utama. Primary untuk CTA dan aksen; Secondary sebagai warna pendukung lembut.",
    colors: [
      { name: "Primary", hex: "#4C9DAE", token: "primary", label: "Brand Primary", textClass: "text-white" },
      { name: "Secondary", hex: "#D5E1E9", token: "secondary", label: "Brand Secondary", textClass: "text-gray-700" },
    ],
  },
  {
    title: "State Colors",
    description:
      "Warna semantik untuk mengkomunikasikan status: info, sukses, peringatan, dan error.",
    colors: [
      { name: "Info", hex: "#d7dded", token: "info", label: "State Info", textClass: "text-gray-700" },
      { name: "Success", hex: "#27AE60", token: "success", label: "State Success", textClass: "text-white" },
      { name: "Warning", hex: "#E2B93B", token: "warning", label: "State Warning", textClass: "text-white" },
      { name: "Error", hex: "#EB5757", token: "error", label: "State Error", textClass: "text-white" },
    ],
  },
  {
    title: "Black & White",
    description:
      "Warna netral dasar untuk teks, latar, dan struktur elemen.",
    colors: [
      { name: "Black Default", hex: "#252525", token: "black", label: "Foreground Default", textClass: "text-white" },
      { name: "White Default", hex: "#FFFFFF", token: "white", label: "Background Default", textClass: "text-gray-400" },
    ],
  },
]
