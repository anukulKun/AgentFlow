# AgentFlow

> A full-stack, no-code/low-code visual AI agent builder platform.

AgentFlow enables users to design, configure, compile, and deploy custom AI agents (chatbots) by constructing directed acyclic graph (DAG) workflows via a drag-and-drop node-based editor. Each node represents a discrete unit of logic — an AI persona definition, a conditional branch, an API integration, a data transformation process, or a web knowledge crawler. The platform compiles the visual graph into a structured LLM system prompt and persists it to a backend API, allowing users to interact with their agent via an integrated chat interface or export an embeddable code snippet for external integration.

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 16.1.1 | Server/client-side rendering, file-system routing, React Server Components |
| **Language** | TypeScript | ^5.x | Static type-checking across the entire codebase |
| **UI Library** | React | ^18.3.1 | Component-based UI rendering |
| **Graph Engine** | React Flow (`reactflow`) | ^11.11.4 | Interactive node-and-edge graph canvas for workflow construction |
| **Styling** | Tailwind CSS | ^4.1.9 | Utility-first atomic CSS framework |
| **CSS Animations** | `tw-animate-css` / `tailwindcss-animate` | 1.3.3 / ^1.0.7 | Pre-built CSS animation utilities for Tailwind |
| **Component System** | shadcn/ui (New York variant) | N/A | Radix UI-based headless component primitives |
| **Headless Primitives** | Radix UI (`@radix-ui/react-*`) | Multiple | Accessible, unstyled UI primitives (dialog, select, accordion, tabs, etc.) |
| **Icons** | Lucide React | ^0.454.0 | Tree-shakeable SVG icon library |
| **Form Handling** | React Hook Form + Zod | ^7.60.0 / 3.25.67 | Performant form state management with schema-based validation via `@hookform/resolvers` |
| **CSS Utility Merging** | `tailwind-merge` + `clsx` + `class-variance-authority` | ^2.5.5 / ^2.1.1 / ^0.7.1 | Conflict-free dynamic class composition |
| **Typography** | `Space_Grotesk` (Google Fonts) + `GeistMono` | Latest | Custom font loading via `next/font` |
| **Animation** | Framer Motion | Latest | Declarative React animation library |
| **Charts** | Recharts | Latest | Composable charting library for data visualization |
| **Analytics** | Vercel Analytics (`@vercel/analytics`) | Latest | Production page-view and web vitals tracking |
| **Toast Notifications** | Sonner | ^1.7.4 | Lightweight toast notification system |
| **Theme Management** | `next-themes` | ^0.4.6 | Dark/light mode theming with SSR support |
| **Carousel** | Embla Carousel React | 8.5.1 | Performant carousel/slider component |
| **Resizable Panels** | `react-resizable-panels` | ^2.1.7 | Drag-to-resize panel layouts |
| **Drawer** | Vaul | ^0.9.9 | Mobile-friendly bottom sheet drawer component |
| **Date Utilities** | date-fns / react-day-picker | 4.1.0 / 9.8.0 | Date parsing, formatting, and calendar picker |
| **Package Manager** | pnpm | N/A | Disk-efficient, fast package management |
| **Backend API** | External REST (localhost:3002) | N/A | Workflow persistence, prompt retrieval, and LLM chat relay |

---

## Architecture & Module Breakdown

### Routing Architecture (Next.js App Router)

The application uses Next.js 16's App Router with file-system-based routing:

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Landing/marketing page with hero, token data, and navigation to workflow builder |
| `/workflow` | `app/workflow/page.tsx` | Workflow dashboard — lists all workflows, search, create-new modal |
| `/workflow/[id]` | `app/workflow/[id]/page.tsx` | **Core workflow editor** — React Flow canvas, node palette, config panel, compilation engine |
| `/workflow/[id]/preview` | `app/workflow/[id]/preview/page.tsx` | **Live preview** — split-pane view with read-only graph + real-time AI chat interface |

### Workflow Editor — Core Engine

