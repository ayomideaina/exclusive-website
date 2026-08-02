"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export default function AppModal({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "app-modal-title" : undefined}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white rounded p-6 shadow-lg"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
        >
          <X className="w-5 h-5" />
        </button>

        {title && (
          <h2 id="app-modal-title" className="text-lg font-semibold mb-3 pr-6">
            {title}
          </h2>
        )}

        <div className="text-sm text-text-secondary mb-6">{children}</div>

        {actions && <div className="flex items-center justify-end gap-3">{actions}</div>}
      </div>
    </div>
  );
}
