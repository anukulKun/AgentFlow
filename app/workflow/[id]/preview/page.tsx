"use client"

import { useState, useEffect, useRef } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Handle,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { 
  Zap, 
  ArrowLeft,
  Send,
  Bot,
  User,
  Loader2,
  MessageSquare,
  Code,
  Copy,
  Check,
  X
} from 'lucide-react'

// Custom If/Else Node Component (same as editor)
const IfElseNode = ({ data }) => {
  return (
    <div style={{
      background: '#f59e0b',
      color: '#fff',
      border: '2px solid rgba(255,255,255,0.2)',
      borderRadius: '12px',
      padding: '12px 24px',
      fontWeight: 'bold',
      fontSize: '14px',
      minWidth: '120px',
      textAlign: 'center'
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#39FF14' }} />
      {data.label}
      <Handle 
        type="source" 
        position={Position.Left} 
        id="false"
        style={{ background: '#ef4444', left: '10px', top: '50%' }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="true"
        style={{ background: '#10b981', right: '10px', top: '50%' }}
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="default"
        style={{ background: '#6b7280' }}
      />
    </div>
  )
}

const nodeTypesConfig = {
  ifElse: IfElseNode,
}

export default function WorkflowPreviewPage() {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [workflowPrompt, setWorkflowPrompt] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant based on the workflow you created. How can I help you today?'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true)
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Extract workflow ID from URL (format: workflow/:id/preview)
    const pathParts = window.location.pathname.split('/')
    const workflowIndex = pathParts.indexOf('workflow')
    const workflowId = workflowIndex !== -1 ? pathParts[workflowIndex + 1] : null

    // Load workflow data from sessionStorage
    const storedNodes = sessionStorage.getItem('workflowNodes')
    const storedEdges = sessionStorage.getItem('workflowEdges')

    if (storedNodes) setNodes(JSON.parse(storedNodes))
    if (storedEdges) setEdges(JSON.parse(storedEdges))

    // Fetch prompt from backend
    const fetchPrompt = async () => {
      if (!workflowId) {
        console.error('No workflow ID found in URL')
        setIsLoadingPrompt(false)
        return
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/workflow/prompt/${workflowId}`)
        const data = await response.json()
        
        if (response.ok && data.prompt) {
          setWorkflowPrompt(data.prompt)
          console.log('Prompt loaded successfully:', data.prompt)
        } else {
          console.error('Failed to fetch prompt:', data.error)
        }
      } catch (error) {
        console.error('Error fetching prompt:', error)
      } finally {
        setIsLoadingPrompt(false)
      }
    }

    fetchPrompt()
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || isLoadingPrompt) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      // Call the chat API with the workflow prompt
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: workflowPrompt,
          message: userMessage,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.response 
        }])
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error processing your request. Please try again.' 
        }])
        console.error('Chat API error:', data.error || data.details)
      }
    } catch (error) {
      console.error('Error calling chat API:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I\'m having trouble connecting. Please try again later.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getCodeSnippet = () => {
    const pathParts = window.location.pathname.split('/')
    const workflowIndex = pathParts.indexOf('workflow')
    const workflowId = workflowIndex !== -1 ? pathParts[workflowIndex + 1] : 'YOUR_WORKFLOW_ID'

    return `// Workflow Automation Code
// Copy this code to integrate this workflow into your application

const workflowId = '${workflowId}';
const apiBaseUrl = '${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'}/v1';

// Function to fetch the workflow prompt
async function fetchWorkflowPrompt(workflowId) {
  try {
    const response = await fetch(\`\${apiBaseUrl}/workflow/prompt/\${workflowId}\`);
    const data = await response.json();
    
    if (response.ok && data.prompt) {
      return data.prompt;
    } else {
      throw new Error(data.error || 'Failed to fetch prompt');
    }
  } catch (error) {
    console.error('Error fetching workflow prompt:', error);
    throw error;
  }
}

// Function to send a chat message using the workflow
async function sendChatMessage(prompt, userMessage) {
  try {
    const response = await fetch(\`\${apiBaseUrl}/chat\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        message: userMessage,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return data.response;
    } else {
      throw new Error(data.error || data.details || 'Failed to get response');
    }
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}

// Example usage
async function runWorkflow(userMessage) {
  try {
    // Step 1: Fetch the workflow prompt
    const workflowPrompt = await fetchWorkflowPrompt(workflowId);
    console.log('Workflow prompt loaded successfully');

    // Step 2: Send user message with the workflow prompt
    const aiResponse = await sendChatMessage(workflowPrompt, userMessage);
    console.log('AI Response:', aiResponse);

    return aiResponse;
  } catch (error) {
    console.error('Workflow execution failed:', error);
    return 'Sorry, I encountered an error processing your request.';
  }
}

// Run the workflow
runWorkflow('Hello, how can you help me?')
  .then(response => console.log('Response:', response));
`;
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-screen w-screen bg-[#0a0a0f] flex flex-col">
      {/* Header */}
      <header className="bg-[#0a0a0f]/80 backdrop-blur-md border-b border-gray-800/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#39FF14]" />
              Workflow Preview
            </h1>
            <p className="text-sm text-gray-400">Testing your AI workflow</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-lg">
            <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-[#39FF14]">Live Preview</span>
          </div>
          <button
            onClick={() => setShowCodeModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 hover:border-purple-500/50 rounded-lg transition-all duration-300 group"
          >
            <Code className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
            <span className="text-sm font-semibold text-purple-400 group-hover:text-purple-300">Get Code</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Workflow View (Left Side - Locked) */}
        <div className="flex-1 relative bg-[#1a1a24] border-r border-gray-800/50">
          <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-800/50">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Read-only mode
            </p>
          </div>
          
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypesConfig}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            fitView
            attributionPosition="bottom-left"
          >
            <Controls 
              className="bg-black/50 border border-gray-800/50 rounded-lg"
              showInteractive={false}
            />
            <MiniMap
              className="bg-[#0a0a0f] border border-gray-800/50 rounded-lg"
              maskColor="rgba(10, 10, 15, 0.8)"
              nodeColor={(node) => {
                if (node.type === 'input') return '#39FF14'
                return node.style?.background || '#666'
              }}
            />
            <Background 
              variant={BackgroundVariant.Dots}
              gap={16}
              size={2}
              color="#39FF14"
              style={{ opacity: 0.3 }}
            />
          </ReactFlow>
        </div>

        {/* Chat Interface (Right Side) */}
        <aside className="w-[450px] bg-gradient-to-b from-black/60 via-black/50 to-black/60 flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#39FF14] to-[#2de00f] rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Assistant</h3>
                <p className="text-xs text-gray-400">
                  {isLoadingPrompt ? 'Loading workflow...' : 'Powered by your workflow'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-blue-500/20 border border-blue-500/30' 
                    : 'bg-[#39FF14]/20 border border-[#39FF14]/30'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Bot className="w-4 h-4 text-[#39FF14]" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[280px] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-500/20 border border-blue-500/30 text-white'
                    : 'bg-black/40 border border-gray-800/50 text-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#39FF14]/20 border border-[#39FF14]/30">
                  <Bot className="w-4 h-4 text-[#39FF14]" />
                </div>
                <div className="bg-black/40 border border-gray-800/50 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#39FF14] animate-spin" />
                    <span className="text-sm text-gray-400">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-800/50">
            <div className="relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows={3}
                disabled={isLoading || isLoadingPrompt}
                className="w-full px-4 py-3 pr-12 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all resize-none disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || isLoadingPrompt}
                className={`absolute bottom-3 right-3 p-2 rounded-lg transition-all duration-300 ${
                  inputMessage.trim() && !isLoading && !isLoadingPrompt
                    ? 'bg-[#39FF14] text-black hover:bg-[#2de00f] shadow-[0_0_20px_rgba(57,255,20,0.3)]'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </aside>
      </div>

      {/* Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a24] border border-gray-800/50 rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Integration Code</h2>
                  <p className="text-sm text-gray-400">Copy this code to use the workflow in your application</p>
                </div>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="relative">
                <pre className="bg-black/50 border border-gray-800/50 rounded-xl p-6 text-sm text-gray-300 overflow-x-auto font-mono leading-relaxed">
                  <code>{getCodeSnippet()}</code>
                </pre>
                <button
                  onClick={handleCopyCode}
                  className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    copied
                      ? 'bg-[#39FF14]/20 border border-[#39FF14]/30 text-[#39FF14]'
                      : 'bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 hover:text-purple-300'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-sm font-semibold">Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Usage Instructions */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <h3 className="text-sm font-bold text-blue-400 mb-2">📋 How to Use:</h3>
                <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                  <li>Copy the code above and paste it into your JavaScript/TypeScript project</li>
                  <li>Make sure your backend server is running on <code className="px-1.5 py-0.5 bg-black/50 rounded text-[#39FF14]">http://localhost:4000</code></li>
                  <li>Call <code className="px-1.5 py-0.5 bg-black/50 rounded text-[#39FF14]">runWorkflow(message)</code> with any user message</li>
                  <li>The workflow will automatically use the AI prompt you configured</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-800/50 flex justify-end gap-3">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .react-flow__node {
          font-family: inherit;
          pointer-events: none;
        }
        .react-flow__edge-path {
          stroke: #39FF14;
          stroke-width: 2;
        }
        .react-flow__handle {
          background: #39FF14;
          width: 10px;
          height: 10px;
          border: 2px solid #0a0a0f;
          pointer-events: none;
        }
        .react-flow__controls-button {
          background: #f3f4f6 !important;
          border-bottom: 1px solid #e5e7eb !important;
          color: #1f2937 !important;
        }
        .react-flow__controls-button:hover {
          background: #e5e7eb !important;
        }
        .react-flow__controls-button svg {
          fill: #1f2937 !important;
        }
        .react-flow__minimap {
          background-color: #0a0a0f !important;
        }
        .react-flow__attribution {
          opacity: 0.3;
        }
      `}</style>
    </div>
  )
}