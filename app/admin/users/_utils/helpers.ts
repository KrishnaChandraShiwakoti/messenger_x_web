/* ─── Helpers ──────────────────────────────────────────────────── */
const AVATAR_BG = [
  "from-primary/80 to-primary",
  "from-secondary/80 to-secondary",
  "from-accent/80 to-accent",
  "from-danger/80 to-danger",
  "from-warning/80 to-warning",
  "from-success/80 to-success",
];

export function getDisplayName(u: User): string {
  return u.fullName || `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim();
}

export function getInitials(u: User): string {
  const name = getDisplayName(u);
  const parts = name.split(" ").filter(Boolean);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function avatarGradient(id: string): string {
  let n = 0;
  for (let i = 0; i < id.length; i++) n += id.charCodeAt(i);
  return AVATAR_BG[n % AVATAR_BG.length];
}

export function formatDate(iso?: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
