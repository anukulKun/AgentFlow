# AgentFlow Backend

Backend API server for [AgentFlow](https://github.com/anukulKun/AgentFlow) — the visual AI agent builder.

## Setup

### 1. Get a FREE Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (free, no credit card needed)
3. Navigate to **API Keys** → **Create API Key**
4. Copy the key

### 2. Install & Configure

```bash
npm install
cp .env.example .env
```

Edit `.env` and paste your Groq API key:

```env
GROQ_API_KEY=gsk_your_actual_key_here
PORT=3002
```

### 3. Run

```bash
npm run dev
```

Server runs at `http://localhost:3002`.

## API Endpoints

| Endpoint | Method | Payload | Response |
|---|---|---|---|
| `/v1/workflow` | POST | `{ name, prompt }` | `{ workflowid }` |
| `/v1/workflow/prompt/:id` | GET | — | `{ prompt }` |
| `/v1/chat` | POST | `{ prompt, message }` | `{ success, response }` |

## Deployment

Deploy to any Node.js hosting platform:

- **Railway**: Connect GitHub repo → auto-deploy
- **Render**: New Web Service → connect repo
- **Fly.io**: `fly launch` → `fly deploy`

Set `GROQ_API_KEY` as an environment variable on your hosting platform.

## License

MIT
