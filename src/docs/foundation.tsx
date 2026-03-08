import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { ColorPaletteSection } from "@/components/foundation/color-palette"
import { SpacingSection } from "@/components/foundation/spacing"
import { BorderRadiusSection } from "@/components/foundation/border-radius"
import { GridSystemSection } from "@/components/foundation/grid-systems"
import { ShadowSection } from "@/components/foundation/shadow"
import { IconStyleSection } from "@/components/foundation/icon-style"
import { ComponentSection } from "@/docs/components/ComponentSection"
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

// ── Shared helpers (re-exported for subsection files) ─────────────────────────

export function CodeBlock({ code }: { code: string }) {
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

export function FoundationSection({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-8 py-10 border-b border-border last:border-b-0">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

// ── Typography subsections ────────────────────────────────────────────────────

const SHARED_HEADING_PROPS = [
  {
    prop: "as",
    type: "React.ElementType",
    default: "h1 / h2 / h3 / h4",
    description: "Render sebagai elemen HTML lain (misalnya div, span)",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Kelas tambahan untuk override tampilan",
  },
  {
    prop: "style",
    type: "React.CSSProperties",
    default: "—",
    description: "Inline style yang akan di-merge dengan style bawaan",
  },
]

const SHARED_TEXT_PROPS = [
  {
    prop: "weight",
    type: '"regular" | "bold"',
    default: '"regular"',
    description: "Ketebalan font — regular (400) atau bold (700)",
  },
  {
    prop: "as",
    type: "React.ElementType",
    default: '"p"',
    description: "Render sebagai elemen HTML lain (misalnya span, div)",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Kelas tambahan untuk override tampilan",
  },
  {
    prop: "style",
    type: "React.CSSProperties",
    default: "—",
    description: "Inline style yang akan di-merge dengan style bawaan",
  },
]

function TypographyDoc() {
  return (
    <FoundationSection
      id="typography-"
      title="Typography"
      description="Skala tipografi heading dan body text menggunakan font Poppins dari Google Fonts."
    >
      {/* ── Heading 1 ── */}
      <ComponentSection
        title="Heading 1"
        description="Judul utama halaman — 56px / 61.6px / Bold 700. Digunakan untuk hero section atau page title."
        baseComponent="Heading1"
        props={SHARED_HEADING_PROPS}
        code={`import { Heading1 } from "@/components/ui/typography"

<Heading1>Desain yang Berdampak</Heading1>

{/* Render sebagai elemen lain */}
<Heading1 as="div">Sebagai div</Heading1>`}
      >
        <Heading1 className="text-foreground">Desain yang Berdampak</Heading1>
      </ComponentSection>

      {/* ── Heading 2 ── */}
      <ComponentSection
        title="Heading 2"
        description="Judul bagian atau seksi — 48px / 52.8px / Semibold 600."
        baseComponent="Heading2"
        props={SHARED_HEADING_PROPS}
        code={`import { Heading2 } from "@/components/ui/typography"

<Heading2>Komponen yang Konsisten</Heading2>`}
      >
        <Heading2 className="text-foreground">Komponen yang Konsisten</Heading2>
      </ComponentSection>

      {/* ── Heading 3 ── */}
      <ComponentSection
        title="Heading 3"
        description="Sub-judul atau judul kartu — 40px / 44px / Semibold 600."
        baseComponent="Heading3"
        props={SHARED_HEADING_PROPS}
        code={`import { Heading3 } from "@/components/ui/typography"

<Heading3>Sistem yang Terstruktur</Heading3>`}
      >
        <Heading3 className="text-foreground">Sistem yang Terstruktur</Heading3>
      </ComponentSection>

      {/* ── Heading 4 ── */}
      <ComponentSection
        title="Heading 4"
        description="Judul item atau panel kecil — 32px / 35.2px / Medium 500."
        baseComponent="Heading4"
        props={SHARED_HEADING_PROPS}
        code={`import { Heading4 } from "@/components/ui/typography"

<Heading4>Antarmuka yang Intuitif</Heading4>`}
      >
        <Heading4 className="text-foreground">Antarmuka yang Intuitif</Heading4>
      </ComponentSection>

      {/* ── Large Text ── */}
      <ComponentSection
        title="Large Text"
        description="Teks besar untuk paragraf utama atau deskripsi hero — 20px / 28px."
        baseComponent="LargeText"
        props={SHARED_TEXT_PROPS}
        code={`import { LargeText } from "@/components/ui/typography"

<LargeText>Teks besar ringan untuk paragraf atau deskripsi utama.</LargeText>
<LargeText weight="bold">Teks besar dengan penekanan kuat.</LargeText>`}
      >
        <div className="flex flex-col gap-2">
          <LargeText className="text-foreground">Teks besar ringan untuk paragraf atau deskripsi utama.</LargeText>
          <LargeText weight="bold" className="text-foreground">Teks besar dengan penekanan kuat untuk konten penting.</LargeText>
        </div>
      </ComponentSection>

      {/* ── Medium Text ── */}
      <ComponentSection
        title="Medium Text"
        description="Teks medium untuk label sekunder atau isi konten — 18px / 25.2px."
        baseComponent="MediumText"
        props={SHARED_TEXT_PROPS}
        code={`import { MediumText } from "@/components/ui/typography"

<MediumText>Teks medium standar untuk isi konten dan deskripsi.</MediumText>
<MediumText weight="bold">Teks medium tebal untuk label atau highlight sekunder.</MediumText>`}
      >
        <div className="flex flex-col gap-2">
          <MediumText className="text-foreground">Teks medium standar untuk isi konten dan deskripsi.</MediumText>
          <MediumText weight="bold" className="text-foreground">Teks medium tebal untuk label atau highlight sekunder.</MediumText>
        </div>
      </ComponentSection>

      {/* ── Text (Normal) ── */}
      <ComponentSection
        title="Text"
        description="Teks normal — ukuran dasar antarmuka — 16px / 22.4px."
        baseComponent="Text"
        props={SHARED_TEXT_PROPS}
        code={`import { Text } from "@/components/ui/typography"

<Text>Teks normal standar — ukuran dasar antarmuka.</Text>
<Text weight="bold">Teks normal tebal untuk judul item atau sub-label.</Text>`}
      >
        <div className="flex flex-col gap-2">
          <Text className="text-foreground">Teks normal standar — ukuran dasar antarmuka.</Text>
          <Text weight="bold" className="text-foreground">Teks normal tebal untuk judul item atau sub-label.</Text>
        </div>
      </ComponentSection>

      {/* ── Small Text ── */}
      <ComponentSection
        title="Small Text"
        description="Teks kecil untuk caption, badge, hint, atau metadata — 14px / 19.6px."
        baseComponent="SmallText"
        props={SHARED_TEXT_PROPS}
        code={`import { SmallText } from "@/components/ui/typography"

<SmallText>Teks kecil ringan untuk hint, placeholder, atau note.</SmallText>
<SmallText weight="bold">Teks kecil tebal untuk caption, badge, atau metadata.</SmallText>`}
      >
        <div className="flex flex-col gap-2">
          <SmallText className="text-foreground">Teks kecil ringan untuk hint, placeholder, atau note.</SmallText>
          <SmallText weight="bold" className="text-foreground">Teks kecil tebal untuk caption, badge, atau metadata.</SmallText>
        </div>
      </ComponentSection>
    </FoundationSection>
  )
}

// ── Page-level doc component (mirrors AtomsDoc pattern) ───────────────────────

export function FoundationDoc() {
  return (
    <div>
      <ColorPaletteSection />
      <TypographyDoc />
      <SpacingSection />
      <BorderRadiusSection />
      <GridSystemSection />
      <ShadowSection />
      <IconStyleSection />
    </div>
  )
}
