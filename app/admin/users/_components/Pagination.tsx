"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { pageRange } from "../_utils/pagination";
import { S } from "./styles";

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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderTop: "1px solid rgba(79,70,229,0.09)",
        background: "#FAFBFF",
        flexWrap: "wrap",
        gap: 10,
      }}>
      <span style={{ fontSize: 12, color: "#A0A5C8", fontWeight: 500 }}>
        Showing{" "}
        <strong style={{ color: "#5B5F82" }}>
          {Math.min((page - 1) * limit + 1, totalPages * limit)}–
          {Math.min(page * limit, totalPages * limit)}
        </strong>{" "}
        of{" "}
        <strong style={{ color: "#5B5F82" }}>
          {(totalPages * limit).toLocaleString()}
        </strong>{" "}
        users
      </span>

      <nav
        aria-label="Pagination"
        style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {/* Previous */}
        <button
          disabled={page <= 1}
          onClick={() => setQuery({ page: page - 1 })}
          style={S.pgBtn(false, page <= 1)}>
          <FaChevronLeft />
        </button>

        {/* Page Numbers */}
        {range.map((p, i) =>
          p === "…" ? (
            <span
              key={i}
              style={{
                padding: "0 4px",
                color: "#A0A5C8",
                fontSize: 12,
              }}>
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => setQuery({ page: p })}
              style={S.pgBtn(p === page)}
              aria-current={p === page ? "page" : undefined}>
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          disabled={page >= totalPages}
          onClick={() => setQuery({ page: page + 1 })}
          style={S.pgBtn(false, page >= totalPages)}>
          <FaChevronRight />
        </button>
      </nav>
    </div>
  );
}
