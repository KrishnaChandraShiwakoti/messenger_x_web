import Link from "next/link";
import UserForm from "../_components/UserForm";

export default function Page() {
  return (
    <section
      style={{
        fontFamily: "'Manrope', sans-serif",
        background: "#FAFBFF",
        minHeight: "100vh",
        padding: "40px 24px",
        color: "#0D0E1A",
      }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <Link
          href="/admin/users"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "0.6px",
            textTransform: "uppercase",
            color: "#5B5F82",
            textDecoration: "none",
            transition: "color 0.15s",
          }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to users
        </Link>

        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 34,
            fontWeight: 400,
            letterSpacing: "-0.6px",
            color: "#0D0E1A",
            marginTop: 14,
            marginBottom: 28,
            lineHeight: 1.1,
          }}>
          New user
        </h2>

        <UserForm />
      </div>
    </section>
  );
}
