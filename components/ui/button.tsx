"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-xs whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "rounded-none border border-white/90 bg-[#f5f0e8] text-[#0a0f1e] uppercase tracking-[0.12em] text-xs px-8 py-4 h-auto hover:bg-white hover:bg-[#f5f0e8]/25 hover:text-white transition-colors duration-300",
        secondary:
          "rounded-none border border-white/30 bg-transparent text-white/85 uppercase tracking-[0.12em] text-xs px-8 py-4 h-auto hover:border-white/70 hover:bg-[#f5f0e8]/25 hover:text-white transition-colors duration-300",
      },
      size: {
        default:
          "h-8 gap-1.5 tracking-tight rounded px-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
