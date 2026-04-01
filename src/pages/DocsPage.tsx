import { useEffect, useRef, useState } from "react"
import { ChevronRightIcon, SearchIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { AtomsDoc } from "@/docs/atoms"
import { MoleculesDoc } from "@/docs/molecules"
import { OrganismsDoc } from "@/docs/organisms"
import { LayoutsDoc } from "@/docs/layouts"
import { GuidelinesDoc } from "@/docs/guidelines"

// Only items that have a real section rendered in the content area
const NAV_GROUPS = [
  {
    label: "Atoms",
    items: [
      "Button",
      "Badge",
      "Input",
      "Label",
      "Avatar",
      "Checkbox",
      "Switch",
      "Toggle",
      "Slider",
      "Separator",
      "Skeleton",
      "Spinner",
      "Kbd",
      "Radio Group",
      "Textarea",
      "Button Group",
    ],
  },
  {
    label: "Molecules",
    items: [
      "Select",
      "Field",
      "Alert",
      "Sonner",
      "Tooltip",
      "Hover Card",
      "Popover",
      "Progress",
      "Breadcrumb",
      "Pagination",
      "Calendar",
    ],
  },
  {
    label: "Organisms",
    items: [
      "Accordion",
      "Dialog",
      "Drawer",
      "Card",
      "Table",
      "Tabs",
      "Command",
      "Sheet",
      "Navigation Menu",
    ],
  },
  {
    label: "Layouts",
    items: [
      "Login Form Layout",
      "Dashboard Layout",
      "Product Card Layout",
      "Navbar + Sidebar Layout",
      "Table + Filter + Pagination",
      "Auth Split Layout",
    ],
  },
  {
    label: "Guidelines",
    items: [
      "Primary vs Secondary Button",
      "Spacing Rules",
      "Color Usage Limits",
      "Icon Usage",
    ],
  },
]

const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items)

function toId(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-")
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const idx = text.toLowerCase().indexOf(query)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="font-semibold text-foreground underline decoration-muted-foreground/50">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  )
}

export function DocsPage() {
  const mainRef = useRef<HTMLElement>(null)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(NAV_GROUPS.map((g) => [g.label, true]))
  )
  const [activeItem, setActiveItem] = useState<string>("Button")
  const [search, setSearch] = useState("")

  const q = search.trim().toLowerCase()

  // Filtered nav: hide non-matching items and empty groups when searching
  const filteredGroups = NAV_GROUPS.map((group) => ({
    ...group,
    items: q
      ? group.items.filter((item) => item.toLowerCase().includes(q))
      : group.items,
  })).filter((group) => group.items.length > 0)

  function toggleGroup(label: string) {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  // While searching, all groups with matches are expanded
  function isOpen(label: string) {
    return q ? true : openGroups[label]
  }

  // Smooth scroll: prevent default anchor jump, use scrollIntoView instead
  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, item: string) {
    e.preventDefault()
    setActiveItem(item)
    const el = document.getElementById(toId(item))
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Track active section based on scroll position
  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    const sections = Array.from(main.querySelectorAll<HTMLElement>("section[id]"))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const matched = ALL_ITEMS.find((item) => toId(item) === entry.target.id)
            if (matched) setActiveItem(matched)
          }
        }
      },
      {
        root: main,
        // Active zone: section top edge within the top ~20% of the container
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* ── Sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-60 shrink-0 flex-col border-r border-border bg-background">
        {/* Logo */}
        <div className="flex h-14 shrink-0 items-center border-b border-border px-6">
          <span className="text-sm font-semibold tracking-tight">ANI UI</span>
        </div>

        {/* Search */}
        <div className="shrink-0 border-b border-border px-3 py-3">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari komponen..."
              className="h-8 w-full rounded-md border border-input bg-transparent pl-8 pr-7 text-sm outline-none placeholder:text-muted-foreground transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Hapus pencarian"
              >
                <XIcon className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {filteredGroups.length === 0 ? (
            <p className="px-3 py-6 text-center text-xs text-muted-foreground">
              Tidak ada komponen ditemukan.
            </p>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.label} className="mb-3">
                <button
                  onClick={() => !q && toggleGroup(group.label)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors",
                    !q && "hover:text-foreground"
                  )}
                >
                  {group.label}
                  {!q && (
                    <ChevronRightIcon
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        isOpen(group.label) && "rotate-90"
                      )}
                    />
                  )}
                </button>

                {isOpen(group.label) && (
                  <ul className="mt-1 space-y-0.5">
                    {group.items.map((item) => (
                      <li key={item}>
                        <a
                          href={`#${toId(item)}`}
                          onClick={(e) => handleNavClick(e, item)}
                          className={cn(
                            "flex items-center rounded-md px-3 py-1.5 text-sm transition-colors",
                            activeItem === item
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          )}
                        >
                          {q ? <HighlightMatch text={item} query={q} /> : item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <main ref={mainRef} className="ml-60 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-8 py-12">
          <h1 className="text-3xl font-bold tracking-tight">ANI UI</h1>
          <p className="mt-2 text-muted-foreground">
            Dokumentasi design system berbasis shadcn/ui — dibangun dengan Atomic Design.
          </p>
          <div className="mt-10">
            <AtomsDoc />
            <MoleculesDoc />
            <OrganismsDoc />
            <LayoutsDoc />
            <GuidelinesDoc />
          </div>
        </div>
      </main>
    </div>
  )
}
