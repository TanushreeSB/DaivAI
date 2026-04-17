# DaivAI

# DaivAI — AI Chat Interface

A clean, fast, ChatGPT-style chat interface built with React, TypeScript, and Tailwind CSS. Manage multiple conversations, switch between simulated AI engines, edit/delete messages, and enjoy a live typing animation — all persisted to `localStorage`.


## ✨ Features

### Chat Management
- ✅ Create new chats from the sidebar
- ✅ Switch between existing chats with a single click
- ✅ Rename chats inline (with `Enter` to save / `Escape` to cancel)
- ✅ Delete chats with a confirmation dialog
- ✅ Auto-titles new chats from the first user message
- ✅ Persistent chat history via `localStorage`

### Messaging
- ✅ Send messages with `Enter` (Shift+Enter for newline)
- ✅ Auto-resizing textarea input
- ✅ Edit your own messages via a dialog
- ✅ Delete your own messages with confirmation
- ✅ Live "typing…" animation while the AI "thinks"
- ✅ Streaming character-by-character AI replies
- ✅ Empty-state with suggested prompts

### AI Engines
- ✅ Switch between 4 simulated engines per chat:
  - **Neural Nexus** — structured, friendly
  - **Cerebral Prime** — analytical, logical
  - **Synapse Ultra** — fast, concise
  - **Logic Core** — strict, premise-driven
- ✅ Each engine has a distinct response tone

### UI / UX
- ✅ Responsive sidebar + main playground layout
- ✅ Clean white theme with a violet accent
- ✅ Bubble-style messages with role avatars
- ✅ Hover-to-reveal message actions
- ✅ Accessible dialogs (Radix UI)
- ✅ Smooth scroll-to-bottom on new messages

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | **React 19** + **TypeScript** |
| Build tool | **Vite 7** |
| Routing | **TanStack Router** (file-based) |
| Styling | **Tailwind CSS v4** (CSS variables, `oklch` color space) |
| UI primitives | **shadcn/ui** + **Radix UI** |
| Icons | **lucide-react** |
| State | React hooks + `localStorage` |
| AI | Simulated reply generator (no API key required) |



## 🚀 Setup & Run Locally

### Prerequisites
- **Node.js** ≥ 18
- **npm**, **bun**, or **pnpm**

### Install
```bash
git clone <your-repo-url>
cd daivai
npm install
```

### Run dev server
```bash
npm run dev
```
Open http://localhost:5173

### Build for production
```bash
npm run build
npm run preview
```


## Project Structure

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatInput.tsx          # Auto-resizing message input
│   │   ├── ChatPlayground.tsx     # Main chat area + header
│   │   ├── EditMessageDialog.tsx  # Edit user message modal
│   │   ├── EngineSelect.tsx       # AI engine dropdown
│   │   ├── MessageBubble.tsx      # User/AI bubbles + typing dots
│   │   └── Sidebar.tsx            # Chat list + CRUD actions
│   └── ui/                        # shadcn/ui primitives
├── hooks/
│   └── use-chats.ts               # Chat state + localStorage sync
├── lib/
│   ├── chat-types.ts              # Shared TS types + ENGINES const
│   ├── fake-ai.ts                 # Simulated AI reply generator
│   └── utils.ts                   # cn() helper
├── routes/
│   ├── __root.tsx                 # Root layout
│   └── index.tsx                  # Main chat page
├── styles.css                     # Design tokens + Tailwind
└── router.tsx                     # TanStack Router config
```


##  Key Design Decisions 

### Design decisions
- **Design tokens over hard-coded colors** — every color is a CSS variable in `oklch`, defined in `src/styles.css`. Components reference semantic tokens (`bg-primary`, `text-muted-foreground`) so theming is centralized.
- **Optimistic UI** — user messages appear instantly; the AI bubble streams in character-by-character to feel responsive.
- **Confirmation for destructive actions** — both "delete chat" and "delete message" use `AlertDialog` to prevent accidents.
- **File-based routing** — TanStack Router auto-generates the route tree, keeping routing config out of the way.
- **Co-located feature components** — everything chat-related lives under `src/components/chat/`.


UI:
<img width="959" height="503" alt="image" src="https://github.com/user-attachments/assets/3c7fc222-7c7c-47fc-abd0-0f41da2fd2dd" />
<img width="1911" height="1002" alt="image" src="https://github.com/user-attachments/assets/bc7238d8-f62d-4f49-8a76-19510f85bbd9" />
<img width="1919" height="1004" alt="image" src="https://github.com/user-attachments/assets/47ef8ce9-d773-4cff-922d-ef097256aa56" />
<img width="1911" height="1007" alt="image" src="https://github.com/user-attachments/assets/d68ce158-5b62-48aa-8552-2e34e0d48a65" />
<img width="1909" height="1011" alt="image" src="https://github.com/user-attachments/assets/a9c1024a-5528-4d84-9305-6d38c744044c" />
<img width="1917" height="999" alt="image" src="https://github.com/user-attachments/assets/453d30a8-8c86-40da-8de9-d4d6b9640446" />
<img width="1915" height="1006" alt="image" src="https://github.com/user-attachments/assets/ecf10895-bce6-4931-8e74-027def7949a8" />

