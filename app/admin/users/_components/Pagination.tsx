"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { pageRange } from "../_utils/pagination";

interface PaginationProps {
  page: number;
  limit: number;
  totalPages: number;
  setQuery: (query: Record<string, string | number>) => void;
}

export default function Pagination({
  page,
  limit,
  totalPages,
  setQuery,
}: PaginationProps) {
  const range = pageRange(page, totalPages);

  if (totalPages === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-hairline bg-bg px-5 py-3">
      <span className="text-xs font-medium text-text-muted">
        Showing{" "}
        <strong className="text-text-sub">
          {Math.min((page - 1) * limit + 1, totalPages)}–
          {Math.min(page * limit, totalPages).toLocaleString()}
        </strong>{" "}
        of{" "}
        <strong className="text-text-sub">{totalPages.toLocaleString()}</strong>{" "}
        users
      </span>

      <nav aria-label="Pagination" className="flex items-center gap-1">
        <button
          disabled={page <= 1}
          onClick={() => setQuery({ page: page - 1 })}
          aria-label="Previous page"
          className="flex h-8 min-w-8 items-center justify-center rounded-md border border-hairline-strong bg-surface text-text-sub transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40">
          <FaChevronLeft />
        </button>

        {range.map((p, i) =>
          p === "…" ? (
            <span key={`e-${i}`} className="px-1 text-xs text-text-muted">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => setQuery({ page: p })}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold transition-all ${
                p === page
                  ? "bg-gradient-to-br from-primary to-secondary text-white shadow-[var(--shadow-glow)]"
                  : "border border-hairline-strong bg-surface text-text-sub hover:bg-surface-2"
              }`}>
              {p}
            </button>
          ),
        )}

        <button
          disabled={page >= totalPages}
          onClick={() => setQuery({ page: page + 1 })}
          aria-label="Next page"
          className="flex h-8 min-w-8 items-center justify-center rounded-md border border-hairline-strong bg-surface text-text-sub transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40">
          <FaChevronRight />
        </button>
      </nav>
    </div>
  );
}
