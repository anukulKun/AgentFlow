"use client"

import { useState, useEffect } from "react"

export default function AgentFlowHeroLarge() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById("agentflow-hero-section")?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const stats = [
    { label: "active workflows", value: "847", icon: "⚡" },
    { label: "avg success", value: "98%", icon: "📈" },
    { label: "total executions", value: "156K", icon: "🚀" },
    { label: "uptime", value: "99.9%", icon: "⭐", highlight: true },
  ]

  return (
    <section 
      id="agentflow-hero-section"
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 via-black to-[#00D9FF]/5"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="relative bg-black border-2 border-[#39FF14]/40 rounded-3xl p-12 md:p-16 overflow-hidden shadow-[0_0_80px_rgba(57,255,20,0.2)] hover:shadow-[0_0_120px_rgba(57,255,20,0.3)] transition-all duration-700 group">
          {/* Mouse follower glow */}
          <div
            className="absolute pointer-events-none transition-all duration-300 ease-out opacity-60"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-[500px] h-[500px] bg-[#39FF14]/30 rounded-full blur-[120px]"></div>
          </div>

          {/* Animated corner glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#39FF14]/20 via-[#00D9FF]/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          
          {/* Bottom left accent */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#39FF14]/10 to-transparent rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
              <span className="px-4 py-2 text-xs bg-[#39FF14] text-black font-bold uppercase tracking-wide rounded-lg shadow-[0_0_30px_rgba(57,255,20,0.5)] hover:shadow-[0_0_50px_rgba(57,255,20,0.7)] transition-all duration-300 hover:scale-105 cursor-pointer">
                Coming Soon
              </span>
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse shadow-[0_0_10px_rgba(57,255,20,0.8)]"></span>
                Beta Access
              </span>
            </div>

            <div className="mb-10 animate-fade-in-up">
              <h2 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tight">
                <span className="bg-gradient-to-r from-white via-[#39FF14] to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]">
                  AGENTFLOW
                </span>
                <br />
                <span className="text-[#39FF14] drop-shadow-[0_0_40px_rgba(57,255,20,0.6)]">
                  PLATFORM
                </span>
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-[#39FF14] to-transparent rounded-full shadow-[0_0_20px_rgba(57,255,20,0.6)]"></div>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 mb-14 max-w-4xl leading-relaxed animate-fade-in-up animation-delay-200">
              Build autonomous AI agents with our visual workflow builder. Orchestrate{" "}
              <span className="text-[#39FF14] font-bold drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">multiple OpenXAI models</span>{" "}
              seamlessly, connect APIs, add memory, and deploy complex reasoning pipelines—all without heavy coding. Join{" "}
              <span className="text-[#39FF14] font-bold drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">500+ developers</span>{" "}
              building the future of AI automation.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 animate-fade-in-up animation-delay-400">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`relative bg-gradient-to-br from-gray-900/80 to-black/80 border rounded-2xl p-8 backdrop-blur-md transition-all duration-500 hover:scale-105 group/card cursor-pointer ${
                    stat.highlight
                      ? "border-[#39FF14]/60 shadow-[0_0_30px_rgba(57,255,20,0.2)] hover:shadow-[0_0_50px_rgba(57,255,20,0.4)]"
                      : "border-[#39FF14]/30 hover:border-[#39FF14]/60 hover:shadow-[0_0_40px_rgba(57,255,20,0.2)]"
                  }`}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/0 to-[#39FF14]/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
                        {stat.label}
                      </div>
                      <span className="text-3xl group-hover/card:scale-125 transition-transform duration-300">
                        {stat.icon}
                      </span>
                    </div>
                    <div
                      className={`text-5xl font-bold font-mono ${
                        stat.highlight
                          ? "text-[#39FF14] drop-shadow-[0_0_20px_rgba(57,255,20,0.8)]"
                          : "text-white group-hover/card:text-[#39FF14]"
                      } transition-colors duration-300`}
                    >
                      {stat.value}
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#39FF14]/20 to-transparent rounded-bl-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 animate-fade-in-up animation-delay-600">
              <button className="group/btn relative px-10 py-5 bg-[#39FF14] text-black font-bold text-lg rounded-xl hover:bg-[#2de00f] transition-all duration-300 shadow-[0_0_40px_rgba(57,255,20,0.4)] hover:shadow-[0_0_60px_rgba(57,255,20,0.6)] hover:scale-105 active:scale-95 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  START BUILDING 
                  <span className="inline-block group-hover/btn:translate-x-1 transition-transform">→</span>
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </button>
              
              <button
                onClick={() => window.open('#', '_blank')}
                className="px-8 py-5 border-2 border-[#39FF14]/50 text-[#39FF14] font-bold text-lg rounded-xl hover:bg-[#39FF14]/10 hover:border-[#39FF14] transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]"
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}