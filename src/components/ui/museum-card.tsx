import * as React from "react";
import { cn } from "@/lib/utils";

const MuseumCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative rounded-lg bg-gradient-glass backdrop-blur-md border border-border/20",
      "shadow-glass transition-all duration-500 hover:shadow-hover",
      "hover:scale-[1.02] hover:backdrop-blur-lg",
      "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-shadow before:opacity-0",
      "before:transition-opacity before:duration-300 hover:before:opacity-100",
      "animate-glass-shimmer",
      className
    )}
    {...props}
  />
));
MuseumCard.displayName = "MuseumCard";

const MuseumCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6 relative z-10",
      className
    )}
    {...props}
  />
));
MuseumCardHeader.displayName = "MuseumCardHeader";

const MuseumCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-garamond text-2xl font-semibold leading-none tracking-wide",
      "text-foreground mb-2 letter-spacing-[0.02em]",
      className
    )}
    {...props}
  />
));
MuseumCardTitle.displayName = "MuseumCardTitle";

const MuseumCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground leading-relaxed font-sans",
      className
    )}
    {...props}
  />
));
MuseumCardDescription.displayName = "MuseumCardDescription";

const MuseumCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0 relative z-10", className)}
    {...props}
  />
));
MuseumCardContent.displayName = "MuseumCardContent";

const MuseumCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 relative z-10", className)}
    {...props}
  />
));
MuseumCardFooter.displayName = "MuseumCardFooter";

export {
  MuseumCard,
  MuseumCardHeader,
  MuseumCardFooter,
  MuseumCardTitle,
  MuseumCardDescription,
  MuseumCardContent,
};