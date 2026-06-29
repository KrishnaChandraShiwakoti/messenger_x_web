export const AVATAR_COLORS = [
  "#4338CA",
  "#7C3AED",
  "#0891B2",
  "#DC2626",
  "#D97706",
  "#059669",
  "#DB2777",
  "#0369A1",
];

export const ROLE_STYLES: Record<
  string,
  { bg: string; color: string; border: string; label: string }
> = {
  admin: {
    bg: "rgba(67,56,202,0.10)",
    color: "#4338CA",
    border: "rgba(67,56,202,0.25)",
    label: "Admin",
  },
  user: {
    bg: "rgba(91,95,130,0.08)",
    color: "#5B5F82",
    border: "rgba(91,95,130,0.20)",
    label: "User",
  },
};

export const STATUS_STYLES: Record<
  string,
  { bg: string; color: string; border: string; dot: string; label: string }
> = {
  active: {
    bg: "rgba(5,150,105,0.08)",
    color: "#065F46",
    border: "rgba(5,150,105,0.22)",
    dot: "#059669",
    label: "Active",
  },
  inactive: {
    bg: "rgba(220,38,38,0.08)",
    color: "#991B1B",
    border: "rgba(220,38,38,0.22)",
    dot: "#DC2626",
    label: "Inactive",
  },
};
