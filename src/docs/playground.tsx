import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { hexColorMap, colorClassMap, bgColorClassMap, COLOR_TOKENS, type ColorToken } from "@/components/ui/color-palette.variants"
import { type TrackingToken } from "@/components/ui/spacing.variants"
import { SHADOW_TOKENS, shadowClassMap, type ShadowToken } from "@/components/ui/shadow.variants"
import { RADIUS_TOKENS, radiusClassMap, type RadiusToken } from "@/components/ui/border-radius.variants"
import { TEXT_SHADOW_TOKENS, textShadowClassMap, type TextShadowToken } from "@/components/ui/text-shadow.variants"
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  LargeText,
  MediumText,
  Text,
  SmallText,
} from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// ── Typography Constants ──────────────────────────────────────────────────────

const TYPOGRAPHY_COMPONENTS = [
  "Heading1",
  "Heading2",
  "Heading3",
  "Heading4",
  "LargeText",
  "MediumText",
  "Text",
  "SmallText",
] as const

type TypographyComponentName = (typeof TYPOGRAPHY_COMPONENTS)[number]

const COMPONENT_MAP: Record<TypographyComponentName, React.ElementType> = {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  LargeText,
  MediumText,
  Text,
  SmallText,
}

const HEADING_NAMES = new Set(["Heading1", "Heading2", "Heading3", "Heading4"])

const COLOR_OPTIONS: (ColorToken | "none")[] = ["none", ...COLOR_TOKENS]

const WEIGHT_OPTIONS = ["regular", "bold"] as const

const TRACKING_OPTIONS: TrackingToken[] = [
  "tighter",
  "tight",
  "normal",
  "wide",
  "wider",
  "widest",
]

const SHADOW_OPTIONS: (ShadowToken | "none")[] = ["none", ...SHADOW_TOKENS]

const RADIUS_OPTIONS: (RadiusToken | "none")[] = [...RADIUS_TOKENS]

const TEXT_SHADOW_OPTIONS: (TextShadowToken | "none")[] = [...TEXT_SHADOW_TOKENS]

const DEFAULT_TEXTS: Record<TypographyComponentName, string> = {
  Heading1: "the quick brown fox jumps over the lazy dog",
  Heading2: "the quick brown fox jumps over the lazy dog",
  Heading3: "the quick brown fox jumps over the lazy dog",
  Heading4: "the quick brown fox jumps over the lazy dog",
  LargeText: "the quick brown fox jumps over the lazy dog",
  MediumText: "the quick brown fox jumps over the lazy dog",
  Text: "the quick brown fox jumps over the lazy dog",
  SmallText: "the quick brown fox jumps over the lazy dog",
}

// ── Element Playground Constants ──────────────────────────────────────────────

const ELEMENT_TAGS = ["div", "button"] as const
type ElementTag = (typeof ELEMENT_TAGS)[number]

const PADDING_OPTIONS = ["p-0", "p-2", "p-4", "p-6", "p-8", "p-10", "p-12"] as const
type PaddingOption = (typeof PADDING_OPTIONS)[number]

// ── Typography code generator ─────────────────────────────────────────────────

function generateTypographyCode(
  component: TypographyComponentName,
  text: string,
  color: ColorToken | "none",
  weight: "regular" | "bold",
  tracking: TrackingToken,
  shadow: ShadowToken | "none",
  textShadow: TextShadowToken | "none"
) {
  const isHeading = HEADING_NAMES.has(component)
  const defaultTracking = isHeading ? "tight" : "normal"

  const propsArr: string[] = []
  if (color !== "none") propsArr.push(`color="${color}"`)
  if (!isHeading && weight !== "regular")
    propsArr.push(`weight="${weight}"`)
  if (tracking !== defaultTracking)
    propsArr.push(`tracking="${tracking}"`)

  const classArr: string[] = []
  if (shadow !== "none") classArr.push(shadowClassMap[shadow])
  if (textShadow !== "none") classArr.push(textShadowClassMap[textShadow])

  if (classArr.length > 0) {
    propsArr.push(`className="${classArr.join(" ")}"`)
  }

  const propsStr = propsArr.length > 0 ? " " + propsArr.join(" ") : ""

  let code = `import { ${component} } from "@/components/ui/typography"

<${component}${propsStr}>${text}</${component}>`

  if (color !== "none") {
    const twClass = [
      colorClassMap[color],
      shadow !== "none" ? shadowClassMap[shadow] : "",
      textShadow !== "none" ? textShadowClassMap[textShadow] : "",
    ].filter(Boolean).join(" ")
    code += `\n\n// Or use Tailwind classes on any HTML element\n<p className="${twClass}">${text}</p>`
  }

  return code
}

// ── Element code generator ────────────────────────────────────────────────────