This is the primary module (~1,485 lines in `app/workflow/[id]/page.tsx`). It utilizes `reactflow` to render an interactive directed graph where:

- **State Management**: Uses React's `useState` and `useCallback` hooks. Node positions, connections (edges), and per-node configuration data are all stored in component-level state via `useNodesState` and `useEdgesState` from React Flow.
- **Node Types Supported**:
  - **Start Node** (`input` type) — entry point, styled with `#39FF14` brand color
  - **AI Node** — accepts a name and a freeform prompt (LLM system instructions)
  - **IoT Trigger / Process Node** — name, description, and action selector (Transform/Filter/Aggregate/Custom)
  - **If/Else Node** — custom React Flow node with tri-directional `Handle` components (`true`, `false`, `default` outputs); configured via condition/operator/compareValue fields
  - **API Node** — HTTP method selector, URL, JSON headers, and JSON body fields
  - **Web Crawler Node** — topic-based knowledge acquisition (see Web Crawler Module below)
  - **Twitter Node** — social media integration with OAuth token fields
  - **End Node** — terminal node
- **Edge Connection**: `onConnect` callback using React Flow's `addEdge` utility to create directed edges between node handles.
- **Node Click → Config Panel**: Clicking a node opens a right-side configuration panel that renders type-specific forms.

### Prompt Compilation Engine

The `compileWorkflow()` function traverses all nodes in the graph and generates a structured Markdown system prompt:

