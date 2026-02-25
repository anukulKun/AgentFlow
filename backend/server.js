const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// In-memory workflow storage (use a database for production)
const workflows = new Map();

// Generate a simple unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'AgentFlow Backend API' });
});

// POST /v1/workflow - Save a compiled workflow prompt
app.post('/v1/workflow', (req, res) => {
  try {
    const { name, prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const workflowid = generateId();
    workflows.set(workflowid, {
      id: workflowid,
      name: name || 'Untitled Workflow',
      prompt,
      createdAt: new Date().toISOString(),
    });

    console.log(`Workflow saved: ${workflowid} - "${name}"`);
    res.json({ workflowid });
  } catch (error) {
    console.error('Error saving workflow:', error);
    res.status(500).json({ error: 'Failed to save workflow' });
  }
});

// GET /v1/workflow/prompt/:id - Retrieve a workflow prompt by ID
app.get('/v1/workflow/prompt/:id', (req, res) => {
  try {
    const { id } = req.params;
    const workflow = workflows.get(id);

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json({ prompt: workflow.prompt });
  } catch (error) {
    console.error('Error fetching workflow:', error);
    res.status(500).json({ error: 'Failed to fetch workflow' });
  }
});

// POST /v1/chat - Send a message to the AI using the workflow prompt
app.post('/v1/chat', async (req, res) => {
  try {
    const { prompt, message } = req.body;

    if (!prompt || !message) {
      return res.status(400).json({ error: 'Both prompt and message are required' });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || 'No response generated';

    res.json({
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error('Error in chat:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to get AI response',
      details: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 AgentFlow Backend running on http://localhost:${PORT}`);
  console.log(`\nEndpoints:`);
  console.log(`  POST /v1/workflow        - Save a workflow`);
  console.log(`  GET  /v1/workflow/prompt/:id - Get workflow prompt`);
  console.log(`  POST /v1/chat            - Chat with AI\n`);

  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'gsk_your_api_key_here') {
    console.log(`⚠️  WARNING: No Groq API key set!`);
    console.log(`   Get your FREE key at: https://console.groq.com/keys`);
    console.log(`   Then set it in .env file\n`);
  }
});
