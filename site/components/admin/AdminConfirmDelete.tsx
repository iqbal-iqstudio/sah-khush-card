"use client";

interface AdminConfirmDeleteProps {
  onConfirm: (e?: React.MouseEvent) => void;
  onCancel: (e?: React.MouseEvent) => void;
}

export default function AdminConfirmDelete({ onConfirm, onCancel }: AdminConfirmDeleteProps) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="text-xs text-taupe">Delete?</span>
      <button
        onClick={(e) => onConfirm(e)}
        className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100"
      >
        Yes
      </button>
      <button
        onClick={(e) => onCancel(e)}
        className="rounded-lg bg-taupe/10 px-2.5 py-1 text-xs font-medium text-taupe transition hover:bg-taupe/20"
      >
        No
      </button>
    </div>
  );
}
