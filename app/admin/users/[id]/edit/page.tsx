import Link from "next/link";
import { notFound } from "next/navigation";
import { handleGetUserById } from "@/lib/actions/admin/user-action";
import UserFormEdit from "../../_components/UserFormEdit";

const BackArrow = () => (
  <svg
    className="h-3.5 w-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await handleGetUserById(id);
  if (!result.success || !result.data) notFound();

  return (
    <section className="min-h-screen bg-bg px-6 py-10 font-sans text-text-main">
      <div className="mx-auto max-w-md">
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[1.5px] text-text-sub transition-colors hover:text-text-main">
          <BackArrow />
          Back to users
        </Link>

        <h2 className="mb-8 mt-4 font-serif text-4xl font-normal tracking-tight text-text-main">
          Edit user
        </h2>

        <UserFormEdit user={result.data} />
      </div>
    </section>
  );
}
