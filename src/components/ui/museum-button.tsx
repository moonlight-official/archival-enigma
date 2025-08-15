import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const museumButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        exhibit: [
          "bg-gradient-glass backdrop-blur-md border border-border/20",
          "text-foreground shadow-glass",
          "hover:shadow-hover hover:backdrop-blur-lg",
          "active:scale-[0.98] transition-all duration-300",
          "before:absolute before:inset-0 before:bg-gradient-golden before:opacity-0",
          "before:transition-opacity before:duration-500",
          "hover:before:opacity-10"
        ],
        liquid: [
          "bg-primary text-primary-foreground border border-primary/30",
          "shadow-exhibit relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-golden",
          "before:translate-x-[-100%] before:transition-transform before:duration-700",
          "hover:before:translate-x-0",
          "after:absolute after:inset-0 after:bg-primary after:z-[-1]"
        ],
        archive: [
          "border-2 border-accent/30 bg-muted/50 text-muted-foreground",
          "hover:border-accent hover:text-accent-foreground",
          "hover:bg-accent/10 transition-colors duration-400",
          "font-garamond tracking-wide"
        ]
      },
      size: {
        default: "h-10 px-4 py-2 rounded-md",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "exhibit",
      size: "default",
    },
  }
);

export interface MuseumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof museumButtonVariants> {
  asChild?: boolean;
}

const MuseumButton = React.forwardRef<HTMLButtonElement, MuseumButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(museumButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
MuseumButton.displayName = "MuseumButton";

export { MuseumButton, museumButtonVariants };