import * as React from "react"
import {
  BarChart3Icon,
  CalendarIcon,
  CheckSquareIcon,
  ChevronsLeftIcon,
  FolderKanbanIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type DashboardSidebarItemId =
  | "dashboard"
  | "projects"
  | "tasks"
  | "calendar"
  | "team"
  | "reports"
  | "settings"

type DashboardSidebarItem = {
  id: DashboardSidebarItemId
  label: string
  icon: React.ComponentType<React.ComponentProps<"svg">>
}

type DashboardSidebarProps = React.ComponentProps<"aside"> & {
  brandLabel?: string
  items?: DashboardSidebarItem[]
  activeItem?: DashboardSidebarItemId
  onItemClick?: (item: DashboardSidebarItemId) => void
  onCollapse?: () => void
  collapseLabel?: string
}

const defaultDashboardSidebarItems: DashboardSidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { id: "projects", label: "Projects", icon: FolderKanbanIcon },
  { id: "tasks", label: "Tasks", icon: CheckSquareIcon },
  { id: "calendar", label: "Calendar", icon: CalendarIcon },
  { id: "team", label: "Team", icon: UsersIcon },
  { id: "reports", label: "Reports", icon: BarChart3Icon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
]

function DashboardSidebar({
  className,
  brandLabel = "Ani's",
  items = defaultDashboardSidebarItems,
  activeItem = "dashboard",
  onItemClick,
  onCollapse,
  collapseLabel = "Collapse",
  ...props
}: DashboardSidebarProps) {
  return (
    <aside
      data-slot="organism-sidebar"
      className={cn(
        "flex min-h-[548px] w-44 flex-col border border-[#d6d7da] bg-[#ECECEF] px-3 py-4",
        className
      )}
      {...props}
    >
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="flex size-6 items-center justify-center rounded-md bg-[#2F67D9]">
          <span className="relative size-3">
            <span className="absolute left-0 top-0 h-2 w-2 rounded-[2px] border border-white" />
            <span className="absolute bottom-0 right-0 size-1.5 rounded-full bg-white" />
          </span>
        </span>
        <span className="text-[19px] font-semibold tracking-tight text-[#20263A]">
          {brandLabel}
        </span>
      </div>

      <nav aria-label="Sidebar Navigation" className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.id === activeItem

          return (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onItemClick?.(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "h-8 w-full justify-start rounded-full px-3 text-[11px] font-medium transition-colors [&_svg]:size-3.5",
                isActive
                  ? "!bg-[#2F67D9] !text-white shadow-[inset_0_0_0_1px_#3D75EB]"
                  : "text-[#6F788E] hover:bg-[#DFE2E9] hover:text-[#4F5B74]"
              )}
            >
              <Icon />
              <span>{item.label}</span>
            </Button>
          )
        })}
      </nav>

      <div className="mt-auto pt-4">
        <Separator className="mb-3 bg-[#D7D9DF]" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCollapse}
          className="h-8 w-full justify-start rounded-lg px-3 text-[11px] font-semibold text-[#8A90A1] transition-colors hover:bg-[#DFE2E9] hover:text-[#636D84] [&_svg]:size-3.5"
        >
          <ChevronsLeftIcon />
          <span>{collapseLabel}</span>
        </Button>
      </div>
    </aside>
  )
}

export type { DashboardSidebarItem, DashboardSidebarItemId, DashboardSidebarProps }
export { DashboardSidebar, defaultDashboardSidebarItems }
export default DashboardSidebar
