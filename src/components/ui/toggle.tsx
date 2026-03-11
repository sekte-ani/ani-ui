import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { type ColorToken, colorMap } from "@/components/ui/color-palette.variants"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  color,
  style,
  ...props
}: Omit<React.ComponentProps<typeof TogglePrimitive.Root>, "color"> &
  VariantProps<typeof toggleVariants> & {
    color?: ColorToken
  }) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        toggleVariants({ variant, size }),
        color
          ? "data-[state=on]:bg-[var(--tg-brand)] data-[state=on]:text-white"
          : "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        className
      )}
      style={
        color
          ? { ...style, "--tg-brand": colorMap[color] } as React.CSSProperties
          : style
      }
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
