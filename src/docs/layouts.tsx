import { ComponentSection } from "@/docs/components/ComponentSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const DASHBOARD_STATS = [
  { label: "Pendapatan", value: "Rp 24.300.000", delta: "+12%" },
  { label: "Order", value: "1.248", delta: "+4%" },
  { label: "Pengguna Aktif", value: "8.392", delta: "-2%" },
]

const PRODUCTS = [
  { name: "Headphone Studio", price: "Rp 799.000", tag: "Best Seller" },
  { name: "Mechanical Keyboard", price: "Rp 1.299.000", tag: "New" },
  { name: "Ergo Mouse", price: "Rp 459.000", tag: "Sale" },
]

const ROWS = [
  { id: "ORD-10291", customer: "Aisyah", status: "Lunas", total: "Rp 1.250.000" },
  { id: "ORD-10292", customer: "Bima", status: "Tertunda", total: "Rp 640.000" },
  { id: "ORD-10293", customer: "Chandra", status: "Dibatalkan", total: "Rp 312.000" },
  { id: "ORD-10294", customer: "Dina", status: "Lunas", total: "Rp 2.120.000" },
]

export function LayoutsDoc() {
  return (
    <div>
      <ComponentSection
        title="Login Form Layout"
        description="Contoh layout untuk halaman login: card terpusat, form yang rapih, dan CTA yang jelas. Ini adalah komposisi dari atoms + molecules + organisms (Card, Field, Input, Button, Checkbox)."
        baseComponent="layout/login-form"
        code={`import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function LoginFormLayout() {
  return (
    <div className="grid min-h-[520px] place-items-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Masuk</CardTitle>
          <CardDescription>Gunakan akun kamu untuk lanjut.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input type="email" placeholder="nama@domain.com" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input type="password" placeholder="••••••••" />
              </FieldContent>
            </Field>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-sm text-muted-foreground">Ingat saya</Label>
              </div>
              <Button variant="link" className="h-auto p-0">Lupa password?</Button>
            </div>
          </FieldGroup>
          <Separator className="my-6" />
          <Button className="w-full">Masuk</Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Belum punya akun? <Button variant="link" className="h-auto p-0">Daftar</Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}`}
      >
        <div className="grid w-full place-items-center p-2">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Masuk</CardTitle>
              <CardDescription>Gunakan akun kamu untuk lanjut.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <FieldContent>
                    <Input type="email" placeholder="nama@domain.com" />
                    <FieldDescription className="text-xs">
                      Kami tidak akan membagikan email kamu.
                    </FieldDescription>
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <FieldContent>
                    <Input type="password" placeholder="••••••••" />
                  </FieldContent>
                </Field>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="docs-remember-me" />
                    <Label
                      htmlFor="docs-remember-me"
                      className="text-sm text-muted-foreground"
                    >
                      Ingat saya
                    </Label>
                  </div>
                  <Button variant="link" className="h-auto p-0">
                    Lupa password?
                  </Button>
                </div>
              </FieldGroup>
              <Separator className="my-6" />
              <Button className="w-full">Masuk</Button>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <Button variant="link" className="h-auto p-0">
                  Daftar
                </Button>
              </p>
            </CardFooter>
          </Card>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Dashboard Layout"
        description="Contoh layout dashboard: header ringkas, grid KPI cards, dan area konten (table/reports). Cocok buat admin panel internal."
        baseComponent="layout/dashboard"
        code={`import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DashboardLayout() {
  return (
    <div className="min-h-[520px] w-full">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">Dashboard</div>
          <div className="text-sm text-muted-foreground">Ringkasan performa hari ini.</div>
        </div>
        <Button>Tambah</Button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Card>
          <CardHeader className="px-6 pb-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendapatan</CardTitle>
          </CardHeader>
          <CardContent className="px-6">
            <div className="text-2xl font-semibold">Rp 24.300.000</div>
            <Badge variant="outline" className="mt-2">+12%</Badge>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 rounded-xl border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-sm font-semibold">Order Terbaru</div>
          <Button variant="outline" size="sm">Lihat semua</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono text-xs">ORD-10291</TableCell>
              <TableCell>Aisyah</TableCell>
              <TableCell>Lunas</TableCell>
              <TableCell className="text-right">Rp 1.250.000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}`}
      >
        <div className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-lg font-semibold">Dashboard</div>
              <div className="text-sm text-muted-foreground">Ringkasan performa hari ini.</div>
            </div>
            <Button>Tambah</Button>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {DASHBOARD_STATS.map((s) => (
              <Card key={s.label}>
                <CardHeader className="px-6 pb-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {s.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="text-2xl font-semibold">{s.value}</div>
                  <Badge variant="outline" className="mt-2">
                    {s.delta}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="text-sm font-semibold">Order Terbaru</div>
              <Button variant="outline" size="sm">
                Lihat semua
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROWS.slice(0, 3).map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell>{r.customer}</TableCell>
                    <TableCell>{r.status}</TableCell>
                    <TableCell className="text-right">{r.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Product Card Layout"
        description="Grid kartu produk untuk listing e-commerce: konsisten spacing, area gambar, badge, harga, dan CTA."
        baseComponent="layout/product-cards"
        code={`import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ProductCardLayout() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="gap-2">
          <div className="aspect-[4/3] w-full rounded-lg bg-muted" />
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base">Headphone Studio</CardTitle>
            <Badge variant="secondary">Best Seller</Badge>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Nyaman dipakai lama, bass rapi, dan detail jelas.
        </CardContent>
        <CardFooter className="justify-between">
          <div className="font-semibold">Rp 799.000</div>
          <Button size="sm">Tambah</Button>
        </CardFooter>
      </Card>
    </div>
  )
}`}
      >
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Card key={p.name} className="overflow-hidden">
              <CardHeader className="gap-2">
                <div className="aspect-[4/3] w-full rounded-lg bg-muted" />
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <Badge
                    variant={p.tag === "Sale" ? "destructive" : p.tag === "New" ? "secondary" : "outline"}
                  >
                    {p.tag}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Layout card yang konsisten bikin grid kelihatan rapih walau deskripsi beda-beda.
              </CardContent>
              <CardFooter className="justify-between">
                <div className="font-semibold">{p.price}</div>
                <Button size="sm">Tambah</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection
        title="Navbar + Sidebar Layout"
        description="Pola layout aplikasi: top navbar untuk global actions + left sidebar untuk navigasi fitur. Ini biasanya jadi 'shell' untuk semua halaman dashboard."
        baseComponent="layout/app-shell"
        code={`import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function NavbarSidebarLayout() {
  return (
    <div className="min-h-[520px] overflow-hidden rounded-xl border bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="text-sm font-semibold">ANI UI</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Settings</Button>
          <Button size="sm">Invite</Button>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-[240px_1fr]">
        <aside className="border-r p-3">
          <Button variant="ghost" className="w-full justify-start">Overview</Button>
          <Button variant="ghost" className="w-full justify-start">Orders</Button>
          <Button variant="ghost" className="w-full justify-start">Products</Button>
        </aside>
        <main className="p-6">
          <div className="text-lg font-semibold">Overview</div>
          <div className="mt-1 text-sm text-muted-foreground">Konten halaman di sini.</div>
        </main>
      </div>
    </div>
  )
}`}
      >
        <div className="w-full overflow-hidden rounded-xl border border-border bg-background">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="text-sm font-semibold tracking-tight">ANI UI</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Settings
              </Button>
              <Button size="sm">Invite</Button>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
            <aside className="border-b border-border p-3 md:border-b-0 md:border-r">
              <div className="grid gap-1">
                <Button variant="ghost" className="w-full justify-start">
                  Overview
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Orders
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Products
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Customers
                </Button>
              </div>
            </aside>
            <main className="p-6">
              <div className="text-lg font-semibold">Overview</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Ini area konten utama. Biasanya pakai router dan render page di sini.
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="py-4">
                  <CardContent className="px-6">
                    <div className="text-sm text-muted-foreground">Conversion</div>
                    <div className="mt-1 text-2xl font-semibold">3.4%</div>
                  </CardContent>
                </Card>
                <Card className="py-4">
                  <CardContent className="px-6">
                    <div className="text-sm text-muted-foreground">Visits</div>
                    <div className="mt-1 text-2xl font-semibold">48.2k</div>
                  </CardContent>
                </Card>
                <Card className="py-4">
                  <CardContent className="px-6">
                    <div className="text-sm text-muted-foreground">Tickets</div>
                    <div className="mt-1 text-2xl font-semibold">92</div>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Table + Filter + Pagination"
        description="Layout list data: row filter di atas (search + status), table di tengah, pagination di bawah. Ini pola paling sering di admin panel."
        baseComponent="layout/table-list"
        code={`import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export function TableFilterPaginationLayout() {
  return (
    <div className="w-full rounded-xl border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <Input className="w-full sm:w-72" placeholder="Cari..." />
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="paid">Lunas</SelectItem>
            <SelectItem value="pending">Tertunda</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Pelanggan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{/* rows */}</TableBody>
      </Table>
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="text-xs text-muted-foreground">Menampilkan 1-10 dari 128</div>
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}`}
      >
        <div className="w-full overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4">
            <Input className="w-full sm:w-72" placeholder="Cari order..." />
            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="paid">Lunas</SelectItem>
                  <SelectItem value="pending">Tertunda</SelectItem>
                  <SelectItem value="canceled">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                Reset
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell>{r.customer}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        r.status === "Lunas"
                          ? "secondary"
                          : r.status === "Tertunda"
                            ? "outline"
                            : "destructive"
                      }
                      className="font-normal"
                    >
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{r.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="text-xs text-muted-foreground">Menampilkan 1-10 dari 128</div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Auth Split Layout"
        description="Varian layout login dengan panel informasi di kiri (desktop) dan form di kanan. Pola ini sering dipakai untuk brand messaging atau ilustrasi."
        baseComponent="layout/auth-split"
        code={`import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function AuthSplitLayout() {
  return (
    <div className="grid min-h-[520px] grid-cols-1 overflow-hidden rounded-xl border bg-card md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between p-8 bg-muted/30">
        <div className="text-sm font-semibold">ANI UI</div>
        <div className="space-y-2">
          <div className="text-lg font-semibold">Satu akun untuk semua.</div>
          <div className="text-sm text-muted-foreground">
            Singkat, konsisten, dan siap dipakai tim.
          </div>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <Card className="border-0 shadow-none py-0">
          <CardHeader className="px-0">
            <CardTitle>Masuk</CardTitle>
            <CardDescription>Selamat datang kembali.</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldContent><Input /></FieldContent>
              </Field>
              <Field>
                <FieldLabel>Password</FieldLabel>
                <FieldContent><Input type="password" /></FieldContent>
              </Field>
              <Button className="w-full">Masuk</Button>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}`}
      >
        <div className="w-full">
          <div className="grid min-h-[420px] grid-cols-1 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2">
            <div className="hidden md:flex flex-col justify-between bg-muted/30 p-8">
              <div className="text-sm font-semibold tracking-tight">ANI UI</div>
              <div className="space-y-2">
                <div className="text-lg font-semibold">Satu akun untuk semua.</div>
                <div className="text-sm text-muted-foreground">
                  Singkat, konsisten, dan siap dipakai tim.
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <Card className="border-0 py-0 shadow-none">
                <CardHeader className="px-0">
                  <CardTitle>Masuk</CardTitle>
                  <CardDescription>Selamat datang kembali.</CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <FieldGroup className="gap-4">
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <FieldContent>
                        <Input type="email" placeholder="nama@domain.com" />
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>Password</FieldLabel>
                      <FieldContent>
                        <Input type="password" placeholder="••••••••" />
                      </FieldContent>
                    </Field>
                    <Button className="w-full">Masuk</Button>
                  </FieldGroup>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ComponentSection>
    </div>
  )
}
