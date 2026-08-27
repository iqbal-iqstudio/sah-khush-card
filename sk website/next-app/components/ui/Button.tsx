import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "brown" | "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  brown: "bg-brown text-ivory hover:bg-brown-deep",
  gold: "bg-gold text-charcoal hover:bg-gold-soft",
  outline: "border border-brown text-brown hover:bg-brown hover:text-ivory",
  ghost: "text-charcoal hover:bg-alabaster",
};
const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-7 py-4 text-base min-h-[56px]",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
}

export function Button({ variant = "brown", size = "md", href, className, children, ...rest }: Props) {
  const cls = cn("inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200", variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
