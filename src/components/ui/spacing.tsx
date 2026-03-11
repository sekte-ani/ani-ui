import { cn } from "@/lib/utils"
import {
  spacingScale,
  spacingSpecs,
  type SpacingSpec,
  type SpacingToken,
} from "@/components/ui/spacing.variants"

// ── Spacing Bar (single token visualiser) ─────────────────────────────────────

export interface SpacingBarProps {
  token: SpacingToken
  className?: string
}

export function SpacingBar({ token, className }: SpacingBarProps) {
  const value = spacingScale[token]
  const spec = spacingSpecs.find((s) => s.token === token)

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">
        {token}
      </span>
      <div
        className="h-5 shrink-0 rounded-sm bg-primary/60"
        style={{ width: value }}
      />
      <span className="font-mono text-xs text-foreground">
        {value}
        {spec && (
          <span className="ml-2 text-muted-foreground">({spec.rem})</span>
        )}
      </span>
    </div>
  )
}

// ── Spacing Scale (renders all tokens) ────────────────────────────────────────

export interface SpacingScaleProps {
  specs?: SpacingSpec[]
  className?: string
}

export function SpacingScale({
  specs = spacingSpecs,
  className,
}: SpacingScaleProps) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {specs.map((s) => (
        <SpacingBar key={s.token} token={s.token} />
      ))}
    </div>
  )
}

// Re-export variants for convenience
export { spacingScale, spacingSpecs, type SpacingToken, type SpacingSpec }
