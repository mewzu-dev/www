import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-foreground text-background shadow-md hover:shadow-lg hover:scale-105",
        secondary:
          "border-transparent bg-muted text-foreground hover:bg-muted/80 shadow-sm",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:scale-105",
        outline:
          "text-foreground border-foreground/30 hover:bg-foreground/5 hover:border-foreground/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
