export const ROLE_CLASS: Record<string, string> = {
  admin: "bg-primary-soft text-primary border-primary/25",
  moderator: "bg-warning-soft text-warning border-warning/25",
  user: "bg-surface-2 text-text-sub border-hairline-strong",
};

export const STATUS_CLASS: Record<string, { wrap: string; dot: string }> = {
  active: {
    wrap: "bg-success-soft text-success border-success/25",
    dot: "bg-success",
  },
  pending: {
    wrap: "bg-warning-soft text-warning border-warning/25",
    dot: "bg-warning",
  },
  inactive: {
    wrap: "bg-danger-soft text-danger border-danger/25",
    dot: "bg-danger",
  },
};
