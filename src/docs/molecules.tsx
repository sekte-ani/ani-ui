import { useState } from "react"
import { CalendarIcon, UserIcon } from "lucide-react"
import { toast } from "sonner"
import { ComponentSection } from "@/docs/components/ComponentSection"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Calendar } from "@/components/ui/calendar"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
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

export function MoleculesDoc() {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date())

  return (
    <div>
      {/* ── Select ── */}
      <ComponentSection
        title="Select"
        description="Dropdown pilihan berbasis Radix UI Select. Menggantikan elemen select HTML native dengan tampilan yang konsisten, aksesibel, dan mendukung keyboard navigation."
        baseComponent="select"
        props={[
          {
            prop: "value",
            type: "string",
            default: "—",
            description: "Nilai yang dipilih saat ini (controlled)",
          },
          {
            prop: "defaultValue",
            type: "string",
            default: "—",
            description: "Nilai awal yang dipilih (uncontrolled)",
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
            description: "Nonaktifkan seluruh select",
          },
          {
            prop: "SelectTrigger size",
            type: '"sm" | "default"',
            default: '"default"',
            description: "Ukuran tombol trigger",
          },
          {
            prop: "SelectContent position",
            type: '"item-aligned" | "popper"',
            default: '"item-aligned"',
            description: "Posisi dropdown konten relative terhadap trigger",
          },
        ]}
        code={`import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Pilih buah..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apel">Apel</SelectItem>
    <SelectItem value="pisang">Pisang</SelectItem>
    <SelectItem value="mangga">Mangga</SelectItem>
    <SelectItem value="jeruk" disabled>Jeruk (nonaktif)</SelectItem>
  </SelectContent>
</Select>`}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Select>
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
          <Select disabled>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Nonaktif" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentSection>

      {/* ── Field ── */}
      <ComponentSection
        title="Field"
        description="Komponen pembungkus untuk elemen form yang menyatukan label, input, deskripsi, dan pesan error dalam satu grup aksesibel. Mendukung orientasi vertikal, horizontal, dan responsif."
        baseComponent="field"
        props={[
          {
            prop: "orientation",
            type: '"vertical" | "horizontal" | "responsive"',
            default: '"vertical"',
            description: "Arah tata letak label dan input",
          },
          {
            prop: "FieldLabel htmlFor",
            type: "string",
            default: "—",
            description: "ID elemen input yang diasosiasikan",
          },
          {
            prop: "FieldDescription",
            type: "ReactNode",
            default: "—",
            description: "Teks deskripsi tambahan di bawah input",
          },
          {
            prop: "FieldError errors",
            type: "Array<{ message?: string } | undefined>",
            default: "—",
            description: "Array error yang akan ditampilkan sebagai pesan validasi",
          },
        ]}
        code={`import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

{/* Field normal */}
<Field>
  <FieldLabel htmlFor="username">Nama Pengguna</FieldLabel>
  <Input id="username" placeholder="cth: john_doe" />
  <FieldDescription>
    Nama unik yang akan ditampilkan ke pengguna lain.
  </FieldDescription>
</Field>

{/* Field dengan error */}
<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" aria-invalid placeholder="email@contoh.com" />
  <FieldError errors={[{ message: "Format email tidak valid." }]} />
</Field>`}
      >
        <FieldGroup className="w-full max-w-sm">
          <Field>
            <FieldLabel htmlFor="docs-username">Nama Pengguna</FieldLabel>
            <Input id="docs-username" placeholder="cth: john_doe" />
            <FieldDescription>
              Nama unik yang akan ditampilkan ke pengguna lain.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="docs-email-err">Email</FieldLabel>
            <Input id="docs-email-err" aria-invalid placeholder="email@contoh.com" />
            <FieldError errors={[{ message: "Format email tidak valid." }]} />
          </Field>
        </FieldGroup>
      </ComponentSection>

      {/* ── Alert ── */}
      <ComponentSection
        title="Alert"
        description="Kotak notifikasi inline untuk menyampaikan informasi penting kepada pengguna. Tersedia dua varian: default untuk informasi umum, dan destructive untuk pesan error atau peringatan kritis."
        baseComponent="alert"
        props={[
          {
            prop: "variant",
            type: '"default" | "destructive"',
            default: '"default"',
            description: "Varian tampilan alert",
          },
          {
            prop: "AlertTitle",
            type: "ReactNode",
            default: "—",
            description: "Judul alert yang ditampilkan dalam teks tebal",
          },
          {
            prop: "AlertDescription",
            type: "ReactNode",
            default: "—",
            description: "Isi deskripsi alert",
          },
        ]}
        code={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, TriangleAlertIcon } from "lucide-react"

<Alert>
  <InfoIcon />
  <AlertTitle>Informasi</AlertTitle>
  <AlertDescription>
    Pembaruan versi baru tersedia. Silakan refresh halaman.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <TriangleAlertIcon />
  <AlertTitle>Terjadi Kesalahan</AlertTitle>
  <AlertDescription>
    Sesi Anda telah berakhir. Silakan masuk kembali.
  </AlertDescription>
</Alert>`}
      >
        <div className="flex flex-col gap-3 w-full max-w-md">
          <Alert>
            <CalendarIcon />
            <AlertTitle>Informasi</AlertTitle>
            <AlertDescription>
              Pembaruan versi baru tersedia. Silakan refresh halaman Anda.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <UserIcon />
            <AlertTitle>Terjadi Kesalahan</AlertTitle>
            <AlertDescription>
              Sesi Anda telah berakhir. Silakan masuk kembali.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentSection>

      {/* ── Sonner ── */}
      <ComponentSection
        title="Sonner"
        description="Sistem notifikasi toast berbasis library Sonner. Pasang komponen Toaster satu kali di root aplikasi, lalu panggil fungsi toast() dari mana saja untuk memunculkan notifikasi dengan berbagai tipe."
        baseComponent="sonner"
        props={[
          {
            prop: "Toaster position",
            type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
            default: '"bottom-right"',
            description: "Posisi kemunculan toast di layar",
          },
          {
            prop: "Toaster richColors",
            type: "boolean",
            default: "false",
            description: "Aktifkan warna kaya untuk setiap tipe toast",
          },
          {
            prop: "toast(message)",
            type: "string",
            default: "—",
            description: "Teks pesan toast yang akan ditampilkan",
          },
          {
            prop: "toast.success / .error / .warning / .info",
            type: "string",
            default: "—",
            description: "Varian toast dengan ikon dan warna sesuai tipe",
          },
        ]}
        code={`import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

{/* Pasang Toaster di root aplikasi */}
<Toaster />

{/* Panggil toast() dari komponen mana saja */}
toast("Pesan tersimpan!")
toast.success("Berhasil diunggah!")
toast.error("Gagal menyimpan data.")
toast.warning("Kuota penyimpanan hampir penuh.")
toast.info("Fitur baru tersedia.")`}
      >
        <div className="flex flex-col items-center gap-3">
          <Toaster />
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" onClick={() => toast("Pesan umum berhasil dikirim!")}>
              Default
            </Button>
            <Button variant="outline" onClick={() => toast.success("Data berhasil disimpan!")}>
              Success
            </Button>
            <Button variant="outline" onClick={() => toast.error("Gagal menghubungi server.")}>
              Error
            </Button>
            <Button variant="outline" onClick={() => toast.warning("Kuota hampir penuh.")}>
              Warning
            </Button>
            <Button variant="outline" onClick={() => toast.info("Versi terbaru tersedia.")}>
              Info
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Klik tombol untuk memunculkan toast</p>
        </div>
      </ComponentSection>

      {/* ── Tooltip ── */}
      <ComponentSection
        title="Tooltip"
        description="Teks bantuan kecil yang muncul saat pengguna mengarahkan kursor ke elemen. Dibangun di atas Radix UI Tooltip dengan animasi masuk/keluar dan dukungan keyboard."
        baseComponent="tooltip"
        props={[
          {
            prop: "TooltipProvider delayDuration",
            type: "number",
            default: "0",
            description: "Durasi delay sebelum tooltip muncul (dalam ms)",
          },
          {
            prop: "TooltipContent side",
            type: '"top" | "right" | "bottom" | "left"',
            default: '"top"',
            description: "Sisi kemunculan tooltip relatif terhadap trigger",
          },
          {
            prop: "TooltipContent sideOffset",
            type: "number",
            default: "0",
            description: "Jarak (px) antara tooltip dan trigger",
          },
        ]}
        code={`import {
  Tooltip, TooltipContent,
  TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Arahkan kursor</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Ini adalah tooltip!</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
      >
        <TooltipProvider>
          <div className="flex flex-wrap gap-4 justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Atas (default)</Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Tooltip muncul di atas</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Kanan</Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Tooltip muncul di kanan</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Bawah</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Tooltip muncul di bawah</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </ComponentSection>

      {/* ── HoverCard ── */}
      <ComponentSection
        title="Hover Card"
        description="Kartu informasi yang muncul saat pengguna mengarahkan kursor ke elemen trigger. Ideal untuk menampilkan preview konten seperti profil pengguna atau tautan tanpa harus navigasi."
        baseComponent="hover-card"
        props={[
          {
            prop: "openDelay",
            type: "number",
            default: "700",
            description: "Delay (ms) sebelum kartu muncul",
          },
          {
            prop: "closeDelay",
            type: "number",
            default: "300",
            description: "Delay (ms) sebelum kartu hilang",
          },
          {
            prop: "HoverCardContent align",
            type: '"start" | "center" | "end"',
            default: '"center"',
            description: "Penyelarasan konten terhadap trigger",
          },
          {
            prop: "HoverCardContent side",
            type: '"top" | "right" | "bottom" | "left"',
            default: '"bottom"',
            description: "Sisi kemunculan kartu",
          },
        ]}
        code={`import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@shadcn</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">@shadcn</p>
        <p className="text-sm text-muted-foreground">Pencipta shadcn/ui</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">@shadcn</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                SC
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">@shadcn</p>
                <p className="text-xs text-muted-foreground">
                  Pencipta shadcn/ui — design system berbasis Radix + Tailwind CSS.
                </p>
                <p className="text-xs text-muted-foreground">Bergabung Januari 2023</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </ComponentSection>

      {/* ── Popover ── */}
      <ComponentSection
        title="Popover"
        description="Panel mengambang yang muncul relatif terhadap elemen trigger saat diklik. Cocok untuk form inline, filter, atau konten interaktif lainnya yang tidak memerlukan overlay penuh."
        baseComponent="popover"
        props={[
          {
            prop: "PopoverContent align",
            type: '"start" | "center" | "end"',
            default: '"center"',
            description: "Penyelarasan konten terhadap trigger",
          },
          {
            prop: "PopoverContent side",
            type: '"top" | "right" | "bottom" | "left"',
            default: '"bottom"',
            description: "Sisi kemunculan popover",
          },
          {
            prop: "PopoverContent sideOffset",
            type: "number",
            default: "4",
            description: "Jarak (px) antara popover dan trigger",
          },
        ]}
        code={`import {
  Popover, PopoverContent, PopoverTrigger,
  PopoverHeader, PopoverTitle, PopoverDescription,
} from "@/components/ui/popover"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Buka Popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <PopoverHeader>
      <PopoverTitle>Pengaturan Tampilan</PopoverTitle>
      <PopoverDescription>
        Sesuaikan preferensi tampilan Anda.
      </PopoverDescription>
    </PopoverHeader>
    <div className="mt-3 grid gap-2">
      <Input placeholder="Nama tampilan" />
      <Button size="sm">Simpan</Button>
    </div>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Buka Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <PopoverHeader>
              <PopoverTitle>Pengaturan Tampilan</PopoverTitle>
              <PopoverDescription>
                Sesuaikan preferensi tampilan Anda.
              </PopoverDescription>
            </PopoverHeader>
            <div className="mt-3 grid gap-2">
              <Input placeholder="Nama tampilan" />
              <Button size="sm">Simpan</Button>
            </div>
          </PopoverContent>
        </Popover>
      </ComponentSection>

      {/* ── Progress ── */}
      <ComponentSection
        title="Progress"
        description="Indikator kemajuan berbentuk batang horizontal untuk menampilkan persentase penyelesaian suatu proses, seperti unggahan file, pengisian form, atau langkah onboarding."
        baseComponent="progress"
        props={[
          {
            prop: "value",
            type: "number",
            default: "0",
            description: "Nilai kemajuan saat ini — dalam rentang 0 hingga max",
          },
          {
            prop: "max",
            type: "number",
            default: "100",
            description: "Nilai maksimum kemajuan",
          },
        ]}
        code={`import { Progress } from "@/components/ui/progress"

<Progress value={33} />
<Progress value={66} />
<Progress value={100} />`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mengunggah...</span>
              <span>33%</span>
            </div>
            <Progress value={33} />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Memproses...</span>
              <span>66%</span>
            </div>
            <Progress value={66} />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Selesai</span>
              <span>100%</span>
            </div>
            <Progress value={100} />
          </div>
        </div>
      </ComponentSection>

      {/* ── Breadcrumb ── */}
      <ComponentSection
        title="Breadcrumb"
        description="Navigasi hierarkis yang menunjukkan posisi halaman saat ini dalam struktur situs. Membantu pengguna memahami konteks dan berpindah ke halaman induk dengan mudah."
        baseComponent="breadcrumb"
        props={[
          {
            prop: "BreadcrumbLink asChild",
            type: "boolean",
            default: "false",
            description: "Render tautan sebagai slot komponen anak (mis. Link dari router)",
          },
          {
            prop: "BreadcrumbSeparator children",
            type: "ReactNode",
            default: "<ChevronRight />",
            description: "Kustomisasi pemisah antar item — default ikon chevron kanan",
          },
        ]}
        code={`import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/produk">Produk</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Detail Produk</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Beranda</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Produk</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Elektronik</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Laptop Gaming</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ComponentSection>

      {/* ── Pagination ── */}
      <ComponentSection
        title="Pagination"
        description="Navigasi halaman untuk memisahkan konten berjumlah besar ke dalam beberapa halaman. Mendukung tombol Previous/Next, nomor halaman aktif, dan ellipsis untuk halaman yang disembunyikan."
        baseComponent="pagination"
        props={[
          {
            prop: "PaginationLink isActive",
            type: "boolean",
            default: "false",
            description: "Tandai sebagai halaman aktif — tampil dengan varian outline",
          },
          {
            prop: "PaginationLink size",
            type: '"default" | "sm" | "lg" | "icon"',
            default: '"icon"',
            description: "Ukuran tombol pagination",
          },
        ]}
        code={`import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`}
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </ComponentSection>

      {/* ── Calendar ── */}
      <ComponentSection
        title="Calendar"
        description="Komponen kalender interaktif berbasis react-day-picker untuk memilih tanggal tunggal, rentang tanggal, atau beberapa tanggal sekaligus. Mendukung navigasi bulan, pemilihan tahun, dan kustomisasi hari yang dinonaktifkan."
        baseComponent="calendar"
        props={[
          {
            prop: "mode",
            type: '"single" | "multiple" | "range"',
            default: "—",
            description: "Mode pemilihan tanggal",
          },
          {
            prop: "selected",
            type: "Date | Date[] | DateRange",
            default: "—",
            description: "Tanggal yang dipilih saat ini (controlled)",
          },
          {
            prop: "onSelect",
            type: "(date: Date | undefined) => void",
            default: "—",
            description: "Callback dipanggil saat tanggal dipilih",
          },
          {
            prop: "showOutsideDays",
            type: "boolean",
            default: "true",
            description: "Tampilkan hari dari bulan sebelum/sesudah",
          },
          {
            prop: "captionLayout",
            type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
            default: '"label"',
            description: "Tata letak caption navigasi bulan/tahun",
          },
          {
            prop: "disabled",
            type: "Matcher | Matcher[]",
            default: "—",
            description: "Hari atau rentang yang dinonaktifkan",
          },
        ]}
        code={`import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border"
/>`}
      >
        <Calendar
          mode="single"
          selected={calendarDate}
          onSelect={setCalendarDate}
          className="rounded-lg border"
        />
      </ComponentSection>
    </div>
  )
}
