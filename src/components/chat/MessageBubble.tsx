import { Pencil, Trash2, Sparkles, User } from "lucide-react";
import type { Message } from "@/lib/chat-types";

interface Props {
  message: Message;
  onEdit?: (m: Message) => void;
  onDelete?: (m: Message) => void;
}

export function MessageBubble({ message, onEdit, onDelete }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`message-row flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-bubble-user text-bubble-user-foreground"
            : "bg-accent text-accent-foreground"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
      </div>

      <div className={`flex max-w-[75%] flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "rounded-tr-sm bg-bubble-user text-bubble-user-foreground"
              : "rounded-tl-sm bg-bubble-ai text-bubble-ai-foreground"
          }`}
        >
          {message.content}
        </div>

        {isUser && (onEdit || onDelete) && (
          <div className="message-actions flex items-center gap-1">
            {onEdit && (
              <button
                onClick={() => onEdit(message)}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Pencil className="h-3 w-3" />
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(message)}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function TypingBubble() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-bubble-ai px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
}
