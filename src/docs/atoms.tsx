import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import { ComponentSection } from "@/docs/components/ComponentSection"
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"

export function AtomsDoc() {
  return (
    <div>
      {/* ── Button ── */}
      <ComponentSection
        title="Button"
        description="Tombol interaktif dengan berbagai varian tampilan dan ukuran. Mendukung render sebagai elemen anak melalui prop asChild."
        baseComponent="button"
        props={[
          {
            prop: "variant",
            type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
            default: '"default"',
            description: "Varian tampilan tombol",
          },
          {
            prop: "size",
            type: '"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
            default: '"default"',
            description: "Ukuran tombol",
          },
          {
            prop: "asChild",
            type: "boolean",
            default: "false",
            description: "Render sebagai slot komponen anak menggunakan Radix Slot",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Nonaktifkan tombol",
          },
          {
            prop: "color",
            type: '"primary" | "secondary" | "info" | "success" | "warning" | "error" | "black" | "white"',
            default: "—",
            description: "Override warna dengan brand color. Pada variant ghost/link hanya mengubah warna teks",
          },
        ]}
        code={`import { Button } from "@/components/ui/button"

<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button size="sm">Small</Button>
<Button disabled>Disabled</Button>

{/* Brand color */}
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="primary" variant="outline">Primary Outline</Button>
<Button color="secondary" variant="ghost">Secondary Ghost</Button>`}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="primary" variant="outline">Primary Outline</Button>
          <Button color="secondary" variant="ghost">Secondary Ghost</Button>
        </div>
      </ComponentSection>

      {/* ── Badge ── */}
      <ComponentSection
        title="Badge"
        description="Label kecil berbentuk pil untuk menampilkan status, kategori, atau hitungan. Mendukung beragam varian warna dan bisa dirender sebagai elemen lain."
        baseComponent="badge"
        props={[
          {
            prop: "variant",
            type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
            default: '"default"',
            description: "Varian warna dan tampilan badge",
          },
          {
            prop: "asChild",
            type: "boolean",
            default: "false",
            description: "Render sebagai slot komponen anak menggunakan Radix Slot",
          },
          {
            prop: "color",
            type: '"primary" | "secondary" | "info" | "success" | "warning" | "error" | "black" | "white"',
            default: "—",
            description: "Override warna dengan brand color. Pada variant ghost/link hanya mengubah warna teks",
          },
        ]}
        code={`import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>

{/* Brand color */}
<Badge color="primary">Primary</Badge>
<Badge color="secondary">Secondary</Badge>`}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="secondary">Secondary</Badge>
          <Badge color="info">Info</Badge>
          <Badge color="error">Error</Badge>
        </div>
      </ComponentSection>

      {/* ── Input ── */}
      <ComponentSection
        title="Input"
        description="Kolom teks satu baris untuk menerima input dari pengguna. Mendukung semua atribut HTML input standar termasuk tipe file, disabled, dan state invalid."
        baseComponent="input"
        props={[
          {
            prop: "type",
            type: "string",
            default: '"text"',
            description: "Jenis input HTML (text, email, password, number, dll.)",
          },
          {
            prop: "placeholder",
            type: "string",
            default: "—",
            description: "Teks placeholder yang muncul saat input kosong",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Nonaktifkan input sehingga tidak bisa diinteraksi",
          },
          {
            prop: "aria-invalid",
            type: "boolean",
            default: "false",
            description: "Tampilkan state error dengan border merah",
          },
        ]}
        code={`import { Input } from "@/components/ui/input"

<Input placeholder="Masukkan teks..." />
<Input type="email" placeholder="email@contoh.com" />
<Input disabled placeholder="Nonaktif" />
<Input aria-invalid placeholder="Error state" />`}
      >
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Input placeholder="Masukkan teks..." />
          <Input type="email" placeholder="email@contoh.com" />
          <Input disabled placeholder="Nonaktif" />
          <Input aria-invalid placeholder="Error state" />
        </div>
      </ComponentSection>

      {/* ── Label ── */}
      <ComponentSection
        title="Label"
        description="Teks deskriptif yang diasosiasikan dengan elemen form untuk keperluan aksesibilitas. Diklik akan memindahkan fokus ke elemen yang ditautkan."
        baseComponent="label"
        props={[
          {
            prop: "htmlFor",
            type: "string",
            default: "—",
            description: "ID elemen form yang diasosiasikan dengan label ini",
          },
          {
            prop: "color",
            type: '"primary" | "secondary" | "info" | "success" | "warning" | "error" | "black" | "white"',
            default: "—",
            description: "Warnai teks label dengan brand color",
          },
        ]}
        code={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

<div className="grid gap-1.5">
  <Label htmlFor="email">Alamat Email</Label>
  <Input id="email" type="email" placeholder="email@contoh.com" />
</div>

{/* Dengan brand color */}
<Label color="primary">Label brand primary</Label>
<Label color="secondary">Label brand secondary</Label>`}
      >
        <div className="grid gap-3 w-full max-w-xs">
          <Label htmlFor="docs-email">Alamat Email</Label>
          <Input id="docs-email" type="email" placeholder="email@contoh.com" />
          <Label color="primary">Label brand primary</Label>
          <Label color="secondary">Label brand secondary</Label>
        </div>
      </ComponentSection>

      {/* ── Avatar ── */}
      <ComponentSection
        title="Avatar"
        description="Foto profil atau inisial pengguna dengan dukungan gambar, fallback teks, badge status, dan grup tumpuk. Tersedia tiga ukuran: sm, default, dan lg."
        baseComponent="avatar"
        props={[
          {
            prop: "size",
            type: '"sm" | "default" | "lg"',
            default: '"default"',
            description: "Ukuran avatar — sm (24px), default (32px), lg (40px)",
          },
          {
            prop: "AvatarImage src",
            type: "string",
            default: "—",
            description: "URL gambar yang ditampilkan",
          },
          {
            prop: "AvatarFallback",
            type: "ReactNode",
            default: "—",
            description: "Konten fallback yang tampil saat gambar gagal dimuat",
          },
          {
            prop: "AvatarBadge",
            type: "ReactNode",
            default: "—",
            description: "Badge kecil di sudut kanan bawah avatar untuk status",
          },
        ]}
        code={`import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@/components/ui/avatar"
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"

{/* Avatar dengan gambar */}
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
  <AvatarFallback>SC</AvatarFallback>
</Avatar>

{/* Avatar dengan badge status */}
<Avatar>
  <AvatarFallback>AB</AvatarFallback>
  <AvatarBadge />
</Avatar>

{/* Grup avatar */}
<AvatarGroup>
  <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
  <AvatarGroupCount>+3</AvatarGroupCount>
</AvatarGroup>`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          </div>
          <AvatarGroup>
            <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </ComponentSection>

      {/* ── Checkbox ── */}
      <ComponentSection
        title="Checkbox"
        description="Kotak centang untuk memilih satu atau lebih opsi secara independen. Dibangun di atas Radix UI Checkbox dengan dukungan state indeterminate dan aksesibilitas penuh."
        baseComponent="checkbox"
        props={[
          {
            prop: "checked",
            type: "boolean | 'indeterminate'",
            default: "—",
            description: "Status centang saat ini (controlled)",
          },
          {
            prop: "defaultChecked",
            type: "boolean",
            default: "false",
            description: "Status centang awal (uncontrolled)",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Nonaktifkan checkbox",
          },
          {
            prop: "onCheckedChange",
            type: "(checked: boolean | 'indeterminate') => void",
            default: "—",
            description: "Callback yang dipanggil saat status berubah",
          },
          {
            prop: "aria-invalid",
            type: "boolean",
            default: "false",
            description: "Tampilkan state error dengan border merah",
          },
          {
            prop: "color",
            type: '"primary" | "secondary" | "info" | "success" | "warning" | "error" | "black" | "white"',
            default: "—",
            description: "Override warna centang dengan brand color",
          },
        ]}
        code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Saya setuju dengan syarat dan ketentuan</Label>
</div>

{/* Dengan state disabled */}
<div className="flex items-center gap-2">
  <Checkbox id="disabled" disabled defaultChecked />
  <Label htmlFor="disabled">Opsi nonaktif</Label>
</div>

{/* Brand color */}
<Checkbox color="primary" defaultChecked />
<Checkbox color="secondary" defaultChecked />`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id="docs-terms" />
            <Label htmlFor="docs-terms">Saya setuju dengan syarat dan ketentuan</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="docs-checked" defaultChecked />
            <Label htmlFor="docs-checked">Opsi aktif</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="docs-disabled" disabled defaultChecked />
            <Label htmlFor="docs-disabled">Opsi nonaktif</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="docs-brand-pri" color="primary" defaultChecked />
            <Label htmlFor="docs-brand-pri">Primary</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="docs-brand-sec" color="secondary" defaultChecked />
            <Label htmlFor="docs-brand-sec">Secondary</Label>
          </div>
        </div>
      </ComponentSection>

      {/* ── Switch ── */}
      <ComponentSection
        title="Switch"
        description="Toggle on/off bergaya saklar untuk mengaktifkan atau menonaktifkan suatu pengaturan. Tersedia dua ukuran dan mendukung interaksi keyboard penuh."
        baseComponent="switch"
        props={[
          {
            prop: "size",
            type: '"sm" | "default"',
            default: '"default"',
            description: "Ukuran switch",
          },
          {
            prop: "checked",
            type: "boolean",
            default: "—",
            description: "Status aktif saat ini (controlled)",
          },
          {
            prop: "defaultChecked",
            type: "boolean",
            default: "false",
            description: "Status aktif awal (uncontrolled)",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Nonaktifkan switch",
          },
          {
            prop: "onCheckedChange",
            type: "(checked: boolean) => void",
            default: "—",
            description: "Callback yang dipanggil saat status berubah",
          },
          {
            prop: "color",
            type: '"primary" | "secondary" | "info" | "success" | "warning" | "error" | "black" | "white"',
            default: "—",
            description: "Override warna aktif switch dengan brand color",
          },
        ]}
        code={`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Switch id="notif" />
  <Label htmlFor="notif">Aktifkan notifikasi</Label>
</div>

{/* Ukuran kecil */}
<Switch size="sm" defaultChecked />

{/* Brand color */}
<Switch color="primary" defaultChecked />
<Switch color="secondary" defaultChecked />`}
      >
        <div className="flex flex-col gap-4 items-start">
          <div className="flex items-center gap-2">
            <Switch id="docs-switch-notif" />
            <Label htmlFor="docs-switch-notif">Aktifkan notifikasi</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="docs-switch-active" defaultChecked />
            <Label htmlFor="docs-switch-active">Mode aktif</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch size="sm" defaultChecked />
            <Label>Ukuran kecil (sm)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="docs-switch-disabled" disabled />
            <Label htmlFor="docs-switch-disabled">Nonaktif</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch color="primary" defaultChecked />
            <Label>Primary</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch color="secondary" defaultChecked />
            <Label>Secondary</Label>
          </div>
        </div>
      </ComponentSection>

      {/* ── Toggle ── */}
      <ComponentSection
        title="Toggle"
        description="Tombol dua-status (aktif/nonaktif) yang biasa digunakan untuk toolbar format teks, filter, atau pilihan tampilan. Dibangun di atas Radix UI Toggle."
        baseComponent="toggle"
        props={[
          {
            prop: "variant",
            type: '"default" | "outline"',
            default: '"default"',
            description: "Varian tampilan toggle",
          },
          {
            prop: "size",
            type: '"sm" | "default" | "lg"',
            default: '"default"',
            description: "Ukuran toggle",
          },
          {
            prop: "pressed",
            type: "boolean",
            default: "—",
            description: "Status aktif saat ini (controlled)",
          },
          {
            prop: "defaultPressed",
            type: "boolean",
            default: "false",
            description: "Status aktif awal (uncontrolled)",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Nonaktifkan toggle",
          },
          {
            prop: "color",
            type: '"primary" | "secondary" | "info" | "success" | "warning" | "error" | "black" | "white"',
            default: "—",
            description: "Override warna aktif toggle dengan brand color",
          },
        ]}
        code={`import { Toggle } from "@/components/ui/toggle"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

<Toggle aria-label="Bold" defaultPressed>
  <BoldIcon />
</Toggle>
<Toggle variant="outline" aria-label="Italic">
  <ItalicIcon />
</Toggle>
<Toggle variant="outline" aria-label="Underline" disabled>
  <UnderlineIcon />
</Toggle>

{/* Brand color */}
<Toggle color="primary" aria-label="Bold" defaultPressed>
  <BoldIcon />
</Toggle>
<Toggle color="secondary" aria-label="Bold" defaultPressed>
  <BoldIcon />
</Toggle>`}
      >
        <div className="flex items-center gap-2">
          <Toggle aria-label="Bold" defaultPressed>
            <BoldIcon />
          </Toggle>
          <Toggle variant="outline" aria-label="Italic">
            <ItalicIcon />
          </Toggle>
          <Toggle variant="outline" aria-label="Underline" disabled>
            <UnderlineIcon />
          </Toggle>
          <Toggle variant="outline" size="sm" aria-label="Bold kecil">
            <BoldIcon />
          </Toggle>
          <Toggle variant="outline" size="lg" aria-label="Bold besar">
            <BoldIcon />
          </Toggle>
          <Toggle color="primary" aria-label="Bold primary" defaultPressed>
            <BoldIcon />
          </Toggle>
          <Toggle color="secondary" aria-label="Bold secondary" defaultPressed>
            <BoldIcon />
          </Toggle>
        </div>
      </ComponentSection>

      {/* ── Slider ── */}
      <ComponentSection
        title="Slider"
        description="Input geser untuk memilih nilai numerik dalam rentang tertentu. Mendukung mode range (dua thumb), orientasi vertikal, dan interaksi keyboard."
        baseComponent="slider"
        props={[
          {
            prop: "min",
            type: "number",
            default: "0",
            description: "Nilai minimum",
          },
          {
            prop: "max",
            type: "number",
            default: "100",
            description: "Nilai maksimum",
          },
          {
            prop: "step",
            type: "number",
            default: "1",
            description: "Langkah perubahan nilai per interaksi",
          },
          {
            prop: "value",
            type: "number[]",
            default: "—",
            description: "Nilai saat ini (controlled) — array karena mendukung range",
          },
          {
            prop: "defaultValue",
            type: "number[]",
            default: "[min, max]",
            description: "Nilai awal (uncontrolled)",
          },
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Orientasi slider",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Nonaktifkan slider",
          },
          {
            prop: "color",
            type: '"primary" | "secondary" | "info" | "success" | "warning" | "error" | "black" | "white"',
            default: "—",
            description: "Override warna track dan thumb slider dengan brand color",
          },
        ]}
        code={`import { Slider } from "@/components/ui/slider"

{/* Single thumb */}
<Slider defaultValue={[50]} max={100} step={1} className="w-64" />

{/* Range (dua thumb) */}
<Slider defaultValue={[20, 70]} max={100} step={5} className="w-64" />

{/* Brand color */}
<Slider color="primary" defaultValue={[50]} max={100} className="w-64" />
<Slider color="secondary" defaultValue={[30]} max={100} className="w-64" />`}
      >
        <div className="flex flex-col gap-6 w-64">
          <Slider defaultValue={[50]} max={100} step={1} />
          <Slider defaultValue={[20, 70]} max={100} step={5} />
          <Slider defaultValue={[30]} max={100} disabled />
          <Slider color="primary" defaultValue={[60]} max={100} />
          <Slider color="secondary" defaultValue={[40]} max={100} />
        </div>
      </ComponentSection>

      {/* ── Separator ── */}
      <ComponentSection
        title="Separator"
        description="Garis pemisah horizontal atau vertikal untuk membagi konten secara visual. Dibangun di atas Radix UI Separator dengan dukungan aksesibilitas via aria."
        baseComponent="separator"
        props={[
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Orientasi garis pemisah",
          },
          {
            prop: "decorative",
            type: "boolean",
            default: "true",
            description: "Tandai sebagai elemen dekoratif — disembunyikan dari screen reader",
          },
        ]}
        code={`import { Separator } from "@/components/ui/separator"

{/* Horizontal */}
<Separator />

{/* Vertikal di dalam flex */}
<div className="flex items-center h-5 gap-4">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
</div>`}
      >
        <div className="flex flex-col gap-6 w-full max-w-xs">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Horizontal</p>
            <Separator />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Vertikal</p>
            <div className="flex items-center h-5 gap-4 text-sm">
              <span>Blog</span>
              <Separator orientation="vertical" />
              <span>Docs</span>
              <Separator orientation="vertical" />
              <span>Tentang</span>
            </div>
          </div>
        </div>
      </ComponentSection>

      {/* ── Skeleton ── */}
      <ComponentSection
        title="Skeleton"
        description="Placeholder animasi pulse yang meniru bentuk konten saat data sedang dimuat. Gunakan className untuk menentukan ukuran dan bentuk yang sesuai dengan konten nyata."
        baseComponent="skeleton"
        props={[
          {
            prop: "className",
            type: "string",
            default: "—",
            description: "Kelas Tailwind untuk menentukan ukuran, bentuk, dan tampilan skeleton",
          },
        ]}
        code={`import { Skeleton } from "@/components/ui/skeleton"

{/* Simulasi card dengan avatar */}
<div className="flex items-center gap-4">
  <Skeleton className="size-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[160px]" />
  </div>
</div>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="flex items-center gap-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          </div>
          <Skeleton className="h-24 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[75%]" />
          </div>
        </div>
      </ComponentSection>

      {/* ── Spinner ── */}
      <ComponentSection
        title="Spinner"
        description="Indikator loading berputar (Lucide Loader2Icon dengan animasi spin) untuk menampilkan proses yang sedang berjalan. Ukuran dan warna diatur via className."
        baseComponent="spinner"
        props={[
          {
            prop: "className",
            type: "string",
            default: "—",
            description: "Kelas Tailwind untuk mengatur ukuran, warna, dan kecepatan animasi",
          },
          {
            prop: "color",
            type: '"primary" | "secondary" | "info" | "success" | "warning" | "error" | "black" | "white"',
            default: "—",
            description: "Warnai spinner dengan brand color",
          },
        ]}
        code={`import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

{/* Ukuran berbeda */}
<Spinner className="size-4" />
<Spinner className="size-6" />
<Spinner className="size-8" />

{/* Di dalam tombol */}
<Button disabled>
  <Spinner />
  Memuat...
</Button>

{/* Brand color */}
<Spinner color="primary" className="size-6" />
<Spinner color="secondary" className="size-8" />`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <Spinner className="size-4" />
            <Spinner className="size-6" />
            <Spinner className="size-8" />
            <Spinner className="size-10 text-primary" />
            <Spinner color="primary" className="size-6" />
            <Spinner color="secondary" className="size-8" />
          </div>
          <Button disabled>
            <Spinner />
            Memuat...
          </Button>
        </div>
      </ComponentSection>

      {/* ── Kbd ── */}
      <ComponentSection
        title="Kbd"
        description="Representasi visual dari tombol keyboard untuk dokumentasi shortcut atau panduan penggunaan. Tersedia juga KbdGroup untuk mengelompokkan kombinasi tombol."
        baseComponent="kbd"
        props={[
          {
            prop: "children",
            type: "ReactNode",
            default: "—",
            description: "Label tombol — teks atau ikon SVG",
          },
          {
            prop: "className",
            type: "string",
            default: "—",
            description: "Kelas tambahan untuk kustomisasi tampilan",
          },
          {
            prop: "color",
            type: '"primary" | "secondary" | "info" | "success" | "warning" | "error" | "black" | "white"',
            default: "—",
            description: "Override warna background dan teks Kbd dengan brand color",
          },
        ]}
        code={`import { Kbd, KbdGroup } from "@/components/ui/kbd"

{/* Tombol tunggal */}
<Kbd>⌘</Kbd>
<Kbd>Enter</Kbd>
<Kbd>Esc</Kbd>

{/* Kombinasi tombol */}
<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>

{/* Brand color */}
<Kbd color="primary">⌘</Kbd>
<Kbd color="secondary">K</Kbd>`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⌥</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              Cari
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </div>
            <div className="flex items-center gap-1.5">
              Simpan
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>S</Kbd>
              </KbdGroup>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Kbd color="primary">⌘</Kbd>
            <Kbd color="secondary">K</Kbd>
            <span className="text-xs text-muted-foreground">Brand color</span>
          </div>
        </div>
      </ComponentSection>

      {/* ── Radio Group ── */}
      <ComponentSection
        title="Radio Group"
        description="Grup pilihan eksklusif di mana hanya satu opsi yang dapat dipilih. Dibangun di atas Radix UI RadioGroup dengan navigasi keyboard dan aksesibilitas penuh."
        baseComponent="radio-group"
        props={[
          {
            prop: "value",
            type: "string",
            default: "—",
            description: "Nilai opsi yang dipilih saat ini (controlled)",
          },
          {
            prop: "defaultValue",
            type: "string",
            default: "—",
            description: "Nilai opsi yang dipilih secara awal (uncontrolled)",
          },
          {
            prop: "onValueChange",
            type: "(value: string) => void",
            default: "—",
            description: "Callback yang dipanggil saat pilihan berubah",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Nonaktifkan seluruh grup radio",
          },
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"vertical"',
            description: "Orientasi navigasi keyboard antar item",
          },
          {
            prop: "RadioGroupItem color",
            type: '"primary" | "secondary" | "info" | "success" | "warning" | "error" | "black" | "white"',
            default: "—",
            description: "Override warna indikator radio item dengan brand color",
          },
        ]}
        code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<RadioGroup defaultValue="bulanan">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="harian" id="harian" />
    <Label htmlFor="harian">Harian</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="mingguan" id="mingguan" />
    <Label htmlFor="mingguan">Mingguan</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="bulanan" id="bulanan" />
    <Label htmlFor="bulanan">Bulanan</Label>
  </div>
</RadioGroup>

{/* Brand color */}
<RadioGroupItem value="x" color="primary" />
<RadioGroupItem value="y" color="secondary" />`}
      >
        <RadioGroup defaultValue="bulanan">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="harian" id="docs-harian" />
            <Label htmlFor="docs-harian">Harian</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="mingguan" id="docs-mingguan" />
            <Label htmlFor="docs-mingguan">Mingguan</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="bulanan" id="docs-bulanan" />
            <Label htmlFor="docs-bulanan">Bulanan</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="tahunan" id="docs-tahunan" disabled />
            <Label htmlFor="docs-tahunan" className="opacity-50">Tahunan (nonaktif)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="brand-pri" id="docs-brand-pri" color="primary" />
            <Label htmlFor="docs-brand-pri">Primary</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="brand-sec" id="docs-brand-sec" color="secondary" />
            <Label htmlFor="docs-brand-sec">Secondary</Label>
          </div>
        </RadioGroup>
      </ComponentSection>

      {/* ── Textarea ── */}
      <ComponentSection
        title="Textarea"
        description="Kolom teks multi-baris untuk menerima input panjang dari pengguna seperti komentar, deskripsi, atau pesan. Tinggi menyesuaikan konten secara otomatis (field-sizing-content)."
        baseComponent="textarea"
        props={[
          {
            prop: "placeholder",
            type: "string",
            default: "—",
            description: "Teks placeholder yang muncul saat textarea kosong",
          },
          {
            prop: "disabled",
            type: "boolean",
            default: "false",
            description: "Nonaktifkan textarea",
          },
          {
            prop: "aria-invalid",
            type: "boolean",
            default: "false",
            description: "Tampilkan state error dengan border merah",
          },
          {
            prop: "rows",
            type: "number",
            default: "—",
            description: "Jumlah baris minimum yang ditampilkan",
          },
        ]}
        code={`import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Tulis pesan Anda di sini..." />

{/* Dengan label */}
<div className="grid gap-1.5">
  <Label htmlFor="pesan">Pesan</Label>
  <Textarea id="pesan" placeholder="Tulis pesan..." />
</div>

{/* State error */}
<Textarea aria-invalid placeholder="Kolom ini wajib diisi" />`}
      >
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Textarea placeholder="Tulis pesan Anda di sini..." />
          <Textarea disabled placeholder="Nonaktif" />
          <Textarea aria-invalid placeholder="Kolom ini wajib diisi" />
        </div>
      </ComponentSection>

      {/* ── Button Group ── */}
      <ComponentSection
        title="Button Group"
        description="Wadah untuk menggabungkan beberapa tombol atau input menjadi satu kesatuan visual yang menyatu, dengan border yang saling berbagi. Mendukung orientasi horizontal dan vertikal."
        baseComponent="button-group"
        props={[
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Arah susunan elemen di dalam grup",
          },
          {
            prop: "ButtonGroupText children",
            type: "ReactNode",
            default: "—",
            description: "Konten teks atau ikon di dalam ButtonGroupText addon",
          },
          {
            prop: "ButtonGroupSeparator orientation",
            type: '"horizontal" | "vertical"',
            default: '"vertical"',
            description: "Orientasi garis pemisah antar elemen grup",
          },
          {
            prop: "color",
            type: '"primary" | "secondary" | "info" | "success" | "warning" | "error" | "black" | "white"',
            default: "—",
            description: "Brand color untuk border grup. ButtonGroupText juga mendukung color untuk override background",
          },
        ]}
        code={`import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

{/* Grup tombol */}
<ButtonGroup>
  <Button variant="outline">Kiri</Button>
  <Button variant="outline">Tengah</Button>
  <Button variant="outline">Kanan</Button>
</ButtonGroup>

{/* Input dengan prefix teks */}
<ButtonGroup>
  <ButtonGroupText>https://</ButtonGroupText>
  <ButtonGroupSeparator />
  <Input placeholder="domain.com" className="flex-1" />
</ButtonGroup>

{/* Vertikal */}
<ButtonGroup orientation="vertical">
  <Button variant="outline">Atas</Button>
  <Button variant="outline">Bawah</Button>
</ButtonGroup>

{/* Brand color */}
<ButtonGroup>
  <ButtonGroupText color="primary">Brand</ButtonGroupText>
  <ButtonGroupSeparator />
  <Button variant="outline">Action</Button>
</ButtonGroup>`}
      >
        <div className="flex flex-col items-center gap-6">
          <ButtonGroup>
            <Button variant="outline">Kiri</Button>
            <Button variant="outline">Tengah</Button>
            <Button variant="outline">Kanan</Button>
          </ButtonGroup>
          <ButtonGroup className="w-full max-w-xs">
            <ButtonGroupText>https://</ButtonGroupText>
            <ButtonGroupSeparator />
            <Input placeholder="domain.com" className="flex-1 rounded-none border-0 shadow-none focus-visible:ring-0" />
          </ButtonGroup>
          <ButtonGroup orientation="vertical">
            <Button variant="outline">Atas</Button>
            <Button variant="outline">Tengah</Button>
            <Button variant="outline">Bawah</Button>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonGroupText color="primary">Primary</ButtonGroupText>
            <ButtonGroupSeparator />
            <Button variant="outline">Action</Button>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonGroupText color="secondary">Secondary</ButtonGroupText>
            <ButtonGroupSeparator />
            <Button variant="outline">Action</Button>
          </ButtonGroup>
        </div>
      </ComponentSection>
    </div>
  )
}
