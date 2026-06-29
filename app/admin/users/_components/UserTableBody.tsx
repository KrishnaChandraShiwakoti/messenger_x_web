import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { S } from "./styles";
import { getDisplayName } from "../_utils/helpers";
import page from "../page";
import { Avatar } from "./Avatar";
import { StatusBadge } from "./StatusBadge";
import { RoleBadge } from "./RoleBadge";
import Link from "next/link";
import { iconActionBtn } from "./ActionButtons";
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
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}>
        <colgroup>
          <col style={{ width: 48 }} />
          <col style={{ width: "22%" }} />
          <col style={{ width: "26%" }} />
          <col style={{ width: "16%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: 120 }} />
        </colgroup>
        <thead>
          <tr>
            {["#", "Name", "Email", "Phone", "Role", "Status", "Actions"].map(
              (h, i) => (
                <th
                  key={h}
                  style={{
                    ...S.th,
                    textAlign: i === 7 ? "right" : "left",
                  }}>
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {/* Loading state */}
          {loading && (
            <tr>
              <td colSpan={8} style={{ ...S.td, textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          )}

          {/* Empty state */}
          {!loading && users.length === 0 && (
            <tr>
              <td colSpan={8} style={{ ...S.td, textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}

          {/* Data rows */}
          {!loading &&
            users.map((u, idx) => {
              const name = getDisplayName(u);
              const rowNum = (page - 1) * limit + idx + 1;
              return (
                <tr
                  key={u._id}
                  className="aura-row"
                  style={{
                    background: "#fff",
                    transition: "background 0.1s",
                  }}>
                  {/* # */}
                  <td
                    style={{
                      ...S.td,
                      color: "#C8CAE0",
                      fontSize: 12,
                      fontWeight: 500,
                    }}>
                    {rowNum}
                  </td>

                  {/* Name + avatar */}
                  <td style={S.td}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}>
                      <Avatar user={u} />
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            color: "#0D0E1A",
                            fontSize: 13,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}>
                          {name}
                        </div>
                        {u.phoneNumber && (
                          <div
                            style={{
                              fontSize: 11,
                              color: "#A0A5C8",
                              marginTop: 1,
                            }}>
                            {u.phoneNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td
                    style={{
                      ...S.td,
                      color: "#5B5F82",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                    {u.email}
                  </td>

                  {/* Phone */}
                  <td style={{ ...S.td, color: "#5B5F82" }}>
                    {u.phoneNumber || (
                      <span style={{ color: "#C8CAE0" }}>—</span>
                    )}
                  </td>

                  {/* Role */}
                  <td style={S.td}>
                    <RoleBadge role={u.role} />
                  </td>

                  {/* Status */}
                  <td style={S.td}>
                    <StatusBadge status={u.status} />
                  </td>

                  {/* Actions */}
                  <td style={{ ...S.td, textAlign: "right" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 5,
                      }}>
                      <Link
                        href={`/admin/users/${u._id}`}
                        style={iconActionBtn(false)}
                        className="aura-action-btn"
                        title={`View ${name}`}>
                        <FaEye /> View
                      </Link>
                      <Link
                        href={`/admin/users/${u._id}/edit`}
                        style={iconActionBtn(false)}
                        className="aura-action-btn"
                        title={`Edit ${name}`}>
                        <FaEdit /> Edit
                      </Link>
                      <button
                        onClick={() => setTarget(u)}
                        style={iconActionBtn(true)}
                        className="aura-action-btn del-btn-row"
                        title={`Delete ${name}`}
                        aria-label={`Delete ${name}`}>
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
