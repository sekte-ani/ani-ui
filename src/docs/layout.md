# Panduan Membuat Layout (Atomic Design)

Dokumen ini jadi catatan internal untuk bikin **Layout** di design system kita: cara mikirnya, langkah-langkahnya, dan contoh 1 layout (Login Form).

## 1) Definisi singkat: Layout itu apa?

Dalam konteks Atomic Design:
- **Atoms**: komponen paling kecil (Button, Input, Label, Checkbox, Separator, Badge, dll).
- **Molecules**: gabungan atoms untuk fungsi kecil (mis. `Field`, `Select`, `Pagination`, dsb).
- **Organisms**: blok UI lebih besar/reusable (mis. `Card`, `Table`, `Dialog`, `Navigation Menu`, dsb).
- **Layout**: *susunan* (composition) beberapa atoms/molecules/organisms untuk membentuk struktur halaman/section yang konsisten. Layout fokus ke **struktur + spacing + responsif**, bukan bikin “komponen baru” yang sangat spesifik bisnis.

> Aturan praktis: kalau sudah ada interaksi/flow spesifik (validasi, submit, fetching), itu biasanya naik jadi “feature/page”, bukan layout murni.

## 2) Prinsip saat bikin layout

1. **Mulai dari tujuan**: halaman apa, user mau ngapain, elemen apa yang wajib ada.
2. **Tentukan struktur besar** dulu (shell): header/footer/sidebar/2-column/centered card.
3. **Komposisi, bukan reinvent**: pakai atoms/molecules/organisms yang sudah ada.
4. **Konsisten spacing**: pilih grid/gap/padding yang konsisten antar layout.
5. **Responsif dari awal**: minimal mobile dulu → baru desktop.
6. **Aksesibilitas**: label terhubung ke input (`htmlFor`/`id`), tombol jelas, link/CTA tidak ambigu.
7. **States jelas**: loading/disabled/error/empty.

## 3) Checklist cepat sebelum “layout” dianggap beres

- [ ] Struktur utama jelas (container, alignment, max-width).
- [ ] Hierarki visual (judul, deskripsi, CTA utama).
- [ ] Spacing konsisten (gap/padding tidak “asal” per komponen).
- [ ] Responsif (minimal: stack di mobile, grid di desktop).
- [ ] A11y (label/input, fokus, tombol/link).
- [ ] Variasi state minimal (disabled/error untuk form).
- [ ] Bisa direuse (nggak hardcode terlalu banyak hal bisnis).

## 4) Langkah-langkah bikin Layout: contoh “Login Form Layout”

Target: layout login yang umum dipakai:
- Card di tengah layar
- Ada title + description
- Field email & password
- Remember me + forgot password
- CTA “Masuk”

### Step 1 — Tentukan “shell”

Pilih pola: **centered card**.
- Container: `grid place-items-center`
- Tinggi: `min-h-[520px]` (contoh untuk area demo docs)
- Lebar card: `max-w-md`

### Step 2 — Susun konten pakai organism (Card)

Gunakan `Card` sebagai kerangka:
- `CardHeader` untuk judul & deskripsi
- `CardContent` untuk form
- `CardFooter` untuk link/secondary CTA

### Step 3 — Gunakan molecules untuk bentuk form yang konsisten

Gunakan `FieldGroup` + `Field` + `FieldLabel` + `FieldContent`:
- `FieldLabel` untuk label (aksesibel)
- `Input` di `FieldContent`
- Opsional `FieldDescription` / `FieldError` sesuai kebutuhan

### Step 4 — Tambahkan atoms untuk actions & helper

- `Checkbox` + `Label` untuk “Ingat saya”
- `Button` varian `link` untuk “Lupa password?”
- `Separator` untuk pemisah visual
- `Button` utama full-width untuk submit

### Step 5 — Rapihin responsif & alignment

- Pastikan row “remember/forgot” bisa wrap: `flex-wrap` + `justify-between`
- Pastikan tombol utama `w-full`

### Step 6 — Dokumentasi & contoh penggunaan

Contoh implementasi (di project ini pakai komponen dari `src/components/ui/*`):

```tsx
import { Button } from "@/components/ui/button"
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

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-sm text-muted-foreground">
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
            Belum punya akun? <Button variant="link" className="h-auto p-0">Daftar</Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
```

## 5) Kapan layout “naik level” jadi organism/feature?

- Kalau layout itu sudah punya bagian yang *selalu muncul* sebagai blok reusable (mis. “LoginForm” dipakai di banyak tempat), pertimbangkan bikin **Organism** `LoginForm` (isi form + validation state), lalu layout cukup nyusun `AuthShell + LoginForm`.
- Kalau sudah terikat data/state bisnis (auth flow, API, error mapping), itu biasanya jadi **feature/page**.

