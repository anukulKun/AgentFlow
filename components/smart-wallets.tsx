"use client"

import { motion } from "framer-motion"
import { TrendingUp, Copy, Shield } from "lucide-react"

export default function SmartWallets() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              SMART WALLETS' DATA IN EVERY <span className="text-[#39FF14]">SNIPR</span> DISCOVERY
            </h2>
            <div className="bg-gradient-to-br from-[#39FF14]/20 to-transparent border-2 border-[#39FF14] rounded-xl p-8 backdrop-blur-sm">
              <div className="text-2xl font-bold text-[#39FF14] mb-4 font-mono">DEGEN MODE</div>
              <p className="text-gray-300">
                Access the database of profitable wallet addresses and track their moves in real-time.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                icon: TrendingUp,
                title: "Smart wallets patterns analytics",
                desc: "Track wallet behavior, win rate, hold time, average ROI, and more.",
              },
              {
                icon: Copy,
                title: "Great for copy-trading",
                desc: "Mirror successful wallet strategies and replicate profitable moves in real-time.",
              },
              {
                icon: Shield,
                title: "Trade each discovery with confidence",
                desc: "Detect patterns and anomalies to make informed decisions.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 bg-black/40 border border-[#39FF14]/20 rounded-xl hover:border-[#39FF14] transition-all hover:shadow-[0_0_20px_rgba(57,255,20,0.2)]"
              >
                <div className="w-12 h-12 bg-[#39FF14]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-[#39FF14]" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
