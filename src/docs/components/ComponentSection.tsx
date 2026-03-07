import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PropRow {
  prop: string
  type: string
  default: string
  description: string
}

interface ComponentSectionProps {
  title: string
  description: string
  baseComponent: string
  props?: PropRow[]
  code: string
  children?: React.ReactNode
}

export function ComponentSection({
  title,
  description,
  baseComponent,
  props = [],
  code,
  children,
}: ComponentSectionProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const sectionId = title.toLowerCase().replace(/\s+/g, "-")

  return (
    <section id={sectionId} className="scroll-mt-8 py-10 border-b border-border last:border-b-0">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <Badge variant="outline" className="mt-1 shrink-0 font-mono text-xs">
          {baseComponent}
        </Badge>
      </div>

      {/* Live preview */}
      {children && (
        <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
          {children}
        </div>
      )}

      {/* Props table */}
      {props.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold">Props</h3>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Prop</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Tipe</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Default</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {props.map((row, i) => (
                  <tr
                    key={row.prop}
                    className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}
                  >
                    <td className="px-4 py-2.5 font-mono text-xs text-foreground">
                      {row.prop}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                      {row.type}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                      {row.default || "—"}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Code block */}
      <div className="relative mt-6">
        <h3 className="mb-3 text-sm font-semibold">Penggunaan</h3>
        <div className="group relative overflow-hidden rounded-lg border border-border bg-zinc-950">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopy}
            className="absolute top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
          >
            {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
          </Button>
          <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-zinc-300">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