function generateElementCode(
  tag: ElementTag,
  textColor: ColorToken | "none",
  bgColor: ColorToken | "none",
  radius: RadiusToken | "none",
  shadow: ShadowToken | "none",
  textShadow: TextShadowToken | "none",
  padding: PaddingOption,
  text: string
) {
  const classes: string[] = []

  if (padding !== "p-0") classes.push(padding)
  if (textColor !== "none") classes.push(colorClassMap[textColor])
  if (bgColor !== "none") classes.push(bgColorClassMap[bgColor])
  if (radius !== "none") classes.push(radiusClassMap[radius])
  if (shadow !== "none") classes.push(shadowClassMap[shadow])
  if (textShadow !== "none") classes.push(textShadowClassMap[textShadow])

  const classStr = classes.length > 0 ? ` className="${classes.join(" ")}"` : ""

  return `<${tag}${classStr}>${text}</${tag}>`
}

// ── CodeBlock (local) ─────────────────────────────────────────────────────────

function PlaygroundCodeBlock({ code }: { code: string }) {
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
        {copied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </button>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// ── Pill selector ─────────────────────────────────────────────────────────────

function PillSelect<T extends string>({
  label,
  options,
  value,
  onChange,
  renderOption,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
  renderOption?: (o: T) => React.ReactNode
}) {
  return (
    <div>
      <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
              value === o
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {renderOption ? renderOption(o) : o}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Color pill renderer (shared) ──────────────────────────────────────────────

function renderColorOption(o: ColorToken | "none") {
  if (o === "none") return "none"
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="inline-block size-2.5 rounded-full border border-border/50"
        style={{ backgroundColor: hexColorMap[o] }}
      />
      {o}
    </span>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Typography Playground ─────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

function TypographyPlayground() {
  const [component, setComponent] =
    useState<TypographyComponentName>("Heading1")
  const [color, setColor] = useState<ColorToken | "none">("none")
  const [weight, setWeight] = useState<"regular" | "bold">("regular")
  const [tracking, setTracking] = useState<TrackingToken>("tight")
  const [shadow, setShadow] = useState<ShadowToken | "none">("none")
  const [textShadow, setTextShadow] = useState<TextShadowToken | "none">("none")
  const [text, setText] = useState(DEFAULT_TEXTS["Heading1"])

  const isHeading = HEADING_NAMES.has(component)
  const Tag = COMPONENT_MAP[component]
  const code = generateTypographyCode(component, text, color, weight, tracking, shadow, textShadow)

  return (
    <section id="playground" className="scroll-mt-8 py-10 border-b border-border last:border-b-0">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Typography Playground</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Coba komponen typography secara interaktif. Pilih komponen, atur props, dan lihat hasilnya secara langsung.
            </p>
          </div>
          <Badge variant="outline" className="mt-1 shrink-0 font-mono text-xs">
            Interactive
          </Badge>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        {/* Component selector */}
        <PillSelect
          label="Component"
          options={TYPOGRAPHY_COMPONENTS}
          value={component}
          onChange={setComponent}
        />

        {/* Color selector */}
        <PillSelect
          label="Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />

        {/* Weight selector (body text only) */}
        {!isHeading && (
          <PillSelect
            label="Weight"
            options={WEIGHT_OPTIONS}
            value={weight}
            onChange={setWeight}
          />
        )}

        {/* Tracking (letter-spacing) selector */}
        <PillSelect
          label="Tracking (Letter Spacing)"
          options={TRACKING_OPTIONS}
          value={tracking}
          onChange={setTracking}
        />

        {/* Shadow (box-shadow) selector */}
        <PillSelect
          label="Box Shadow"
          options={SHADOW_OPTIONS}
          value={shadow}
          onChange={setShadow}
        />

        {/* Text shadow selector */}
        <PillSelect
          label="Text Shadow"
          options={TEXT_SHADOW_OPTIONS}
          value={textShadow}
          onChange={setTextShadow}
        />

        {/* Custom text input */}
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Teks
          </span>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ketik teks contoh..."
            className="max-w-lg"
          />
        </div>
      </div>

      {/* ── Live Preview ── */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Preview</h3>
        <div className="flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8 overflow-hidden">
          <Tag
            {...(color !== "none" ? { color } : {})}
            {...(!isHeading ? { weight } : {})}
            tracking={tracking}
            className={cn(
              color === "none" && "text-foreground",
              shadow !== "none" && shadowClassMap[shadow],
              textShadow !== "none" && textShadowClassMap[textShadow],
              "break-all"
            )}
          >
            {text || "..."}
          </Tag>
        </div>
      </div>

      {/* ── Generated Code ── */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Element Playground ────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

function ElementPlayground() {
  const [tag, setTag] = useState<ElementTag>("div")
  const [textColor, setTextColor] = useState<ColorToken | "none">("white")
  const [bgColor, setBgColor] = useState<ColorToken | "none">("primary")
  const [radius, setRadius] = useState<RadiusToken | "none">("lg")
  const [shadow, setShadow] = useState<ShadowToken | "none">("lg")
  const [textShadow, setTextShadow] = useState<TextShadowToken | "none">("none")
  const [padding, setPadding] = useState<PaddingOption>("p-6")
  const [text, setText] = useState("the quick brown fox jumps over the lazy dog")

  const code = generateElementCode(tag, textColor, bgColor, radius, shadow, textShadow, padding, text)

  // Build dynamic classes for the preview element
  const previewClasses = cn(
    padding,
    textColor !== "none" && colorClassMap[textColor],
    bgColor !== "none" && bgColorClassMap[bgColor],
    radius !== "none" && radiusClassMap[radius],
    shadow !== "none" && shadowClassMap[shadow],
    textShadow !== "none" && textShadowClassMap[textShadow],
    "font-medium transition-all duration-300"
  )

  const PreviewTag = tag

  return (
    <section id="element-playground" className="scroll-mt-8 py-10 border-b border-border last:border-b-0">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Element Playground</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Kombinasikan brand color, border-radius, dan shadow pada elemen HTML standar seperti div dan button.
            </p>
          </div>
          <Badge variant="outline" className="mt-1 shrink-0 font-mono text-xs">
            Interactive
          </Badge>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        {/* Tag selector */}
        <PillSelect
          label="Element"
          options={ELEMENT_TAGS}
          value={tag}
          onChange={setTag}
        />

        {/* Text color selector */}
        <PillSelect
          label="Text Color"
          options={COLOR_OPTIONS}
          value={textColor}
          onChange={setTextColor}
          renderOption={renderColorOption}
        />

        {/* Background color selector */}
        <PillSelect
          label="Background Color"
          options={COLOR_OPTIONS}
          value={bgColor}
          onChange={setBgColor}
          renderOption={renderColorOption}
        />

        {/* Border radius selector */}
        <PillSelect
          label="Border Radius"
          options={RADIUS_OPTIONS}
          value={radius}
          onChange={setRadius}
        />

        {/* Shadow (box-shadow) selector */}
        <PillSelect
          label="Box Shadow"
          options={SHADOW_OPTIONS}
          value={shadow}
          onChange={setShadow}
        />

        {/* Text shadow selector */}
        <PillSelect
          label="Text Shadow"
          options={TEXT_SHADOW_OPTIONS}
          value={textShadow}
          onChange={setTextShadow}
        />

        {/* Padding selector */}
        <PillSelect
          label="Padding"
          options={PADDING_OPTIONS}
          value={padding}
          onChange={setPadding}
        />

        {/* Custom text input */}
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Teks
          </span>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ketik teks contoh..."
            className="max-w-lg"
          />
        </div>
      </div>

      {/* ── Live Preview ── */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Preview</h3>
        <div className="flex min-h-40 items-center justify-center rounded-lg border border-border bg-muted/30 p-10">
          <PreviewTag className={previewClasses}>
            {text || "..."}
          </PreviewTag>
        </div>
      </div>

      {/* ── Generated Code ── */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>

      {/* ── Token Reference ── */}
      <div className="mt-6 rounded-lg border border-border bg-muted/20 p-6">
        <h3 className="mb-4 text-sm font-semibold">Available Brand Tokens</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Color</p>
            <div className="space-y-1 text-xs font-mono text-muted-foreground">
              <p>text-brand-<span className="text-foreground">{'{'}<em>token</em>{'}'}</span></p>
              <p>bg-brand-<span className="text-foreground">{'{'}<em>token</em>{'}'}</span></p>
              <p>border-brand-<span className="text-foreground">{'{'}<em>token</em>{'}'}</span></p>
              <p className="pt-1 text-[10px]">primary · secondary · info · success · warning · error · black · white</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Border Radius</p>
            <div className="space-y-1 text-xs font-mono text-muted-foreground">
              <p>rounded-brand-<span className="text-foreground">{'{'}<em>token</em>{'}'}</span></p>
              <p className="pt-1 text-[10px]">none · sm · md · lg · xl · 2xl · full</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Box Shadow</p>
            <div className="space-y-1 text-xs font-mono text-muted-foreground">
              <p>shadow-brand-<span className="text-foreground">{'{'}<em>token</em>{'}'}</span></p>
              <p className="pt-1 text-[10px]">xs · sm · base · md · lg · xl · 2xl · inner</p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Text Shadow</p>
            <div className="space-y-1 text-xs font-mono text-muted-foreground">
              <p>text-shadow-brand-<span className="text-foreground">{'{'}<em>token</em>{'}'}</span></p>
              <p className="pt-1 text-[10px]">none · sm · base · md · lg · xl · glow · crisp · outline</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Main Export ───────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

export function PlaygroundDoc() {
  return (
    <div>
      <TypographyPlayground />
      <ElementPlayground />
    </div>
  )
}
