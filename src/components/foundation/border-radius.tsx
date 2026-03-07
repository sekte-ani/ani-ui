import { FoundationSection } from "../../docs/foundation"


// ── Data ──────────────────────────────────────────────────────────────────────

const RADIUS_SCALE = [
  { token: "radius-none", value: "0px", label: "None" },
  { token: "radius-sm", value: "4px", label: "Small" },
  { token: "radius-md", value: "8px", label: "Medium" },
  { token: "radius-lg", value: "12px", label: "Large" },
  { token: "radius-xl", value: "16px", label: "X-Large" },
  { token: "radius-2xl", value: "24px", label: "2X-Large" },
  { token: "radius-full", value: "9999px", label: "Full (Pill)" },
]

// ── Export ────────────────────────────────────────────────────────────────────

export function BorderRadiusSection() {
  return (
    <FoundationSection
      id="border-radius"
      title="Border Radius"
      description="Skala kelengkungan sudut yang digunakan pada tombol, kartu, input, dan elemen lainnya."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {RADIUS_SCALE.map((r) => (
          <div key={r.token} className="flex flex-col items-center gap-3 text-center">
            <div
              className="h-16 w-16 border-2 border-primary/50 bg-primary/10"
              style={{ borderRadius: r.value }}
            />
            <div>
              <p className="text-xs font-semibold text-foreground">{r.label}</p>
              <p className="font-mono text-[11px] text-muted-foreground">{r.value}</p>
            </div>
          </div>
        ))}
      </div>
    </FoundationSection>
  )
}
