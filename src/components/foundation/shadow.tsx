import { CodeBlock, FoundationSection } from "../../docs/foundation"

// ── Data ──────────────────────────────────────────────────────────────────────

const SHADOWS = [
  { token: "--shadow-xs",  label: "XS",     class: "shadow-xs",  value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  { token: "--shadow-sm",  label: "SM",     class: "shadow-sm",  value: "0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10)" },
  { token: "--shadow",     label: "Base",   class: "shadow",     value: "0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)" },
  { token: "--shadow-md",  label: "MD",     class: "shadow-md",  value: "0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)" },
  { token: "--shadow-lg",  label: "LG",     class: "shadow-lg",  value: "0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10)" },
  { token: "--shadow-xl",  label: "XL",     class: "shadow-xl",  value: "0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10)" },
  { token: "--shadow-2xl", label: "2XL",    class: "shadow-2xl", value: "0 25px 50px -12px rgb(0 0 0 / 0.25)" },
  { token: "--shadow-inner",label: "Inner", class: "shadow-inner",value: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" },
]

const SHADOW_CODE = `/* ── Shadow tokens ── */
--shadow-xs:    0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm:    0 1px 3px 0 rgb(0 0 0 / 0.10), 0 1px 2px -1px rgb(0 0 0 / 0.10);
--shadow:       0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10);
--shadow-md:    0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10);
--shadow-lg:    0 10px 15px -3px rgb(0 0 0 / 0.10), 0 4px 6px -4px rgb(0 0 0 / 0.10);
--shadow-xl:    0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.10);
--shadow-2xl:   0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);`

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
        {SHADOWS.map((s) => (
          <div key={s.token} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/20 p-5">
            {/* Shadow swatch */}
            <div
              className={`h-14 w-14 rounded-xl bg-background border border-border/40 ${s.class}`}
            />
            {/* Label */}
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground">{s.label}</p>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{s.token}</p>
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
            {SHADOWS.map((s, i) => (
              <tr key={s.token} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                <td className="px-4 py-2.5 font-mono text-xs text-primary">{s.token}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">.{s.class}</td>
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
