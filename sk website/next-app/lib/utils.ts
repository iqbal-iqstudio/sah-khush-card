import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Bangladeshi Taka. */
export function formatBDT(value: number): string {
  return `৳${value.toLocaleString("en-BD")}`;
}

/** Build a WhatsApp deep link for an order message. */
export function whatsappLink(message: string, number = "8801XXXXXXXXX"): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
