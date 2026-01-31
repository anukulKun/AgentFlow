"use client"

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "App", href: "#" },
    { name: "SNIPR PRO", href: "#" },
    { name: "Stats", href: "#" },
  ]

  const resources = [
    { name: "Documentation", href: "https://snipr.gitbook.io/snipr-docs" },
    { name: "Whitepaper", href: "https://snipr.gitbook.io/snipr-docs/" },
 
  ]

  const social = [
    { name: "Twitter", icon: "𝕏", href: "#" },
    { name: "GitHub", icon: "⚡", href: "#" },
  ]

  const topPerformers = [
    { name: "PEPE", icon: "🐸", roi: "+247%" },
    { name: "WOJAK", icon: "😢", roi: "+189%" },
    { name: "SHIB", icon: "🐕", roi: "+156%" },
    { name: "DOGE2", icon: "🚀", roi: "+134%" },
  ]

  return (
    <footer className="relative bg-black border-t border-[#39FF14]/30 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-[150px] animate-pulse-slow"></div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Top Performers Section */}
        <div className="py-16 border-b border-gray-900/50">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-8 bg-[#39FF14] rounded-full shadow-[0_0_15px_rgba(57,255,20,0.6)]"></span>
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
              TOP PERFORMERS OF THE MONTH (Soon)
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPerformers.map((token, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 hover:border-[#39FF14]/50 hover:shadow-[0_0_40px_rgba(57,255,20,0.15)] transition-all duration-500 cursor-pointer hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 bg-gradient-to-br from-[#39FF14] to-[#00D9FF] rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                    {token.icon}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                  </div>
                  <div>
                    <div className="font-bold text-xl text-white group-hover:text-[#39FF14] transition-colors">
                      {token.name}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Token</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-sm text-gray-500 uppercase tracking-wide">ROI</span>
                    <span className="text-xl font-bold text-[#39FF14] font-mono drop-shadow-[0_0_10px_rgba(57,255,20,0.6)] group-hover:scale-110 transition-transform inline-block">
                      {token.roi}
                    </span>
                  </div>
                  <button className="w-full py-2.5 bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-[#39FF14]/20 hover:border-[#39FF14]/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] transition-all duration-300 group-hover:scale-105">
                     Comming Soon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer">
              <div className="text-3xl font-bold text-[#39FF14] tracking-tight transition-all duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">
                SNIPR
              </div>
              <span className="px-3 py-1 text-[10px] bg-[#39FF14] text-black font-bold uppercase rounded shadow-[0_0_15px_rgba(57,255,20,0.4)] group-hover:shadow-[0_0_25px_rgba(57,255,20,0.6)] transition-all">
                ONLINE
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              AI-Powered Token Discovery & Smart-Wallet Intelligence for the next generation of crypto traders.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.6)]"></span>
              <span>Live Market Data</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide flex items-center gap-2">
              <span className="w-1 h-4 bg-[#39FF14] rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#39FF14] transition-all duration-300 text-sm flex items-center gap-2 group hover:translate-x-2"
                  >
                    <span className="w-0 h-px bg-[#39FF14] group-hover:w-4 transition-all duration-300"></span>
                    {link.name} <span className="text-[10px]">(comming soon)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide flex items-center gap-2">
              <span className="w-1 h-4 bg-[#39FF14] rounded-full"></span>
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    target={link.name === "Whitepaper" ? "_blank" : undefined}
                    rel={link.name === "Whitepaper" ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-[#39FF14] transition-all duration-300 text-sm flex items-center gap-2 group hover:translate-x-2"
                  >
                    <span className="w-0 h-px bg-[#39FF14] group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                    {link.name === "Whitepaper" && (
                      <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide flex items-center gap-2">
              <span className="w-1 h-4 bg-[#39FF14] rounded-full"></span>
              Connect (Soon)
            </h3>
            <div className="flex gap-3 mb-6">
              {social.map((platform, i) => (
                <a
                  key={i}
                  href={platform.href}
                  className="w-10 h-10 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center text-lg hover:bg-[#39FF14]/10 hover:border-[#39FF14]/50 hover:shadow-[0_0_20px_rgba(57,255,20,0.2)] transition-all duration-300 hover:scale-110 hover:-rotate-6 group"
                  title={platform.name}
                >
                  <span className="group-hover:scale-125 transition-transform">{platform.icon}</span>
                </a>
              ))}
            </div>
     
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-900/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            © 2025 SNIPR. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="https://snipr.gitbook.io/snipr-docs" className="hover:text-[#39FF14] transition-colors">project Policy</a>
            <span>•</span>
            <a href="https://snipr.gitbook.io/snipr-docs" className="hover:text-[#39FF14] transition-colors">action of Service</a>
            <span>•</span>
            <a href="https://snipr.gitbook.io/snipr-docs" className="hover:text-[#39FF14] transition-colors">tokenomics</a>
          </div>
        </div>
      </div>
    </footer>
  )
}