1. **AI Nodes** → `## ROLE & IDENTITY` section with the user-defined persona/instructions
2. **Process Nodes** → `## CORE CAPABILITIES & PROCESSES` section with descriptions and actions
3. **If/Else Nodes** → `## DECISION LOGIC & RULES` section with conditional branching rules (`IF condition operator value, THEN TRUE path, ELSE FALSE path`)
4. **API Nodes** → `## EXTERNAL DATA SOURCES & API INTEGRATION` section with method/URL/headers/body
5. **Web Crawler Nodes** → `## WEB CRAWLED KNOWLEDGE BASE` section with injected crawled content
6. **Graph Topology** → `## WORKFLOW STRUCTURE` section listing total node/edge counts and all edge connections (`Source → Target`)
7. **System Instructions** → Appended behavioral constraints (respond naturally, <100 words, don't reveal internals)

This compiled prompt is then persisted via `POST http://localhost:3002/v1/workflow` with the workflow name and prompt payload. The backend returns a `workflowid` used for preview and API access.

### Web Crawler Module

The web crawler (`WebCrawlerNodeConfig.tsx`) provides real-time knowledge injection into the agent by fetching from:

1. **DuckDuckGo Instant Answer API** (`api.duckduckgo.com`) — zero-auth search abstracts, definitions, and related topics
2. **Wikipedia API** (`en.wikipedia.org/w/api.php`) — multi-article extraction via `action=query&list=search` followed by `action=query&prop=extracts` for full introductory content of up to 3 articles

Configurable parameters:
- Topic/search query (free text)
- Source count (5/10/15/20 — controls `srlimit` on Wikipedia)

The crawled data is formatted into a structured knowledge base document and stored in node-level state (`crawledData`), which gets injected into the compiled prompt at compilation time.

### Live Preview & Chat Interface

Split-pane layout (`app/workflow/[id]/preview/page.tsx`):

- **Left pane**: Read-only React Flow graph rendering (all interaction disabled — `nodesDraggable={false}`, `nodesConnectable={false}`, `elementsSelectable={false}`)
- **Right pane**: Chat interface with:
  - Message history (role-based rendering with avatar icons)
  - Streaming-aware loading state with `Loader2` spinner
  - Auto-scroll via `useRef` + `scrollIntoView`
  - Messages dispatched to `POST http://localhost:3002/v1/chat` with the compiled system prompt and user message
  - **Code Export Modal**: Generates a copy-pasteable JavaScript integration snippet (`fetchWorkflowPrompt()` + `sendChatMessage()`) with the workflow ID baked in; clipboard copy via `navigator.clipboard.writeText()`

Data is passed from the editor to the preview via `sessionStorage` (`workflowNodes`, `workflowEdges`). The compiled prompt is fetched from the backend via `GET http://localhost:3002/v1/workflow/prompt/{workflowId}`.

### Component Architecture

The config panel uses a **strategy pattern** for node configuration:

```
ConfigPanel.tsx
  ├── AINodeConfig.tsx        → FormInput (name) + FormTextarea (prompt)
  ├── APINodeConfig.tsx       → FormSelect (method) + FormInput (URL) + FormTextarea (headers, body)
  ├── IfElseNodeConfig.tsx    → FormInput (condition) + FormSelect (operator) + FormInput (compareValue)
  ├── ProcessNodeConfig.tsx   → FormInput (name) + FormTextarea (description) + FormSelect (action)
  └── WebCrawlerNodeConfig.tsx → FormInput (name, topic) + FormTextarea (description) + FormSelect (sources) + crawl button
```

Reusable form primitives:
- **`FormInput`** — labeled text input with consistent Tailwind styling
- **`FormSelect`** — labeled dropdown with dynamic options array
- **`FormTextarea`** — labeled multiline text input with configurable rows

**`CompilationModal`** — animated modal showing a spinning loader during compilation, then displaying the compiled prompt in a scrollable `<pre>` block upon completion.

### Styling System

- **Tailwind CSS v4** with `@tailwindcss/postcss` and `tw-animate-css`
- **CSS Custom Properties** (oklch color space) for theming — defined in `app/globals.css` with light/dark variants
- **shadcn/ui** component library (New York style) configured via `components.json` — provides 50+ Radix-based UI primitives in `components/ui/`
- **Cyberpunk-inspired design**: Dark background (`#0a0a0f`), neon green accent (`#39FF14`), cyan secondary (`#00D9FF`), glass-morphism effects (`backdrop-blur-md`), glowing box-shadows, gradient borders, and pulse animations
- **Custom React Flow styling**: Overridden via scoped `<style jsx global>` — green edges (`#39FF14`), custom handle sizes, dark minimap

---

## Backend API Contract

The frontend communicates with a REST API server at `http://localhost:3002`:

| Endpoint | Method | Payload | Response | Purpose |
|---|---|---|---|---|
| `/v1/workflow` | POST | `{ name, prompt }` | `{ workflowid }` | Persist compiled workflow prompt |
| `/v1/workflow/prompt/{id}` | GET | — | `{ prompt }` | Retrieve compiled prompt by workflow ID |
| `/v1/chat` | POST | `{ prompt, message }` | `{ success, response }` | Send user message + system prompt to LLM, return AI response |

---

## Data Flow

```
User builds graph → Configures nodes → Clicks "Save"
    ↓
compileWorkflow() traverses all nodes/edges
    ↓
Generates structured Markdown system prompt
    ↓
POST /v1/workflow → Backend persists prompt, returns workflowId
    ↓
User clicks "Run" → Redirects to /workflow/{id}/preview
    ↓
Preview loads nodes/edges from sessionStorage + fetches prompt from backend
    ↓
User sends message → POST /v1/chat { prompt, message }
    ↓
Backend forwards to LLM with system prompt → Returns AI response
    ↓
Response rendered in chat UI
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm

### Installation

```bash
pnpm install
```

### Environment Setup

Copy the example env file and configure your backend URL:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# For local development
NEXT_PUBLIC_API_URL=http://localhost:3002

# For production (set this to your deployed backend URL)
# NEXT_PUBLIC_API_URL=https://your-backend.example.com
```

### Development

```bash
pnpm dev
```

The app runs at `http://localhost:3000`. Ensure the backend API is running at the URL configured in `.env.local`.

### Deployment

1. Push to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Add the environment variable `NEXT_PUBLIC_API_URL` pointing to your deployed backend
4. Deploy

---

## License

MIT
