"use client";

import Image from "next/image";
import Link from "next/link";
import { Ic, icons } from "@/app/constants/icons";
import { useCall } from "@/lib/context/CallContext";
import type { CallHistoryEntry } from "../../_types/call";
import {
  avatarGradient,
  formatRelativeShort,
  getInitials,
} from "../../_utils/chat-helpers";

function statusLabel(entry: CallHistoryEntry): string {
  if (entry.status === "ringing") return "Calling…";
  if (entry.status === "completed") {
    const m = Math.floor((entry.durationSec ?? 0) / 60);
    const s = (entry.durationSec ?? 0) % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }
  const labels: Record<string, string> = {
    missed: "Missed",
    no_answer: "No answer",
    declined: "Declined",
    cancelled: "Cancelled",
  };
  return labels[entry.status] ?? entry.status;
}

export function CallListItem({ entry }: { entry: CallHistoryEntry }) {
  const { startCall, phase } = useCall();
  const name = entry.chatName || "Unknown";
  const isMissed =
    !entry.isOutgoing && entry.status !== "completed" && entry.status !== "ringing";
  const canCallBack = !entry.isGroup && !!entry.peerId;

  return (
    <div className="flex w-full items-center gap-3 border-b border-[#f2f1ff] px-4 py-3">
      <Link
        href={`/dashboard?chat=${entry.chatId}`}
        className="flex min-w-0 flex-1 items-center gap-3">
        <span className="relative shrink-0">
          {entry.chatAvatar ? (
            <Image
              src={process.env.NEXT_PUBLIC_API_URL! + entry.chatAvatar}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-[15px] font-bold text-white ${avatarGradient(entry.chatId)}`}>
              {getInitials(name)}
            </span>
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="truncate text-[15px] font-bold text-[#10121f]">
              {name}
            </span>
            <span className="shrink-0 text-[12px] font-medium text-[#9aa0c8]">
              {formatRelativeShort(entry.createdAt)}
            </span>
          </span>
          <span className="mt-0.5 flex items-center gap-1.5">
            <span className={isMissed ? "text-[#ef4444]" : "text-[#9aa0c8]"}>
              {entry.isOutgoing ? "↗" : "↙"}
            </span>
            <span
              className={`truncate text-[13.5px] ${isMissed ? "font-semibold text-[#ef4444]" : "text-[#8d93ba]"}`}>
              {statusLabel(entry)}
            </span>
          </span>
        </span>
      </Link>

      {canCallBack ? (
        <span className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            disabled={phase !== "idle"}
            onClick={() =>
              startCall(entry.chatId, "audio", {
                name,
                avatarUrl: entry.chatAvatar,
              })
            }
            aria-label={`Voice call ${name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#676d99] hover:bg-[#f6f5ff] hover:text-[#4037d5] disabled:cursor-not-allowed disabled:opacity-40">
            <Ic d={icons.phone} size={16} />
          </button>
          <button
            type="button"
            disabled={phase !== "idle"}
            onClick={() =>
              startCall(entry.chatId, "video", {
                name,
                avatarUrl: entry.chatAvatar,
              })
            }
            aria-label={`Video call ${name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#676d99] hover:bg-[#f6f5ff] hover:text-[#4037d5] disabled:cursor-not-allowed disabled:opacity-40">
            <Ic d={icons.video} size={16} />
          </button>
        </span>
      ) : null}
    </div>
  );
}
