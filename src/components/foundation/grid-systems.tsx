import { CodeBlock, FoundationSection } from "../../docs/foundation"


// ── Types ─────────────────────────────────────────────────────────────────────

interface GridSpec {
  breakpoint: string
  label: string
  frame: string
  columns: number
  columnWidth: number
  gutterWidth: number
}

// ── Data ──────────────────────────────────────────────────────────────────────

const GRID_SPECS: GridSpec[] = [
  { breakpoint: "Desktop HD", label: "DESKTOP HD", frame: "Desktop 1440", columns: 12, columnWidth: 65, gutterWidth: 30 },
  { breakpoint: "Desktop", label: "DESKTOP", frame: "Desktop 1024", columns: 12, columnWidth: 50, gutterWidth: 30 },
  { breakpoint: "Tablet", label: "TABLET", frame: "Tablet 768", columns: 6, columnWidth: 88, gutterWidth: 30 },
  { breakpoint: "Mobile", label: "MOBILE", frame: "Mobile 320", columns: 2, columnWidth: 130, gutterWidth: 30 },
]

const GRID_CODE = `/* ── Grid System tokens ── */

/* Desktop HD — 1440px */
--grid-hd-columns:      12;
--grid-hd-column-width: 65px;
--grid-hd-gutter:       30px;

/* Desktop — 1024px */
--grid-desktop-columns:      12;
--grid-desktop-column-width: 50px;
--grid-desktop-gutter:       30px;

/* Tablet — 768px */
--grid-tablet-columns:      6;
--grid-tablet-column-width: 88px;
--grid-tablet-gutter:       30px;

/* Mobile — 320px */
--grid-mobile-columns:      2;
--grid-mobile-column-width: 130px;
--grid-mobile-gutter:       30px;`

// ── Device Card ───────────────────────────────────────────────────────────────

function GridDeviceCard({ spec }: { spec: GridSpec }) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Label + illustration area */}
      <div className="flex flex-col px-5 pt-5 pb-4 bg-card gap-2 min-h-[100px]">
        <span className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
          {spec.label}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-border mx-5" />

      {/* Specs */}
      <div className="flex flex-col gap-3 px-5 py-5">
        <h4 className="text-sm font-semibold text-foreground">Grid Options</h4>
        <div className="flex flex-col gap-2">
          {[
            { label: "Frame:", value: spec.frame },
            { label: "Number of columns:", value: String(spec.columns) },
            { label: "Column width:", value: `${spec.columnWidth} px` },
            { label: "Gutter width:", value: `${spec.gutterWidth} px` },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-muted-foreground leading-tight">{label}</p>
              <p className="text-sm font-bold text-foreground leading-tight">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────

export function GridSystemSection() {
  return (
    <FoundationSection
      id="grid-system"
      title="Grid System"
      description="Sistem grid responsif mendefinisikan jumlah kolom, lebar kolom, dan gutter untuk setiap breakpoint."
    >
      {/* Device cards grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {GRID_SPECS.map(spec => (
          <GridDeviceCard key={spec.breakpoint} spec={spec} />
        ))}
      </div>

      {/* CSS Token Reference */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">CSS Token Reference</h3>
        <CodeBlock code={GRID_CODE} />
      </div>
    </FoundationSection>
  )
}
