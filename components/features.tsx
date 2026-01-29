"use client"

import { motion } from "framer-motion"
import { Search, Wallet, AlertTriangle, Bell } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Token Discovery Engine",
    desc: "AI ranks new tokens based on liquidity, volume spikes, buyer patterns, and smart-money involvement.",
  },
  {
    icon: Wallet,
    title: "Smart-Wallet Scoring",
    desc: "Track the best-performing wallets by win rate, average holding time, and early entries.",
  },
  {
    icon: AlertTriangle,
    title: "Pump & Rug Detection",
    desc: "Automated detection of suspicious on-chain patterns, whale dominance, and liquidity pulls.",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    desc: "Instant Telegram and WebSocket alerts for token movements, anomalies, and market shifts.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-b from-black/40 to-transparent">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#39FF14] to-[#00D9FF] bg-clip-text text-transparent">
              Core Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Fast. Accurate. Transparent. SNIPR is an intelligence layer that empowers traders.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-black/60 border border-[#39FF14]/30 rounded-xl p-6 hover:border-[#39FF14] transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] cursor-pointer"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#39FF14]/20 to-[#00D9FF]/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
