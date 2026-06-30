import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { formatDate, getDisplayName } from "../_utils/helpers";
import { Avatar } from "./Avatar";
import { StatusBadge } from "./StatusBadge";
import { RoleBadge } from "./RoleBadge";
import Link from "next/link";
export function UserTableBody({
  users,
  loading,
  page,
  limit,
  setTarget,
}: {
  users: User[];
  loading: boolean;
  page: number;
  limit: number;
  setTarget: (u: User | null) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-left text-sm">
        <colgroup>
          <col className="w-10" />
          <col className="w-[22%]" />
          <col className="w-[20%]" />
          <col className="w-[16%]" />
          <col className="w-[10%]" />
          <col className="w-[18%]" />
          <col className="w-28" />
        </colgroup>
        <thead>
          <tr className="border-b border-hairline bg-surface-2 w-[100%] text-[11px] font-semibold uppercase tracking-wide text-text-sub">
            {["#", "Name", "Email", "Phone", "Role", "Status", "Actions"].map(
              (h, i) => (
                <th
                  key={h}
                  className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide text-text-muted ${i === 7 ? "text-right" : "text-left"}`}>
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {/* //loading state */}
          {loading && (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-text-muted">
                Loading...
              </td>
            </tr>
          )}

          {/* Empty state */}
          {!loading && users.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-text-muted">
                No users found.
              </td>
            </tr>
          )}

          {!loading &&
            users.map((u, idx) => {
              const name = getDisplayName(u);
              const rowNum = (page - 1) * limit + idx + 1;
              return (
                <tr
                  key={u._id}
                  className="border-b border-hairline transition-colors hover:bg-surface-2">
                  <td className="px-4 py-3 text-xs font-medium text-text-muted">
                    {rowNum}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar user={u} />
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-semibold text-text-main">
                          {name}
                        </div>
                        {u.phoneNumber && (
                          <div className="text-[11px] text-text-muted">
                            {u.phoneNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="truncate px-4 py-3 text-text-sub">
                    {u.email}
                  </td>
                  <td className="px-4 py-3 text-text-sub">
                    {u.phoneNumber || (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <RoleBadge role={u.role} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={u.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-text-muted">
                    {formatDate(u.createdAt)}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/admin/users/${u._id}`}
                        title={`View ${name}`}
                        className="inline-flex items-center gap-1 rounded-md border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-semibold text-text-sub transition-all hover:-translate-y-px hover:opacity-90">
                        <FaEye /> View
                      </Link>
                      <Link
                        href={`/admin/users/${u._id}/edit`}
                        title={`Edit ${name}`}
                        className="inline-flex items-center gap-1 rounded-md border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-semibold text-text-sub transition-all hover:-translate-y-px hover:opacity-90">
                        <FaEdit /> Edit
                      </Link>
                      <button
                        onClick={() => setTarget(u)}
                        title={`Delete ${name}`}
                        aria-label={`Delete ${name}`}
                        className="inline-flex items-center rounded-md border border-danger/20 bg-danger-soft px-2 py-1 text-danger transition-all hover:-translate-y-px hover:opacity-90">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
