import { useState } from "react"
import { FileIcon, SettingsIcon, UserIcon, CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable, type ColumnType } from "@/components/organism/data-table"
import { Header } from "@/components/organism/header"
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DashboardSidebar,
  type DashboardSidebarItemId,
} from "@/components/organism/sidebar"

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

function HeaderInteractive() {
  const [showBadge, setShowBadge] = useState(true)
  const [showMenu, setShowMenu] = useState(false)

  const code = `import { Header } from "@/components/organism/header"

<Header
  title="ANI UI"
  badge="${showBadge ? "Beta" : ""}"
  nav={[
    { label: "Docs", href: "#", active: true },
    { label: "Components", href: "#" },
    { label: "Changelog", href: "#" },
  ]}
  user={{ name: "Anis", avatarFallback: "AN" }}
  ${showMenu ? "onMenuClick={() => console.log(\"menu\")}\n  " : ""}searchPlaceholder="Cari..."
/>`

  return (
    <section id="header" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Header</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Header sederhana untuk navigasi, pencarian, notifikasi, dan menu akun.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Badge</span>
            <button
              onClick={() => setShowBadge(!showBadge)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                showBadge
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {showBadge ? "On" : "Off"}
            </button>
          </div>
          <div>
            <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Mobile Menu</span>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
                showMenu
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {showMenu ? "On" : "Off"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-background overflow-hidden">
        <Header
          className="static bg-background"
          title="ANI UI"
          badge={showBadge ? "Beta" : ""}
          nav={[
            { label: "Docs", href: "#", active: true },
            { label: "Components", href: "#" },
            { label: "Changelog", href: "#" },
          ]}
          user={{ name: "Anis", avatarFallback: "AN" }}
          onMenuClick={showMenu ? () => {} : undefined}
          searchPlaceholder="Cari..."
        />
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function AccordionInteractive() {
  const [collapsible, setCollapsible] = useState(true)

  const code = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

<Accordion type="single"${collapsible ? " collapsible" : ""} defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Apa itu ANI UI?</AccordionTrigger>
    <AccordionContent>
      ANI UI adalah design system.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Apakah gratis?</AccordionTrigger>
    <AccordionContent>
      Ya, sepenuhnya open-source.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

  return (
    <section id="accordion" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Accordion</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Komponen lipat-buka untuk menampilkan konten secara bertahap.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <div>
          <span className="mb-2 block text-xs font-medium text-muted-foreground uppercase tracking-wider">Collapsible</span>
          <button
            onClick={() => setCollapsible(!collapsible)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-all border",
              collapsible
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-muted/40 text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {collapsible ? "Yes" : "No"}
          </button>
        </div>
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Accordion type="single" collapsible={collapsible} defaultValue="item-1" className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Apa itu ANI UI?</AccordionTrigger>
            <AccordionContent>
              ANI UI adalah design system berbasis shadcn/ui yang dibangun dengan prinsip Atomic Design.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Apakah gratis digunakan?</AccordionTrigger>
            <AccordionContent>
              Ya, ANI UI sepenuhnya open-source dan gratis untuk digunakan.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Teknologi apa yang digunakan?</AccordionTrigger>
            <AccordionContent>
              Next.js, TypeScript, Tailwind CSS v4, Radix UI, dan shadcn/ui.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function TabsInteractive() {
  const [variant, setVariant] = useState<"default" | "line">("default")

  const code = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="akun">
  <TabsList${variant !== "default" ? ` variant="${variant}"` : ""}>
    <TabsTrigger value="akun">Akun</TabsTrigger>
    <TabsTrigger value="keamanan">Keamanan</TabsTrigger>
  </TabsList>
  <TabsContent value="akun">Konten akun...</TabsContent>
  <TabsContent value="keamanan">Konten keamanan...</TabsContent>
</Tabs>`

  return (
    <section id="tabs" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Tabs</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Antarmuka tab untuk mengorganisasi konten ke dalam beberapa panel.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Variant"
          options={["default", "line"] as const}
          value={variant}
          onChange={setVariant}
        />
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Tabs defaultValue="akun" className="w-full max-w-md">
          <TabsList variant={variant}>
            <TabsTrigger value="akun">Akun</TabsTrigger>
            <TabsTrigger value="keamanan">Keamanan</TabsTrigger>
            <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
          </TabsList>
          <TabsContent value="akun" className="mt-3 rounded-md border p-4 text-sm text-muted-foreground">
            Kelola informasi profil, nama tampilan, dan foto akun Anda.
          </TabsContent>
          <TabsContent value="keamanan" className="mt-3 rounded-md border p-4 text-sm text-muted-foreground">
            Ubah kata sandi, aktifkan autentikasi dua faktor.
          </TabsContent>
          <TabsContent value="notifikasi" className="mt-3 rounded-md border p-4 text-sm text-muted-foreground">
            Atur preferensi notifikasi email dan push.
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function SheetInteractive() {
  const [side, setSide] = useState<"top" | "right" | "bottom" | "left">("right")

  const code = `import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button>Buka Sheet</Button>
  </SheetTrigger>
  <SheetContent side="${side}">
    <SheetHeader>
      <SheetTitle>Edit Profil</SheetTitle>
    </SheetHeader>
    Konten sheet di sini...
  </SheetContent>
</Sheet>`

  return (
    <section id="sheet" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Sheet</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Panel geser yang muncul dari salah satu sisi layar.
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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Buka Sheet</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit Profil</SheetTitle>
              <SheetDescription>
                Buat perubahan pada profil Anda.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Konten sheet dari sisi {side}.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function DrawerInteractive() {
  const [direction, setDirection] = useState<"top" | "bottom" | "left" | "right">("bottom")

  const code = `import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

<Drawer direction="${direction}">
  <DrawerTrigger asChild>
    <Button>Buka Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Menu</DrawerTitle>
    </DrawerHeader>
    Konten drawer di sini...
  </DrawerContent>
</Drawer>`

  return (
    <section id="drawer" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Drawer</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Panel geser berbasis Vaul yang muncul dari sisi layar.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Direction"
          options={["top", "bottom", "left", "right"] as const}
          value={direction}
          onChange={setDirection}
        />
      </div>

      <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-border bg-muted/30 p-8">
        <Drawer direction={direction}>
          <DrawerTrigger asChild>
            <Button variant="outline">Buka Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Menu Navigasi</DrawerTitle>
              <DrawerDescription>Pilih halaman yang ingin dikunjungi.</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-4 space-y-1">
              <Button variant="ghost" className="w-full justify-start"><UserIcon />Profil</Button>
              <Button variant="ghost" className="w-full justify-start"><SettingsIcon />Pengaturan</Button>
              <Button variant="ghost" className="w-full justify-start"><FileIcon />Dokumen</Button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Tutup</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

// ── DataTable demo data ──────────────────────────────────────────────────────

interface DemoUser extends Record<string, unknown> {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const DEMO_COLUMNS: ColumnType<DemoUser>[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    filters: [
      { text: "John", value: "John" },
      { text: "Jim", value: "Jim" },
      { text: "Joe", value: "Joe" },
    ],
    onFilter: (value, record) => record.name.includes(value as string),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: (a, b) => a.age - b.age,
    align: "right" as const,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    filters: [
      { text: "New York", value: "New York" },
      { text: "London", value: "London" },
      { text: "Sydney", value: "Sydney" },
    ],
    onFilter: (value, record) => record.address.includes(value as string),
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (value) => {
      const tags = Array.isArray(value) ? (value as string[]) : []
      return (
        <div className="flex gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )
    },
  },
]

const DEMO_DATA: DemoUser[] = [
  { key: "1", name: "John Brown", age: 32, address: "New York No. 1 Lake Park", tags: ["nice", "developer"] },
  { key: "2", name: "Jim Green", age: 42, address: "London No. 1 Lake Park", tags: ["cool"] },
  { key: "3", name: "Joe Black", age: 32, address: "Sydney No. 1 Lake Park", tags: ["teacher"] },
  { key: "4", name: "Jim Red", age: 28, address: "London No. 2 Lake Park", tags: ["designer"] },
]

function DataTableInteractive() {
  const [selection, setSelection] = useState<"none" | "checkbox" | "radio">("checkbox")
  const [tableSize, setTableSize] = useState<"sm" | "default" | "lg">("default")
  const [isBordered, setIsBordered] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const rowSelection =
    selection === "none"
      ? undefined
      : {
          type: selection as "checkbox" | "radio",
          selectedRowKeys,
          onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
        }

  const code = `import { DataTable, type ColumnType } from "@/components/organism/data-table"
import { Badge } from "@/components/ui/badge"

interface User {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const columns: ColumnType<User>[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    filters: [
      { text: "John", value: "John" },
      { text: "Jim", value: "Jim" },
    ],
    onFilter: (value, record) => record.name.includes(value as string),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: (a, b) => a.age - b.age,
    align: "right",
  },
  { title: "Address", dataIndex: "address", key: "address" },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags: string[]) => (
      <div className="flex gap-1">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>
    ),
  },
]

const data: User[] = [
  { key: "1", name: "John Brown", age: 32, address: "New York", tags: ["nice"] },
  { key: "2", name: "Jim Green", age: 42, address: "London", tags: ["cool"] },
]

<DataTable<User>
  dataSource={data}
  columns={columns}${selection !== "none" ? `\n  rowSelection={{ type: "${selection}" }}` : ""}${tableSize !== "default" ? `\n  size="${tableSize}"` : ""}${isBordered ? `\n  bordered` : ""}
/>`

  return (
    <section id="data-table" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Data Table</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A configurable data table with sorting, filtering, and row selection.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-5">
        <PillSelect
          label="Selection"
          options={["none", "checkbox", "radio"] as const}
          value={selection}
          onChange={setSelection}
        />
        <PillSelect
          label="Size"
          options={["sm", "default", "lg"] as const}
          value={tableSize}
          onChange={setTableSize}
        />
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
      </div>

      {selectedRowKeys.length > 0 && (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span>Selected {selectedRowKeys.length} item{selectedRowKeys.length > 1 ? "s" : ""}</span>
          <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setSelectedRowKeys([])}>
            Clear
          </Button>
        </div>
      )}

      <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
        <DataTable<DemoUser>
          dataSource={DEMO_DATA}
          columns={DEMO_COLUMNS}
          rowSelection={rowSelection}
          size={tableSize}
          bordered={isBordered}
        />
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

function SidebarInteractive() {
  const [activeItem, setActiveItem] = useState<DashboardSidebarItemId>("dashboard")

  const code = `import { DashboardSidebar } from "@ani-ui/anis"

function Example() {
  const [activeItem, setActiveItem] = useState("dashboard")

  return (
    <DashboardSidebar
      activeItem={activeItem}
      onItemClick={(item) => setActiveItem(item)}
      onCollapse={() => console.log("collapse sidebar")}
    />
  )
}`

  return (
    <section id="sidebar" className="scroll-mt-8 py-10 border-b border-border">
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Sidebar</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sidebar dashboard siap pakai berbasis komponen `ui` (Button dan
              Separator) dengan state aktif dan aksi collapse.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-6 space-y-3">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          Active Item
        </span>
        <p className="text-sm font-medium text-foreground">{activeItem}</p>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-zinc-900/95 p-5">
        <DashboardSidebar
          activeItem={activeItem}
          onItemClick={setActiveItem}
          className="min-h-[536px] border-[#D6D7DA] shadow-sm"
        />
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">Kode</h3>
        <PlaygroundCodeBlock code={code} />
      </div>
    </section>
  )
}

export function OrganismsDoc() {
  return (
    <div>
      <HeaderInteractive />
      <AccordionInteractive />
      <DataTableInteractive />
      <TabsInteractive />
      <SheetInteractive />
      <DrawerInteractive />
      <SidebarInteractive />
    </div>
  )
}
