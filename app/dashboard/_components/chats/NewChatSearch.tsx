"use client";

import { useEffect, useState } from "react";
import { Ic, icons } from "@/app/constants/icons";
import { handleSearchUsers } from "@/lib/actions/chat-action";
import { avatarGradient, getInitials } from "../../_utils/chat-helpers";

interface UserResult {
  _id: string;
  fullName: string;
  email: string;
  profilePicture?: string;
}

export function NewChatSearch({
  onPick,
  onClose,
}: {
  onPick: (userId: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.trim().length < 2) return;
    const timeout = setTimeout(() => {
      void (async () => {
        setSearching(true);
        const res = await handleSearchUsers(query.trim());
        if (res.success) {
          setResults(res.data ?? []);
          setError("");
        } else {
          setError(res.message || "Search failed");
        }
        setSearching(false);
      })();
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const showingShortQueryHint = query.trim().length < 2;

  return (
    <div className="border-b border-[#ececff] bg-[#fbfbfe] px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[13px] font-bold uppercase tracking-wide text-[#5146e7]">
          Start a new chat
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close new chat search"
          className="text-[#8d93ba] hover:text-[#10121f]">
          <Ic d={icons.close} size={16} />
        </button>
      </div>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa0c8]">
          <Ic d={icons.search} size={16} />
        </span>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          className="h-10 w-full rounded-full border border-[#e4e2ff] bg-white pl-9 pr-3 text-[14px] text-[#10121f] outline-none placeholder:text-[#aaa8cf] focus:border-[#5146e7]"
        />
      </div>

      {showingShortQueryHint ? (
        <p className="px-1 py-3 text-[13px] text-[#9aa0c8]">
          Type at least 2 characters to search.
        </p>
      ) : searching ? (
        <p className="px-1 py-3 text-[13px] text-[#9aa0c8]">Searching…</p>
      ) : error ? (
        <p className="px-1 py-3 text-[13px] text-[#dc2626]">{error}</p>
      ) : results.length > 0 ? (
        <ul className="mt-2 max-h-[240px] space-y-1 overflow-y-auto">
          {results.map((user) => (
            <li key={user._id}>
              <button
                type="button"
                onClick={() => onPick(user._id)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-white">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[13px] font-bold text-white ${avatarGradient(user._id)}`}>
                  {getInitials(user.fullName)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold text-[#10121f]">
                    {user.fullName}
                  </span>
                  <span className="block truncate text-[12.5px] text-[#9aa0c8]">
                    {user.email}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-1 py-3 text-[13px] text-[#9aa0c8]">No users found.</p>
      )}
    </div>
  );
}
