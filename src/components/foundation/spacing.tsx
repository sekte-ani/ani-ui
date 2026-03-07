import { CodeBlock, FoundationSection } from "../../docs/foundation"


// ── Data ──────────────────────────────────────────────────────────────────────

const SPACING_SCALE = [
  { token: "spacing-1",  value: "8px",   rem: "0.5rem" },
  { token: "spacing-2",  value: "16px",  rem: "1rem" },
  { token: "spacing-3",  value: "24px",  rem: "1.5rem" },
  { token: "spacing-4",  value: "32px",  rem: "2rem" },
  { token: "spacing-5",  value: "40px",  rem: "2.5rem" },
  { token: "spacing-6",  value: "56px",  rem: "3.5rem" },
  { token: "spacing-7",  value: "72px",  rem: "4.5rem" },
  { token: "spacing-8",  value: "80px",  rem: "5rem" },
  { token: "spacing-9",  value: "96px",  rem: "6rem" },
  { token: "spacing-10", value: "120px", rem: "7.5rem" },
]

const SPACING_CODE = `/* ── Spacing tokens ── */
--spacing-1:  8px;    /* 0.5rem  */
--spacing-2:  16px;   /* 1rem    */
--spacing-3:  24px;   /* 1.5rem  */
--spacing-4:  32px;   /* 2rem    */
--spacing-5:  40px;   /* 2.5rem  */
--spacing-6:  56px;   /* 3.5rem  */
--spacing-7:  72px;   /* 4.5rem  */
--spacing-8:  80px;   /* 5rem    */
--spacing-9:  96px;   /* 6rem    */
--spacing-10: 120px;  /* 7.5rem  */`

// ── Export ────────────────────────────────────────────────────────────────────

export function SpacingSection() {
  return (
    <FoundationSection
      id="spacing"
      title="Spacing"
      description="Skala spasi yang digunakan secara konsisten untuk margin, padding, dan gap di seluruh komponen."
    >
      <div className="space-y-2.5">
        {SPACING_SCALE.map((s) => (
          <div key={s.token} className="flex items-center gap-4">
            <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">
              {s.token}
            </span>
            <div
              className="h-5 shrink-0 rounded-sm bg-primary/60"
              style={{ width: s.value }}
            />
            <span className="font-mono text-xs text-foreground">
              {s.value}
              <span className="ml-2 text-muted-foreground">({s.rem})</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="mb-3 text-sm font-semibold">CSS Token Reference</h3>
        <CodeBlock code={SPACING_CODE} />
      </div>
    </FoundationSection>
  )
}
