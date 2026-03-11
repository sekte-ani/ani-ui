"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { type ColorToken, colorClassMap } from "@/components/ui/color-palette.variants"

function Label({
  className,
  color,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & {
  color?: ColorToken
}) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        color && colorClassMap[color],
        className
      )}
      {...props}
    />
  )
}

export { Label }
