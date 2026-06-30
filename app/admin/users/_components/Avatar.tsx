import { avatarGradient, getInitials } from "../_utils/helpers";

export function Avatar({ user }: { user: User }) {
  return (
    <div
      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold tracking-wide text-white ${avatarGradient(user._id)}`}
      aria-hidden="true">
      {getInitials(user)}
    </div>
  );
}
