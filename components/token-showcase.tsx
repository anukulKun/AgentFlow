"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

export default function TokenShowcase() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-black/60 to-[#39FF14]/5 border-2 border-[#39FF14] rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Token Data */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-[#39FF14]/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#39FF14]" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">DISCOVERY SCORE</div>
                  <div className="text-2xl font-bold text-[#39FF14] font-mono">98/100</div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">TOKEN DATA</h3>
                <div className="text-sm text-gray-400">Real-time metrics</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Liquidity:</span>
                    <span className="text-[#39FF14] font-mono">$2.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume 24h:</span>
                    <span className="text-[#39FF14] font-mono">$890K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Holders:</span>
                    <span className="text-[#39FF14] font-mono">1,247</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Future Pump Expectation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold">FUTURE PUMP EXPECTATION</h3>
              <div className="relative h-48 bg-black/40 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="w-full h-3/4 bg-gradient-to-t from-[#39FF14]/30 via-[#FF6B00]/30 to-transparent rounded-t-lg" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#39FF14] font-mono">+245%</div>
                    <div className="text-xs text-gray-400">Predicted Growth</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Professional Traders Activity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold">PROFESSIONAL TRADERS ACTIVITY</h3>
              <div className="space-y-3">
                {[
                  { wallet: "wallet.eth", action: "BOUGHT", amount: "$45K" },
                  { wallet: "trader.sol", action: "BOUGHT", amount: "$32K" },
                  { wallet: "whale.eth", action: "BOUGHT", amount: "$128K" },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-black/40 rounded-lg p-3 border border-[#39FF14]/20"
                  >
                    <div>
                      <div className="text-sm font-mono text-gray-300">{activity.wallet}</div>
                      <div className="text-xs text-[#39FF14]">{activity.action}</div>
                    </div>
                    <div className="text-[#39FF14] font-bold font-mono">{activity.amount}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
