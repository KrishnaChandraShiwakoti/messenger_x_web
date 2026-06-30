import { FaSearch } from "react-icons/fa";

interface ToolbarProps {
  search: string;
  limit: number;
  setQuery: (query: Record<string, string | number>) => void;
}

export function Toolbar({ limit, setQuery, search }: ToolbarProps) {
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (new FormData(e.currentTarget).get("search") as string) ?? "";
    setQuery({ search: value, page: 1 });
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 border-b border-hairline bg-bg px-5 py-3.5">
      <form onSubmit={onSearch} className="relative flex items-center">
        <span className="pointer-events-none absolute left-2.5 text-text-muted">
          <FaSearch />
        </span>
        <input
          name="search"
          defaultValue={search}
          placeholder="Search name or email…"
          aria-label="Search users"
          className="h-9 w-full max-w-[260px] rounded-lg border border-hairline-strong bg-surface pl-9 pr-3 text-[13px] text-text-main outline-none transition-colors placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </form>

      <select
        defaultValue=""
        onChange={(e) => setQuery({ role: e.target.value, page: 1 })}
        aria-label="Filter by role"
        className="h-9 cursor-pointer rounded-lg border border-hairline-strong bg-surface px-3 text-[13px] text-text-main outline-none focus:border-primary">
        <option value="">All roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <select
        defaultValue=""
        onChange={(e) => setQuery({ status: e.target.value, page: 1 })}
        aria-label="Filter by status"
        className="h-9 cursor-pointer rounded-lg border border-hairline-strong bg-surface px-3 text-[13px] text-text-main outline-none focus:border-primary">
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs font-medium text-text-muted">Rows</span>
        <select
          value={limit}
          onChange={(e) => setQuery({ limit: e.target.value, page: 1 })}
          aria-label="Rows per page"
          className="h-9 w-[68px] cursor-pointer rounded-lg border border-hairline-strong bg-surface px-2 text-[13px] text-text-main outline-none focus:border-primary">
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
