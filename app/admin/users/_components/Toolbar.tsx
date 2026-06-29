import { FaSearch } from "react-icons/fa";
import { S } from "./styles";

interface ToolbarProps {
  search: string;
  limit: number;
  setQuery: (query: Record<string, string | number>) => void;
}

export function Toolbar({ limit, setQuery, search }: ToolbarProps) {
  /* ── Query helpers ─────────────────────────────────────────── */

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (new FormData(e.currentTarget).get("search") as string) ?? "";
    setQuery({ search: value, page: 1 });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
        padding: "14px 20px",
        borderBottom: "1px solid rgba(79,70,229,0.09)",
        background: "#FAFBFF",
      }}>
      {/* Search */}
      <form
        onSubmit={onSearch}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}>
        <span
          style={{
            position: "absolute",
            left: 10,
            color: "#A0A5C8",
            pointerEvents: "none",
          }}>
          <FaSearch />
        </span>
        <input
          name="search"
          defaultValue={search}
          placeholder="Search name or email…"
          className="search-input"
          style={S.searchInput}
          aria-label="Search users"
        />
      </form>

      {/* Role filter */}
      <div style={{ position: "relative" }}>
        <select
          defaultValue=""
          onChange={(e) => setQuery({ role: e.target.value, page: 1 })}
          style={S.select}
          aria-label="Filter by role">
          <option value="">All roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Status filter */}
      <div style={{ position: "relative" }}>
        <select
          defaultValue=""
          onChange={(e) => setQuery({ status: e.target.value, page: 1 })}
          style={S.select}
          aria-label="Filter by status">
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Rows per page — right-aligned */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
        <span style={{ fontSize: 12, color: "#A0A5C8", fontWeight: 500 }}>
          Rows
        </span>
        <select
          value={limit}
          onChange={(e) => setQuery({ limit: e.target.value, page: 1 })}
          style={{ ...S.select, width: 70 }}
          aria-label="Rows per page">
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
