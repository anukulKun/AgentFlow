"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const chartData = [
  { date: "Oct 1", value: 2.4 },
  { date: "Oct 5", value: 3.1 },
  { date: "Oct 10", value: 2.9 },
  { date: "Oct 15", value: 3.8 },
  { date: "Oct 20", value: 4.2 },
  { date: "Oct 25", value: 4.9 },
  { date: "Oct 30", value: 5.2 },
]

const workflowData = [
  { name: "Customer Support Agent", launched: "1h ago", nodes: "12", executions: "15.8K", successRate: "98.5%" },
  { name: "Data Processing Pipeline", launched: "2h ago", nodes: "8", executions: "12.5K", successRate: "99.1%" },
  { name: "Content Generator", launched: "5h ago", nodes: "15", executions: "9.8K", successRate: "97.3%" },
  { name: "API Integration Hub", launched: "7h ago", nodes: "6", executions: "8.7K", successRate: "99.8%" },
  { name: "Research Assistant", launched: "1d ago", nodes: "18", executions: "7.6K", successRate: "96.7%" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black border-2 border-[#39FF14] rounded-lg p-3 shadow-[0_0_20px_rgba(57,255,20,0.4)]">
        <p className="text-[#39FF14] font-bold text-sm">{payload[0].value}K Executions</p>
        <p className="text-gray-400 text-xs mt-1">{payload[0].payload.date}</p>
      </div>
    )
  }
  return null
}

export default function AgentFlowStats() {
  return (
    <section className="relative py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-1.5 h-6 sm:h-8 bg-[#39FF14] rounded-full shadow-[0_0_15px_rgba(57,255,20,0.6)]"></span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">AGENTFLOW PERFORMANCE</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-black border border-[#39FF14]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_0_40px_rgba(57,255,20,0.1)] hover:shadow-[0_0_60px_rgba(57,255,20,0.15)] transition-all duration-500 group">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <div className="text-xs sm:text-sm text-gray-500 mb-2 uppercase tracking-wide">Total Executions</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-mono drop-shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                  5.2K
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-3">
                  <span className="text-base sm:text-lg text-[#39FF14] font-bold drop-shadow-[0_0_10px_rgba(57,255,20,0.6)]">
                    ↑ +33.27%
                  </span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </div>
              <div className="flex gap-1 sm:gap-2 bg-gray-900/50 rounded-full p-1 border border-gray-800 w-full sm:w-auto overflow-x-auto">
                {["1M", "3M", "6M", "1Y", "ALL"].map((period, idx) => (
                  <button
                    key={period}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                      idx === 0
                        ? "bg-[#39FF14] text-black shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative">
              {/* Grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.03)_1px,transparent_1px)] bg-[size:30px_30px] rounded-xl"></div>
              
              <ResponsiveContainer width="100%" height={200} className="sm:!h-[250px]">
                <LineChart data={chartData}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#39FF14" stopOpacity={0.8} />
                      <stop offset="50%" stopColor="#00D9FF" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#39FF14" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    stroke="#39FF14" 
                    strokeOpacity={0.3}
                    style={{ fontSize: "10px", fill: "#6b7280" }} 
                    className="sm:text-xs"
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#39FF14" 
                    strokeOpacity={0.3}
                    style={{ fontSize: "10px", fill: "#6b7280" }} 
                    className="sm:text-xs"
                    tickLine={false}
                    tickFormatter={(value) => `${value}K`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="url(#lineGradient)"
                    strokeWidth={2}
                    className="sm:!stroke-[3]"
                    dot={{ fill: "#39FF14", r: 4, strokeWidth: 2, stroke: "#000" }}
                    activeDot={{ r: 6, fill: "#39FF14", stroke: "#000", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            {[
              { label: "24h", value: "2.4K", change: "+12.5%" },
              { label: "7d", value: "8.1K", change: "+18.3%" },
              { label: "30d", value: "31.2K", change: "+25.7%" },
              { label: "All time", value: "156K", change: "+156%" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-900/80 to-black border border-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-5 hover:border-[#39FF14]/30 hover:shadow-[0_0_25px_rgba(57,255,20,0.15)] transition-all duration-300 group cursor-pointer"
              >
                <div className="text-xs text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">{stat.label}</div>
                <div className="text-lg sm:text-2xl font-bold text-white font-mono group-hover:text-[#39FF14] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs text-[#39FF14] mt-1 sm:mt-2 font-semibold">↑ {stat.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Performance Table */}
        <div className="bg-black border border-[#39FF14]/30 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(57,255,20,0.1)]">
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-gradient-to-r from-[#39FF14]/10 via-[#39FF14]/5 to-[#39FF14]/10 border-b border-[#39FF14]/30">
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Workflow
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Deployed
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Nodes
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Executions
                  </th>
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th className="text-right py-3 sm:py-4 px-3 sm:px-6 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {workflowData.map((workflow, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-900/50 hover:bg-gradient-to-r hover:from-[#39FF14]/5 hover:to-transparent transition-all duration-300 group cursor-pointer"
                  >
                    <td className="py-4 sm:py-5 px-3 sm:px-6">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#39FF14] to-[#00D9FF] rounded-lg sm:rounded-xl group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all duration-300 flex-shrink-0">
                          <div className="absolute inset-0.5 bg-black rounded-md sm:rounded-lg flex items-center justify-center">
                            <span className="text-[#39FF14] font-bold text-[10px] sm:text-xs">⚡</span>
                          </div>
                        </div>
                        <span className="font-bold text-white text-sm sm:text-base group-hover:text-[#39FF14] transition-colors whitespace-nowrap">
                          {workflow.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 sm:py-5 px-3 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-pulse"></span>
                        <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">{workflow.launched}</span>
                      </div>
                    </td>
                    <td className="py-4 sm:py-5 px-3 sm:px-6 font-mono text-white text-xs sm:text-sm whitespace-nowrap">{workflow.nodes}</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-6 font-mono text-white text-xs sm:text-sm font-semibold whitespace-nowrap">{workflow.executions}</td>
                    <td className="py-4 sm:py-5 px-3 sm:px-6">
                      <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-lg font-mono font-bold text-[#39FF14] text-xs sm:text-sm group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all whitespace-nowrap">
                        ✓ {workflow.successRate}
                      </span>
                    </td>
                    <td className="py-4 sm:py-5 px-3 sm:px-6 text-right">
                      <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs text-gray-400 hover:text-white border border-gray-800 hover:border-[#39FF14]/50 rounded-lg transition-all duration-300 hover:bg-[#39FF14]/5 font-semibold uppercase tracking-wide whitespace-nowrap">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="py-4 sm:py-5 px-4 sm:px-6 text-center border-t border-gray-900/50 bg-gradient-to-r from-transparent via-[#39FF14]/5 to-transparent">
            <button className="text-xs sm:text-sm text-gray-400 hover:text-[#39FF14] transition-all duration-300 font-semibold uppercase tracking-wide group flex items-center gap-2 mx-auto">
              <span>Load more workflows</span>
              <span className="inline-block group-hover:translate-y-1 transition-transform">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}