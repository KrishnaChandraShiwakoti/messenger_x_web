import { ROLE_CLASS } from "../_utils/constant";

export function RoleBadge({ role }: { role: string }) {
  const cls = ROLE_CLASS[role] ?? ROLE_CLASS.user;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${cls}`}>
      {role}
    </span>
  );
}
