"use client";

import { Ic, icons } from "@/app/constants/icons";
import { avatarGradient, getInitials } from "../../_utils/chat-helpers";
import type { CallPeer, CallType } from "@/lib/context/CallContext";

export function IncomingCallModal({
  caller,
  callType,
  onAccept,
  onReject,
}: {
  caller: CallPeer;
  callType: CallType;
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex w-[320px] flex-col items-center gap-4 rounded-3xl bg-white px-8 py-10 shadow-2xl">
        {caller.avatarUrl ? (
          <img
            src={process.env.NEXT_PUBLIC_API_URL! + caller.avatarUrl}
            alt=""
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <span
            className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-[24px] font-bold text-white ${avatarGradient(caller.name)}`}>
            {getInitials(caller.name)}
          </span>
        )}
        <div className="text-center">
          <p className="text-[18px] font-bold text-[#10121f]">{caller.name}</p>
          <p className="mt-1 text-[13px] text-[#9aa0c8]">
            Incoming {callType === "video" ? "video" : "voice"} call…
          </p>
        </div>
        <div className="mt-4 flex items-center gap-6">
          <button
            type="button"
            onClick={onReject}
            aria-label="Decline"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ef4444] text-white shadow-lg transition-transform hover:scale-105">
            <Ic d={icons.endcall} size={22} color="white" />
          </button>
          <button
            type="button"
            onClick={onAccept}
            aria-label="Accept"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-lg transition-transform hover:scale-105">
            <Ic d={icons.phone} size={22} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
