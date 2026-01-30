"use client"

import { useEffect, useState } from "react"

export default function TokenDiscovery() {
  const [countdown, setCountdown] = useState({ minutes: 12, seconds: 34 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            return { minutes: 19, seconds: 59 }
          }
          return { minutes: prev.minutes - 1, seconds: 59 }
        }
        return { ...prev, seconds: prev.seconds - 1 }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-black to-gray-950">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Next Token Expected */}
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-2">Next token expected in</div>
            <div className="text-4xl font-bold text-[#39FF14] font-mono">
              {String(countdown.minutes).padStart(2, "0")}M {String(countdown.seconds).padStart(2, "0")}S
            </div>
          </div>

          {/* Token ROI */}
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-2">Token ROI</div>
            <div className="text-4xl font-bold text-[#39FF14]">+247%</div>
            <div className="text-xs text-gray-500 mt-2">Average from last 10 discoveries</div>
          </div>

          {/* Discovered */}
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-2">Discovered</div>
            <div className="text-2xl font-bold text-white">2h 14m ago</div>
            <div className="text-xs text-gray-500 mt-2">Last token discovery</div>
          </div>
        </div>

        {/* Discovery Details */}
        <div className="mt-6 bg-black border border-gray-800 rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-sm text-gray-400 mb-2">Discovery price</div>
              <div className="text-2xl font-bold text-white">$0.00042</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-2">ATH after discovery</div>
              <div className="text-2xl font-bold text-[#39FF14]">$0.00146</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-2">Smart Wallets' data</div>
              <div className="text-2xl font-bold text-white">in every SNIPR discovery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
