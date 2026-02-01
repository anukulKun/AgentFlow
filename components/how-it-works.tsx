"use client"

import { motion } from "framer-motion"

const steps = [
  { num: "01", title: "Data Ingestion", desc: "Real-time blockchain data from multiple sources" },
  { num: "02", title: "AI Analysis", desc: "Machine learning models score and rank tokens" },
  { num: "03", title: "Wallet Tracking", desc: "Monitor smart-money movements and patterns" },
  { num: "04", title: "Alert Generation", desc: "Instant notifications for opportunities and risks" },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#39FF14] to-[#00D9FF] bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <div className="text-6xl font-bold text-[#39FF14]/20 mb-4 font-mono">{step.num}</div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#39FF14] to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
