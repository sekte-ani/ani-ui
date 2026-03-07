import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { CodeBlock, FoundationSection } from "../../docs/foundation"


// ── Interfaces ────────────────────────────────────────────────────────────────

interface ColorToken {
  name: string
  hex: string
  label?: string
  textClass?: string
}

// ── Color Swatch ──────────────────────────────────────────────────────────────

function ColorSwatch({ name, hex, label, textClass = "text-white" }: ColorToken) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border transition-all duration-200 hover:scale-[1.03] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      title={`Copy ${hex}`}
    >
      <div
        className="relative flex h-24 w-full items-center justify-center"
        style={{ backgroundColor: hex }}
      >
        <span
          className={`transition-opacity duration-150 ${copied ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } ${textClass}`}
        >
          {copied ? <CheckIcon className="size-5" /> : <CopyIcon className="size-5" />}
        </span>
      </div>
      <div className="flex flex-col gap-0.5 bg-background px-3 py-2.5 text-left">
        <span className="text-xs font-semibold text-foreground">{name}</span>
        {label && (
          <span className="text-[10px] leading-tight text-muted-foreground">{label}</span>
        )}
        <span className="mt-0.5 font-mono text-[11px] text-muted-foreground">
          {copied ? "Disalin!" : hex}
        </span>
      </div>
    </button>
  )
}

// ── Color Sub-Group ───────────────────────────────────────────────────────────

function ColorGroup({
  title,
  description,
  colors,
}: {
  title: string
  description: string
  colors: ColorToken[]
}) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mb-4 text-xs text-muted-foreground">{description}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {colors.map((color) => (
          <ColorSwatch key={color.hex} {...color} />
        ))}
      </div>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const BRAND_COLORS: ColorToken[] = [
  { name: "Primary", hex: "#4C9DAE", label: "Brand Primary", textClass: "text-white" },
  { name: "Secondary", hex: "#D5E1E9", label: "Brand Secondary", textClass: "text-gray-700" },
]

const STATE_COLORS: ColorToken[] = [
  { name: "Info", hex: "#d7dded", label: "State Info", textClass: "text-gray-700" },
  { name: "Success", hex: "#27AE60", label: "State Success", textClass: "text-white" },
  { name: "Warning", hex: "#E2B93B", label: "State Warning", textClass: "text-white" },
  { name: "Error", hex: "#EB5757", label: "State Error", textClass: "text-white" },
]

const NEUTRAL_COLORS: ColorToken[] = [
  { name: "Black Default", hex: "#252525", label: "Foreground Default", textClass: "text-white" },
  { name: "White Default", hex: "#FFFFFF", label: "Background Default", textClass: "text-gray-400" },
]

const TOKEN_CODE = `/* ── Brand Colors ── */
--color-primary:   #4C9DAE;
--color-secondary: #D5E1E9;

/* ── State Colors ── */
--color-info:    #d7dded;
--color-success: #27AE60;
--color-warning: #E2B93B;
--color-error:   #EB5757;

/* ── Neutral Colors ── */
--color-black: #252525;
--color-white: #FFFFFF;`

// ── Export ────────────────────────────────────────────────────────────────────

export function ColorPaletteSection() {
  return (
    <FoundationSection
      id="color-palette"
      title="Color Palette"
      description="Token warna brand, status, dan netral. Klik swatch untuk menyalin nilai hex."
    >
      <ColorGroup
        title="Brand Colors"
        description="Warna identitas utama. Primary untuk CTA dan aksen; Secondary sebagai warna pendukung lembut."
        colors={BRAND_COLORS}
      />
      <ColorGroup
        title="State Colors"
        description="Warna semantik untuk mengkomunikasikan status: info, sukses, peringatan, dan error."
        colors={STATE_COLORS}
      />
      <ColorGroup
        title="Black & White"
        description="Warna netral dasar untuk teks, latar, dan struktur elemen."
        colors={NEUTRAL_COLORS}
      />
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">CSS Token Reference</h3>
        <CodeBlock code={TOKEN_CODE} />
      </div>
    </FoundationSection>
  )
}
