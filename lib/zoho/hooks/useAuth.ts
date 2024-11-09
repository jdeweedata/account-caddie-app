import { useState, useCallback } from 'react'
import { ZohoAuth } from '../auth'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const auth = ZohoAuth.getInstance()

  const getToken = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const token = await auth.getAccessToken()
      return token
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed'
      setError(message)
      throw new Error(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearToken = useCallback(() => {
    auth.clearToken()
  }, [])

  return {
    getToken,
    clearToken,
    isLoading,
    error
  }
}