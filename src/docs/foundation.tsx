import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { ColorPaletteSection } from "@/components/foundation/color-palette"
import { TypographySection } from "@/components/foundation/typography"
import { SpacingSection } from "@/components/foundation/spacing"
import { BorderRadiusSection } from "@/components/foundation/border-radius"
import { GridSystemSection } from "@/components/foundation/grid-systems"
import { ShadowSection } from "@/components/foundation/shadow"
import { IconStyleSection } from "@/components/foundation/icon-style"

// ── Shared helpers (re-exported for subsection files) ─────────────────────────

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-zinc-950">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 text-zinc-400 hover:text-zinc-100 inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-zinc-800"
      >
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </button>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function FoundationSection({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-8 py-10 border-b border-border last:border-b-0">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

// ── Page-level doc component (mirrors AtomsDoc pattern) ───────────────────────

export function FoundationDoc() {
  return (
    <div>
      <ColorPaletteSection />
      <TypographySection />
      <SpacingSection />
      <BorderRadiusSection />
      <GridSystemSection />
      <ShadowSection />
      <IconStyleSection />
    </div>
  )
}
