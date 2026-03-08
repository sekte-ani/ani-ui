import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  colorGroups,
  type ColorSpec,
  type ColorGroup as ColorGroupType,
} from "@/components/ui/color-palette.variants"

// ── Color Swatch ──────────────────────────────────────────────────────────────

export interface ColorSwatchProps {
  name: string
  hex: string
  label?: string
  textClass?: string
  className?: string
}

export function ColorSwatch({
  name,
  hex,
  label,
  textClass = "text-white",
  className,
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border transition-all duration-200 hover:scale-[1.03] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      title={`Copy ${hex}`}
    >
      <div
        className="relative flex h-24 w-full items-center justify-center"
        style={{ backgroundColor: hex }}
      >
        <span
          className={`transition-opacity duration-150 ${
            copied
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          } ${textClass}`}
        >
          {copied ? (
            <CheckIcon className="size-5" />
          ) : (
            <CopyIcon className="size-5" />
          )}
        </span>
      </div>
      <div className="flex flex-col gap-0.5 bg-background px-3 py-2.5 text-left">
        <span className="text-xs font-semibold text-foreground">{name}</span>
        {label && (
          <span className="text-[10px] leading-tight text-muted-foreground">
            {label}
          </span>
        )}
        <span className="mt-0.5 font-mono text-[11px] text-muted-foreground">
          {copied ? "Disalin!" : hex}
        </span>
      </div>
    </button>
  )
}

// ── Color Group ───────────────────────────────────────────────────────────────

export interface ColorGroupProps {
  title: string
  description: string
  colors: ColorSpec[]
  className?: string
}

export function ColorGroup({
  title,
  description,
  colors,
  className,
}: ColorGroupProps) {
  return (
    <div className={cn("mb-8 last:mb-0", className)}>
      <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mb-4 text-xs text-muted-foreground">{description}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {colors.map((color) => (
          <ColorSwatch key={color.hex} {...color} />
        ))}
      </div>
    </div>
  )
}

// ── Full Palette (renders all groups from variants) ───────────────────────────

export interface ColorPaletteProps {
  groups?: ColorGroupType[]
  className?: string
}

export function ColorPalette({
  groups = colorGroups,
  className,
}: ColorPaletteProps) {
  return (
    <div className={className}>
      {groups.map((group) => (
        <ColorGroup key={group.title} {...group} />
      ))}
    </div>
  )
}
