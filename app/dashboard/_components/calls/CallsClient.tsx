"use client";

import { useCallback, useEffect, useState } from "react";
import { Ic, icons } from "@/app/constants/icons";
import { handleGetCallHistory } from "@/lib/actions/call-action";
import type { CallHistoryEntry } from "../../_types/call";
import { CallListItem } from "./CallListItem";

const CALLS_POLL_MS = 6000;

export function CallsClient() {
  const [calls, setCalls] = useState<CallHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCalls = useCallback(async () => {
    const res = await handleGetCallHistory({ limit: 50 });
    if (res.success) setCalls(res.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Deferred via a resolved promise so the initial fetch runs inside a
    // callback rather than as a direct effect-body call.
    Promise.resolve().then(() => void loadCalls());
    const interval = setInterval(() => void loadCalls(), CALLS_POLL_MS);
    return () => clearInterval(interval);
  }, [loadCalls]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden rounded-lg border border-[#ececff] bg-white shadow-[0_20px_55px_rgba(67,56,202,0.08)]">
      <div className="border-b border-[#ececff] px-5 py-4">
        <h2 className="text-[20px] font-bold text-[#10121f]">Calls</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="px-5 py-6 text-center text-[13px] text-[#9aa0c8]">
            Loading calls…
          </p>
        ) : calls.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-5 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#efedff] text-[#5146e7]">
              <Ic d={icons.phone} size={26} />
            </span>
            <p className="text-[15px] font-bold text-[#10121f]">
              No calls yet
            </p>
            <p className="max-w-[280px] text-[13.5px] text-[#9aa0c8]">
              Voice and video calls you make or receive will show up here.
            </p>
          </div>
        ) : (
          calls.map((entry) => <CallListItem key={entry.id} entry={entry} />)
        )}
      </div>
    </div>
  );
}
