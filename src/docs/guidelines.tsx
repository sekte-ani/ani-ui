import { ComponentSection } from "@/docs/components/ComponentSection"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"
import { ArrowRightIcon, InfoIcon, PlusIcon } from "lucide-react"

export function GuidelinesDoc() {
  return (
    <div>
      <ComponentSection
        title="Primary vs Secondary Button"
        description="Aturan praktis kapan pakai tombol utama vs pendamping, biar CTA konsisten dan nggak bikin user bingung."
        baseComponent="guideline/buttons"
        code={`import { Button } from "@/components/ui/button"
import { PlusIcon, ArrowRightIcon } from "lucide-react"

{/* Primary: aksi utama di halaman/section */}
<Button>
  Lanjut <ArrowRightIcon className="size-4" />
</Button>

{/* Secondary: aksi alternatif/pelengkap */}
<Button variant="secondary">Simpan draft</Button>
<Button variant="outline">Batal</Button>
<Button variant="ghost">Lihat detail</Button>

{/* Icon + text: ikon 16px, spasi rapih */}
<Button>
  <PlusIcon className="size-4" />
  Tambah item
</Button>`}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="text-sm font-semibold">Rule of thumb</div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                Maksimal <span className="font-medium text-foreground">1 primary</span>{" "}
                per view/section utama.
              </li>
              <li>Secondary untuk aksi alternatif yang masih penting tapi bukan fokus.</li>
              <li>Outline/Ghost untuk aksi minor (navigasi, detail, utilitas).</li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button className="gap-2">
              Lanjut <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Button>
            <Button variant="secondary">Simpan draft</Button>
            <Button variant="outline">Batal</Button>
            <Button variant="ghost">Lihat detail</Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button className="gap-2">
              <PlusIcon className="size-4" aria-hidden="true" />
              Tambah item
            </Button>
            <Button variant="secondary" className="gap-2">
              <InfoIcon className="size-4" aria-hidden="true" />
              Info
            </Button>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Spacing Rules"
        description="Aturan spacing biar layout konsisten: pilih skala jarak, bedain 'within' vs 'between', dan hindari mixing gap random."
        baseComponent="guideline/spacing"
        code={`import { cn } from "@/lib/utils"

// Rekomendasi skala jarak (Tailwind)
// - Within component: gap-1 / gap-2
// - Antara field: gap-3 / gap-4
// - Antara section besar: gap-6 / gap-8

<div className="flex flex-col gap-6">
  <section className="flex flex-col gap-3">{/* fields */}</section>
  <section className="flex flex-col gap-3">{/* fields */}</section>
</div>`}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="text-sm font-semibold">Skala yang disaranin</div>
            <div className="mt-2 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
              <div className="rounded-md border border-border bg-background p-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Within
                </div>
                <div className="mt-1">
                  <KbdGroup>
                    <Kbd>gap-1</Kbd>
                    <Kbd>gap-2</Kbd>
                  </KbdGroup>
                </div>
              </div>
              <div className="rounded-md border border-border bg-background p-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Between
                </div>
                <div className="mt-1">
                  <KbdGroup>
                    <Kbd>gap-3</Kbd>
                    <Kbd>gap-4</Kbd>
                  </KbdGroup>
                </div>
              </div>
              <div className="rounded-md border border-border bg-background p-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Sections
                </div>
                <div className="mt-1">
                  <KbdGroup>
                    <Kbd>gap-6</Kbd>
                    <Kbd>gap-8</Kbd>
                  </KbdGroup>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <div className="text-sm font-semibold">Contoh struktur</div>
            <div className="mt-3 flex flex-col gap-6">
              <div className="rounded-md border border-border p-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Section A
                </div>
                <div className="mt-2 flex flex-col gap-3">
                  <div className={cn("h-8 rounded bg-muted")} />
                  <div className={cn("h-8 rounded bg-muted")} />
                </div>
              </div>
              <div className="rounded-md border border-border p-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Section B
                </div>
                <div className="mt-2 flex flex-col gap-3">
                  <div className={cn("h-8 rounded bg-muted")} />
                  <div className={cn("h-8 rounded bg-muted")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Color Usage Limits"
        description="Batas penggunaan warna untuk menjaga UI tetap fokus dan konsisten. Warna 'status' tetap boleh untuk state (success/warning/error)."
        baseComponent="guideline/colors"
        code={`import { Badge } from "@/components/ui/badge"

// Rekomendasi praktis per screen:
// - 1 warna brand/primary untuk CTA & highlight utama
// - 1 warna aksen (opsional) untuk elemen sekunder
// - Warna semantic (success/warning/destructive) khusus untuk status/state

<Badge variant="secondary">Info</Badge>
<Badge variant="outline">Neutral</Badge>
<Badge variant="destructive">Error</Badge>`}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="text-sm font-semibold">Aturan yang dipakai tim</div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                Maksimal <span className="font-medium text-foreground">2 warna “brand”</span>{" "}
                yang dominan dalam satu screen (primary + optional accent).
              </li>
              <li>
                Warna semantic (success/warning/destructive) dipakai untuk{" "}
                <span className="font-medium text-foreground">status/state</span>, bukan dekorasi.
              </li>
              <li>Gunakan neutral (foreground/muted/border) untuk mayoritas UI.</li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge>Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Neutral</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Icon Usage"
        description="Cara pakai icon biar konsisten: size, alignment, jarak, dan aksesibilitas."
        baseComponent="guideline/icons"
        code={`import { Button } from "@/components/ui/button"
import { ArrowRightIcon, PlusIcon } from "lucide-react"

// Rules:
// - Default size icon: 16px (size-4) untuk text normal
// - Ikon + text: pakai gap-2, jangan margin random
// - Ikon dekoratif: aria-hidden

<Button className="gap-2">
  <PlusIcon className="size-4" aria-hidden="true" />
  Tambah
</Button>
<Button className="gap-2">
  Lanjut <ArrowRightIcon className="size-4" aria-hidden="true" />
</Button>`}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="text-sm font-semibold">Rules</div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>
                Size default: <Kbd>size-4</Kbd> (16px). Naikkan ke <Kbd>size-5</Kbd>{" "}
                kalau tombolnya besar.
              </li>
              <li>
                Icon + text: pakai <Kbd>gap-2</Kbd> dan align center.
              </li>
              <li>
                Icon dekoratif: set <Kbd>aria-hidden="true"</Kbd>. Kalau icon menyampaikan
                makna, tambahkan label yang jelas di text/aria-label.
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button className="gap-2">
              <PlusIcon className="size-4" aria-hidden="true" />
              Tambah
            </Button>
            <Button variant="secondary" className="gap-2">
              <InfoIcon className="size-4" aria-hidden="true" />
              Detail
            </Button>
            <Button className="gap-2">
              Lanjut <ArrowRightIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </ComponentSection>
    </div>
  )
}
