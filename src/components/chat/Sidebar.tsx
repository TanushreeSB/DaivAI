import { useState } from "react";
import { Plus, MessageSquare, Pencil, Trash2, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { Chat } from "@/lib/chat-types";

interface Props {
  chats: Chat[];
  activeId: string | null;
  onNew: () => void;
  onSelect: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export function Sidebar({ chats, activeId, onNew, onSelect, onRename, onDelete }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const startEdit = (c: Chat) => {
    setEditingId(c.id);
    setDraft(c.title);
  };
  const commitEdit = () => {
    if (editingId) onRename(editingId, draft);
    setEditingId(null);
  };

  return (
    <aside className="flex h-full w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight">DaivAI</h1>
          <p className="text-xs text-muted-foreground">AI Chat Interface</p>
        </div>
      </div>

      <div className="px-3">
        <Button
          onClick={onNew}
          className="w-full justify-start gap-2"
          variant="default"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto px-2 pb-4">
        <p className="px-2 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Recent
        </p>
        <ul className="space-y-1">
          {chats.map((c) => {
            const isActive = c.id === activeId;
            const isEditing = editingId === c.id;
            return (
              <li key={c.id}>
                <div
                  className={`group flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/60"
                  }`}
                >
                  <button
                    onClick={() => !isEditing && onSelect(c.id)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  >
                    <MessageSquare className="h-4 w-4 shrink-0 opacity-70" />
                    {isEditing ? (
                      <Input
                        autoFocus
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") commitEdit();
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        className="h-7 px-2 text-sm"
                      />
                    ) : (
                      <span className="truncate">{c.title}</span>
                    )}
                  </button>
                  {isEditing ? (
                    <>
                      <button
                        onClick={commitEdit}
                        className="rounded p-1 text-muted-foreground hover:bg-background hover:text-foreground"
                        aria-label="Save"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded p-1 text-muted-foreground hover:bg-background hover:text-foreground"
                        aria-label="Cancel"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </>
                  ) : (
                    <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => startEdit(c)}
                        className="rounded p-1 text-muted-foreground hover:bg-background hover:text-foreground"
                        aria-label="Rename chat"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setPendingDelete(c.id)}
                        className="rounded p-1 text-muted-foreground hover:bg-background hover:text-destructive"
                        aria-label="Delete chat"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-sidebar-border px-4 py-3 text-xs text-muted-foreground">
        Built with DaivAI · v1.0
      </div>

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this chat?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the conversation. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingDelete) onDelete(pendingDelete);
                setPendingDelete(null);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  );
}
