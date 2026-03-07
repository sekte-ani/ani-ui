import {
  Home, Search, Settings, Bell, User, Heart, Star, Bookmark,
  ArrowRight, ChevronDown, Plus, X, Check, Info, AlertTriangle, ShieldCheck,
  Mail, Phone, Lock, Eye, Download, Upload, Trash2, Edit2,
  Calendar, Clock, MapPin, Link2, Share2, Copy, Filter, MoreHorizontal,
} from "lucide-react"
import { FoundationSection } from "../../docs/foundation"

// ── Data ──────────────────────────────────────────────────────────────────────

const SIZES = [
  { label: "XS",      px: 12, class: "size-3"   },
  { label: "SM",      px: 14, class: "size-3.5" },
  { label: "Base",    px: 16, class: "size-4"   },
  { label: "MD",      px: 18, class: "size-[18px]" },
  { label: "LG",      px: 20, class: "size-5"   },
  { label: "XL",      px: 24, class: "size-6"   },
  { label: "2XL",     px: 32, class: "size-8"   },
]

const ICON_GRID = [
  Home, Search, Settings, Bell, User, Heart, Star, Bookmark,
  ArrowRight, ChevronDown, Plus, X, Check, Info, AlertTriangle, ShieldCheck,
  Mail, Phone, Lock, Eye, Download, Upload, Trash2, Edit2,
  Calendar, Clock, MapPin, Link2, Share2, Copy, Filter, MoreHorizontal,
]

const STROKE_WEIGHTS = [
  { label: "Thin",    stroke: 1   },
  { label: "Regular", stroke: 1.5 },
  { label: "Medium",  stroke: 2   },
  { label: "Bold",    stroke: 2.5 },
]

// ── Export ────────────────────────────────────────────────────────────────────

export function IconStyleSection() {
  return (
    <FoundationSection
      id="icon-style"
      title="Icon Style"
      description="Panduan penggunaan ikon berbasis Lucide React — ukuran, stroke weight, dan contoh ikon yang tersedia dalam sistem."
    >

      {/* ── Size scale ── */}
      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold">Size Scale</h3>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {["Label", "Size (px)", "Tailwind Class", "Preview"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZES.map((s, i) => (
                <tr key={s.label} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                  <td className="px-4 py-2.5 text-xs font-semibold text-foreground">{s.label}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{s.px}px</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{s.class}</td>
                  <td className="px-4 py-2.5">
                    <Search className={s.class} strokeWidth={1.5} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Stroke weight ── */}
      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold">Stroke Weight</h3>
        <div className="flex flex-wrap gap-6">
          {STROKE_WEIGHTS.map(w => (
            <div key={w.label} className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted/20">
                <Star className="size-7 text-foreground" strokeWidth={w.stroke} />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-foreground">{w.label}</p>
                <p className="font-mono text-[10px] text-muted-foreground">strokeWidth={w.stroke}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Sistem ini menggunakan <span className="font-mono font-medium">strokeWidth=1.5</span> (Regular) sebagai default untuk semua ikon.
        </p>
      </div>

      {/* ── Icon library preview ── */}
      <div className="mb-2">
        <h3 className="mb-3 text-sm font-semibold">Library Preview</h3>
        <div className="grid grid-cols-8 gap-2 sm:grid-cols-10 lg:grid-cols-12">
          {ICON_GRID.map((Icon, i) => (
            <div
              key={i}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/20 text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground transition-colors"
              title={Icon.displayName ?? ""}
            >
              <Icon className="size-4" strokeWidth={1.5} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Semua ikon berasal dari{" "}
          <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2">
            Lucide React
          </a>.
          Gunakan <span className="font-mono">lucide-react</span> untuk mengimpor ikon sesuai kebutuhan.
        </p>
      </div>
    </FoundationSection>
  )
}
