"use client"

import { motion } from "framer-motion"
import { Database, Cpu, Zap, Radio } from "lucide-react"

const components = [
  { icon: Database, label: "PostgreSQL + Redis", color: "#39FF14" },
  { icon: Cpu, label: "Python + Node.js", color: "#00D9FF" },
  { icon: Zap, label: "REST API", color: "#39FF14" },
  { icon: Radio, label: "WebSocket", color: "#00D9FF" },
]

export default function Architecture() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-black/40">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#39FF14] to-[#00D9FF] bg-clip-text text-transparent">
              Architecture
            </span>
          </h2>
          <p className="text-xl text-gray-400">Built for speed, scale, and reliability</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {components.map((comp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div
                  className="bg-black/60 border-2 rounded-xl p-6 text-center hover:scale-105 transition-transform"
                  style={{ borderColor: comp.color }}
                >
                  <comp.icon className="w-12 h-12 mx-auto mb-4" style={{ color: comp.color }} />
                  <div className="text-sm font-bold">{comp.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection lines */}
          <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
            <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="#39FF14" strokeWidth="2" opacity="0.3" />
            <line x1="50%" y1="25%" x2="50%" y2="75%" stroke="#00D9FF" strokeWidth="2" opacity="0.3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
