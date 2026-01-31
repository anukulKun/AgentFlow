"use client"

export default function HighestROITable() {
  const tokens = [
    { name: "PEPE", roi: "+1,247%", callDate: "2024-01-15", callPrice: "$0.00000012", ath: "$0.00000162" },
    { name: "WOJAK", roi: "+892%", callDate: "2024-01-18", callPrice: "$0.00024", ath: "$0.00238" },
    { name: "TURBO", roi: "+654%", callDate: "2024-01-22", callPrice: "$0.00089", ath: "$0.00671" },
    { name: "MONG", roi: "+543%", callDate: "2024-01-25", callPrice: "$0.00000034", ath: "$0.00000219" },
    { name: "BOBO", roi: "+421%", callDate: "2024-01-28", callPrice: "$0.00000156", ath: "$0.00000813" },
  ]

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">Highest ROI tokens</h2>

        <div className="bg-black border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Token</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">ROI</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Call date</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Call price</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">ATH</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, i) => (
                  <tr key={i} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{token.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#39FF14]">{token.roi}</div>
                    </td>
                    <td className="p-4 text-gray-400">{token.callDate}</td>
                    <td className="p-4 text-gray-400">{token.callPrice}</td>
                    <td className="p-4 text-white font-semibold">{token.ath}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 text-center border-t border-gray-800">
            <button className="px-6 py-3 bg-[#39FF14] text-black font-bold rounded-lg hover:bg-[#2de00f] transition-colors">
              View All Discoveries
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
