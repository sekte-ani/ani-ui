import { useState } from "react"
import { InfoIcon, TriangleAlertIcon, CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
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
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

function SelectInteractive() {
  const [value, setValue] = useState("apel")
  const [disabled, setDisabled] = useState(false)

  const code = `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select${disabled ? " disabled" : ""} value="${value}" onValueChange={setValue}>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Pilih buah..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apel">Apel</SelectItem>
    <SelectItem value="pisang">Pisang</SelectItem>
    <SelectItem value="mangga">Mangga</SelectItem>
  </SelectContent>
</Select>`

  return (
    <section id="select" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Select</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Dropdown pilihan berbasis Radix UI Select. Coba pilih opsi di bawah.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
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
        <Select value={value} onValueChange={setValue} disabled={disabled}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Pilih buah..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apel">Apel</SelectItem>
            <SelectItem value="pisang">Pisang</SelectItem>
            <SelectItem value="mangga">Mangga</SelectItem>
            <SelectItem value="jeruk" disabled>Jeruk (nonaktif)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function AlertInteractive() {
  const [variant, setVariant] = useState<"default" | "destructive">("default")

  const code = `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

<Alert${variant !== "default" ? ` variant="${variant}"` : ""}>
  <InfoIcon />
  <AlertTitle>Informasi</AlertTitle>
  <AlertDescription>
    Pembaruan versi baru tersedia.
  </AlertDescription>
</Alert>`

  return (
    <section id="alert" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Alert</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Kotak notifikasi inline untuk menyampaikan informasi penting.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Variant"
          options={["default", "destructive"] as const}
          value={variant}
          onChange={setVariant}
        />
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Alert variant={variant}>
          {variant === "destructive" ? <TriangleAlertIcon /> : <InfoIcon />}
          <AlertTitle>{variant === "destructive" ? "Peringatan" : "Informasi"}</AlertTitle>
          <AlertDescription>
            {variant === "destructive" 
              ? "Terjadi kesalahan. Silakan coba lagi." 
              : "Pembaruan versi baru tersedia. Silakan refresh halaman."}
          </AlertDescription>
        </Alert>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function ProgressInteractive() {
  const [value, setValue] = useState(33)
  const [max, setMax] = useState(100)

  const code = `import { Progress } from "@/components/ui/progress"

<Progress value={${value}} max={${max}} />`

  return (
    <section id="progress" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Progress</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Indikator kemajuan berbentuk batang horizontal.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</span>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="max-w-32"
          />
        </div>
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Max</span>
          <Input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="max-w-32"
          />
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <div className="w-full max-w-sm space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{value}/{max}</span>
          </div>
          <Progress value={value} max={max} />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function TooltipInteractive() {
  const [side, setSide] = useState<"top" | "right" | "bottom" | "left">("top")

  const code = `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent side="${side}">
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`

  return (
    <section id="tooltip" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Tooltip</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Teks bantuan kecil yang muncul saat hover.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Side"
          options={["top", "right", "bottom", "left"] as const}
          value={side}
          onChange={setSide}
        />
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Arahkan kursor</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>
              <p>Ini adalah tooltip!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function CalendarInteractive() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const code = `import { Calendar } from "@/components/ui/calendar"

const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border"
/>`

  return (
    <section id="calendar" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Calendar</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Komponen kalender interaktif untuk memilih tanggal.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

export function MoleculesDoc() {
  return (
    <div>
      <SelectInteractive />
      <AlertInteractive />
      <ProgressInteractive />
      <TooltipInteractive />
      <CalendarInteractive />
    </div>
  )
}
