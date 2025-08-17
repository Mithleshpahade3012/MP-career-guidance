import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Modal({ onClose, children, title = "Quick Guidance Tip" }) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Close when clicking the backdrop only (not inside dialog)
  const handleBackdropMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onMouseDown={handleBackdropMouseDown}
    >
      {/* Backdrop behind dialog (clicks here close) */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Dialog above backdrop */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        className="relative z-[101] max-w-md w-[92%] sm:w-full rounded-2xl bg-white p-6 shadow-2xl"
        // prevent clicks inside from bubbling to backdrop
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 text-gray-700">
          {children ?? (
            <>
              <p className="font-semibold text-lg text-cyan-600">Career Advice</p>
              <p className="mt-2">
                Focus on your strengths, stay informed about MP Govt. opportunities, and believe in your journey.
              </p>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
