"use client"

import { useState, useEffect } from "react"
import { fetchTrendingTokens, fetchTopTokens } from "@/lib/api"

export function useTrendingTokens() {
  const [tokens, setTokens] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTokens() {
      try {
        setLoading(true)
        const data = await fetchTrendingTokens()
        setTokens(data)
        setError(null)
      } catch (err) {
        setError("Failed to load trending tokens")
        console.error("[v0] Error loading trending tokens:", err)
      } finally {
        setLoading(false)
      }
    }

    loadTokens()

    // Refresh every 15 seconds
    const interval = setInterval(loadTokens, 15000)

    return () => clearInterval(interval)
  }, [])

  return { tokens, loading, error }
}

export function useTopTokens(limit = 10) {
  const [tokens, setTokens] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTokens() {
      try {
        setLoading(true)
        const data = await fetchTopTokens(limit)
        setTokens(data)
        setError(null)
      } catch (err) {
        setError("Failed to load top tokens")
        console.error("[v0] Error loading top tokens:", err)
      } finally {
        setLoading(false)
      }
    }

    loadTokens()

    // Refresh every 15 seconds
    const interval = setInterval(loadTokens, 15000)

    return () => clearInterval(interval)
  }, [limit])

  return { tokens, loading, error }
}
