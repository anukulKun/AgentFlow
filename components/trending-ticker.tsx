"use client"

import { useTrendingTokens } from "@/hooks/use-token-data"

export default function TrendingTicker() {
  const { tokens, loading } = useTrendingTokens()

  // Create a display array with workflow/agent names
  const displayItems = [
    "Customer Support Agent",
    "Data Analyzer",
    "Research Assistant",
    "Content Generator",
    "Code Reviewer",
    "Email Automation",
    "Document Processor"
  ]

  // Repeat items multiple times for seamless infinite scroll
  const repeatedItems = [
    ...displayItems,
    ...displayItems,
    ...displayItems,
    ...displayItems,
    ...displayItems,
    ...displayItems,
  ]

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#39FF14]/10 via-[#00D9FF]/10 to-[#39FF14]/10 border-y border-[#39FF14]/30 py-3 group">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none"></div>
      
      {/* Animated background pulse */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#39FF14]/5 to-transparent animate-pulse-slow"></div>

      <div className="flex animate-scroll-infinite whitespace-nowrap hover:pause-animation">
        {repeatedItems.map((itemName, i) => (
          <div
            key={i}
            className="inline-flex items-center mx-6 group/item cursor-pointer transition-all duration-300 hover:scale-110"
          >
            <span className="inline-block text-[#39FF14] font-bold text-sm tracking-wider font-mono group-hover/item:text-[#00D9FF] transition-colors duration-300 drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
              {loading ? "LOADING..." : itemName.toUpperCase()}
            </span>
            <span className="ml-2 text-base group-hover/item:scale-125 transition-transform duration-300 inline-block animate-bounce-subtle">
              ⚡
            </span>
            <span className="mx-4 text-[#39FF14]/30 font-bold select-none">|</span>
          </div>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39FF14] to-transparent opacity-50"></div>
    </div>
  )
}

// Add these styles to your global CSS file (globals.css or tailwind.config.js)
/*
@keyframes scroll-infinite {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.animate-scroll-infinite {
  animation: scroll-infinite 30s linear infinite;
}

.hover\:pause-animation:hover {
  animation-play-state: paused;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}
*/