import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { handleGetUserById } from "@/lib/actions/admin/user-action";
import { FieldIcon } from "../_components/FieldIcon";

/* ─── Role badge styling map ──────────────────────────────────── */
const ROLE_STYLES: Record<string, string> = {
  admin: "bg-bmw-blue/10 text-bmw-blue border-bmw-blue/25",
  moderator: "bg-warning/10 text-warning border-warning/25",
  user: "bg-surface-soft text-body border-hairline-strong",
};

/* ─── Field icons ──────────────────────────────────────────────── */

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await handleGetUserById(id);

  if (!result.success || !result.data) notFound();

  const user = result.data;

  const rows = [
    { label: "Full Name", value: user.fullName },
    { label: "Email", value: user.email },
    { label: "Phone Number", value: user.phoneNumber || "—" },
    { label: "Role", value: user.role },
  ];

  const roleStyle = ROLE_STYLES[user.role?.toLowerCase?.()] ?? ROLE_STYLES.user;

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6 bg-canvas px-6 py-10 font-sans text-on-dark">
      {/* Top nav */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.6px] text-body transition-colors hover:text-on-dark">
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to users
        </Link>

        <Link
          href={`/admin/users/${user._id}/edit`}
          className="inline-flex items-center gap-2 rounded-xl border-none bg-linear-to-br from-aura-accent to-aura-p2 px-5 py-2.5 text-sm font-bold text-white shadow-glow transition-transform hover:-translate-y-0.5">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit user
        </Link>
      </div>

      {/* Main card */}
      <div className="rounded-2xl border border-hairline bg-surface p-7 shadow-soft">
        {/* Profile header */}
        <div className="flex items-center gap-5">
          {user.imageUrl ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.imageUrl}`}
              alt={user.fullName}
              width={80}
              height={80}
              className="h-20 w-20 rounded-full object-cover ring-4 ring-surface-soft"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-aura-accent to-aura-p2 text-2xl font-bold text-white ring-4 ring-surface-soft font-serif">
              {user.fullName
                ?.split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((n: string) => n[0])
                .join("")
                .toUpperCase() || "?"}
            </div>
          )}

          <div>
            <h1 className="font-serif text-3xl font-normal tracking-tight text-on-dark">
              {user.fullName}
            </h1>
            <p className="mt-1 text-sm text-body">{user.email}</p>
            <span
              className={`mt-2.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${roleStyle}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {user.role}
            </span>
          </div>
        </div>

        {/* Info grid */}
        <div className="mt-8 border-t border-hairline pt-6">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[1px] text-bmw-blue">
            User information
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {rows.map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-hairline bg-surface-soft p-4 transition-colors hover:bg-surface-elevated">
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.6px] text-muted">
                  <span className="text-bmw-blue">
                    <FieldIcon label={label} />
                  </span>
                  {label}
                </p>
                <p className="mt-1.5 truncate text-sm font-semibold capitalize text-on-dark">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
