import { cn } from "@/lib/utils";

type Tone = "brown" | "gold" | "taupe" | "emerald" | "rose" | "amber";

const tones: Record<Tone, string> = {
  brown: "bg-brown text-ivory",
  gold: "bg-gold-soft text-brown",
  taupe: "border border-taupe/40 text-taupe",
  emerald: "bg-emerald-600 text-white",
  rose: "bg-rose-600 text-white",
  amber: "bg-amber-500 text-white",
};

export function Badge({ tone = "brown", children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider", tones[tone], className)}>{children}</span>;
}
