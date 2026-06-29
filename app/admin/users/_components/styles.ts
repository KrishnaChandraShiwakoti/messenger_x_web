/* ── Styles (light-mode locked) ────────────────────────────── */
export const S = {
  page: {
    fontFamily: "'Manrope', sans-serif",
    background: "#FAFBFF",
    minHeight: "100vh",
    padding: "32px 24px",
    color: "#0D0E1A",
  } as React.CSSProperties,

  card: {
    background: "#fff",
    border: "1px solid rgba(79,70,229,0.12)",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(67,56,202,0.07)",
  } as React.CSSProperties,

  headerRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap" as const,
    marginBottom: 24,
  },

  addBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: "10px 20px",
    borderRadius: 11,
    background: "linear-gradient(135deg, #4338CA, #7C3AED)",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 4px 14px rgba(67,56,202,0.25)",
    fontFamily: "'Manrope', sans-serif",
    transition: "all 0.2s",
  } as React.CSSProperties,

  searchInput: {
    height: 36,
    width: "100%",
    maxWidth: 280,
    padding: "0 12px 0 36px",
    border: "1px solid rgba(79,70,229,0.18)",
    borderRadius: 9,
    background: "#fff",
    color: "#0D0E1A",
    fontSize: 13,
    outline: "none",
    fontFamily: "'Manrope', sans-serif",
  } as React.CSSProperties,

  select: {
    height: 36,
    padding: "0 28px 0 10px",
    border: "1px solid rgba(79,70,229,0.18)",
    borderRadius: 9,
    background: "#fff",
    color: "#0D0E1A",
    fontSize: 13,
    outline: "none",
    cursor: "pointer",
    appearance: "none" as const,
    fontFamily: "'Manrope', sans-serif",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A0A5C8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 8px center",
  } as React.CSSProperties,

  th: {
    padding: "11px 16px",
    textAlign: "left" as const,
    fontSize: 10,
    fontWeight: 700,
    color: "#A0A5C8",
    letterSpacing: "0.8px",
    textTransform: "uppercase" as const,
    background: "#F0F2FA",
    borderBottom: "1px solid rgba(79,70,229,0.10)",
    whiteSpace: "nowrap" as const,
  },

  td: {
    padding: "12px 16px",
    borderBottom: "1px solid rgba(79,70,229,0.07)",
    verticalAlign: "middle" as const,
    fontSize: 13,
    color: "#0D0E1A",
  },

  pgBtn: (active: boolean, disabled = false): React.CSSProperties => ({
    minWidth: 30,
    height: 30,
    padding: "0 8px",
    borderRadius: 7,
    border: active ? "none" : "1px solid rgba(79,70,229,0.18)",
    background: active
      ? "linear-gradient(135deg, #4338CA, #7C3AED)"
      : disabled
        ? "#F0F2FA"
        : "#fff",
    color: active ? "#fff" : disabled ? "#C8CAE0" : "#5B5F82",
    fontSize: 12,
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Manrope', sans-serif",
    boxShadow: active ? "0 2px 10px rgba(67,56,202,0.25)" : "none",
    transition: "all 0.15s",
  }),
};
