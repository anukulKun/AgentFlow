"use client"

import { useState } from "react"
import { X, Plus, Zap, Search, Folder, Settings, Bell, User, Sparkles } from "lucide-react"

export default function WorkflowPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [workflowName, setWorkflowName] = useState("")
  const [workflowPurpose, setWorkflowPurpose] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for existing workflows
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: "Customer Support Agent",
      purpose: "Automated customer service responses",
      nodes: 12,
      lastModified: "2 hours ago",
      status: "active",
      executions: 15847
    },
    {
      id: 2,
      name: "Data Processing Pipeline",
      purpose: "ETL and data transformation",
      nodes: 8,
      lastModified: "5 hours ago",
      status: "active",
      executions: 12456
    },
    {
      id: 3,
      name: "Content Generator",
      purpose: "AI-powered content creation",
      nodes: 15,
      lastModified: "1 day ago",
      status: "draft",
      executions: 9834
    },
    {
      id: 4,
      name: "API Integration Hub",
      purpose: "Connect multiple APIs",
      nodes: 6,
      lastModified: "2 days ago",
      status: "active",
      executions: 8723
    },
    {
      id: 5,
      name: "Email Automation",
      purpose: "Automated email campaigns",
      nodes: 10,
      lastModified: "3 days ago",
      status: "active",
      executions: 6892
    }
  ])

  const handleCreateWorkflow = () => {
    if (workflowName.trim() && workflowPurpose.trim()) {
      const newWorkflow = {
        id: workflows.length + 1,
        name: workflowName,
        purpose: workflowPurpose,
        nodes: 0,
        lastModified: "Just now",
        status: "draft",
        executions: 0
      }
      setWorkflows([newWorkflow, ...workflows])
      setWorkflowName("")
      setWorkflowPurpose("")
      setIsModalOpen(false)
      
      // Redirect to workflow editor
      window.location.href = "/workflow/1"
    }
  }

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="text-2xl font-bold text-[#39FF14] tracking-tight transition-all duration-300 group-hover:scale-105">AgentFlow</div>
            <span className="px-2.5 py-1 text-[10px] bg-[#39FF14] text-black font-bold uppercase rounded transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.5)]">BETA</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-[77px]">
        {/* Left Sidebar - Enhanced */}
        <aside className="fixed left-0 top-[77px] w-64 h-[calc(100vh-77px)] bg-gradient-to-b from-black/60 via-black/50 to-black/60 border-r border-gray-800/50 backdrop-blur-md">
          {/* Decorative top gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#39FF14]/5 to-transparent pointer-events-none"></div>
          
          <div className="relative p-6">
            {/* Navigation Header */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 px-4">Navigation</h3>
              <div className="h-[2px] bg-gradient-to-r from-[#39FF14]/50 via-[#39FF14]/20 to-transparent rounded-full"></div>
            </div>
            
            <nav className="space-y-2">
              <a href="#" className="group relative flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-[#39FF14]/15 to-[#39FF14]/5 border border-[#39FF14]/40 text-[#39FF14] rounded-xl font-semibold transition-all duration-300 hover:from-[#39FF14]/25 hover:to-[#39FF14]/10 hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14]/0 via-[#39FF14]/10 to-[#39FF14]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center w-8 h-8 bg-[#39FF14]/20 rounded-lg border border-[#39FF14]/30">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="relative">Workflows</span>
                <div className="absolute right-3 w-2 h-2 bg-[#39FF14] rounded-full shadow-[0_0_8px_rgba(57,255,20,0.8)]"></div>
              </a>
              
              <a href="#" className="group relative flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all duration-300 hover:border hover:border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center w-8 h-8 bg-gray-800/50 rounded-lg group-hover:bg-gray-700/50 transition-colors">
                  <Folder className="w-4 h-4" />
                </div>
                <span className="relative">Templates</span>
                <span className="relative ml-auto px-2 py-0.5 text-[10px] bg-gray-800/50 text-gray-500 rounded-md font-semibold">12</span>
              </a>
              
              <a href="#" className="group relative flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all duration-300 hover:border hover:border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center w-8 h-8 bg-gray-800/50 rounded-lg group-hover:bg-gray-700/50 transition-colors">
                  <Settings className="w-4 h-4" />
                </div>
                <span className="relative">Settings</span>
              </a>
            </nav>
            
            {/* Quick Stats Section */}
            <div className="mt-8 p-4 bg-gradient-to-br from-[#39FF14]/5 to-[#00D9FF]/5 rounded-xl border border-gray-800/50 backdrop-blur-sm">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Active</span>
                  <span className="text-sm font-bold text-[#39FF14]">{workflows.filter(w => w.status === 'active').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Draft</span>
                  <span className="text-sm font-bold text-gray-500">{workflows.filter(w => w.status === 'draft').length}</span>
                </div>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent my-2"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total</span>
                  <span className="text-sm font-bold text-white">{workflows.length}</span>
                </div>
              </div>
            </div>
            
            {/* Bottom decorative element */}
            <div className="mt-8 p-4 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-xl border border-gray-800/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#39FF14]/20 to-[#00D9FF]/20 rounded-lg flex items-center justify-center border border-[#39FF14]/30">
                  <Sparkles className="w-5 h-5 text-[#39FF14]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Pro Tip</p>
                  <p className="text-[10px] text-gray-500">Use templates to speed up</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section - Enhanced */}
            <div className="relative h-[30vh] mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#39FF14]/5 via-black/50 to-[#00D9FF]/5 border border-[#39FF14]/20">
              {/* Animated background elements */}
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-[#39FF14]/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#00D9FF]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#39FF14]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              </div>
              
              {/* Content */}
              <div className="relative h-full flex items-center justify-between px-12">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-xl backdrop-blur-sm">
                      <Sparkles className="w-8 h-8 text-[#39FF14]" />
                    </div>
                    <div>
                      <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
                        My Workflows
                      </h1>
                      <p className="text-lg text-gray-400 flex items-center gap-2">
                        Create and manage your AI agent workflows
                        <span className="px-2 py-0.5 text-xs bg-[#39FF14]/10 text-[#39FF14] rounded-full border border-[#39FF14]/30 font-semibold">
                          {workflows.length} Active
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative px-8 py-4 bg-[#39FF14] text-black font-bold text-lg rounded-2xl hover:bg-[#2de00f] transition-all duration-300 shadow-[0_0_40px_rgba(57,255,20,0.4)] hover:shadow-[0_0_60px_rgba(57,255,20,0.6)] flex items-center gap-3"
                >
                  <Plus className="w-6 h-6" />
                  Create New Workflow
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full"></div>
                </button>
              </div>
            </div>

            {/* Search Bar - Enhanced */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all backdrop-blur-sm"
              />
            </div>

            {/* Workflows List - Enhanced */}
            <div className="space-y-3">
              {filteredWorkflows.map((workflow, index) => (
                <div
                  key={workflow.id}
                  className="group relative bg-gradient-to-r from-black/60 via-black/50 to-black/60 border border-gray-800/50 rounded-xl p-4 hover:border-[#39FF14]/40 hover:from-[#39FF14]/5 hover:via-black/50 hover:to-[#00D9FF]/5 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm"
                  onClick={() => window.location.href = `/workflow/${workflow.id}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"></div>
                  </div>
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex-1 flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#39FF14]/20 to-[#00D9FF]/20 rounded-xl flex items-center justify-center border border-[#39FF14]/30 flex-shrink-0 transition-transform duration-300">
                          <Zap className="w-6 h-6 text-[#39FF14]" />
                        </div>
                        {workflow.status === 'active' && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#39FF14] rounded-full border-2 border-black animate-pulse"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-base font-bold text-white group-hover:text-[#39FF14] transition-colors truncate">
                            {workflow.name}
                          </h3>
                          <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${
                            workflow.status === 'active'
                              ? 'bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/40'
                              : 'bg-gray-700/50 text-gray-400 border border-gray-700'
                          }`}>
                            {workflow.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 truncate group-hover:text-gray-300 transition-colors">
                          {workflow.purpose}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 ml-6">
                      <button 
                        className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-800 hover:border-[#39FF14]/50 rounded-lg transition-all duration-300 hover:bg-[#39FF14]/10 font-semibold"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/workflow/${workflow.id}`
                        }}
                      >
                        Open →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredWorkflows.length === 0 && (
              <div className="text-center py-16 bg-black/30 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-400 mb-2">No workflows found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search query</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create Workflow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0f] border-2 border-[#39FF14]/40 rounded-2xl p-8 w-full max-w-md shadow-[0_0_80px_rgba(57,255,20,0.2)] animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-[#39FF14] rounded-full"></span>
                Create New Workflow
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Workflow Name
                </label>
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  placeholder="e.g., Customer Support Agent"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Purpose
                </label>
                <textarea
                  value={workflowPurpose}
                  onChange={(e) => setWorkflowPurpose(e.target.value)}
                  placeholder="Describe what this workflow will do..."
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-800/50 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 focus:ring-2 focus:ring-[#39FF14]/20 transition-all resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateWorkflow}
                  disabled={!workflowName.trim() || !workflowPurpose.trim()}
                  className="flex-1 px-6 py-3 bg-[#39FF14] text-black font-bold rounded-xl hover:bg-[#2de00f] transition-all duration-300 shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:shadow-[0_0_50px_rgba(57,255,20,0.5)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Create Workflow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}