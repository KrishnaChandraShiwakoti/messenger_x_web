import { STATUS_STYLES } from "../_utils/constant";

export function StatusBadge({ status }: { status?: string }) {
  const s = STATUS_STYLES[status ?? "active"] ?? STATUS_STYLES.active;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "2px 9px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontFamily: "'Manrope', sans-serif",
      }}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: s.dot,
          flexShrink: 0,
        }}
      />
      {s.label}
    </span>
  );
}
