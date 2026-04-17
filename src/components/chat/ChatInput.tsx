import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  }, [value]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <div className="border-t border-border bg-background px-4 py-4">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-input bg-card p-2 shadow-sm focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
        <textarea
          ref={ref}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Message DaivAI…"
          className="max-h-44 flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <Button
          size="icon"
          onClick={submit}
          disabled={disabled || !value.trim()}
          className="h-9 w-9 shrink-0 rounded-xl"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground">
        DaivAI can make mistakes. Verify important information.
      </p>
    </div>
  );
}
