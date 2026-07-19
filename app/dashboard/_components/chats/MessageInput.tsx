"use client";

import { useState } from "react";
import { Ic, icons } from "@/app/constants/icons";

export function MessageInput({
  disabled,
  sending,
  onSend,
}: {
  disabled?: boolean;
  sending?: boolean;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled || sending) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <div className="flex items-center gap-3 border-t border-[#ececff] bg-white px-5 py-4">
      <button
        type="button"
        aria-label="Attach file"
        disabled
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#aaa8cf]">
        <Ic d={icons.attach} size={19} />
      </button>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        disabled={disabled}
        placeholder="Type a message..."
        className="h-11 flex-1 rounded-full border border-[#ececff] bg-[#fbfbfe] px-5 text-[14.5px] text-[#10121f] outline-none placeholder:text-[#aaa8cf] focus:border-[#5146e7] disabled:cursor-not-allowed disabled:opacity-60"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled || sending || !value.trim()}
        aria-label="Send message"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4338d6] text-white transition-opacity hover:bg-[#372fb8] disabled:cursor-not-allowed disabled:opacity-40">
        <Ic d={icons.send} size={17} />
      </button>
    </div>
  );
}
