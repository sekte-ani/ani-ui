import * as React from "react"
import { BellIcon, MenuIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type HeaderNavItem = {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
}

type HeaderUser = {
  name: string
  avatarSrc?: string
  avatarFallback?: string
}

type HeaderProps = {
  className?: string
  title?: string
  badge?: string
  nav?: HeaderNavItem[]
  user?: HeaderUser
  onMenuClick?: () => void
  searchValue?: string
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
}

function Header({
  className,
  title = "ANI UI",
  badge = "Beta",
  nav = [
    { label: "Docs", href: "#" },
    { label: "Components", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  user = { name: "Anis", avatarFallback: "AN" },
  onMenuClick,
  searchValue,
  searchPlaceholder = "Cari...",
  onSearchChange,
}: HeaderProps) {
  const [uncontrolledSearch, setUncontrolledSearch] = React.useState("")
  const isSearchControlled = searchValue !== undefined
  const resolvedSearchValue = isSearchControlled ? searchValue : uncontrolledSearch

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <TooltipProvider>
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4">
          <div className="flex items-center gap-2">
            {onMenuClick && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="md:hidden"
                    onClick={onMenuClick}
                    aria-label="Buka menu"
                  >
                    <MenuIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={6}>Menu</TooltipContent>
              </Tooltip>
            )}

            <a href="#" className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight">
                {title}
              </span>
              {badge && <Badge variant="secondary">{badge}</Badge>}
            </a>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Button
                key={item.label}
                asChild={Boolean(item.href)}
                variant={item.active ? "secondary" : "ghost"}
                size="sm"
                onClick={item.onClick}
              >
                {item.href ? <a href={item.href}>{item.label}</a> : item.label}
              </Button>
            ))}
          </nav>

          <div className="ml-auto flex flex-1 items-center justify-end gap-2">
            <div className="relative hidden w-full max-w-sm md:block">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={resolvedSearchValue}
                onChange={(e) => {
                  if (!isSearchControlled) setUncontrolledSearch(e.target.value)
                  onSearchChange?.(e.target.value)
                }}
                placeholder={searchPlaceholder}
                className="pl-9"
              />
            </div>

            <Separator orientation="vertical" className="hidden h-8 md:block" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Notifikasi"
                >
                  <BellIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>Notifikasi</TooltipContent>
            </Tooltip>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 gap-2 px-2"
                  aria-label="Buka menu akun"
                >
                  <Avatar size="sm">
                    {user.avatarSrc ? (
                      <AvatarImage
                        src={user.avatarSrc}
                        alt={user.name}
                      />
                    ) : null}
                    <AvatarFallback>
                      {user.avatarFallback ?? user.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium md:inline">
                    {user.name}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64 p-3">
                <PopoverHeader className="gap-0.5">
                  <PopoverTitle>{user.name}</PopoverTitle>
                  <PopoverDescription className="text-xs">
                    Kelola akun dan preferensi
                  </PopoverDescription>
                </PopoverHeader>
                <Separator className="my-3" />
                <div className="grid gap-1">
                  <Button variant="ghost" className="justify-start">
                    Profil
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Pengaturan
                  </Button>
                  <Button variant="ghost" className="justify-start text-destructive">
                    Keluar
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </TooltipProvider>
    </header>
  )
}

export { Header }
