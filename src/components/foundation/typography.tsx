import { CodeBlock, FoundationSection } from "../../docs/foundation"


// ── Types ─────────────────────────────────────────────────────────────────────

interface HeadingSpec {
  tag: "h1" | "h2" | "h3" | "h4"
  label: string
  fontSize: number
  lineHeight: number
  fontWeight: number
  example: string
}

interface BodySpec {
  label: string
  fontSize: number
  lineHeight: number
  fontWeight: number
  weightLabel: string
  example: string
}

// ── Heading Data ──────────────────────────────────────────────────────────────

const HEADING_SPECS: HeadingSpec[] = [
  { tag: "h1", label: "Heading 1", fontSize: 56, lineHeight: 61.6, fontWeight: 700, example: "Desain yang Berdampak" },
  { tag: "h2", label: "Heading 2", fontSize: 48, lineHeight: 52.8, fontWeight: 600, example: "Komponen yang Konsisten" },
  { tag: "h3", label: "Heading 3", fontSize: 40, lineHeight: 44, fontWeight: 600, example: "Sistem yang Terstruktur" },
  { tag: "h4", label: "Heading 4", fontSize: 32, lineHeight: 35.2, fontWeight: 500, example: "Antarmuka yang Intuitif" },
]

// ── Body Data ─────────────────────────────────────────────────────────────────

const BODY_SPECS: BodySpec[] = [
  { label: "Large Text Bold", fontSize: 20, lineHeight: 28, fontWeight: 700, weightLabel: "Bold (700)", example: "Teks besar dengan penekanan kuat untuk konten penting." },
  { label: "Large Text Regular", fontSize: 20, lineHeight: 28, fontWeight: 400, weightLabel: "Regular (400)", example: "Teks besar ringan untuk paragraf atau deskripsi utama." },
  { label: "Medium Text Bold", fontSize: 18, lineHeight: 25.2, fontWeight: 700, weightLabel: "Bold (700)", example: "Teks medium tebal untuk label atau highlight sekunder." },
  { label: "Medium Text Regular", fontSize: 18, lineHeight: 25.2, fontWeight: 400, weightLabel: "Regular (400)", example: "Teks medium standar untuk isi konten dan deskripsi." },
  { label: "Normal Text Bold", fontSize: 16, lineHeight: 22.4, fontWeight: 700, weightLabel: "Bold (700)", example: "Teks normal tebal untuk judul item atau sub-label." },
  { label: "Normal Text Regular", fontSize: 16, lineHeight: 22.4, fontWeight: 400, weightLabel: "Regular (400)", example: "Teks normal standar — ukuran dasar antarmuka." },
  { label: "Small Text Bold", fontSize: 14, lineHeight: 19.6, fontWeight: 700, weightLabel: "Bold (700)", example: "Teks kecil tebal untuk caption, badge, atau metadata." },
  { label: "Small Text Regular", fontSize: 14, lineHeight: 19.6, fontWeight: 400, weightLabel: "Regular (400)", example: "Teks kecil ringan untuk hint, placeholder, atau note." },
]

// ── Token Code ────────────────────────────────────────────────────────────────

const TYPOGRAPHY_CODE = `/* Load from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

--font-heading: 'Poppins', sans-serif;
--font-body:    'Poppins', sans-serif;

/* ── Headings ── */
--h1-size: 56px;  --h1-lh: 61.6px; --h1-weight: 700;
--h2-size: 48px;  --h2-lh: 52.8px; --h2-weight: 600;
--h3-size: 40px;  --h3-lh: 44px;   --h3-weight: 600;
--h4-size: 32px;  --h4-lh: 35.2px; --h4-weight: 500;

/* ── Body ── */
--text-lg-size: 20px;  --text-lg-lh: 28px;
--text-md-size: 18px;  --text-md-lh: 25.2px;
--text-nm-size: 16px;  --text-nm-lh: 22.4px;
--text-sm-size: 14px;  --text-sm-lh: 19.6px;
/* Bold = 700 | Regular = 400 */`

// ── Shared table header ───────────────────────────────────────────────────────

function SpecsTableHead() {
  return (
    <thead>
      <tr className="border-b border-border bg-muted/50">
        {["Level", "Font Size", "Line Height", "Weight", "Font Family"].map((h) => (
          <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
            {h}
          </th>
        ))}
      </tr>
    </thead>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────

// id="typography-" matches toId("Typography ") — trailing space → dash
export function TypographySection() {
  return (
    <FoundationSection
      id="typography-"
      title="Typography"
      description="Skala tipografi heading dan body text menggunakan font Poppins dari Google Fonts."
    >
      {/* ── Headings ── */}
      <h3 className="mb-3 text-sm font-semibold text-foreground">Heading</h3>

      <div className="mb-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <SpecsTableHead />
          <tbody>
            {HEADING_SPECS.map((spec, i) => (
              <tr key={spec.tag} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                <td className="px-4 py-2.5 font-mono text-xs font-medium text-foreground">{spec.label}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{spec.fontSize}px</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{spec.lineHeight}px</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{spec.fontWeight}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">Poppins</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Heading live preview */}
      <div className="mb-10 rounded-lg border border-border bg-muted/30 p-8 space-y-6 overflow-hidden">
        {HEADING_SPECS.map((spec) => {
          const Tag = spec.tag
          return (
            <div key={spec.tag} className="flex flex-col gap-1">
              <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                {spec.label} · {spec.fontSize}px / {spec.lineHeight}px · {spec.fontWeight}
              </span>
              <Tag
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: `${spec.fontSize}px`,
                  lineHeight: `${spec.lineHeight}px`,
                  fontWeight: spec.fontWeight,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
                className="text-foreground"
              >
                {spec.example}
              </Tag>
            </div>
          )
        })}
      </div>

      {/* ── Body Texts ── */}
      <h3 className="mb-3 text-sm font-semibold text-foreground">Body Text</h3>

      <div className="mb-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <SpecsTableHead />
          <tbody>
            {BODY_SPECS.map((spec, i) => (
              <tr key={spec.label} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                <td className="px-4 py-2.5 font-mono text-xs font-medium text-foreground">{spec.label}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{spec.fontSize}px</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{spec.lineHeight}px</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{spec.weightLabel}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">Poppins</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Body live preview */}
      <div className="mb-10 rounded-lg border border-border bg-muted/30 p-8 space-y-5 overflow-hidden">
        {BODY_SPECS.map((spec) => (
          <div key={spec.label} className="flex flex-col gap-0.5">
            <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
              {spec.label} · {spec.fontSize}px / {spec.lineHeight}px · {spec.fontWeight}
            </span>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: `${spec.fontSize}px`,
                lineHeight: `${spec.lineHeight}px`,
                fontWeight: spec.fontWeight,
                margin: 0,
              }}
              className="text-foreground"
            >
              {spec.example}
            </p>
          </div>
        ))}
      </div>

      {/* Token reference */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">CSS Token Reference</h3>
        <CodeBlock code={TYPOGRAPHY_CODE} />
      </div>
    </FoundationSection>
  )
}
