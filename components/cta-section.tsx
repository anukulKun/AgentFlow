"use client"

import { motion } from "framer-motion"

export default function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-[#39FF14]/20 via-black to-[#00D9FF]/20 border-2 border-[#39FF14] rounded-3xl p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Glowing orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#39FF14]/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#00D9FF]/20 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Join the <span className="text-[#39FF14]">SNIPR</span> Network
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Stay ahead of the curve. Discover tokens before they trend.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-[#39FF14] text-black text-xl font-bold rounded-lg hover:shadow-[0_0_40px_rgba(57,255,20,0.6)] transition-all"
            >
              Get Started Now
            </motion.button>

            <div className="flex flex-wrap gap-6 justify-center mt-12 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
                💬 Telegram
              </a>
              <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
                🧠 GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
                💻 Docs
              </a>
              <a href="#" className="text-gray-400 hover:text-[#39FF14] transition-colors">
                🪙 Tokenomics
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
