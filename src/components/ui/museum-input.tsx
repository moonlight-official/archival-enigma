import * as React from "react";
import { cn } from "@/lib/utils";

export interface MuseumInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const MuseumInput = React.forwardRef<HTMLInputElement, MuseumInputProps>(
  ({ className, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className="relative group">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full bg-transparent px-3 py-3 text-base",
            "text-foreground placeholder:text-muted-foreground/60",
            "border-none outline-none font-sans tracking-wide",
            "transition-all duration-500 focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        <div
          className={cn(
            "absolute bottom-0 left-0 h-[1px] bg-gradient-to-r",
            "from-accent/20 via-accent to-accent/20 transition-all duration-700",
            isFocused
              ? "w-full opacity-100 animate-ink-flow"
              : "w-0 opacity-50"
          )}
        />
        <div
          className={cn(
            "absolute bottom-0 left-1/2 h-[2px] w-0 bg-accent",
            "transform -translate-x-1/2 transition-all duration-500",
            "rounded-full blur-[0.5px]",
            isFocused ? "w-1/3 opacity-100" : "w-0 opacity-0"
          )}
        />
      </div>
    );
  }
);
MuseumInput.displayName = "MuseumInput";

export { MuseumInput };