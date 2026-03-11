"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { type ColorToken, colorMap } from "@/components/ui/color-palette.variants"

function Checkbox({
  className,
  color,
  style,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  color?: ColorToken
}) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        color
          ? "data-[state=checked]:border-[var(--cb-brand)] data-[state=checked]:bg-[var(--cb-brand)] data-[state=checked]:text-white dark:data-[state=checked]:bg-[var(--cb-brand)]"
          : "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary",
        className
      )}
      style={
        color
          ? { ...style, "--cb-brand": colorMap[color] } as React.CSSProperties
          : style
      }
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
