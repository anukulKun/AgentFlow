"use client"

export default function TrendingTokenSection() {
  return (
    <section className="relative py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-gradient-to-br from-[#39FF14]/5 to-transparent border border-[#39FF14]/20 rounded-2xl p-8 md:p-12">
          <div className="flex items-start gap-3 mb-6">
            <span className="px-3 py-1 text-xs bg-[#39FF14] text-black font-bold rounded">Available for PRO</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Trending token</h2>

          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            SNIPR Algorithm identifies trending token every 20 minutes based on data from over 20,000 market insiders
            and professional traders (with 60%+ win rates) and 30+ other metrics.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">TG notifications</div>
              <div className="text-2xl font-bold text-[#39FF14]">+5</div>
            </div>
            <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
              <div className="text-sm text-gray-400 mb-2">Success Rate</div>
              <div className="text-2xl font-bold text-white">68.4%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
