"use client";

import { cn } from "@/lib/utils";

interface Pill {
  label: string;
  value: string;
  count?: number;
}

interface AdminFilterPillsProps {
  pills: Pill[];
  active: string;
  onChange: (v: string) => void;
}

export default function AdminFilterPills({ pills, active, onChange }: AdminFilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-medium transition-all",
            active === p.value
              ? "bg-brown text-ivory shadow-sm"
              : "bg-white text-taupe border border-taupe/20 hover:border-brown/40 hover:text-brown"
          )}
        >
          {p.label}
          {p.count !== undefined && (
            <span className={cn("ml-1.5", active === p.value ? "text-ivory/70" : "text-taupe/60")}>
              {p.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
