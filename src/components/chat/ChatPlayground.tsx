import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { EngineSelect } from "./EngineSelect";
import { MessageBubble, TypingBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { EditMessageDialog } from "./EditMessageDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Chat, Message } from "@/lib/chat-types";
import { generateFakeReply, streamFakeReply } from "@/lib/fake-ai";

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

interface Props {
  chat: Chat;
  onEngineChange: (engine: string) => void;
  onUpdateMessages: (updater: (msgs: Message[]) => Message[]) => void;
  onAutoTitle: (title: string) => void;
}

const SUGGESTIONS = [
  "Explain quantum entanglement simply",
  "Draft a polite follow-up email",
  "Compare React Context vs Zustand",
  "Plan a 3-day Tokyo itinerary",
];

export function ChatPlayground({ chat, onEngineChange, onUpdateMessages, onAutoTitle }: Props) {
  const [typing, setTyping] = useState(false);
  const [editing, setEditing] = useState<Message | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Message | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat.messages, typing]);

  const sendMessage = (text: string) => {
    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };
    onUpdateMessages((msgs) => [...msgs, userMsg]);

    if (chat.messages.length === 0) {
      onAutoTitle(text.slice(0, 40));
    }

    setTyping(true);
    const reply = generateFakeReply(text, chat.engine);
    const aiId = uid();

    // Insert empty AI message after a short delay, then stream it
    setTimeout(() => {
      onUpdateMessages((msgs) => [
        ...msgs,
        { id: aiId, role: "ai", content: "", createdAt: Date.now() },
      ]);
      setTyping(false);
      streamFakeReply(
        reply,
        (partial) => {
          onUpdateMessages((msgs) =>
            msgs.map((m) => (m.id === aiId ? { ...m, content: partial } : m))
          );
        },
        () => {}
      );
    }, 600);
  };

  const handleSaveEdit = (id: string, content: string) => {
    onUpdateMessages((msgs) => msgs.map((m) => (m.id === id ? { ...m, content } : m)));
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    onUpdateMessages((msgs) => msgs.filter((m) => m.id !== id));
    setPendingDelete(null);
  };

  const isEmpty = chat.messages.length === 0 && !typing;

  return (
    <section className="flex h-full flex-1 flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">{chat.title}</h2>
          <p className="text-xs text-muted-foreground">Playground</p>
        </div>
        <EngineSelect value={chat.engine} onChange={onEngineChange} />
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight">How can I help today?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask anything. Switch engines from the top right to change response style.
            </p>
            <div className="mt-8 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
            {chat.messages.map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                onEdit={m.role === "user" ? setEditing : undefined}
                onDelete={m.role === "user" ? setPendingDelete : undefined}
              />
            ))}
            {typing && <TypingBubble />}
          </div>
        )}
      </div>

      <ChatInput onSend={sendMessage} disabled={typing} />

      <EditMessageDialog
        message={editing}
        onClose={() => setEditing(null)}
        onSave={handleSaveEdit}
      />

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              The message will be removed from the conversation. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => pendingDelete && handleDelete(pendingDelete.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
