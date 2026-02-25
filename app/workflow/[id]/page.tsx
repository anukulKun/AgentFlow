"use client";

import { useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  Zap,
  Brain,
  GitBranch,
  XCircle,
  Activity,
  Cloud,
  Plus,
  Save,
  Play,
  Twitter,  
  ArrowLeft,
  Globe,
} from "lucide-react";

// Custom If/Else Node Component
const IfElseNode = ({ data }) => {
  return (
    <div
      style={{
        background: "#f59e0b",
        color: "#fff",
        border: "2px solid rgba(255,255,255,0.2)",
        borderRadius: "12px",
        padding: "12px 24px",
        fontWeight: "bold",
        fontSize: "14px",
        minWidth: "120px",
        textAlign: "center",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#39FF14" }}
      />
      {data.label}
      <Handle
        type="source"
        position={Position.Left}
        id="false"
        style={{ background: "#ef4444", left: "10px", top: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ background: "#10b981", right: "10px", top: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="default"
        style={{ background: "#6b7280" }}
      />
    </div>
  );
};

const nodeTypesConfig = {
  ifElse: IfElseNode,
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start", nodeType: "start" },
    position: { x: 250, y: 50 },
    style: {
      background: "#39FF14",
      color: "#000",
      border: "2px solid #2de00f",
      borderRadius: "12px",
      padding: "10px 20px",
      fontWeight: "bold",
    },
  },
];

const initialEdges = [];

const nodeTypes = [
  { id: "process", label: "Iot Trigger", icon: Activity, color: "#3b82f6" },
  { id: "ai", label: "AI", icon: Brain, color: "#8b5cf6" },
  { id: "if-else", label: "If/Else", icon: GitBranch, color: "#f59e0b" },
  { id: "web-crawler", label: "Web Crawler", icon: Globe, color: "#06b6d4" },
  { id: "twitter", label: "Twitter", icon: Twitter, color: "#1DA1F2" },
    { id: "end", label: "End", icon: XCircle, color: "#ef4444" },
  { id: "api", label: "API", icon: Cloud, color: "#10b981" },
];

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeIdCounter, setNodeIdCounter] = useState(2);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeData, setNodeData] = useState({});
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationDone, setCompilationDone] = useState(false);
  const [compiledPrompt, setCompiledPrompt] = useState("");
  const [apiId, setapiId] = useState();
  const [twitterAccessToken, setTwitterAccessToken] = useState("");
  const [twitterAccessSecret, setTwitterAccessSecret] = useState("");
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);


  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const closePanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const updateNodeData = useCallback(
    (field, value) => {
      if (!selectedNode) return;

      setNodeData((prev) => ({
        ...prev,
        [selectedNode.id]: {
          ...prev[selectedNode.id],
          [field]: value,
        },
      }));
    },
    [selectedNode]
  );

  const addNode = (type) => {
    const nodeType = nodeTypes.find((n) => n.id === type);

    const newNode = {
      id: `${nodeIdCounter}`,
      type: type === "if-else" ? "ifElse" : "default",
      data: {
        label: `${nodeType?.label || "Node"}`,
        nodeType: type,
      },
      position: {
        x: Math.random() * 400 + 200,
        y: Math.random() * 400 + 200,
      },
      style:
        type === "if-else"
          ? undefined
          : {
              background: nodeType?.color || "#666",
              color: "#fff",
              border: "2px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              padding: "12px 24px",
              fontWeight: "bold",
              fontSize: "14px",
            },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeIdCounter((prev) => prev + 1);
  };

  const saveWorkflow = async () => {
    if (!compiledPrompt) {
      alert("Please compile the workflow first by clicking Save");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/workflow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Customer Support Agent",
          prompt: compiledPrompt,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Workflow saved successfully!");
        console.log("Saved workflow:", result.workflowid);
        setapiId(result.workflowid)
      } else {
        const error = await response.json();
        alert(`Failed to save workflow: ${error.error}`);
      }
    } catch (error) {
      console.error("Error saving workflow:", error);
      alert("Failed to save workflow. Please check your connection.");
    }
  };

  const compileWorkflow = () => {
    setIsCompiling(true);
    setCompilationDone(false);

    // Simulate compilation process
    setTimeout(() => {
      let prompt = "# AI CHATBOT SYSTEM PROMPT\n\n";

      // Find AI nodes
      const aiNodes = nodes.filter((node) => node.data.nodeType === "ai");
      if (aiNodes.length > 0) {
        prompt += "## ROLE & IDENTITY\n";
        aiNodes.forEach((node) => {
          const data = nodeData[node.id] || {};
          const name = data.name || node.data.label;
          const aiPrompt = data.prompt || "";
          prompt += `### ${name}\n${aiPrompt}\n\n`;
        });
      }

      // Find Process nodes
      const processNodes = nodes.filter(
        (node) => node.data.nodeType === "process"
      );
      if (processNodes.length > 0) {
        prompt += "## CORE CAPABILITIES & PROCESSES\n";
        processNodes.forEach((node) => {
          const data = nodeData[node.id] || {};
          const name = data.name || node.data.label;
          const description = data.description || "";
          const action = data.action || "";
          prompt += `### ${name}\n`;
          if (description) prompt += `Description: ${description}\n`;
          if (action) prompt += `Action: ${action}\n`;
          prompt += `\n`;
        });
      }

      // Find If/Else nodes
      const ifElseNodes = nodes.filter(
        (node) => node.data.nodeType === "if-else"
      );
      if (ifElseNodes.length > 0) {
        prompt += "## DECISION LOGIC & RULES\n";
        ifElseNodes.forEach((node) => {
          const data = nodeData[node.id] || {};
          const condition = data.condition || "";
          const operator = data.operator || "";
          const compareValue = data.compareValue || "";
          prompt += `### Conditional Rule\n`;
          if (condition && operator && compareValue) {
            prompt += `IF ${condition} ${operator} ${compareValue}, THEN follow the TRUE path, ELSE follow the FALSE path.\n`;
          }
          prompt += `\n`;
        });
      }

      // Find API nodes
      const apiNodes = nodes.filter((node) => node.data.nodeType === "api");
      if (apiNodes.length > 0) {
        prompt += "## EXTERNAL DATA SOURCES & API INTEGRATION\n";
        apiNodes.forEach((node) => {
          const data = nodeData[node.id] || {};
          const method = data.method || "";
          const url = data.url || "";
          const headers = data.headers || "";
          const body = data.body || "";
          prompt += `### API Call\n`;
          if (method) prompt += `Method: ${method}\n`;
          if (url) prompt += `URL: ${url}\n`;
          if (headers) prompt += `Headers: ${headers}\n`;
          if (body) prompt += `Body: ${body}\n`;
          prompt += `\n`;
        });
      }

      // Find Web Crawler nodes
      const webCrawlerNodes = nodes.filter(
        (node) => node.data.nodeType === "web-crawler"
      );
      if (webCrawlerNodes.length > 0) {
        prompt += "## WEB CRAWLED KNOWLEDGE BASE\n";
        prompt +=
          "You have access to real-time web information about the following topics:\n\n";
        webCrawlerNodes.forEach((node) => {
          const data = nodeData[node.id] || {};
          const topic = data.topic || "";
          const crawledData = data.crawledData || "";
          const name = data.name || node.data.label;

          prompt += `### ${name}\n`;
          if (topic) prompt += `Topic: ${topic}\n`;
          if (crawledData) {
            prompt += `\nCrawled Information:\n${crawledData}\n`;
          } else {
            prompt += `\nNote: Web crawling for "${topic}" will be performed before deployment.\n`;
          }
          prompt += `\nUse this information to answer user questions about ${topic}. Cite sources when applicable.\n\n`;
        });
      }

      // Add workflow structure
      prompt += "## WORKFLOW STRUCTURE\n";
      prompt += `Total Nodes: ${nodes.length}\n`;
      prompt += `Total Connections: ${edges.length}\n\n`;

      prompt += "### Node Connections:\n";
      edges.forEach((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);
        const sourceLabel = sourceNode?.data?.label || "Unknown";
        const targetLabel = targetNode?.data?.label || "Unknown";
        const handleId = edge.sourceHandle ? ` (${edge.sourceHandle})` : "";
        prompt += `- ${sourceLabel}${handleId} → ${targetLabel}\n`;
      });

      prompt += "\n## INSTRUCTIONS\n";
      prompt +=
        "Follow the workflow logic defined above but reply like a real person and don't talk about the work with the user also reply in less than 100 words . Process user inputs according to the node sequence and conditions. When a decision point is reached, evaluate the conditions and follow the appropriate path. Integrate with external APIs as needed and provide responses based on the defined capabilities.\n";

      setCompiledPrompt(prompt);
      setCompilationDone(true);
    }, 2000);
  };

  const handleRun = () => {
    if (compiledPrompt) {
      // Store the compiled prompt in sessionStorage for the preview page
      sessionStorage.setItem("workflowPrompt", compiledPrompt);
      sessionStorage.setItem("workflowNodes", JSON.stringify(nodes));
      sessionStorage.setItem("workflowEdges", JSON.stringify(edges));
      window.location.href = `/workflow/${apiId}/preview`;
    }
  };

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
              Workflow Editor
            </h1>
            <p className="text-sm text-gray-400">Customer Support Agent</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={async () => {
              compileWorkflow();
              await new Promise((resolve) => setTimeout(resolve, 2100));
              await saveWorkflow();
            }}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-800 hover:border-[#39FF14]/50 rounded-lg transition-all duration-300 hover:bg-[#39FF14]/5 font-semibold flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={handleRun}
            disabled={!compiledPrompt}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-300 flex items-center gap-2 ${
              compiledPrompt
                ? "bg-[#39FF14] text-black hover:bg-[#2de00f] shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Play className="w-4 h-4" />
            Run
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Node Palette Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-black/60 via-black/50 to-black/60 border-r border-gray-800/50 backdrop-blur-md p-6 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Nodes
            </h3>
            <div className="h-[2px] bg-gradient-to-r from-[#39FF14]/50 via-[#39FF14]/20 to-transparent rounded-full"></div>
          </div>

          <div className="space-y-2">
            {nodeTypes.map((nodeType) => (
              <button
                key={nodeType.id}
                onClick={() => addNode(nodeType.id)}
                className="group w-full flex items-center gap-3 px-4 py-3 bg-black/30 hover:bg-black/50 border border-gray-800/50 hover:border-gray-700 rounded-xl transition-all duration-300 text-left"
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-lg"
                  style={{
                    backgroundColor: `${nodeType.color}20`,
                    border: `1px solid ${nodeType.color}40`,
                  }}
                >
                  <nodeType.icon
                    className="w-5 h-5"
                    style={{ color: nodeType.color }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white group-hover:text-gray-100">
                    {nodeType.label}
                  </p>
                  <p className="text-xs text-gray-500">Click to add</p>
                </div>
                <Plus className="w-4 h-4 text-gray-600 group-hover:text-gray-400" />
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-br from-[#39FF14]/5 to-[#00D9FF]/5 rounded-xl border border-gray-800/50">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Tips
            </h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>• Drag nodes to position</li>
              <li>• Connect nodes by dragging from edges</li>
              <li>• Click on nodes to configure</li>
            </ul>
          </div>
        </aside>

        {/* React Flow Canvas */}
        <div className="flex-1 relative bg-[#1a1a24]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypesConfig}
            fitView
          >
            <Controls className="bg-black/50 border border-gray-800/50 rounded-lg" />
            <MiniMap
              className="bg-[#0a0a0f] border border-gray-800/50 rounded-lg"
              maskColor="rgba(10, 10, 15, 0.8)"
              nodeColor={(node) => {
                if (node.type === "input") return "#39FF14";
                return node.style?.background || "#666";
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

        {/* Right Panel - Node Configuration */}
        {selectedNode && (
          <aside className="w-96 bg-gradient-to-b from-black/60 via-black/50 to-black/60 border-l border-gray-800/50 backdrop-blur-md overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#39FF14] rounded-full"></span>
                  Configure Node
                </h3>
                <button
                  onClick={closePanel}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Node Type Display */}
                <div className="p-4 bg-black/30 rounded-xl border border-gray-800/50">
                  <p className="text-xs text-gray-500 mb-1">Node Type</p>
                  <p className="text-sm font-semibold text-white capitalize">
                    {selectedNode.data.nodeType || "Unknown"}
                  </p>
                </div>

                {/* AI Node Configuration */}
                {selectedNode.data.nodeType === "ai" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Node Name
                      </label>
                      <input
                        type="text"
                        value={nodeData[selectedNode.id]?.name || ""}
                        onChange={(e) => {
                          updateNodeData("name", e.target.value);
                          // Update the node label immediately
                          setNodes((nds) =>
                            nds.map((node) =>
                              node.id === selectedNode.id
                                ? {
                                    ...node,
                                    data: {
                                      ...node.data,
                                      label: e.target.value || "AI",
                                    },
                                  }
                                : node
                            )
                          );
                        }}
                        placeholder="Enter node name..."
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Prompt
                      </label>
                      <textarea
                        value={nodeData[selectedNode.id]?.prompt || ""}
                        onChange={(e) =>
                          updateNodeData("prompt", e.target.value)
                        }
                        placeholder="Enter your AI prompt..."
                        rows={6}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all resize-none"
                      />
                    </div>
                  </>
                )}

                {/* API Node Configuration */}
                {selectedNode.data.nodeType === "api" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Method
                      </label>
                      <select
                        value={nodeData[selectedNode.id]?.method || ""}
                        onChange={(e) =>
                          updateNodeData("method", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      >
                        <option value="">Select Method</option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        URL
                      </label>
                      <input
                        type="text"
                        value={nodeData[selectedNode.id]?.url || ""}
                        onChange={(e) => updateNodeData("url", e.target.value)}
                        placeholder="https://api.example.com/endpoint"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Headers (JSON)
                      </label>
                      <textarea
                        value={nodeData[selectedNode.id]?.headers || ""}
                        onChange={(e) =>
                          updateNodeData("headers", e.target.value)
                        }
                        placeholder='{"Authorization": "Bearer token"}'
                        rows={4}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all resize-none font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Body (JSON)
                      </label>
                      <textarea
                        value={nodeData[selectedNode.id]?.body || ""}
                        onChange={(e) => updateNodeData("body", e.target.value)}
                        placeholder='{"key": "value"}'
                        rows={4}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all resize-none font-mono text-sm"
                      />
                    </div>
                  </>
                )}

                {/* Process Node Configuration */}
                {selectedNode.data.nodeType === "process" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Process Name
                      </label>
                      <input
                        type="text"
                        value={nodeData[selectedNode.id]?.name || ""}
                        onChange={(e) => updateNodeData("name", e.target.value)}
                        placeholder="Enter process name..."
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Description
                      </label>
                      <textarea
                        value={nodeData[selectedNode.id]?.description || ""}
                        onChange={(e) =>
                          updateNodeData("description", e.target.value)
                        }
                        placeholder="Describe what this process does..."
                        rows={4}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Action
                      </label>
                      <select
                        value={nodeData[selectedNode.id]?.action || ""}
                        onChange={(e) =>
                          updateNodeData("action", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      >
                        <option value="">Select Action</option>
                        <option value="transform">Transform Data</option>
                        <option value="filter">Filter Data</option>
                        <option value="aggregate">Aggregate Data</option>
                        <option value="custom">Custom Action</option>
                      </select>
                    </div>
                  </>
                )}

                {/* If/Else Node Configuration */}
                {selectedNode.data.nodeType === "if-else" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Condition
                      </label>
                      <input
                        type="text"
                        value={nodeData[selectedNode.id]?.condition || ""}
                        onChange={(e) =>
                          updateNodeData("condition", e.target.value)
                        }
                        placeholder="e.g., value > 100"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Operator
                      </label>
                      <select
                        value={nodeData[selectedNode.id]?.operator || ""}
                        onChange={(e) =>
                          updateNodeData("operator", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      >
                        <option value="">Select Operator</option>
                        <option value="equals">Equals (==)</option>
                        <option value="not-equals">Not Equals (!=)</option>
                        <option value="greater">Greater Than (&gt;)</option>
                        <option value="less">Less Than (&lt;)</option>
                        <option value="contains">Contains</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Compare Value
                      </label>
                      <input
                        type="text"
                        value={nodeData[selectedNode.id]?.compareValue || ""}
                        onChange={(e) =>
                          updateNodeData("compareValue", e.target.value)
                        }
                        placeholder="Enter comparison value..."
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      />
                    </div>
                  </>
                )}

                {/* Web Crawler Node Configuration */}
                {selectedNode.data.nodeType === "web-crawler" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Crawler Name
                      </label>
                      <input
                        type="text"
                        value={nodeData[selectedNode.id]?.name || ""}
                        onChange={(e) => {
                          updateNodeData("name", e.target.value);
                          // Update the node label immediately
                          setNodes((nds) =>
                            nds.map((node) =>
                              node.id === selectedNode.id
                                ? {
                                    ...node,
                                    data: {
                                      ...node.data,
                                      label: e.target.value || "Web Crawler",
                                    },
                                  }
                                : node
                            )
                          );
                        }}
                        placeholder="Enter crawler name..."
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Topic / Search Query
                      </label>
                      <input
                        type="text"
                        value={nodeData[selectedNode.id]?.topic || ""}
                        onChange={(e) =>
                          updateNodeData("topic", e.target.value)
                        }
                        placeholder="e.g., Latest AI trends, Product documentation..."
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Description
                      </label>
                      <textarea
                        value={nodeData[selectedNode.id]?.description || ""}
                        onChange={(e) =>
                          updateNodeData("description", e.target.value)
                        }
                        placeholder="What kind of information should be gathered?"
                        rows={3}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Number of Sources
                      </label>
                      <select
                        value={nodeData[selectedNode.id]?.sourceCount || "5"}
                        onChange={(e) =>
                          updateNodeData("sourceCount", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                      >
                        <option value="5">5 sources (Quick)</option>
                        <option value="10">10 sources (Standard)</option>
                        <option value="15">15 sources (Comprehensive)</option>
                        <option value="20">20 sources (Maximum)</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        More sources = more data but slower crawl
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={async () => {
                          const topic = nodeData[selectedNode.id]?.topic;
                          if (!topic) {
                            alert("Please enter a topic first!");
                            return;
                          }

                          const sourceCount = parseInt(
                            nodeData[selectedNode.id]?.sourceCount || "5"
                          );

                          // Show loading state
                          updateNodeData("crawling", true);
                          updateNodeData(
                            "crawlProgress",
                            "Initializing web crawl..."
                          );

                          try {
                            let allData = `WEB CRAWLED KNOWLEDGE BASE: "${topic}"\n`;
                            allData += `Crawl Started: ${new Date().toLocaleString()}\n`;
                            allData += `Target Sources: ${sourceCount}\n`;
                            allData += `${"=".repeat(80)}\n\n`;

                            // 1. DuckDuckGo Instant Answer API
                            updateNodeData(
                              "crawlProgress",
                              "Fetching from DuckDuckGo..."
                            );
                            const searchQuery = encodeURIComponent(topic);
                            const ddgResponse = await fetch(
                              `https://api.duckduckgo.com/?q=${searchQuery}&format=json&pretty=1&no_html=1&skip_disambig=1`
                            );
                            const ddgData = await ddgResponse.json();

                            // 2. Wikipedia API - Get multiple articles
                            updateNodeData(
                              "crawlProgress",
                              "Fetching from Wikipedia..."
                            );
                            const wikiSearchResponse = await fetch(
                              `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*&srlimit=${Math.min(
                                sourceCount,
                                10
                              )}`
                            );
                            const wikiSearchData =
                              await wikiSearchResponse.json();

                            // Get full content for top Wikipedia articles
                            let wikiArticles = [];
                            if (wikiSearchData.query?.search) {
                              for (
                                let i = 0;
                                i <
                                Math.min(3, wikiSearchData.query.search.length);
                                i++
                              ) {
                                const article = wikiSearchData.query.search[i];
                                updateNodeData(
                                  "crawlProgress",
                                  `Fetching Wikipedia article ${i + 1}/3...`
                                );

                                try {
                                  const contentResponse = await fetch(
                                    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&titles=${encodeURIComponent(
                                      article.title
                                    )}&format=json&origin=*`
                                  );
                                  const contentData =
                                    await contentResponse.json();
                                  const pages = contentData.query?.pages;
                                  if (pages) {
                                    const pageId = Object.keys(pages)[0];
                                    if (pages[pageId].extract) {
                                      wikiArticles.push({
                                        title: article.title,
                                        extract: pages[pageId].extract,
                                        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(
                                          article.title.replace(/ /g, "_")
                                        )}`,
                                      });
                                    }
                                  }
                                  // Small delay to be respectful to API
                                  await new Promise((resolve) =>
                                    setTimeout(resolve, 200)
                                  );
                                } catch (err) {
                                  console.error(
                                    "Error fetching Wikipedia article:",
                                    err
                                  );
                                }
                              }
                            }

                            {/* Twitter Node Configuration */}
             {/* Twitter Node Configuration */}
       

                            // 3. Wikidata for structured data
                            updateNodeData(
                              "crawlProgress",
                              "Fetching from Wikidata..."
                            );
                            let wikidataInfo = null;
                            try {
                              const wikidataResponse = await fetch(
                                `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${searchQuery}&language=en&format=json&origin=*&limit=1`
                              );
                              const wikidataData =
                                await wikidataResponse.json();
                              if (
                                wikidataData.search &&
                                wikidataData.search.length > 0
                              ) {
                                wikidataInfo = wikidataData.search[0];
                              }
                            } catch (err) {
                              console.error("Wikidata error:", err);
                            }

                            // === COMPILE ALL DATA ===
                            updateNodeData(
                              "crawlProgress",
                              "Compiling data..."
                            );

                            // DuckDuckGo Section
                            if (ddgData.Abstract || ddgData.Definition) {
                              allData += `## 📚 PRIMARY OVERVIEW (DuckDuckGo)\n\n`;

                              if (ddgData.Abstract) {
                                allData += `**Summary:**\n${ddgData.Abstract}\n\n`;
                                if (ddgData.AbstractSource) {
                                  allData += `*Source: ${ddgData.AbstractSource}*\n`;
                                }
                                if (ddgData.AbstractURL) {
                                  allData += `*URL: ${ddgData.AbstractURL}*\n`;
                                }
                                allData += `\n`;
                              }

                              if (ddgData.Definition) {
                                allData += `**Definition:**\n${ddgData.Definition}\n`;
                                if (ddgData.DefinitionSource) {
                                  allData += `*Source: ${ddgData.DefinitionSource}*\n`;
                                }
                                if (ddgData.DefinitionURL) {
                                  allData += `*URL: ${ddgData.DefinitionURL}*\n`;
                                }
                                allData += `\n`;
                              }

                              allData += `\n`;
                            }

                            // Wikidata Structured Info
                            if (wikidataInfo) {
                              allData += `## 🔍 STRUCTURED DATA (Wikidata)\n\n`;
                              allData += `**Entity:** ${wikidataInfo.label}\n`;
                              if (wikidataInfo.description) {
                                allData += `**Description:** ${wikidataInfo.description}\n`;
                              }
                              if (wikidataInfo.id) {
                                allData += `**Wikidata ID:** ${wikidataInfo.id}\n`;
                                allData += `**URL:** https://www.wikidata.org/wiki/${wikidataInfo.id}\n`;
                              }
                              allData += `\n\n`;
                            }

                            // Wikipedia Articles (Full Content)
                            if (wikiArticles.length > 0) {
                              allData += `## 📖 DETAILED ARTICLES (Wikipedia)\n\n`;
                              wikiArticles.forEach((article, idx) => {
                                allData += `### Article ${idx + 1}: ${
                                  article.title
                                }\n\n`;
                                allData += `${article.extract}\n\n`;
                                allData += `**Full Article:** ${article.url}\n\n`;
                                allData += `${"-".repeat(80)}\n\n`;
                              });
                            }

                            // Related Topics & Deep Dive
                            if (
                              ddgData.RelatedTopics &&
                              ddgData.RelatedTopics.length > 0
                            ) {
                              allData += `## 🔗 RELATED TOPICS & ADDITIONAL INFORMATION\n\n`;
                              const relatedCount = Math.min(
                                sourceCount,
                                ddgData.RelatedTopics.length
                              );
                              for (let i = 0; i < relatedCount; i++) {
                                const topic = ddgData.RelatedTopics[i];
                                if (topic.Text) {
                                  allData += `**${i + 1}.** ${topic.Text}\n`;
                                  if (topic.FirstURL) {
                                    allData += `   📎 ${topic.FirstURL}\n`;
                                  }
                                  allData += `\n`;
                                }
                              }
                              allData += `\n`;
                            }

                            // Wikipedia Search Results (Additional Context)
                            if (
                              wikiSearchData.query?.search &&
                              wikiSearchData.query.search.length >
                                wikiArticles.length
                            ) {
                              allData += `## 📝 ADDITIONAL WIKIPEDIA REFERENCES\n\n`;
                              const additionalArticles =
                                wikiSearchData.query.search.slice(
                                  wikiArticles.length,
                                  sourceCount
                                );
                              additionalArticles.forEach((result, idx) => {
                                const cleanSnippet = result.snippet.replace(
                                  /<[^>]*>/g,
                                  ""
                                );
                                allData += `**${idx + 1}. ${result.title}**\n`;
                                allData += `${cleanSnippet}...\n`;
                                allData += `🔗 https://en.wikipedia.org/wiki/${encodeURIComponent(
                                  result.title.replace(/ /g, "_")
                                )}\n\n`;
                              });
                            }

                            // Infobox/Type Information
                            if (ddgData.Type) {
                              allData += `## ℹ️ CLASSIFICATION\n\n`;
                              allData += `**Type:** ${ddgData.Type}\n`;
                              if (ddgData.Heading) {
                                allData += `**Category:** ${ddgData.Heading}\n`;
                              }
                              allData += `\n`;
                            }

                            // External Links
                            if (ddgData.Results && ddgData.Results.length > 0) {
                              allData += `## 🌐 EXTERNAL RESOURCES\n\n`;
                              ddgData.Results.forEach((result, idx) => {
                                allData += `${idx + 1}. **${result.Text}**\n`;
                                allData += `   ${result.FirstURL}\n\n`;
                              });
                            }

                            // Footer with metadata
                            allData += `\n${"=".repeat(80)}\n`;
                            allData += `## CRAWL SUMMARY\n\n`;
                            allData += `📊 **Statistics:**\n`;
                            allData += `- Sources Crawled: ${sourceCount}\n`;
                            allData += `- Wikipedia Articles (Full): ${wikiArticles.length}\n`;
                            allData += `- Related Topics: ${
                              ddgData.RelatedTopics?.length || 0
                            }\n`;
                            allData += `- Additional References: ${
                              wikiSearchData.query?.search?.length || 0
                            }\n`;
                            allData += `\n`;
                            allData += `🔧 **Data Sources:**\n`;
                            allData += `- DuckDuckGo Instant Answer API\n`;
                            allData += `- Wikipedia API (en.wikipedia.org)\n`;
                            allData += `- Wikidata Knowledge Base\n`;
                            allData += `\n`;
                            allData += `⏰ **Crawl Completed:** ${new Date().toLocaleString()}\n`;
                            allData += `📝 **Total Characters:** ${allData.length.toLocaleString()}\n`;
                            allData += `\n`;
                            allData += `✅ All data is from free, public APIs with no authentication required.\n`;
                            allData += `🔄 Data is current as of the crawl timestamp above.\n`;

                            // Check if we got meaningful data
                            if (
                              !ddgData.Abstract &&
                              !wikiArticles.length &&
                              !ddgData.RelatedTopics?.length
                            ) {
                              allData = `WEB CRAWLED KNOWLEDGE BASE: "${topic}"\n`;
                              allData += `Crawl Completed: ${new Date().toLocaleString()}\n`;
                              allData += `${"=".repeat(80)}\n\n`;
                              allData += `## ⚠️ LIMITED RESULTS\n\n`;
                              allData += `The web crawl found limited information for "${topic}".\n\n`;
                              allData += `**Suggestions to improve results:**\n`;
                              allData += `- Use more specific or well-known terms\n`;
                              allData += `- Try alternative names or spellings\n`;
                              allData += `- Use common English terms\n`;
                              allData += `- Search for broader topics first\n\n`;
                              allData += `**These free APIs work best for:**\n`;
                              allData += `- Famous people, places, organizations\n`;
                              allData += `- Scientific and technical concepts\n`;
                              allData += `- Historical events and figures\n`;
                              allData += `- Popular culture and media\n`;
                              allData += `- Academic subjects\n\n`;
                              allData += `Sources: DuckDuckGo, Wikipedia, Wikidata\n`;
                            }

                            updateNodeData("crawledData", allData);
                            updateNodeData("crawling", false);
                            updateNodeData("crawlProgress", "");
                            updateNodeData(
                              "lastCrawled",
                              new Date().toLocaleString()
                            );
                            updateNodeData("dataSize", allData.length);
                          } catch (error) {
                            console.error("Web crawling error:", error);
                            updateNodeData("crawling", false);
                            updateNodeData("crawlProgress", "");
                            alert(
                              "Failed to crawl web data. Please check your internet connection and try again."
                            );
                          }
                        }}
                        disabled={nodeData[selectedNode.id]?.crawling}
                        className={`w-full px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                          nodeData[selectedNode.id]?.crawling
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-cyan-500 text-white hover:bg-cyan-600 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                        }`}
                      >
                        <Globe className="w-4 h-4" />
                        {nodeData[selectedNode.id]?.crawling
                          ? nodeData[selectedNode.id]?.crawlProgress ||
                            "Crawling..."
                          : "Crawl Web Data"}
                      </button>
                      <p className="text-xs text-gray-500 mt-2">
                        Free APIs: DuckDuckGo + Wikipedia + Wikidata (no limits)
                      </p>
                    </div>
                    {nodeData[selectedNode.id]?.crawledData && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-400 mb-2">
                          Crawled Data Preview
                        </label>
                        <div className="bg-black/50 border border-gray-800/50 rounded-xl p-4 max-h-40 overflow-y-auto">
                          <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                            {nodeData[selectedNode.id]?.crawledData}
                          </pre>
                        </div>
                        {nodeData[selectedNode.id]?.lastCrawled && (
                          <p className="text-xs text-gray-500 mt-2">
                            Last crawled:{" "}
                            {nodeData[selectedNode.id]?.lastCrawled}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}

{selectedNode.data.nodeType === "twitter" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Twitter Node Name
                  </label>
                  <input
                    type="text"
                    value={nodeData[selectedNode.id]?.name || ""}
                    onChange={(e) => {
                      updateNodeData("name", e.target.value);
                      setNodes((nds) =>
                        nds.map((node) =>
                          node.id === selectedNode.id
                            ? {
                                ...node,
                                data: {
                                  ...node.data,
                                  label: e.target.value || "Twitter",
                                },
                              }
                            : node
                        )
                      );
                    }}
                    placeholder="Enter node name..."
                    className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                  />
                </div>

                {/* Twitter Connection Button */}
                <div>
                  <button
                    onClick={() => {
                      const authWindow = window.open(
                        "http://localhost:3001/auth/twitter",
                        "Twitter Auth",
                        "width=600,height=700"
                      );

                      // Listen for the message from the popup
                      const messageHandler = (event) => {
                        if (event.data.access_token && event.data.access_secret) {
                          // Save to state variables
                          setTwitterAccessToken(event.data.access_token);
                          setTwitterAccessSecret(event.data.access_secret);
                          setIsTwitterConnected(true);
                          
                          // Also save to nodeData
                          updateNodeData("accessToken", event.data.access_token);
                          updateNodeData("accessSecret", event.data.access_secret);
                          updateNodeData("isConnected", true);
                          
                          // Remove event listener after receiving tokens
                          window.removeEventListener("message", messageHandler);
                        }
                      };
                      
                      window.addEventListener("message", messageHandler);
                    }}
                    disabled={nodeData[selectedNode.id]?.isConnected || isTwitterConnected}
                    className={`w-full px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      nodeData[selectedNode.id]?.isConnected || isTwitterConnected
                        ? "bg-green-600 text-white cursor-default"
                        : "bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] shadow-[0_0_20px_rgba(29,161,242,0.3)]"
                    }`}
                  >
                    <Twitter className="w-4 h-4" />
                    {nodeData[selectedNode.id]?.isConnected || isTwitterConnected
                      ? "✓ Connected to Twitter"
                      : "Connect with Twitter"}
                  </button>
                  {(nodeData[selectedNode.id]?.isConnected || isTwitterConnected) && (
                    <p className="text-xs text-green-400 mt-2 text-center">
                      Authentication successful!
                    </p>
                  )}
                </div>

                {/* Topic Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">
                    Tweet Topic
                  </label>
                  <input
                    type="text"
                    value={nodeData[selectedNode.id]?.topic || ""}
                    onChange={(e) => updateNodeData("topic", e.target.value)}
                    placeholder="What should the tweet be about?"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                  />
                </div>

                {/* Make Post Button */}
                <div>
                  <button
                    onClick={async () => {
                      const topic = nodeData[selectedNode.id]?.topic;
                      const accessToken = twitterAccessToken || nodeData[selectedNode.id]?.accessToken;
                      const accessSecret = twitterAccessSecret || nodeData[selectedNode.id]?.accessSecret;

                      if (!topic) {
                        alert("Please enter a topic first!");
                        return;
                      }

                      if (!accessToken || !accessSecret) {
                        alert("Please connect with Twitter first!");
                        return;
                      }
                      console.log("Selected node:", selectedNode);
                      console.log("Node type:", selectedNode?.data?.nodeType);


                      updateNodeData("posting", true);

                      try {

                        const payload = {
                          topic: topic,
                          accessToken: accessToken,
                          accessSecret: accessSecret,
                        }

                        console.log("this is the the payload that we are sending" , payload)
                        
                        const response = await fetch("http://localhost:4000/tweet", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            topic: topic,
                            accessToken: accessToken,
                            accessSecret: accessSecret,
                          }),
                        });

                        const result = await response.json();

                        if (response.ok) {
                          updateNodeData("lastTweet", result.generatedTweet);
                          updateNodeData("tweetId", result.tweetId);
                          updateNodeData("lastPosted", new Date().toLocaleString());
                          alert("Tweet posted successfully!");
                        } else {
                          alert(`Failed to post tweet: ${result.error}`);
                        }
                      } catch (error) {
                        console.error("Error posting tweet:", error);
                        alert("Failed to post tweet. Please check your connection.");
                      } finally {
                        updateNodeData("posting", false);
                      }
                    }}
                    disabled={
                      nodeData[selectedNode.id]?.posting ||
                      !(nodeData[selectedNode.id]?.isConnected || isTwitterConnected)
                    }
                    className={`w-full px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                      nodeData[selectedNode.id]?.posting ||
                      !(nodeData[selectedNode.id]?.isConnected || isTwitterConnected)
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-[#39FF14] text-black hover:bg-[#2de00f] shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                    }`}
                  >
                    <Twitter className="w-4 h-4" />
                    {nodeData[selectedNode.id]?.posting
                      ? "Posting..."
                      : "Make Post"}
                  </button>
                </div>

                {/* Last Tweet Preview */}
                {nodeData[selectedNode.id]?.lastTweet && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">
                      Last Posted Tweet
                    </label>
                    <div className="bg-black/50 border border-gray-800/50 rounded-xl p-4">
                      <p className="text-sm text-gray-300">
                        {nodeData[selectedNode.id]?.lastTweet}
                      </p>
                      {nodeData[selectedNode.id]?.lastPosted && (
                        <p className="text-xs text-gray-500 mt-2">
                          Posted: {nodeData[selectedNode.id]?.lastPosted}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

                {/* Save Button */}
                <button
                  className="w-full px-4 py-3 bg-[#39FF14] text-black font-bold rounded-xl hover:bg-[#2de00f] transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                  onClick={closePanel}
                >
                  Save Configuration
                </button>

                {/* Delete Button */}
                {selectedNode.id !== "1" && (
                  <button
                    className="w-full px-4 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2"
                    onClick={() => {
                      setNodes((nds) =>
                        nds.filter((node) => node.id !== selectedNode.id)
                      );
                      setEdges((eds) =>
                        eds.filter(
                          (edge) =>
                            edge.source !== selectedNode.id &&
                            edge.target !== selectedNode.id
                        )
                      );
                      setSelectedNode(null);
                    }}
                  >
                    <XCircle className="w-4 h-4" />
                    Delete Node
                  </button>
                )}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Compilation Modal */}
      {isCompiling && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border-2 border-gray-800/50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(57,255,20,0.2)]">
            {!compilationDone ? (
              <>
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-gray-800 border-t-[#39FF14] rounded-full animate-spin"></div>
                    <Zap className="w-8 h-8 text-[#39FF14] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Compiling Workflow
                    </h3>
                    <p className="text-gray-400">
                      Processing your nodes and generating prompt...
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 bg-[#39FF14]/20 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#39FF14] rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Compilation Complete!
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Your workflow has been successfully compiled.
                    </p>
                    <div className="bg-black/50 rounded-lg p-4 mb-4 max-h-60 overflow-y-auto border border-gray-800/50">
                      <pre className="text-xs text-left text-gray-300 whitespace-pre-wrap font-mono">
                        {compiledPrompt}
                      </pre>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCompiling(false)}
                    className="w-full px-6 py-3 bg-[#39FF14] text-black font-bold rounded-xl hover:bg-[#2de00f] transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .react-flow__node {
          font-family: inherit;
        }
        .react-flow__edge-path {
          stroke: #39ff14;
          stroke-width: 2;
        }
        .react-flow__handle {
          background: #39ff14;
          width: 10px;
          height: 10px;
          border: 2px solid #0a0a0f;
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
      `}</style>
    </div>
  );
}
