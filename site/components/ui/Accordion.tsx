"use client";

import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={cn("divide-y divide-taupe/20 border-y border-taupe/20", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between py-4 text-left font-medium"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <ChevronDown className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")} />
            </button>
            <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "max-h-96 pb-4" : "max-h-0")}>
              <div className="text-sm text-taupe">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
