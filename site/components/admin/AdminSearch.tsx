"use client";

import { Search } from "lucide-react";

interface AdminSearchProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function AdminSearch({ value, onChange, placeholder = "Search..." }: AdminSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-taupe/20 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-taupe/50 focus:border-gold focus:ring-1 focus:ring-gold/30"
      />
    </div>
  );
}
