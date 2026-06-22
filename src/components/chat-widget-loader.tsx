"use client";

import dynamic from "next/dynamic";

const isChatEnabled = process.env.NEXT_PUBLIC_ENABLE_CHAT === "true";

// Client-side dynamic import keeps the chat widget (and its dependencies) out
// of the initial, render-blocking bundle. When chat is disabled the chunk is
// never requested at all.
const ChatWidget = dynamic(
  () => import("./chat-widget").then((m) => m.ChatWidget),
  { ssr: false },
);

export function ChatWidgetLoader() {
  return isChatEnabled ? <ChatWidget /> : null;
}
