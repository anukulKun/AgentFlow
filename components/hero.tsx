"use client"

import { useState, useEffect } from "react"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById("hero-section")?.getBoundingClientRect()
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

  return (
    <section id="hero-section" className="relative py-20 px-4 overflow-hidden">
      {/* Animated gradient orb that follows mouse */}
      <div
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-96 h-96 bg-[#39FF14]/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex items-start gap-3 mb-6 animate-fade-in">
          <span className="px-4 py-1.5 text-xs bg-[#39FF14] text-black font-bold uppercase tracking-wide rounded shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] transition-all duration-300 hover:scale-105 cursor-pointer">
            beta access
          </span>
          <span className="text-gray-500 text-sm uppercase tracking-wide mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.6)]"></span>
            ai-powered workflows
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white max-w-5xl leading-none animate-fade-in-up">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Build AI agents
          </span>
          <br />
          <span className="text-[#39FF14] drop-shadow-[0_0_20px_rgba(57,255,20,0.5)]">
            visually
          </span>
          <span className="text-white"> — no code required</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl leading-relaxed animate-fade-in-up animation-delay-200">
          Connect <span className="text-[#39FF14] font-semibold">LLMs, tools, and APIs</span> visually to create
          intelligent workflows. Built for{" "}
          <span className="text-[#39FF14] font-semibold">OpenXAI's ecosystem</span> and ready to orchestrate complex
          agent logic.
        </p>

        <div className="flex flex-wrap items-center gap-8 animate-fade-in-up animation-delay-400">
          <div className="flex flex-col group cursor-pointer transition-all duration-300 hover:scale-110">
            <span className="text-sm text-gray-500 mb-2 uppercase tracking-wide">active workflows</span>
            <span className="text-4xl font-bold text-white group-hover:text-[#39FF14] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(57,255,20,0)]group-hover:drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">
              1,200+
            </span>
          </div>

          <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

          <div className="flex flex-col group cursor-pointer transition-all duration-300 hover:scale-110">
            <span className="text-sm text-gray-500 mb-2 uppercase tracking-wide">avg build time</span>
            <span className="text-4xl font-bold text-[#39FF14] group-hover:drop-shadow-[0_0_20px_rgba(57,255,20,0.8)] transition-all duration-300">
              15min
            </span>
          </div>

          <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

          <div className="flex flex-col group cursor-pointer transition-all duration-300 hover:scale-110">
            <span className="text-sm text-gray-500 mb-2 uppercase tracking-wide">integrations</span>
            <span className="text-4xl font-bold text-[#39FF14] group-hover:drop-shadow-[0_0_20px_rgba(57,255,20,0.8)] transition-all duration-300">
              50+
            </span>
          </div>

          <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-full border border-[#39FF14]/30 hover:border-[#39FF14] transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] cursor-pointer group">
            <span className="text-sm text-gray-400 uppercase tracking-wide group-hover:text-gray-300 transition-colors">
              users
            </span>
            <span className="text-2xl font-bold text-[#39FF14] drop-shadow-[0_0_10px_rgba(57,255,20,0.6)] group-hover:scale-110 transition-transform duration-300 inline-block">
              5K+
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent"></div>
    </section>
  )
}

// Add these animations to your globals.css:
/*
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
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
}
*/