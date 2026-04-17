import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/chat/Sidebar";
import { ChatPlayground } from "@/components/chat/ChatPlayground";
import { useChats } from "@/hooks/use-chats";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DaivAI — AI Chat Interface" },
      {
        name: "description",
        content:
          "DaivAI is a clean, fast AI chat interface to manage conversations, switch AI engines, and chat with simulated AI replies.",
      },
      { property: "og:title", content: "DaivAI — AI Chat Interface" },
      {
        property: "og:description",
        content:
          "ChatGPT-like UI with multi-chat management, engine switching, and live typing animations.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const {
    chats,
    activeId,
    activeChat,
    hydrated,
    createChat,
    selectChat,
    deleteChat,
    renameChat,
    setEngine,
    updateMessages,
  } = useChats();

  if (!hydrated || !activeChat) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar
        chats={chats}
        activeId={activeId}
        onNew={createChat}
        onSelect={selectChat}
        onRename={renameChat}
        onDelete={deleteChat}
      />
      <ChatPlayground
        chat={activeChat}
        onEngineChange={(e) => setEngine(activeChat.id, e)}
        onUpdateMessages={(updater) => updateMessages(activeChat.id, updater)}
        onAutoTitle={(t) => renameChat(activeChat.id, t)}
      />
    </div>
  );
}
