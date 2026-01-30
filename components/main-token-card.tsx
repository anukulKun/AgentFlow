"use client"

import { AreaChart, Area, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"

export default function MainAgentFlowCard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  // Featured workflow data
  const featuredWorkflow = {
    name: "Customer Support Agent",
    category: "Automation",
    nodes: 12,
    executions: 15847,
    successRate: 98.5,
    avgResponseTime: 2.3,
    dailyChange: 23.4,
    weeklyExecutions: 94521,
    peakExecutions: 18234,
    minExecutions: 12456,
    totalWorkflows: 847
  }

  // Generate chart data based on execution trends
  const generateChartData = (trend: number) => {
    const points = 20
    const data = []
    for (let i = 0; i < points; i++) {
      const progress = i / (points - 1)
      const value = 50 + trend * progress * 2 + Math.random() * 15
      data.push({ value: Math.max(20, Math.min(100, value)) })
    }
    return data
  }

  const chartData = generateChartData(featuredWorkflow.dailyChange)

  // Create ticker with workflow categories
  const tickerItems = [
    "AUTOMATION",
    "DATA PROCESSING",
    "API INTEGRATION",
    "CUSTOMER SUPPORT",
    "CONTENT GEN",
    "RESEARCH",
    "ANALYTICS"
  ]

  const repeatedTicker = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems]

  const isPositive = featuredWorkflow.dailyChange >= 0

  return (
    <section className="relative py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-black border border-[#39FF14]/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(57,255,20,0.15)] hover:shadow-[0_0_80px_rgba(57,255,20,0.25)] transition-all duration-500 relative group">
          {/* Animated border glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#39FF14]/0 via-[#39FF14]/20 to-[#39FF14]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          {/* Ticker at top */}
          <div className="relative overflow-hidden border-b border-[#39FF14]/30 py-3 bg-gradient-to-r from-black via-[#39FF14]/5 to-black">
            <div className="flex animate-scroll-infinite whitespace-nowrap">
              {repeatedTicker.map((item, i) => (
                <span key={i} className="inline-block mx-8 text-[#39FF14] font-bold text-xs tracking-wider uppercase drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]">
                  {item} 🚀
                </span>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-500">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#39FF14]/20 border-t-[#39FF14]"></div>
              <p className="mt-4">Loading workflow data...</p>
            </div>
          ) : (
            <div className="p-8">
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Section - Workflow Info */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-center gap-4 group/workflow">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-[#39FF14]/20 to-[#00D9FF]/20 rounded-2xl flex items-center justify-center border border-[#39FF14]/30 overflow-hidden group-hover/workflow:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(57,255,20,0.2)]">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#39FF14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#39FF14]/20 to-transparent opacity-0 group-hover/workflow:opacity-100 transition-opacity"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Powered by</span>
                        <span className="px-3 py-1 text-[10px] bg-[#39FF14] text-black font-bold uppercase border border-[#39FF14] rounded shadow-[0_0_15px_rgba(57,255,20,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] transition-all cursor-pointer">
                          AGENTFLOW
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-800/50 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#39FF14] rounded-full"></span>
                      WORKFLOW DATA
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between items-center group/item hover:translate-x-1 transition-transform">
                        <span className="text-gray-500">Workflow name</span>
                        <span className="text-white font-mono group-hover/item:text-[#39FF14] transition-colors">
                          {featuredWorkflow.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center group/item hover:translate-x-1 transition-transform">
                        <span className="text-gray-500">Category</span>
                        <span className="text-white font-mono uppercase group-hover/item:text-[#39FF14] transition-colors">
                          {featuredWorkflow.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center group/item hover:translate-x-1 transition-transform">
                        <span className="text-gray-500">Total nodes</span>
                        <span className="text-[#39FF14] font-mono font-bold drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">
                          {featuredWorkflow.nodes}
                        </span>
                      </div>
                      <div className="flex justify-between items-center group/item hover:translate-x-1 transition-transform">
                        <span className="text-gray-500">Success rate</span>
                        <span className="text-white font-mono group-hover/item:text-[#39FF14] transition-colors">
                          {featuredWorkflow.successRate}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                        <span className="text-gray-500">Full analytics</span>
                        <span className="px-3 py-1 text-[10px] bg-gray-900 text-white font-bold uppercase border border-gray-700 rounded hover:border-[#39FF14] hover:text-[#39FF14] transition-colors cursor-pointer">
                          VIEW DASHBOARD
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Section - Chart */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="w-1 h-4 bg-[#39FF14] rounded-full"></span>
                      24H EXECUTION TREND
                    </h3>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isPositive ? 'bg-[#39FF14]/10 border border-[#39FF14]/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                      <span className={`text-2xl font-bold ${isPositive ? "text-[#39FF14]" : "text-red-500"} drop-shadow-[0_0_15px_${isPositive ? 'rgba(57,255,20,0.6)' : 'rgba(239,68,68,0.6)'}]`}>
                        {featuredWorkflow.dailyChange >= 0 ? "↑" : "↓"}
                        {Math.abs(featuredWorkflow.dailyChange).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative h-64 bg-gradient-to-br from-[#39FF14]/5 via-black to-black rounded-2xl border-2 border-[#39FF14]/30 overflow-hidden group/chart shadow-[inset_0_0_50px_rgba(57,255,20,0.1)] hover:shadow-[inset_0_0_80px_rgba(57,255,20,0.15)] transition-all duration-500">
                    {/* Grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    
                    {/* Glowing effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#39FF14]/20 via-transparent to-transparent opacity-0 group-hover/chart:opacity-100 transition-opacity duration-500"></div>
                    
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={isPositive ? "#39FF14" : "#ef4444"} stopOpacity={0.8} />
                            <stop offset="50%" stopColor={isPositive ? "#00D9FF" : "#dc2626"} stopOpacity={0.6} />
                            <stop offset="100%" stopColor={isPositive ? "#39FF14" : "#ef4444"} stopOpacity={0.8} />
                          </linearGradient>
                          <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={isPositive ? "#39FF14" : "#ef4444"} stopOpacity={0.4} />
                            <stop offset="100%" stopColor={isPositive ? "#39FF14" : "#ef4444"} stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="url(#colorGradient)"
                          strokeWidth={3}
                          fill="url(#fillGradient)"
                          fillOpacity={1}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right Section - Performance Metrics */}
                <div className="lg:col-span-3 space-y-4">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#39FF14] rounded-full"></span>
                    PERFORMANCE
                  </h3>
                  <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-6 border border-gray-800/50 backdrop-blur-sm space-y-4">
                    <div className="group/stat hover:translate-x-1 transition-transform">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-800/50">
                        <span className="text-sm text-gray-500">24h Executions</span>
                        <span className="text-[#39FF14] font-mono font-bold drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">
                          {featuredWorkflow.executions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="group/stat hover:translate-x-1 transition-transform">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-800/50">
                        <span className="text-sm text-gray-500">Avg Response</span>
                        <span className="text-white font-mono group-hover/stat:text-[#39FF14] transition-colors">
                          {featuredWorkflow.avgResponseTime}s
                        </span>
                      </div>
                    </div>
                    <div className="group/stat hover:translate-x-1 transition-transform">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-800/50">
                        <span className="text-sm text-gray-500">Peak Load</span>
                        <span className="text-white font-mono group-hover/stat:text-[#39FF14] transition-colors">
                          {featuredWorkflow.peakExecutions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="group/stat hover:translate-x-1 transition-transform">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Total Workflows</span>
                        <span className="text-white font-mono group-hover/stat:text-[#39FF14] transition-colors">
                          {featuredWorkflow.totalWorkflows}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 25s linear infinite;
        }
      `}</style>
    </section>
  )
}