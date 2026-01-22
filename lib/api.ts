/**
 * Fetches trending tokens from CoinGecko API
 * No API key required for basic endpoints
 */
export async function fetchTrendingTokens() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/search/trending", {
      next: { revalidate: 15 }, // Cache for 15 seconds
    })

    if (!response.ok) {
      throw new Error("Failed to fetch trending tokens")
    }

    const data = await response.json()
    return data.coins || []
  } catch (error) {
    console.error("[v0] Error fetching trending tokens:", error)
    return []
  }
}

/**
 * Fetches token prices from CoinGecko
 * @param tokenIds - Comma-separated list of token IDs (e.g., 'bitcoin,ethereum')
 */
export async function fetchTokenPrices(tokenIds: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`,
      { next: { revalidate: 15 } },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch token prices")
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching token prices:", error)
    return {}
  }
}

/**
 * Fetches token data from DexScreener
 * @param tokenAddress - Token contract address
 */
export async function fetchDexScreenerData(tokenAddress: string) {
  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`, {
      next: { revalidate: 15 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch DexScreener data")
    }

    const data = await response.json()
    return data.pairs?.[0] || null
  } catch (error) {
    console.error("[v0] Error fetching DexScreener data:", error)
    return null
  }
}

/**
 * Fetches top tokens by market cap from CoinGecko
 */
export async function fetchTopTokens(limit = 10) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
      { next: { revalidate: 15 } },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch top tokens")
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching top tokens:", error)
    return []
  }
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
  return `$${num.toFixed(2)}`
}

/**
 * Format price with appropriate decimal places
 */
export function formatPrice(price: number): string {
  if (price < 0.01) return `$${price.toFixed(6)}`
  if (price < 1) return `$${price.toFixed(4)}`
  return `$${price.toFixed(2)}`
}
