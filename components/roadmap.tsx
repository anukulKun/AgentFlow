"use client"

import { motion } from "framer-motion"

const phases = [
  {
    phase: "Phase 1",
    title: "MVP Launch",
    items: ["Token discovery", "Wallet scoring", "Telegram alerts"],
    status: "complete",
  },
  {
    phase: "Phase 2",
    title: "Real-Time Layer",
    items: ["WebSocket", "Multi-chain", "Advanced anomaly detection"],
    status: "current",
  },
  {
    phase: "Phase 3",
    title: "AI Refinement",
    items: ["ML predictions", "Historical analysis", "Community dashboard"],
    status: "upcoming",
  },
  {
    phase: "Phase 4",
    title: "Expansion",
    items: ["API marketplace", "Pro subscriptions", "SNIPR DAO"],
    status: "upcoming",
  },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#39FF14] to-[#00D9FF] bg-clip-text text-transparent">Roadmap</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#39FF14] via-[#00D9FF] to-[#39FF14] hidden md:block" />

          <div className="grid md:grid-cols-4 gap-8">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div
                  className={`bg-black/60 border-2 rounded-xl p-6 ${
                    phase.status === "complete"
                      ? "border-[#39FF14]"
                      : phase.status === "current"
                        ? "border-[#00D9FF]"
                        : "border-gray-700"
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#39FF14] to-[#00D9FF] rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {i + 1}
                  </div>
                  <div className="text-sm text-[#39FF14] mb-2 font-mono">{phase.phase}</div>
                  <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-[#39FF14] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
