/**
 * Shared brand-color → Tailwind class mappings.
 *
 * Used by atom components that accept a `color?: ColorToken` prop
 * to apply the design-system brand palette.
 */

import { type ColorToken } from "./color-palette.variants"

// ── Background class ──────────────────────────────────────────────────────────

export const brandBgClass: Record<ColorToken, string> = {
  primary:   "bg-brand-primary",
  secondary: "bg-brand-secondary",
  info:      "bg-brand-info",
  success:   "bg-brand-success",
  warning:   "bg-brand-warning",
  error:     "bg-brand-error",
  black:     "bg-brand-black",
  white:     "bg-brand-white",
}

// ── Foreground text class (readable on the corresponding bg) ──────────────────

export const brandFgClass: Record<ColorToken, string> = {
  primary:   "text-white",
  secondary: "text-gray-700",
  info:      "text-gray-700",
  success:   "text-white",
  warning:   "text-white",
  error:     "text-white",
  black:     "text-white",
  white:     "text-gray-700",
}

// ── Text color class ──────────────────────────────────────────────────────────

export const brandTextClass: Record<ColorToken, string> = {
  primary:   "text-brand-primary",
  secondary: "text-brand-secondary",
  info:      "text-brand-info",
  success:   "text-brand-success",
  warning:   "text-brand-warning",
  error:     "text-brand-error",
  black:     "text-brand-black",
  white:     "text-brand-white",
}

// ── Border color class ────────────────────────────────────────────────────────

export const brandBorderClass: Record<ColorToken, string> = {
  primary:   "border-brand-primary",
  secondary: "border-brand-secondary",
  info:      "border-brand-info",
  success:   "border-brand-success",
  warning:   "border-brand-warning",
  error:     "border-brand-error",
  black:     "border-brand-black",
  white:     "border-brand-white",
}

// ── SVG fill class ────────────────────────────────────────────────────────────

export const brandFillClass: Record<ColorToken, string> = {
  primary:   "fill-brand-primary",
  secondary: "fill-brand-secondary",
  info:      "fill-brand-info",
  success:   "fill-brand-success",
  warning:   "fill-brand-warning",
  error:     "fill-brand-error",
  black:     "fill-brand-black",
  white:     "fill-brand-white",
}
