"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { handleDeleteUser } from "@/lib/actions/admin/user-action";
import { FaPlus, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { getDisplayName } from "../_utils/helpers";
import { Toolbar } from "./Toolbar";
import Pagination from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { UserTableBody } from "./UserTableBody";

const IconX = () => (
  <svg
    className="h-3.5 w-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

function DeleteModal({
  user,
  isPending,
  onConfirm,
  onClose,
}: {
  user: User | null;
  isPending: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!user) return null;
  const name = getDisplayName(user);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-text-main/45 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="del-modal-title">
      <div className="w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface shadow-[var(--shadow-md)]">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-danger/25 bg-danger-soft text-danger">
            <FaTrash />
          </div>
          <span
            id="del-modal-title"
            className="flex-1 text-[15px] font-semibold text-text-main">
            Delete user
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-hairline text-text-muted transition-colors hover:bg-surface-2 hover:text-text-main">
            <IconX />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pt-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-danger/20 bg-danger-soft text-danger">
            <FaExclamationTriangle />
          </div>
          <p className="mb-2 text-sm text-text-main">
            Delete <strong className="font-bold">{name}</strong>?
          </p>
          <p className="mb-5 text-[13px] leading-relaxed text-text-sub">
            This action is permanent. The user&apos;s account, messages, and all
            associated data will be removed.
          </p>
          <div className="flex items-start gap-2 rounded-lg border border-danger/20 bg-danger-soft px-3 py-2.5 text-left">
            <svg
              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-danger"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-xs text-danger">
              This requires admin authentication and cannot be undone.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end gap-2 border-t border-hairline px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-hairline-strong bg-surface-2 px-4 py-2 text-[13px] font-semibold text-text-sub transition-colors hover:bg-surface-3">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex items-center gap-1.5 rounded-lg bg-danger px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
            {isPending ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin-fast rounded-full border-2 border-white/30 border-t-white" />
                Deleting…
              </>
            ) : (
              <>
                <FaTrash />
                Delete permanently
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default function UserTable({
  data,
  pagination,
  search,
}: UserTableProps) {
  const [isPending, startTransition] = useTransition();
  const [target, setTarget] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const page = pagination?.page ?? 1;
  const limit = pagination?.limit ?? 10;
  const totalPages = pagination?.totalPages ?? 1;
  const total = pagination?.total ?? 0;

  const setQuery = (next: Record<string, string | number>) => {
    const q = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([k, v]) => q.set(k, String(v)));
    setLoading(true);
    router.push(`/admin/users?${q.toString()}`);
    setTimeout(() => setLoading(false), 600); // optimistic
  };

  /* ── Delete ────────────────────────────────────────────────── */
  const onDelete = () => {
    if (!target) return;
    startTransition(async () => {
      const result = await handleDeleteUser(target._id);
      if (result.success) {
        toast.success(`${getDisplayName(target)} deleted`);
        setTarget(null);
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    });
  };

  return (
    <div className="min-h-screen bg-bg px-6 py-8 font-sans text-text-main">
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* ── Page header ── */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2 ">
            <Link
              href="/admin/users/create"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-secondary px-5 py-2.5 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5">
              <FaPlus /> Add user
            </Link>
          </div>
        </div>

        {/* ── Table card ── */}
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-surface shadow-[var(--shadow-sm)]">
          <Toolbar search={search} limit={limit} setQuery={setQuery} />
          {/* Table */}
          <UserTableBody
            users={data}
            loading={loading}
            page={page}
            limit={limit}
            setTarget={setTarget}
          />
          <Pagination
            page={page}
            limit={limit}
            totalPages={totalPages}
            setQuery={setQuery}
          />
        </div>
      </div>

      {/* Delete confirmation modal */}
      {target && (
        <DeleteModal
          user={target}
          isPending={isPending}
          onConfirm={onDelete}
          onClose={() => setTarget(null)}
        />
      )}
    </div>
  );
}
