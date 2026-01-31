"use client"

export default function TradeConfidence() {
  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Trade each discovery with confidence</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Those patterns of smart wallets help you decide in seconds whether to take a trade and fine-tune the
            strategy for each token.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-black border border-gray-800 rounded-xl p-8 hover:border-[#39FF14]/50 transition-colors">
            <div className="w-12 h-12 bg-[#39FF14]/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#39FF14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Pattern Recognition</h3>
            <p className="text-gray-400">
              AI-powered analysis of wallet behavior patterns to identify profitable trading opportunities.
            </p>
          </div>

          <div className="bg-black border border-gray-800 rounded-xl p-8 hover:border-[#39FF14]/50 transition-colors">
            <div className="w-12 h-12 bg-[#39FF14]/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#39FF14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Real-Time Alerts</h3>
            <p className="text-gray-400">
              Instant notifications when smart wallets make significant moves or new tokens are discovered.
            </p>
          </div>

          <div className="bg-black border border-gray-800 rounded-xl p-8 hover:border-[#39FF14]/50 transition-colors">
            <div className="w-12 h-12 bg-[#39FF14]/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#39FF14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Risk Assessment</h3>
            <p className="text-gray-400">Comprehensive risk scoring based on historical data and market conditions.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
