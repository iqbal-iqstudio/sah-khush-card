"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function AdminModal({ open, onClose, title, children, maxWidth = "max-w-2xl" }: AdminModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-charcoal/50 p-4 pt-[5vh] backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className={`w-full ${maxWidth} rounded-2xl bg-white shadow-lift`}>
        <div className="flex items-center justify-between border-b border-taupe/10 px-6 py-4">
          <h3 className="font-serif text-lg font-semibold text-charcoal">{title}</h3>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full text-taupe transition hover:bg-taupe/10 hover:text-charcoal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
