"use client"
import TrendingTicker from "@/components/trending-ticker"
import Hero from "@/components/hero"
import MainTokenCard from "@/components/main-token-card"
import TokenScanTable from "@/components/token-scan-table"
import AlgoStats from "@/components/algo-stats"
import SmartWalletsFeatures from "@/components/smart-wallets-features"
import TrendingTokenLarge from "@/components/trending-token-large"
import TopPerformers from "@/components/top-performers"
import { useRouter } from "next/navigation"
import { Network, ArrowRight } from "lucide-react"

export default function Home() {
  const router = useRouter()

  const navigateToWorkflow = () => {
    router.push('/workflow')
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-gray-900">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#39FF14] to-emerald-500 rounded-lg flex items-center justify-center">
              <Network className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="text-xl font-bold text-white tracking-tight">AGENTFLOW</div>
              <div className="text-[10px] text-[#39FF14] tracking-widest">DECENTRALIZED</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              App
            </a>
            <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors flex items-center gap-1">
              <span className="w-2 h-2 bg-[#39FF14] rounded-full"></span>
              PRO
            </a>
            <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Stats
            </a>
            <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Docs
            </a>
            <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
              Protocol
            </a>
            <button 
              onClick={navigateToWorkflow}
              className="px-4 py-2 bg-[#39FF14] hover:bg-[#2ecc11] text-black font-semibold rounded-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              Go to Workflow
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">Login</button>
          </nav>
        </div>
      </header>

      <div className="pt-16">
        <TrendingTicker />
        <Hero />
        <MainTokenCard />
        <TokenScanTable />
        <AlgoStats />
        <SmartWalletsFeatures />
        <TrendingTokenLarge />
        <TopPerformers />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © 2025 AGENTFLOW. Decentralized Automation Builder & Protocol.
        </div>
      </footer>
    </main>
  )
}