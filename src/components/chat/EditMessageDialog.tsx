import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Message } from "@/lib/chat-types";

interface Props {
  message: Message | null;
  onClose: () => void;
  onSave: (id: string, content: string) => void;
}

export function EditMessageDialog({ message, onClose, onSave }: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(message?.content ?? "");
  }, [message]);

  return (
    <Dialog open={!!message} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit message</DialogTitle>
          <DialogDescription>
            Update your message. The conversation will keep its existing replies.
          </DialogDescription>
        </DialogHeader>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={5}
          className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (message && value.trim()) {
                onSave(message.id, value.trim());
              }
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
