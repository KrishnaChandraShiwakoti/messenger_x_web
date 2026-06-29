import { ROLE_STYLES } from "../_utils/constant";

export function RoleBadge({ role }: { role: string }) {
  const s = ROLE_STYLES[role] ?? ROLE_STYLES.user;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 9px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.3px",
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontFamily: "'Manrope', sans-serif",
      }}>
      {s.label}
    </span>
  );
}
