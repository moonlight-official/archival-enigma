import * as React from "react";
import { cn } from "@/lib/utils";

const MuseumCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative rounded-lg bg-gradient-to-br from-museum-charcoal to-museum-aged-gold/80",
      "border border-museum-aged-gold/30 shadow-glass transition-all duration-500 hover:shadow-hover",
      "hover:scale-[1.02]",
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
      "flex flex-col space-y-1.5 p-8 relative z-10 text-center",
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
      "font-garamond text-3xl font-bold leading-tight tracking-wide text-center",
      "text-museum-parchment mb-4 drop-shadow-lg",
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
      "text-base text-museum-aged-paper leading-relaxed font-sans text-center drop-shadow",
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
    className={cn("p-8 pt-0 relative z-10 text-center", className)}
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