"use client"

export default function SmartWalletsSection() {
  return (
    <section className="relative py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Smart wallets' patterns analytics</h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              All wallets come with detailed, up-to-date stats (win rate, P&L, average hold time, and more).
            </p>
            <div className="bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-[#39FF14] mb-3">Great for copy-trading</h3>
              <p className="text-gray-300">
                We've worked hard to make this the most relevant and accurate database of profitable wallets on the
                market. You can mirror the ones you trust in a single click.
              </p>
            </div>
          </div>

          {/* Right Stats */}
          <div className="space-y-4">
            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Win Rate</span>
                <span className="text-2xl font-bold text-[#39FF14]">73.2%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-[#39FF14] h-2 rounded-full" style={{ width: "73.2%" }} />
              </div>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Avg Hold Time</span>
                <span className="text-2xl font-bold text-white">4.2h</span>
              </div>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Total P&L</span>
                <span className="text-2xl font-bold text-[#39FF14]">+$142K</span>
              </div>
            </div>

            <div className="bg-black border border-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Tracked Wallets</span>
                <span className="text-2xl font-bold text-white">20,000+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
