# AgentFlow

A no-code visual AI agent builder. Design custom AI chatbots by dragging and connecting nodes on a canvas — no coding required. Build the workflow, hit compile, and chat with your AI agent instantly.

## What It Does

- **Visual Workflow Editor** — Drag-and-drop node-based editor to build AI agent logic
- **Multiple Node Types** — AI persona, conditional logic (if/else), API calls, data processing, web crawler
- **Web Crawler** — Crawl Wikipedia and DuckDuckGo to inject real-time knowledge into your agent
- **One-Click Compile** — Converts your visual workflow into an AI system prompt automatically
- **Live Chat Preview** — Test your agent in a built-in chat interface right after compiling
- **Code Export** — Get an embeddable JavaScript snippet to integrate your agent anywhere

## Tech Stack

**Frontend:**
- Next.js 16 (App Router) + TypeScript + React
- React Flow — for the node-based graph editor
- Tailwind CSS + shadcn/ui — styling and component library
- Framer Motion — animations

**Backend:**
- Node.js + Express
- Groq SDK — LLM inference (Llama 3.3 70B, free API)

## Project Structure

```
AgentFlow/
├── app/                    # Next.js pages
│   ├── page.tsx            # Landing page
│   └── workflow/
│       ├── page.tsx        # Workflow dashboard
│       ├── [id]/page.tsx   # Workflow editor (main canvas)
│       └── [id]/preview/   # Live chat preview
├── components/             # UI components
├── backend/                # Express API server
│   ├── server.js           # API endpoints
│   └── .env.example        # Environment config template
├── lib/                    # Utility functions
└── hooks/                  # Custom React hooks
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm
- A free Groq API key → [Get one here](https://console.groq.com/keys) (no credit card needed)

### 1. Clone the repo

```bash
git clone https://github.com/anukulKun/AgentFlow.git
cd AgentFlow
```

### 2. Setup the Frontend

```bash
pnpm install
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### 3. Setup the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your Groq API key:
```env
GROQ_API_KEY=gsk_your_key_here
PORT=3002
```

### 4. Run

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

## How It Works

1. Go to `/workflow` and create a new workflow
2. Drag nodes from the palette onto the canvas (AI, Process, If/Else, API, Web Crawler)
3. Connect nodes by dragging edges between them
4. Click on any node to configure it in the side panel
5. Hit **Save** to compile the workflow into an AI prompt
6. Click **Run** to open the live preview and chat with your agent

## Deployment

**Frontend** → [Vercel](https://vercel.com)
1. Import the repo
2. Add env variable: `NEXT_PUBLIC_API_URL` = your backend URL
3. Deploy

**Backend** → [Render](https://render.com)
1. New Web Service → connect repo → root directory: `backend`
2. Build: `npm install` | Start: `node server.js`
3. Add env variable: `GROQ_API_KEY` = your key
4. Deploy

## License

MIT
