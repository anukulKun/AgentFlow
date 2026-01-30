"use client"

import { useState, useEffect } from "react"

export default function WorkflowScanTable() {
  const [loading, setLoading] = useState(true)
  const [workflows, setWorkflows] = useState([])

  useEffect(() => {
    // Simulate loading and generate workflow data
    setTimeout(() => {
      const mockWorkflows = [
        {
          id: "wf-001",
          name: "Customer Support Agent",
          category: "Automation",
          rank: 1,
          nodes: 12,
          executions: 15847,
          dailyChange: 23.4,
          successRate: 98.5,
          avgResponseTime: 2.3,
          activeUsers: 342
        },
        {
          id: "wf-002",
          name: "Data Processing Pipeline",
          category: "Data Analysis",
          rank: 2,
          nodes: 8,
          executions: 12456,
          dailyChange: -5.2,
          successRate: 99.1,
          avgResponseTime: 1.8,
          activeUsers: 287
        },
        {
          id: "wf-003",
          name: "Content Generator",
          category: "Creation",
          rank: 3,
          nodes: 15,
          executions: 9834,
          dailyChange: 45.8,
          successRate: 97.3,
          avgResponseTime: 3.5,
          activeUsers: 425
        },
        {
          id: "wf-004",
          name: "API Integration Hub",
          category: "Integration",
          rank: 4,
          nodes: 6,
          executions: 8723,
          dailyChange: 12.6,
          successRate: 99.8,
          avgResponseTime: 0.9,
          activeUsers: 198
        },
        {
          id: "wf-005",
          name: "Research Assistant",
          category: "Research",
          rank: 5,
          nodes: 18,
          executions: 7654,
          dailyChange: 18.3,
          successRate: 96.7,
          avgResponseTime: 4.2,
          activeUsers: 512
        },
        {
          id: "wf-006",
          name: "Email Automation",
          category: "Automation",
          rank: 6,
          nodes: 10,
          executions: 6892,
          dailyChange: -2.1,
          successRate: 98.9,
          avgResponseTime: 1.5,
          activeUsers: 234
        },
        {
          id: "wf-007",
          name: "Analytics Dashboard",
          category: "Analytics",
          rank: 7,
          nodes: 14,
          executions: 5943,
          dailyChange: 31.7,
          successRate: 99.4,
          avgResponseTime: 2.1,
          activeUsers: 367
        },
        {
          id: "wf-008",
          name: "Lead Qualification",
          category: "Sales",
          rank: 8,
          nodes: 9,
          executions: 5234,
          dailyChange: 8.9,
          successRate: 97.8,
          avgResponseTime: 2.7,
          activeUsers: 189
        },
        {
          id: "wf-009",
          name: "Document Processor",
          category: "Data Processing",
          rank: 9,
          nodes: 11,
          executions: 4876,
          dailyChange: -8.4,
          successRate: 98.2,
          avgResponseTime: 3.1,
          activeUsers: 276
        },
        {
          id: "wf-010",
          name: "Social Media Manager",
          category: "Marketing",
          rank: 10,
          nodes: 13,
          executions: 4523,
          dailyChange: 22.1,
          successRate: 96.9,
          avgResponseTime: 2.9,
          activeUsers: 403
        }
      ]
      setWorkflows(mockWorkflows)
      setLoading(false)
    }, 1000)
  }, [])

  const formatNumber = (num) => {
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
    return num.toString()
  }

  if (loading) {
    return (
      <section className="relative py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-8 bg-[#39FF14] rounded-full shadow-[0_0_15px_rgba(57,255,20,0.6)]"></span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-wide">TRENDING WORKFLOW SCAN</h2>
          </div>
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#39FF14]/20 border-t-[#39FF14]"></div>
            <p className="mt-6 text-gray-500">Loading workflow data...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-8 bg-[#39FF14] rounded-full shadow-[0_0_15px_rgba(57,255,20,0.6)]"></span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-wide">TRENDING WORKFLOW SCAN</h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-black border border-[#39FF14]/30 rounded-full">
            <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.6)]"></span>
            <span className="text-sm text-gray-400 font-mono">LIVE DATA</span>
          </div>
        </div>

        <div className="bg-black border border-[#39FF14]/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(57,255,20,0.1)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#39FF14]/10 via-[#39FF14]/5 to-[#39FF14]/10 border-b border-[#39FF14]/30">
                  <th className="text-left py-4 px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Workflow
                  </th>
                  <th className="text-left py-4 px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="text-left py-4 px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Nodes
                  </th>
                  <th className="text-left py-4 px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    24h Change
                  </th>
                  <th className="text-left py-4 px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th className="text-left py-4 px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Executions 24h
                  </th>
                  <th className="text-left py-4 px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Active Users
                  </th>
                </tr>
              </thead>
              <tbody>
                {workflows.map((workflow, i) => {
                  const isPositive = workflow.dailyChange >= 0
                  
                  // Icon mapping for categories
                  const categoryIcons = {
                    "Automation": "⚡",
                    "Data Analysis": "📊",
                    "Creation": "✨",
                    "Integration": "🔗",
                    "Research": "🔍",
                    "Analytics": "📈",
                    "Sales": "💼",
                    "Data Processing": "⚙️",
                    "Marketing": "📱"
                  }
                  
                  return (
                    <tr
                      key={workflow.id}
                      className="border-b border-gray-900/50 hover:bg-gradient-to-r hover:from-[#39FF14]/5 hover:to-transparent transition-all duration-300 group cursor-pointer"
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 bg-gradient-to-br from-[#39FF14]/20 to-[#00D9FF]/20 rounded-xl flex items-center justify-center overflow-hidden border border-[#39FF14]/30 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all duration-300">
                            <span className="text-2xl">{categoryIcons[workflow.category] || "🤖"}</span>
                          </div>
                          <div>
                            <div className="font-bold text-white text-base group-hover:text-[#39FF14] transition-colors">
                              {workflow.name}
                            </div>
                            <div className="text-xs text-gray-500 font-mono uppercase mt-0.5">{workflow.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center justify-center min-w-[3rem] px-3 py-1 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-full text-[#39FF14] font-mono font-bold text-sm group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all">
                          #{workflow.rank}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="font-mono text-white font-semibold text-base group-hover:text-[#39FF14] transition-colors">
                          {workflow.nodes}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-sm ${
                            isPositive
                              ? "bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30"
                              : "bg-red-500/10 text-red-500 border border-red-500/30"
                          } group-hover:shadow-[0_0_15px_${isPositive ? 'rgba(57,255,20,0.3)' : 'rgba(239,68,68,0.3)'}] transition-all`}
                        >
                          <span>{isPositive ? "↑" : "↓"}</span>
                          <span>
                            {isPositive ? "+" : ""}
                            {workflow.dailyChange.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="font-mono text-white text-sm">{workflow.successRate}%</span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="font-mono text-[#39FF14] font-semibold text-sm drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">
                          {formatNumber(workflow.executions)}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="font-mono text-gray-400 text-sm">
                          {workflow.activeUsers}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom info bar */}
        <div className="mt-6 flex items-center justify-between px-6 py-4 bg-black/50 border border-gray-900 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></span>
            <span>Updated every 60 seconds</span>
          </div>
          <div className="text-sm text-gray-500">
            Showing <span className="text-[#39FF14] font-bold">{workflows.length}</span> workflows
          </div>
        </div>
      </div>
    </section>
  )
}