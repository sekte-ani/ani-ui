import { CalculatorIcon, FileIcon, SettingsIcon, UserIcon } from "lucide-react"
import { ComponentSection } from "@/docs/components/ComponentSection"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const INVOICE_DATA = [
  { id: "INV001", status: "Lunas", metode: "Transfer", jumlah: "Rp 250.000" },
  { id: "INV002", status: "Tertunda", metode: "Kartu Kredit", jumlah: "Rp 150.000" },
  { id: "INV003", status: "Dibatalkan", metode: "QRIS", jumlah: "Rp 350.000" },
]

export function OrganismsDoc() {
  return (
    <div>
      {/* ── Accordion ── */}
      <ComponentSection
        title="Accordion"
        description="Komponen lipat-buka untuk menampilkan konten secara bertahap. Mendukung mode single (hanya satu item terbuka) dan multiple (beberapa item bisa terbuka bersamaan). Dibangun di atas Radix UI Accordion."
        baseComponent="accordion"
        props={[
          {
            prop: "type",
            type: '"single" | "multiple"',
            default: '"single"',
            description: "Mode pembukaan — single hanya izinkan satu item, multiple izinkan banyak",
          },
          {
            prop: "collapsible",
            type: "boolean",
            default: "false",
            description: "Izinkan item yang aktif ditutup kembali (hanya berlaku saat type=single)",
          },
          {
            prop: "defaultValue",
            type: "string | string[]",
            default: "—",
            description: "Item yang terbuka secara awal (uncontrolled)",
          },
          {
            prop: "value",
            type: "string | string[]",
            default: "—",
            description: "Item yang terbuka saat ini (controlled)",
          },
        ]}
        code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Apa itu ANI UI?</AccordionTrigger>
    <AccordionContent>
      ANI UI adalah design system berbasis shadcn/ui yang dibangun
      dengan prinsip Atomic Design.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Apakah gratis digunakan?</AccordionTrigger>
    <AccordionContent>
      Ya, ANI UI sepenuhnya open-source dan gratis.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Apa itu ANI UI?</AccordionTrigger>
            <AccordionContent>
              ANI UI adalah design system berbasis shadcn/ui yang dibangun dengan prinsip Atomic
              Design — dari komponen terkecil (Atoms) hingga tata letak halaman (Templates).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Apakah gratis digunakan?</AccordionTrigger>
            <AccordionContent>
              Ya, ANI UI sepenuhnya open-source dan gratis untuk digunakan di proyek komersial
              maupun non-komersial.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Teknologi apa yang digunakan?</AccordionTrigger>
            <AccordionContent>
              Next.js, TypeScript, Tailwind CSS v4, Radix UI, dan shadcn/ui sebagai fondasi
              komponen.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentSection>

      {/* ── Dialog ── */}
      <ComponentSection
        title="Dialog"
        description="Modal overlay yang memblokir interaksi dengan konten di belakangnya. Ideal untuk konfirmasi aksi, form singkat, atau tampilan detail. Dilengkapi tombol tutup dan dukungan penutupan via Escape/klik backdrop."
        baseComponent="dialog"
        props={[
          {
            prop: "open",
            type: "boolean",
            default: "—",
            description: "Status terbuka dialog (controlled)",
          },
          {
            prop: "onOpenChange",
            type: "(open: boolean) => void",
            default: "—",
            description: "Callback saat status buka/tutup berubah",
          },
          {
            prop: "DialogContent showCloseButton",
            type: "boolean",
            default: "true",
            description: "Tampilkan tombol × di sudut kanan atas",
          },
          {
            prop: "DialogFooter showCloseButton",
            type: "boolean",
            default: "false",
            description: "Tampilkan tombol tutup di footer dialog",
          },
        ]}
        code={`import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Buka Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profil</DialogTitle>
      <DialogDescription>
        Perubahan akan disimpan setelah Anda klik Simpan.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-3 py-2">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Nama</Label>
        <Input id="name" defaultValue="John Doe" />
      </div>
    </div>
    <DialogFooter showCloseButton>
      <Button>Simpan</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>Buka Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profil</DialogTitle>
              <DialogDescription>
                Perubahan akan disimpan setelah Anda mengklik tombol Simpan.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-2">
              <div className="grid gap-1.5">
                <Label htmlFor="docs-dialog-name">Nama</Label>
                <Input id="docs-dialog-name" defaultValue="John Doe" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="docs-dialog-email">Email</Label>
                <Input id="docs-dialog-email" defaultValue="john@contoh.com" />
              </div>
            </div>
            <DialogFooter showCloseButton>
              <Button>Simpan Perubahan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentSection>

      {/* ── Drawer ── */}
      <ComponentSection
        title="Drawer"
        description="Panel geser berbasis library Vaul yang muncul dari sisi layar (atas/bawah/kiri/kanan). Mendukung gestur drag-to-close pada perangkat sentuh. Ideal untuk navigasi mobile atau form kontekstual."
        baseComponent="drawer"
        props={[
          {
            prop: "direction",
            type: '"top" | "bottom" | "left" | "right"',
            default: '"bottom"',
            description: "Arah kemunculan drawer",
          },
          {
            prop: "open",
            type: "boolean",
            default: "—",
            description: "Status terbuka drawer (controlled)",
          },
          {
            prop: "onOpenChange",
            type: "(open: boolean) => void",
            default: "—",
            description: "Callback saat status buka/tutup berubah",
          },
          {
            prop: "shouldScaleBackground",
            type: "boolean",
            default: "false",
            description: "Skala background saat drawer terbuka",
          },
        ]}
        code={`import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader,
  DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
} from "@/components/ui/drawer"

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Buka Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Menu Navigasi</DrawerTitle>
      <DrawerDescription>Pilih halaman yang ingin dikunjungi.</DrawerDescription>
    </DrawerHeader>
    <div className="px-4 pb-4 space-y-2">
      <Button variant="ghost" className="w-full justify-start">Beranda</Button>
      <Button variant="ghost" className="w-full justify-start">Produk</Button>
    </div>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Tutup</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Dari Bawah (default)</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Menu Navigasi</DrawerTitle>
                  <DrawerDescription>Pilih halaman yang ingin dikunjungi.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-2 space-y-1">
                  <Button variant="ghost" className="w-full justify-start"><UserIcon />Profil</Button>
                  <Button variant="ghost" className="w-full justify-start"><SettingsIcon />Pengaturan</Button>
                  <Button variant="ghost" className="w-full justify-start"><FileIcon />Dokumen</Button>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Tutup</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="outline">Dari Kanan</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Detail Pesanan</DrawerTitle>
                <DrawerDescription>Informasi lengkap pesanan Anda.</DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 px-4 text-sm text-muted-foreground">
                Konten drawer dari sisi kanan.
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Tutup</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </ComponentSection>

      {/* ── Card ── */}
      <ComponentSection
        title="Card"
        description="Kontainer konten berupa kotak bertepi yang mengelompokkan informasi terkait. Terdiri dari sub-komponen modular: Header, Title, Description, Action, Content, dan Footer yang bisa dikombinasikan sesuai kebutuhan."
        baseComponent="card"
        props={[
          {
            prop: "CardHeader",
            type: "ReactNode",
            default: "—",
            description: "Area header card — biasanya berisi CardTitle, CardDescription, dan CardAction",
          },
          {
            prop: "CardTitle",
            type: "ReactNode",
            default: "—",
            description: "Judul utama card",
          },
          {
            prop: "CardDescription",
            type: "ReactNode",
            default: "—",
            description: "Teks deskripsi pendek di bawah judul",
          },
          {
            prop: "CardAction",
            type: "ReactNode",
            default: "—",
            description: "Tombol atau aksi yang disejajarkan ke kanan header",
          },
          {
            prop: "CardContent",
            type: "ReactNode",
            default: "—",
            description: "Konten utama card",
          },
          {
            prop: "CardFooter",
            type: "ReactNode",
            default: "—",
            description: "Area footer — biasanya berisi tombol aksi",
          },
        ]}
        code={`import {
  Card, CardHeader, CardTitle, CardDescription,
  CardAction, CardContent, CardFooter,
} from "@/components/ui/card"

<Card className="w-80">
  <CardHeader>
    <CardTitle>Paket Pro</CardTitle>
    <CardDescription>Untuk tim kecil hingga menengah</CardDescription>
    <CardAction>
      <Badge variant="secondary">Populer</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">Rp 199.000<span className="text-sm font-normal text-muted-foreground">/bln</span></p>
    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
      <li>✓ 10 pengguna</li>
      <li>✓ 50 GB penyimpanan</li>
      <li>✓ Dukungan prioritas</li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Mulai Berlangganan</Button>
  </CardFooter>
</Card>`}
      >
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Paket Pro</CardTitle>
            <CardDescription>Untuk tim kecil hingga menengah</CardDescription>
            <CardAction>
              <Badge variant="secondary">Populer</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              Rp 199.000
              <span className="text-sm font-normal text-muted-foreground">/bln</span>
            </p>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              <li>✓ 10 pengguna</li>
              <li>✓ 50 GB penyimpanan</li>
              <li>✓ Dukungan prioritas 24/7</li>
              <li>✓ Akses semua fitur</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Mulai Berlangganan</Button>
          </CardFooter>
        </Card>
      </ComponentSection>

      {/* ── Table ── */}
      <ComponentSection
        title="Table"
        description="Tabel data terstruktur untuk menampilkan informasi dalam baris dan kolom. Mendukung header, body, footer, caption, dan hover state pada baris. Otomatis scrollable secara horizontal pada layar kecil."
        baseComponent="table"
        props={[
          {
            prop: "TableCaption",
            type: "ReactNode",
            default: "—",
            description: "Keterangan tabel yang ditampilkan di bawah tabel",
          },
          {
            prop: "TableHead",
            type: "ReactNode",
            default: "—",
            description: "Sel header kolom — dirender sebagai elemen th",
          },
          {
            prop: "TableRow data-state",
            type: '"selected"',
            default: "—",
            description: "Tandai baris sebagai terpilih untuk tampilan highlight",
          },
        ]}
        code={`import {
  Table, TableHeader, TableBody, TableRow,
  TableHead, TableCell, TableCaption,
} from "@/components/ui/table"

<Table>
  <TableCaption>Daftar invoice bulan ini</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Metode</TableHead>
      <TableHead className="text-right">Jumlah</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Lunas</TableCell>
      <TableCell>Transfer</TableCell>
      <TableCell className="text-right">Rp 250.000</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      >
        <div className="w-full max-w-lg">
          <Table>
            <TableCaption>Daftar invoice bulan ini</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICE_DATA.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.metode}</TableCell>
                  <TableCell className="text-right">{row.jumlah}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ComponentSection>

      {/* ── Tabs ── */}
      <ComponentSection
        title="Tabs"
        description="Antarmuka tab untuk mengorganisasi konten ke dalam beberapa panel yang bergantian. Mendukung orientasi horizontal dan vertikal, varian default (pill) dan line, serta navigasi keyboard penuh."
        baseComponent="tabs"
        props={[
          {
            prop: "defaultValue",
            type: "string",
            default: "—",
            description: "Tab yang aktif secara awal (uncontrolled)",
          },
          {
            prop: "value",
            type: "string",
            default: "—",
            description: "Tab yang aktif saat ini (controlled)",
          },
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Arah susunan tab list",
          },
          {
            prop: "TabsList variant",
            type: '"default" | "line"',
            default: '"default"',
            description: "Varian tampilan tab list — pill atau garis bawah",
          },
        ]}
        code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="akun">
  <TabsList>
    <TabsTrigger value="akun">Akun</TabsTrigger>
    <TabsTrigger value="keamanan">Keamanan</TabsTrigger>
    <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
  </TabsList>
  <TabsContent value="akun">
    <p>Pengaturan akun di sini.</p>
  </TabsContent>
  <TabsContent value="keamanan">
    <p>Pengaturan keamanan di sini.</p>
  </TabsContent>
  <TabsContent value="notifikasi">
    <p>Pengaturan notifikasi di sini.</p>
  </TabsContent>
</Tabs>`}
      >
        <div className="flex flex-col gap-6 w-full max-w-md">
          <Tabs defaultValue="akun">
            <TabsList>
              <TabsTrigger value="akun">Akun</TabsTrigger>
              <TabsTrigger value="keamanan">Keamanan</TabsTrigger>
              <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
            </TabsList>
            <TabsContent value="akun" className="mt-3 rounded-md border p-4 text-sm text-muted-foreground">
              Kelola informasi profil, nama tampilan, dan foto akun Anda.
            </TabsContent>
            <TabsContent value="keamanan" className="mt-3 rounded-md border p-4 text-sm text-muted-foreground">
              Ubah kata sandi, aktifkan autentikasi dua faktor, dan kelola sesi aktif.
            </TabsContent>
            <TabsContent value="notifikasi" className="mt-3 rounded-md border p-4 text-sm text-muted-foreground">
              Atur preferensi notifikasi email, push, dan in-app Anda.
            </TabsContent>
          </Tabs>
          <Tabs defaultValue="akun">
            <TabsList variant="line">
              <TabsTrigger value="akun">Akun</TabsTrigger>
              <TabsTrigger value="keamanan">Keamanan</TabsTrigger>
              <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
            </TabsList>
            <TabsContent value="akun" className="mt-3 text-sm text-muted-foreground">
              Varian <code className="text-xs bg-muted px-1 py-0.5 rounded">line</code> — garis bawah pada tab aktif.
            </TabsContent>
            <TabsContent value="keamanan" className="mt-3 text-sm text-muted-foreground">
              Pengaturan keamanan.
            </TabsContent>
            <TabsContent value="notifikasi" className="mt-3 text-sm text-muted-foreground">
              Pengaturan notifikasi.
            </TabsContent>
          </Tabs>
        </div>
      </ComponentSection>

      {/* ── Command ── */}
      <ComponentSection
        title="Command"
        description="Palet perintah (command palette) bertenaga cmdk untuk pencarian dan navigasi cepat via keyboard. Dapat digunakan sebagai komponen inline maupun di dalam dialog dengan CommandDialog."
        baseComponent="command"
        props={[
          {
            prop: "CommandInput placeholder",
            type: "string",
            default: "—",
            description: "Teks placeholder di kotak pencarian",
          },
          {
            prop: "CommandEmpty",
            type: "ReactNode",
            default: "—",
            description: "Konten yang ditampilkan saat tidak ada hasil pencarian",
          },
          {
            prop: "CommandGroup heading",
            type: "string",
            default: "—",
            description: "Judul grup item",
          },
          {
            prop: "CommandItem onSelect",
            type: "(value: string) => void",
            default: "—",
            description: "Callback saat item dipilih via klik atau Enter",
          },
          {
            prop: "CommandShortcut",
            type: "ReactNode",
            default: "—",
            description: "Label shortcut keyboard yang disejajarkan ke kanan item",
          },
        ]}
        code={`import {
  Command, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
} from "@/components/ui/command"

<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Cari perintah..." />
  <CommandList>
    <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>
    <CommandGroup heading="Saran">
      <CommandItem>
        <UserIcon />Profil
        <CommandShortcut>⌘P</CommandShortcut>
      </CommandItem>
      <CommandItem>
        <SettingsIcon />Pengaturan
        <CommandShortcut>⌘S</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
      >
        <Command className="rounded-lg border shadow-md w-full max-w-sm">
          <CommandInput placeholder="Cari perintah..." />
          <CommandList>
            <CommandEmpty>Tidak ada hasil ditemukan.</CommandEmpty>
            <CommandGroup heading="Saran">
              <CommandItem>
                <UserIcon />
                Profil
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SettingsIcon />
                Pengaturan
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <FileIcon />
                Dokumen
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Alat">
              <CommandItem>
                <CalculatorIcon />
                Kalkulator
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ComponentSection>

      {/* ── Sheet ── */}
      <ComponentSection
        title="Sheet"
        description="Panel geser yang muncul dari salah satu sisi layar (kanan/kiri/atas/bawah) dan menimpa konten. Dibangun di atas Radix UI Dialog — berbeda dari Drawer yang mendukung gestur sentuh dari library Vaul."
        baseComponent="sheet"
        props={[
          {
            prop: "SheetContent side",
            type: '"top" | "right" | "bottom" | "left"',
            default: '"right"',
            description: "Sisi layar tempat sheet muncul",
          },
          {
            prop: "SheetContent showCloseButton",
            type: "boolean",
            default: "true",
            description: "Tampilkan tombol tutup di sudut sheet",
          },
          {
            prop: "open",
            type: "boolean",
            default: "—",
            description: "Status terbuka sheet (controlled)",
          },
          {
            prop: "onOpenChange",
            type: "(open: boolean) => void",
            default: "—",
            description: "Callback saat status buka/tutup berubah",
          },
        ]}
        code={`import {
  Sheet, SheetTrigger, SheetContent, SheetHeader,
  SheetTitle, SheetDescription, SheetFooter, SheetClose,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Buka Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit Profil</SheetTitle>
      <SheetDescription>
        Buat perubahan pada profil Anda di sini.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 px-4">
      <Input placeholder="Nama" />
      <Input placeholder="Email" />
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Batal</Button>
      </SheetClose>
      <Button>Simpan</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
      >
        <div className="flex flex-wrap gap-3 justify-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Dari Kanan</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Profil</SheetTitle>
                <SheetDescription>
                  Buat perubahan pada profil Anda. Klik simpan setelah selesai.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-3 px-4">
                <div className="grid gap-1.5">
                  <Label>Nama</Label>
                  <Input placeholder="Nama lengkap" />
                </div>
                <div className="grid gap-1.5">
                  <Label>Email</Label>
                  <Input placeholder="email@contoh.com" />
                </div>
              </div>
              <SheetFooter>
                <Button>Simpan Perubahan</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Dari Kiri</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu Navigasi</SheetTitle>
                <SheetDescription>Pilih halaman tujuan.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-1 px-4">
                <Button variant="ghost" className="justify-start">Beranda</Button>
                <Button variant="ghost" className="justify-start">Produk</Button>
                <Button variant="ghost" className="justify-start">Tentang Kami</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </ComponentSection>

      {/* ── Navigation Menu ── */}
      <ComponentSection
        title="Navigation Menu"
        description="Komponen navigasi utama dengan dukungan dropdown konten kaya. Dibangun di atas Radix UI NavigationMenu dengan animasi viewport, navigasi keyboard penuh, dan dukungan link aktif."
        baseComponent="navigation-menu"
        props={[
          {
            prop: "viewport",
            type: "boolean",
            default: "true",
            description: "Aktifkan viewport animasi — nonaktifkan untuk dropdown inline",
          },
          {
            prop: "NavigationMenuTrigger",
            type: "ReactNode",
            default: "—",
            description: "Teks atau konten trigger dropdown — ikon chevron ditambahkan otomatis",
          },
          {
            prop: "NavigationMenuLink data-active",
            type: "boolean",
            default: "—",
            description: "Tandai link sebagai halaman aktif",
          },
        ]}
        code={`import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/" data-active>
        Beranda
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Produk</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-1 p-2 w-48">
          <li>
            <NavigationMenuLink href="/produk/baru">
              <span className="font-medium">Produk Baru</span>
              <span className="text-muted-foreground">Temukan produk terbaru</span>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
      >
        <div className="flex justify-center pt-2 pb-24">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" data-active>
                  Beranda
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Produk</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-2 w-52">
                    <li>
                      <NavigationMenuLink href="#">
                        <span className="font-medium text-sm">Produk Baru</span>
                        <span className="text-xs text-muted-foreground">Lihat koleksi terbaru</span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#">
                        <span className="font-medium text-sm">Diskon</span>
                        <span className="text-xs text-muted-foreground">Penawaran spesial hari ini</span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#">
                        <span className="font-medium text-sm">Semua Produk</span>
                        <span className="text-xs text-muted-foreground">Jelajahi katalog lengkap</span>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Perusahaan</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-2 w-44">
                    <li>
                      <NavigationMenuLink href="#">
                        <span className="font-medium text-sm">Tentang Kami</span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#">
                        <span className="font-medium text-sm">Karir</span>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink href="#">
                        <span className="font-medium text-sm">Kontak</span>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </ComponentSection>
    </div>
  )
}
