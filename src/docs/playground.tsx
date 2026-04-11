import { useState, useMemo } from "react"
import { CheckIcon, CopyIcon, BoldIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { hexColorMap, colorClassMap, bgColorClassMap, COLOR_TOKENS, type ColorToken } from "@/components/ui/color-palette.variants"
import { type TrackingToken } from "@/components/ui/spacing.variants"
import { SHADOW_TOKENS, shadowClassMap, type ShadowToken } from "@/components/ui/shadow.variants"
import { RADIUS_TOKENS, radiusClassMap, type RadiusToken } from "@/components/ui/border-radius.variants"
import { TEXT_SHADOW_TOKENS, textShadowClassMap, type TextShadowToken } from "@/components/ui/text-shadow.variants"
import { DataTable, type ColumnType } from "@/components/organism/data-table"
import { Badge } from "@/components/ui/badge"
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
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Toggle } from "@/components/ui/toggle"

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
// ── Atoms Playground ──────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

const BUTTON_VARIANTS = ["default", "secondary", "outline", "ghost", "link", "destructive"] as const
const BADGE_VARIANTS  = ["default", "secondary", "outline", "ghost", "link", "destructive"] as const

function AtomsPlayground() {
  const [color, setColor] = useState<ColorToken | "none">("none")
  const [buttonVariant, setButtonVariant] = useState<(typeof BUTTON_VARIANTS)[number]>("default")
  const [badgeVariant, setBadgeVariant]   = useState<(typeof BADGE_VARIANTS)[number]>("default")

  // ── derived values ──
  const colorProp = color !== "none" ? color : undefined
  const colorAttr = color !== "none" ? ` color="${color}"` : ""
  const bv = buttonVariant
  const bav = badgeVariant

  const snippets = {
    button: `import { Button } from "@/components/ui/button"

<Button${colorAttr}${bv !== "default" ? ` variant="${bv}"` : ""}>Click me</Button>
<Button${colorAttr}${bv !== "default" ? ` variant="${bv}"` : ""} size="sm">Small</Button>
<Button${colorAttr}${bv !== "default" ? ` variant="${bv}"` : ""} size="lg">Large</Button>`,

    badge: `import { Badge } from "@/components/ui/badge"

<Badge${colorAttr}${bav !== "default" ? ` variant="${bav}"` : ""}>Label</Badge>`,

    label: `import { Label } from "@/components/ui/label"

<Label${colorAttr}>Form field label</Label>`,

    checkbox: `import { Checkbox } from "@/components/ui/checkbox"

<Checkbox${colorAttr} defaultChecked />
<Checkbox${colorAttr} />`,

    switch_: `import { Switch } from "@/components/ui/switch"

<Switch${colorAttr} defaultChecked />
<Switch${colorAttr} size="sm" defaultChecked />`,

    toggle: `import { Toggle } from "@/components/ui/toggle"

<Toggle${colorAttr} defaultPressed>
  <BoldIcon />
</Toggle>
<Toggle${colorAttr} variant="outline">
  <BoldIcon />
</Toggle>`,

    slider: `import { Slider } from "@/components/ui/slider"

<Slider${colorAttr} defaultValue={[40]} max={100} />
<Slider${colorAttr} defaultValue={[20, 70]} max={100} />`,

    spinner: `import { Spinner } from "@/components/ui/spinner"

<Spinner${colorAttr} />
<Spinner${colorAttr} className="size-6" />
<Spinner${colorAttr} className="size-8" />`,

    kbd: `import { Kbd } from "@/components/ui/kbd"

<Kbd${colorAttr}>⌘</Kbd>
<Kbd${colorAttr}>K</Kbd>`,

    radioGroup: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="opt-a">
  <RadioGroupItem value="opt-a"${colorAttr} />
  <RadioGroupItem value="opt-b"${colorAttr} />
  <RadioGroupItem value="opt-c"${colorAttr} />
</RadioGroup>`,
  }

  return (
    <section id="atoms-playground" className="scroll-mt-8 py-10 border-b border-border last:border-b-0">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Atoms Playground</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Coba prop <code className="rounded bg-muted px-1 py-0.5 text-xs">color</code> pada setiap atom component. Pilih warna brand di bawah, lalu lihat hasilnya.
            </p>
          </div>
          <Badge variant="outline" className="mt-1 shrink-0 font-mono text-xs">
            Interactive
          </Badge>
        </div>
      </div>

      {/* ── Shared color selector ── */}
      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Brand Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />

        <PillSelect
          label="Button Variant"
          options={BUTTON_VARIANTS}
          value={buttonVariant}
          onChange={setButtonVariant}
        />

        <PillSelect
          label="Badge Variant"
          options={BADGE_VARIANTS}
          value={badgeVariant}
          onChange={setBadgeVariant}
        />
      </div>

      {/* ── Component Grid ── */}
      <div className="mt-6 grid gap-8 sm:grid-cols-2">

        {/* Button */}
        <div className="space-y-3">
          <AtomCard title="Button">
            <div className="flex flex-wrap gap-2">
              <Button color={colorProp} variant={buttonVariant}>Click me</Button>
              <Button color={colorProp} variant={buttonVariant} size="sm">Small</Button>
              <Button color={colorProp} variant={buttonVariant} size="lg">Large</Button>
            </div>
          </AtomCard>
          <PlaygroundCodeBlock code={snippets.button} />
        </div>

        {/* Badge */}
        <div className="space-y-3">
          <AtomCard title="Badge">
            <div className="flex flex-wrap gap-2">
              <Badge color={colorProp} variant={badgeVariant}>Label</Badge>
              <Badge color={colorProp} variant={badgeVariant}>Status</Badge>
              <Badge color={colorProp} variant={badgeVariant}>New</Badge>
            </div>
          </AtomCard>
          <PlaygroundCodeBlock code={snippets.badge} />
        </div>

        {/* Label */}
        <div className="space-y-3">
          <AtomCard title="Label">
            <Label color={colorProp}>Form field label</Label>
          </AtomCard>
          <PlaygroundCodeBlock code={snippets.label} />
        </div>

        {/* Checkbox */}
        <div className="space-y-3">
          <AtomCard title="Checkbox">
            <div className="flex items-center gap-3">
              <Checkbox id="cb-demo" color={colorProp} defaultChecked />
              <Label htmlFor="cb-demo">Checked</Label>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Checkbox id="cb-demo-2" color={colorProp} />
              <Label htmlFor="cb-demo-2">Unchecked</Label>
            </div>
          </AtomCard>
          <PlaygroundCodeBlock code={snippets.checkbox} />
        </div>

        {/* Switch */}
        <div className="space-y-3">
          <AtomCard title="Switch">
            <div className="flex items-center gap-3">
              <Switch id="sw-demo" color={colorProp} defaultChecked />
              <Label htmlFor="sw-demo">Enabled</Label>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Switch id="sw-demo-sm" color={colorProp} size="sm" defaultChecked />
              <Label htmlFor="sw-demo-sm">Small</Label>
            </div>
          </AtomCard>
          <PlaygroundCodeBlock code={snippets.switch_} />
        </div>

        {/* Toggle */}
        <div className="space-y-3">
          <AtomCard title="Toggle">
            <div className="flex gap-2">
              <Toggle color={colorProp} aria-label="Bold" defaultPressed>
                <BoldIcon className="size-4" />
              </Toggle>
              <Toggle color={colorProp} variant="outline" aria-label="Bold outline">
                <BoldIcon className="size-4" />
              </Toggle>
            </div>
          </AtomCard>
          <PlaygroundCodeBlock code={snippets.toggle} />
        </div>

        {/* Slider */}
        <div className="space-y-3">
          <AtomCard title="Slider">
            <Slider color={colorProp} defaultValue={[40]} max={100} className="w-full" />
            <Slider color={colorProp} defaultValue={[20, 70]} max={100} className="mt-4 w-full" />
          </AtomCard>
          <PlaygroundCodeBlock code={snippets.slider} />
        </div>

        {/* Spinner */}
        <div className="space-y-3">
          <AtomCard title="Spinner">
            <div className="flex items-center gap-4">
              <Spinner color={colorProp} />
              <Spinner color={colorProp} className="size-6" />
              <Spinner color={colorProp} className="size-8" />
            </div>
          </AtomCard>
          <PlaygroundCodeBlock code={snippets.spinner} />
        </div>

        {/* Kbd */}
        <div className="space-y-3">
          <AtomCard title="Kbd">
            <div className="flex items-center gap-2">
              <Kbd color={colorProp}>⌘</Kbd>
              <Kbd color={colorProp}>K</Kbd>
              <span className="text-sm text-muted-foreground">Command Palette</span>
            </div>
          </AtomCard>
          <PlaygroundCodeBlock code={snippets.kbd} />
        </div>

        {/* RadioGroup */}
        <div className="space-y-3">
          <AtomCard title="RadioGroup">
            <RadioGroup defaultValue="opt-a">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="opt-a" id="rg-a" color={colorProp} />
                <Label htmlFor="rg-a">Option A</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="opt-b" id="rg-b" color={colorProp} />
                <Label htmlFor="rg-b">Option B</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="opt-c" id="rg-c" color={colorProp} />
                <Label htmlFor="rg-c">Option C</Label>
              </div>
            </RadioGroup>
          </AtomCard>
          <PlaygroundCodeBlock code={snippets.radioGroup} />
        </div>

      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Data Table Playground ────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

interface PlaygroundProduct {
  key: string
  product: string
  category: string
  price: number
  stock: number
  status: string
}

const PLAYGROUND_TABLE_DATA: PlaygroundProduct[] = [
  { key: "1", product: "Wireless Headphones", category: "Electronics", price: 59.99, stock: 143, status: "In Stock" },
  { key: "2", product: "Running Shoes", category: "Sportswear", price: 89.00, stock: 67, status: "In Stock" },
  { key: "3", product: "Coffee Maker", category: "Appliances", price: 129.99, stock: 0, status: "Out of Stock" },
  { key: "4", product: "Desk Lamp", category: "Furniture", price: 34.50, stock: 210, status: "In Stock" },
  { key: "5", product: "Yoga Mat", category: "Sportswear", price: 24.99, stock: 88, status: "In Stock" },
  { key: "6", product: "Bluetooth Speaker", category: "Electronics", price: 45.00, stock: 0, status: "Out of Stock" },
  { key: "7", product: "Notebook Set", category: "Stationery", price: 12.99, stock: 350, status: "In Stock" },
  { key: "8", product: "Water Bottle", category: "Accessories", price: 18.50, stock: 195, status: "In Stock" },
]

function DataTablePlayground() {
  const [selection, setSelection] = useState<"none" | "checkbox" | "radio">("none")
  const [tableSize, setTableSize] = useState<"sm" | "default" | "lg">("default")
  const [isBordered, setIsBordered] = useState(false)
  const [enableSort, setEnableSort] = useState(true)
  const [enableFilter, setEnableFilter] = useState(true)
  const [showEmpty, setShowEmpty] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const columns = useMemo<ColumnType<PlaygroundProduct>[]>(() => [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      ...(enableSort ? { sorter: (a: PlaygroundProduct, b: PlaygroundProduct) => a.product.localeCompare(b.product) } : {}),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...(enableFilter ? {
        filters: [
          { text: "Electronics", value: "Electronics" },
          { text: "Sportswear", value: "Sportswear" },
          { text: "Appliances", value: "Appliances" },
          { text: "Furniture", value: "Furniture" },
          { text: "Stationery", value: "Stationery" },
          { text: "Accessories", value: "Accessories" },
        ],
        onFilter: (value: string | number | boolean, record: PlaygroundProduct) => record.category === value,
      } : {}),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right" as const,
      ...(enableSort ? { sorter: (a: PlaygroundProduct, b: PlaygroundProduct) => a.price - b.price } : {}),
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      align: "right" as const,
      ...(enableSort ? { sorter: (a: PlaygroundProduct, b: PlaygroundProduct) => a.stock - b.stock } : {}),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...(enableFilter ? {
        filters: [
          { text: "In Stock", value: "In Stock" },
          { text: "Out of Stock", value: "Out of Stock" },
        ],
        onFilter: (value: string | number | boolean, record: PlaygroundProduct) => record.status === value,
      } : {}),
      render: (value: string) => (
        <Badge variant={value === "In Stock" ? "default" : "secondary"} className="text-xs">
          {value}
        </Badge>
      ),
    },
  ], [enableSort, enableFilter])

  const rowSelection =
    selection === "none"
      ? undefined
      : {
          type: selection as "checkbox" | "radio",
          selectedRowKeys,
          onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
        }

  const code = `import { DataTable, type ColumnType } from "@/components/organism/data-table"

interface Product {
  key: string
  product: string
  category: string
  price: number
  stock: number
  status: string
}

const columns: ColumnType<Product>[] = [
  {
    title: "Product",
    dataIndex: "product",
    key: "product",${enableSort ? '\n    sorter: (a, b) => a.product.localeCompare(b.product),' : ''}
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",${enableFilter ? `\n    filters: [
      { text: "Electronics", value: "Electronics" },
      { text: "Sportswear", value: "Sportswear" },
    ],
    onFilter: (value, record) => record.category === value,` : ''}
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    align: "right",${enableSort ? '\n    sorter: (a, b) => a.price - b.price,' : ''}
    render: (value) => \`$\${value.toFixed(2)}\`,
  },
  { title: "Stock", dataIndex: "stock", key: "stock", align: "right" },
  { title: "Status", dataIndex: "status", key: "status" },
]

<DataTable<Product>
  dataSource={data}
  columns={columns}${selection !== "none" ? `\n  rowSelection={{ type: "${selection}" }}` : ""}${tableSize !== "default" ? `\n  size="${tableSize}"` : ""}${isBordered ? "\n  bordered" : ""}
/>`

  return (
    <section id="data-table-playground" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Data Table Playground</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Try different configurations for the DataTable component.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Selection"
          options={["none", "checkbox", "radio"] as const}
          value={selection}
          onChange={(v) => { setSelection(v); setSelectedRowKeys([]) }}
        />
        <PillSelect
          label="Size"
          options={["sm", "default", "lg"] as const}
          value={tableSize}
          onChange={setTableSize}
        />
        <div className="flex flex-wrap gap-6">
          <div>
            <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Bordered</span>
            <button
              onClick={() => setIsBordered(!isBordered)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                isBordered
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {isBordered ? "Yes" : "No"}
            </button>
          </div>
          <div>
            <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Sorting</span>
            <button
              onClick={() => setEnableSort(!enableSort)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                enableSort
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {enableSort ? "On" : "Off"}
            </button>
          </div>
          <div>
            <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Filtering</span>
            <button
              onClick={() => setEnableFilter(!enableFilter)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                enableFilter
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {enableFilter ? "On" : "Off"}
            </button>
          </div>
          <div>
            <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Empty State</span>
            <button
              onClick={() => setShowEmpty(!showEmpty)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                showEmpty
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {showEmpty ? "Yes" : "No"}
            </button>
          </div>
        </div>
      </div>

      {selectedRowKeys.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground">
          Selected {selectedRowKeys.length} row{selectedRowKeys.length > 1 ? "s" : ""}
        </div>
      )}

      {/* Live preview */}
      <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
        <DataTable<PlaygroundProduct>
          dataSource={showEmpty ? [] : PLAYGROUND_TABLE_DATA}
          columns={columns}
          rowSelection={rowSelection}
          size={tableSize}
          bordered={isBordered}
        />
      </div>

      {/* Code */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

// ── Atom card wrapper ─────────────────────────────────────────────────────────

function AtomCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-muted/10 p-5">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h4>
      {children}
    </div>
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
      <AtomsPlayground />
      <DataTablePlayground />
    </div>
  )
}
