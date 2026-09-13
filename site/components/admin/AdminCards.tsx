"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
}

export function StatCard({ label, value, icon: Icon, color, subtitle }: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-taupe/10 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-taupe/20">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-sm text-taupe">{label}</p>
          <p className="mt-1 text-2xl font-bold text-charcoal truncate">{value}</p>
          {subtitle && <p className="mt-0.5 text-xs text-taupe/70">{subtitle}</p>}
        </div>
        <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-transform group-hover:scale-105", color)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

interface AdminEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminEmptyState({ icon: Icon, title, description, action }: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-taupe/5 text-taupe/40">
        <Icon className="h-8 w-8" />
      </div>
      <p className="mt-4 font-serif text-lg text-charcoal">{title}</p>
      {description && <p className="mt-1 text-sm text-taupe">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
