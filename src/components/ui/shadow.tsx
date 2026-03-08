import { CodeBlock, FoundationSection } from "@/docs/foundation"
import { SHADOW_SCALE } from "@/components/ui/shadow.variants"

// ── Code reference ────────────────────────────────────────────────────────────

const SHADOW_CODE = `/* ── Shadow tokens (CSS custom properties) ── */
--brand-shadow-xs:    0 1px 2px 0 rgb(0 0 0 / 0.05);
--brand-shadow-sm:    0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10);
--brand-shadow-base:  0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10);
--brand-shadow-md:    0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10);
--brand-shadow-lg:    0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10);
--brand-shadow-xl:    0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10);
--brand-shadow-2xl:   0 25px 50px -12px rgb(0 0 0 / 0.25);
--brand-shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

/* Usage: Tailwind classes */
<div className="shadow-brand-lg">...</div>
<div className="shadow-brand-xl">...</div>`

// ── Export ────────────────────────────────────────────────────────────────────

export function ShadowSection() {
  return (
    <FoundationSection
      id="shadow"
      title="Shadow"
      description="Elevation tokens mendefinisikan kedalaman visual elemen menggunakan box-shadow."
    >
      {/* Preview grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SHADOW_SCALE.map((s) => (
          <div key={s.token} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/20 p-5">
            {/* Shadow swatch */}
            <div
              className={`h-14 w-14 rounded-xl bg-background border border-border/40 ${s.tailwindClass}`}
            />
            {/* Label */}
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground">{s.label}</p>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{s.cssVar}</p>
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
            {SHADOW_SCALE.map((s, i) => (
              <tr key={s.token} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                <td className="px-4 py-2.5 font-mono text-xs text-primary">{s.cssVar}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">.{s.tailwindClass}</td>
                <td className="px-4 py-2.5 font-mono text-[10px] text-muted-foreground leading-relaxed">{s.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">CSS Token Reference</h3>
        <CodeBlock code={SHADOW_CODE} />
      </div>
    </FoundationSection>
  )
}
