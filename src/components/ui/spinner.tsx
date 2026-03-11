import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { type ColorToken, colorClassMap } from "@/components/ui/color-palette.variants"

function Spinner({
  className,
  color,
  ...props
}: React.ComponentProps<"svg"> & { color?: ColorToken }) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", color && colorClassMap[color], className)}
      {...props}
    />
  )
}

export { Spinner }
