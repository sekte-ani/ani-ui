import * as React from "react"
import { cn } from "@/lib/utils"

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: React.ElementType
}

export function Heading1({ className, style, as: Component = "h1", ...props }: HeadingProps) {
  return (
    <Component
      style={{ fontFamily: "'Poppins', sans-serif", ...style }}
      className={cn(
        "text-[56px] leading-[61.6px] font-bold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function Heading2({ className, style, as: Component = "h2", ...props }: HeadingProps) {
  return (
    <Component
      style={{ fontFamily: "'Poppins', sans-serif", ...style }}
      className={cn(
        "text-[48px] leading-[52.8px] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function Heading3({ className, style, as: Component = "h3", ...props }: HeadingProps) {
  return (
    <Component
      style={{ fontFamily: "'Poppins', sans-serif", ...style }}
      className={cn(
        "text-[40px] leading-[44px] font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export function Heading4({ className, style, as: Component = "h4", ...props }: HeadingProps) {
  return (
    <Component
      style={{ fontFamily: "'Poppins', sans-serif", ...style }}
      className={cn(
        "text-[32px] leading-[35.2px] font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType
  weight?: "regular" | "bold"
}

export function LargeText({ className, style, weight = "regular", as: Component = "p", ...props }: TextProps) {
  return (
    <Component
      style={{ fontFamily: "'Poppins', sans-serif", ...style }}
      className={cn(
        "text-[20px] leading-[28px]",
        weight === "bold" ? "font-bold" : "font-normal",
        className
      )}
      {...props}
    />
  )
}

export function MediumText({ className, style, weight = "regular", as: Component = "p", ...props }: TextProps) {
  return (
    <Component
      style={{ fontFamily: "'Poppins', sans-serif", ...style }}
      className={cn(
        "text-[18px] leading-[25.2px]",
        weight === "bold" ? "font-bold" : "font-normal",
        className
      )}
      {...props}
    />
  )
}

export function Text({ className, style, weight = "regular", as: Component = "p", ...props }: TextProps) {
  return (
    <Component
      style={{ fontFamily: "'Poppins', sans-serif", ...style }}
      className={cn(
        "text-[16px] leading-[22.4px]",
        weight === "bold" ? "font-bold" : "font-normal",
        className
      )}
      {...props}
    />
  )
}

export function SmallText({ className, style, weight = "regular", as: Component = "p", ...props }: TextProps) {
  return (
    <Component
      style={{ fontFamily: "'Poppins', sans-serif", ...style }}
      className={cn(
        "text-[14px] leading-[19.6px]",
        weight === "bold" ? "font-bold" : "font-normal",
        className
      )}
      {...props}
    />
  )
}
