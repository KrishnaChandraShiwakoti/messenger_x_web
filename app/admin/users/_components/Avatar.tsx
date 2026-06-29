import { avatarColor, getInitials } from "../_utils/helpers";

export function Avatar({ user }: { user: User }) {
  const bg = avatarColor(user._id);
  const initials = getInitials(user);
  return (
    <div
      aria-hidden="true"
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${bg}88, ${bg})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 700,
        color: "#fff",
        flexShrink: 0,
        letterSpacing: "0.3px",
        fontFamily: "'Manrope', sans-serif",
      }}>
      {initials}
    </div>
  );
}
