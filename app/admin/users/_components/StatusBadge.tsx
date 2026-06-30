import { STATUS_CLASS } from "../_utils/constant";

export function StatusBadge({ status }: { status?: string }) {
  const s = STATUS_CLASS[status ?? "active"] ?? STATUS_CLASS.active;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${s.wrap}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status ?? "active"}
    </span>
  );
}
