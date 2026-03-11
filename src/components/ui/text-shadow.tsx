import { CodeBlock, FoundationSection } from "@/docs/foundation"
import { TEXT_SHADOW_SCALE } from "@/components/ui/text-shadow.variants"

// ── Code reference ────────────────────────────────────────────────────────────

const TEXT_SHADOW_CODE = `/* ── Text shadow tokens (CSS custom properties) ── */
--brand-text-shadow-none:    none;
--brand-text-shadow-sm:      0 1px 2px rgb(0 0 0 / 0.15);
--brand-text-shadow-base:    0 1px 3px rgb(0 0 0 / 0.25);
--brand-text-shadow-md:      0 2px 4px rgb(0 0 0 / 0.30);
--brand-text-shadow-lg:      0 3px 6px rgb(0 0 0 / 0.35);
--brand-text-shadow-xl:      0 4px 8px rgb(0 0 0 / 0.40);
--brand-text-shadow-glow:    0 0 8px rgb(76 157 174 / 0.60), 0 0 20px rgb(76 157 174 / 0.30);
--brand-text-shadow-crisp:   1px 1px 0 rgb(0 0 0 / 0.20);
--brand-text-shadow-outline: -1px -1px 0 rgb(0 0 0/0.3), 1px -1px 0 rgb(0 0 0/0.3), ...;

/* Usage: custom Tailwind classes */
<h1 className="text-shadow-brand-lg">Heading with shadow</h1>
<p className="text-shadow-brand-glow text-brand-primary">Glowing text</p>`

// ── Export ────────────────────────────────────────────────────────────────────

export function TextShadowSection() {
  return (
    <FoundationSection
      id="text-shadow"
      title="Text Shadow"
      description="Text shadow tokens untuk memberikan kedalaman visual pada teks. Berbeda dari box-shadow, ini berlaku langsung pada karakter teks."
    >
      {/* Preview grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {TEXT_SHADOW_SCALE.map((s) => (
          <div key={s.token} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/20 p-5">
            {/* Text shadow swatch */}
            <div className="flex h-16 w-full items-center justify-center rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-900">
              <span
                className={`text-2xl font-bold text-white ${s.className}`}
              >
                Aa
              </span>
            </div>
            {/* Label */}
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground">{s.label}</p>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{s.cssVar}</p>
              <p className="mt-1 text-[10px] leading-tight text-muted-foreground">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Value table */}
      <div className="mb-8 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {["Token", "Class", "Value"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TEXT_SHADOW_SCALE.map((s, i) => (
              <tr key={s.token} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                <td className="px-4 py-2.5 font-mono text-xs text-primary">{s.cssVar}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">.{s.className}</td>
                <td className="px-4 py-2.5 font-mono text-[10px] text-muted-foreground leading-relaxed max-w-xs truncate">{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">CSS Token Reference</h3>
        <CodeBlock code={TEXT_SHADOW_CODE} />
      </div>
    </FoundationSection>
  )
}
