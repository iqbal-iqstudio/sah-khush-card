import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-taupe/30 bg-ivory px-4 py-3 text-sm outline-none transition focus:border-brown focus:ring-1 focus:ring-brown",
        className
      )}
      {...rest}
    />
  );
}
