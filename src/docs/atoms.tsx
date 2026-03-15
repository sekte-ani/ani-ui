import { useState } from "react"
import { BoldIcon, CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { hexColorMap, COLOR_TOKENS, type ColorToken } from "@/components/ui/color-palette.variants"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"

const COLOR_OPTIONS: (ColorToken | "none")[] = ["none", ...COLOR_TOKENS]

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
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </button>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}

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

function ButtonInteractive() {
  const [variant, setVariant] = useState<"default" | "destructive" | "outline" | "secondary" | "ghost" | "link">("default")
  const [size, setSize] = useState<"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg">("default")
  const [color, setColor] = useState<ColorToken | "none">("none")
  const [disabled, setDisabled] = useState(false)

  const colorProp = color !== "none" ? color : undefined
  const colorAttr = color !== "none" ? ` color="${color}"` : ""
  const variantAttr = variant !== "default" ? ` variant="${variant}"` : ""
  const sizeAttr = size !== "default" ? ` size="${size}"` : ""
  const disabledAttr = disabled ? " disabled" : ""

  const code = `import { Button } from "@/components/ui/button"

<Button${colorAttr}${variantAttr}${sizeAttr}${disabledAttr}>Click me</Button>`

  return (
    <section id="button" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Button</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tombol interaktif dengan berbagai varian tampilan dan ukuran. Coba pilih variant, size, dan color di bawah.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Variant"
          options={["default", "destructive", "outline", "secondary", "ghost", "link"] as const}
          value={variant}
          onChange={setVariant}
        />
        <PillSelect
          label="Size"
          options={["xs", "sm", "default", "lg", "icon"] as const}
          value={size}
          onChange={setSize}
        />
        <PillSelect
          label="Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">State</span>
          <button
            onClick={() => setDisabled(!disabled)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
              disabled
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {disabled ? "Disabled" : "Enabled"}
          </button>
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Button color={colorProp} variant={variant} size={size} disabled={disabled}>
          Click me
        </Button>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function BadgeInteractive() {
  const [variant, setVariant] = useState<"default" | "secondary" | "destructive" | "outline" | "ghost" | "link">("default")
  const [color, setColor] = useState<ColorToken | "none">("none")
  const [label, setLabel] = useState("Badge")

  const colorProp = color !== "none" ? color : undefined
  const colorAttr = color !== "none" ? ` color="${color}"` : ""
  const variantAttr = variant !== "default" ? ` variant="${variant}"` : ""

  const code = `import { Badge } from "@/components/ui/badge"

<Badge${colorAttr}${variantAttr}>${label}</Badge>`

  return (
    <section id="badge" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Badge</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Label kecil berbentuk pil untuk menampilkan status atau kategori. Coba pilih variant dan color.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Variant"
          options={["default", "secondary", "destructive", "outline", "ghost", "link"] as const}
          value={variant}
          onChange={setVariant}
        />
        <PillSelect
          label="Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Label</span>
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Badge label..."
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Badge color={colorProp} variant={variant}>
          {label}
        </Badge>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function InputInteractive() {
  const [placeholder, setPlaceholder] = useState("Masukkan teks...")
  const [disabled, setDisabled] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [type, setType] = useState<"text" | "email" | "password" | "number">("text")

  const disabledAttr = disabled ? " disabled" : ""
  const invalidAttr = invalid ? ' aria-invalid="true"' : ""
  const typeAttr = type !== "text" ? ` type="${type}"` : ""

  const code = `import { Input } from "@/components/ui/input"

<Input${typeAttr}${disabledAttr}${invalidAttr} placeholder="${placeholder}" />`

  return (
    <section id="input" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Input</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Kolom teks satu baris untuk menerima input dari pengguna.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Type"
          options={["text", "email", "password", "number"] as const}
          value={type}
          onChange={setType}
        />
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">State</span>
          <div className="flex gap-2">
            <button
              onClick={() => setDisabled(!disabled)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                disabled
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {disabled ? "Disabled" : "Enabled"}
            </button>
            <button
              onClick={() => setInvalid(!invalid)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                invalid
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {invalid ? "Invalid" : "Valid"}
            </button>
          </div>
        </div>
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Placeholder</span>
          <Input
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            placeholder="Placeholder..."
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          className="max-w-xs"
        />
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function LabelInteractive() {
  const [color, setColor] = useState<ColorToken | "none">("none")
  const [text, setText] = useState("Form field label")

  const colorProp = color !== "none" ? color : undefined
  const colorAttr = color !== "none" ? ` color="${color}"` : ""

  const code = `import { Label } from "@/components/ui/label"

<Label${colorAttr}>${text}</Label>`

  return (
    <section id="label" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Label</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Teks deskriptif yang diasosiasikan dengan elemen form.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Text</span>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Label color={colorProp}>{text}</Label>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function CheckboxInteractive() {
  const [checked, setChecked] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [color, setColor] = useState<ColorToken | "none">("none")

  const colorProp = color !== "none" ? color : undefined
  const colorAttr = color !== "none" ? ` color="${color}"` : ""

  const code = `import { Checkbox } from "@/components/ui/checkbox"

<Checkbox${colorAttr}${disabled ? " disabled" : ""}${checked ? " defaultChecked" : ""} />`

  return (
    <section id="checkbox" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Checkbox</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Kotak centang untuk memilih satu atau lebih opsi.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">State</span>
          <div className="flex gap-2">
            <button
              onClick={() => setChecked(!checked)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                checked
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {checked ? "Checked" : "Unchecked"}
            </button>
            <button
              onClick={() => setDisabled(!disabled)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                disabled
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {disabled ? "Disabled" : "Enabled"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <div className="flex items-center gap-2">
          <Checkbox
            id="checkbox-interactive"
            color={colorProp}
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
            disabled={disabled}
          />
          <Label htmlFor="checkbox-interactive">Checkbox label</Label>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function SwitchInteractive() {
  const [checked, setChecked] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [size, setSize] = useState<"sm" | "default">("default")
  const [color, setColor] = useState<ColorToken | "none">("none")

  const colorProp = color !== "none" ? color : undefined
  const colorAttr = color !== "none" ? ` color="${color}"` : ""
  const sizeAttr = size !== "default" ? ` size="${size}"` : ""

  const code = `import { Switch } from "@/components/ui/switch"

<Switch${colorAttr}${sizeAttr}${disabled ? " disabled" : ""}${checked ? " defaultChecked" : ""} />`

  return (
    <section id="switch" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Switch</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Toggle on/off bergaya saklar.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Size"
          options={["sm", "default"] as const}
          value={size}
          onChange={setSize}
        />
        <PillSelect
          label="Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">State</span>
          <div className="flex gap-2">
            <button
              onClick={() => setChecked(!checked)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                checked
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {checked ? "On" : "Off"}
            </button>
            <button
              onClick={() => setDisabled(!disabled)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                disabled
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {disabled ? "Disabled" : "Enabled"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <div className="flex items-center gap-2">
          <Switch
            id="switch-interactive"
            color={colorProp}
            size={size}
            checked={checked}
            onCheckedChange={setChecked}
            disabled={disabled}
          />
          <Label htmlFor="switch-interactive">Toggle switch</Label>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function ToggleInteractive() {
  const [pressed, setPressed] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [variant, setVariant] = useState<"default" | "outline">("default")
  const [size, setSize] = useState<"sm" | "default" | "lg">("default")
  const [color, setColor] = useState<ColorToken | "none">("none")

  const colorProp = color !== "none" ? color : undefined
  const colorAttr = color !== "none" ? ` color="${color}"` : ""
  const variantAttr = variant !== "default" ? ` variant="${variant}"` : ""
  const sizeAttr = size !== "default" ? ` size="${size}"` : ""

  const code = `import { Toggle } from "@/components/ui/toggle"

<Toggle${colorAttr}${variantAttr}${sizeAttr}${disabled ? " disabled" : ""}${pressed ? " defaultPressed" : ""}>
  <BoldIcon />
</Toggle>`

  return (
    <section id="toggle" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Toggle</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Tombol dua-status (aktif/nonaktif).
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Variant"
          options={["default", "outline"] as const}
          value={variant}
          onChange={setVariant}
        />
        <PillSelect
          label="Size"
          options={["sm", "default", "lg"] as const}
          value={size}
          onChange={setSize}
        />
        <PillSelect
          label="Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">State</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPressed(!pressed)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                pressed
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {pressed ? "Pressed" : "Not Pressed"}
            </button>
            <button
              onClick={() => setDisabled(!disabled)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                disabled
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {disabled ? "Disabled" : "Enabled"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Toggle
          color={colorProp}
          variant={variant}
          size={size}
          pressed={pressed}
          onPressedChange={setPressed}
          disabled={disabled}
          aria-label="Toggle bold"
        >
          <BoldIcon className="size-4" />
        </Toggle>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function SliderInteractive() {
  const [value, setValue] = useState([50])
  const [range, setRange] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [color, setColor] = useState<ColorToken | "none">("none")

  const colorProp = color !== "none" ? color : undefined
  const colorAttr = color !== "none" ? ` color="${color}"` : ""

  const code = `import { Slider } from "@/components/ui/slider"

<Slider${colorAttr}${disabled ? " disabled" : ""} defaultValue={${JSON.stringify(value)}} max={100} />`

  return (
    <section id="slider" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Slider</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Input geser untuk memilih nilai numerik.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Mode</span>
          <div className="flex gap-2">
            <button
              onClick={() => { setRange(false); setValue([50]); }}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                !range
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              Single
            </button>
            <button
              onClick={() => { setRange(true); setValue([20, 80]); }}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                range
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              Range
            </button>
          </div>
        </div>
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">State</span>
          <button
            onClick={() => setDisabled(!disabled)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
              disabled
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {disabled ? "Disabled" : "Enabled"}
          </button>
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <div className="w-64">
          <Slider
            color={colorProp}
            value={value}
            onValueChange={setValue}
            max={100}
            disabled={disabled}
          />
          <div className="mt-2 text-center text-sm text-muted-foreground">
            Value: {value.join(" - ")}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function SpinnerInteractive() {
  const [color, setColor] = useState<ColorToken | "none">("none")
  const [size, setSize] = useState<"size-4" | "size-6" | "size-8" | "size-10">("size-6")

  const colorProp = color !== "none" ? color : undefined

  const code = `import { Spinner } from "@/components/ui/spinner"

<Spinner${color !== "none" ? ` color="${color}"` : ""} className="${size}" />`

  return (
    <section id="spinner" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Spinner</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Indikator loading berputar.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />
        <PillSelect
          label="Size"
          options={["size-4", "size-6", "size-8", "size-10"] as const}
          value={size}
          onChange={setSize}
        />
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Spinner color={colorProp} className={size} />
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function KbdInteractive() {
  const [color, setColor] = useState<ColorToken | "none">("none")
  const [text, setText] = useState("⌘K")

  const colorProp = color !== "none" ? color : undefined
  const colorAttr = color !== "none" ? ` color="${color}"` : ""

  const code = `import { Kbd } from "@/components/ui/kbd"

<Kbd${colorAttr}>${text}</Kbd>`

  return (
    <section id="kbd" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Kbd</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Representasi visual tombol keyboard.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Text</span>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Kbd color={colorProp}>{text}</Kbd>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function RadioGroupInteractive() {
  const [value, setValue] = useState("option-a")
  const [color, setColor] = useState<ColorToken | "none">("none")

  const colorProp = color !== "none" ? color : undefined
  const colorAttr = color !== "none" ? ` color="${color}"` : ""

  const code = `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="option-a">
  <RadioGroupItem value="option-a"${colorAttr} />
  <RadioGroupItem value="option-b"${colorAttr} />
  <RadioGroupItem value="option-c"${colorAttr} />
</RadioGroup>`

  return (
    <section id="radio-group" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Radio Group</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Grup pilihan eksklusif.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Color"
          options={COLOR_OPTIONS}
          value={color}
          onChange={setColor}
          renderOption={renderColorOption}
        />
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-a" id="rg-a-int" color={colorProp} />
            <Label htmlFor="rg-a-int">Option A</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-b" id="rg-b-int" color={colorProp} />
            <Label htmlFor="rg-b-int">Option B</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-c" id="rg-c-int" color={colorProp} />
            <Label htmlFor="rg-c-int">Option C</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function TextareaInteractive() {
  const [placeholder, setPlaceholder] = useState("Tulis pesan Anda di sini...")
  const [disabled, setDisabled] = useState(false)
  const [invalid, setInvalid] = useState(false)

  const disabledAttr = disabled ? " disabled" : ""
  const invalidAttr = invalid ? ' aria-invalid="true"' : ""

  const code = `import { Textarea } from "@/components/ui/textarea"

<Textarea${disabledAttr}${invalidAttr} placeholder="${placeholder}" />`

  return (
    <section id="textarea" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Textarea</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Kolom teks multi-baris.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">State</span>
          <div className="flex gap-2">
            <button
              onClick={() => setDisabled(!disabled)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                disabled
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {disabled ? "Disabled" : "Enabled"}
            </button>
            <button
              onClick={() => setInvalid(!invalid)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                invalid
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {invalid ? "Invalid" : "Valid"}
            </button>
          </div>
        </div>
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Placeholder</span>
          <Input
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Textarea
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          className="max-w-xs"
        />
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

export function AtomsDoc() {
  return (
    <div>
      <ButtonInteractive />
      <BadgeInteractive />
      <InputInteractive />
      <LabelInteractive />
      <CheckboxInteractive />
      <SwitchInteractive />
      <ToggleInteractive />
      <SliderInteractive />
      <SpinnerInteractive />
      <KbdInteractive />
      <RadioGroupInteractive />
      <TextareaInteractive />
    </div>
  )
}
