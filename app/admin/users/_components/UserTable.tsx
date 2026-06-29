"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { handleDeleteUser } from "@/lib/actions/admin/user-action";
import { FaPlus } from "react-icons/fa";
import { getDisplayName } from "../_utils/helpers";
import { Toolbar } from "./Toolbar";
import { S } from "./styles";
import Pagination from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { UserTableBody } from "./UserTableBody";

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
    /* Faux modal viewport — normal-flow div so it contributes layout height */
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(13,14,26,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        backdropFilter: "blur(3px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="del-modal-title">
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(79,70,229,0.14)",
          borderRadius: 16,
          width: "100%",
          maxWidth: 400,
          boxShadow:
            "0 20px 60px rgba(67,56,202,0.15), 0 4px 16px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 20px",
            borderBottom: "1px solid rgba(79,70,229,0.10)",
          }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "rgba(220,38,38,0.10)",
              border: "1px solid rgba(220,38,38,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </div>
          <span
            id="del-modal-title"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#0D0E1A",
              flex: 1,
              fontFamily: "'Manrope', sans-serif",
            }}>
            Delete user
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              border: "1px solid rgba(79,70,229,0.14)",
              background: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#A0A5C8",
            }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 24px 0", textAlign: "center" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "rgba(220,38,38,0.08)",
              border: "1px solid rgba(220,38,38,0.20)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC2626"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <p
            style={{
              fontSize: 14,
              color: "#0D0E1A",
              marginBottom: 8,
              fontFamily: "'Manrope', sans-serif",
            }}>
            Delete <strong style={{ fontWeight: 700 }}>{name}</strong>?
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#5B5F82",
              lineHeight: 1.6,
              marginBottom: 18,
              fontFamily: "'Manrope', sans-serif",
            }}>
            This action is permanent. The user account, messages, and all
            associated data will be removed.
          </p>

          {/* Warning note */}
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              padding: "10px 12px",
              borderRadius: 10,
              marginBottom: 4,
              background: "rgba(220,38,38,0.06)",
              border: "1px solid rgba(220,38,38,0.18)",
            }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DC2626"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ flexShrink: 0, marginTop: 1 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span
              style={{
                fontSize: 12,
                color: "#991B1B",
                fontFamily: "'Manrope', sans-serif",
              }}>
              This requires admin authentication and cannot be undone.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            padding: "16px 20px",
            borderTop: "1px solid rgba(79,70,229,0.10)",
            marginTop: 16,
          }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 18px",
              borderRadius: 10,
              border: "1px solid rgba(79,70,229,0.18)",
              background: "#F0F2FA",
              color: "#5B5F82",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Manrope', sans-serif",
              transition: "all 0.15s",
            }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 18px",
              borderRadius: 10,
              border: "none",
              background: isPending ? "rgba(220,38,38,0.5)" : "#DC2626",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: isPending ? "not-allowed" : "pointer",
              fontFamily: "'Manrope', sans-serif",
              opacity: isPending ? 0.7 : 1,
              transition: "all 0.15s",
            }}>
            {isPending ? (
              <>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.35)",
                    borderTopColor: "#fff",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Deleting…
              </>
            ) : (
              <>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
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
    <div style={S.page}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* ── Page header ── */}
        <div style={S.headerRow} className="relative">
          <div className="flex flex-col gap-2 ">
            <Link
              href="/admin/users/create"
              style={S.addBtn}
              className="aura-add-btn right-0">
              <FaPlus /> Add user
            </Link>
          </div>
        </div>

        {/* ── Table card ── */}
        <div style={S.card}>
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
