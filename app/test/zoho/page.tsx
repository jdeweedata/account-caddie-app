'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from '@/components/ui/toast'

export default function ZohoTestPage() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isTestingAPI, setIsTestingAPI] = useState(false)
  const [authStatus, setAuthStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [apiStatus, setApiStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [accessToken, setAccessToken] = useState<string | null>(null)

  const handleAuthenticate = async () => {
    try {
      setIsAuthenticating(true)
      setAuthStatus('idle')
      setAccessToken(null)

      // Get auth URL from backend
      const response = await fetch('/api/zoho/auth')
      if (!response.ok) {
        throw new Error('Failed to initialize authentication')
      }

      const { url } = await response.json()

      // Open popup for authentication
      const width = 600
      const height = 600
      const left = window.screenX + (window.outerWidth - width) / 2
      const top = window.screenY + (window.outerHeight - height) / 2

      const authWindow = window.open(
        url,
        'Zoho Authorization',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
      )

      if (!authWindow) {
        throw new Error('Failed to open authorization window. Please allow popups for this site.')
      }

      // Listen for auth completion
      const handleMessage = async (event: MessageEvent) => {
        if (event.data.type === 'zoho-auth-success') {
          try {
            const tokenResponse = await fetch(`/api/zoho/auth/token?code=${event.data.code}`)
            if (!tokenResponse.ok) {
              throw new Error('Failed to exchange code for token')
            }

            const tokenData = await tokenResponse.json()
            setAccessToken(tokenData.access_token)
            setAuthStatus('success')
            
            toast({
              title: "Authentication Successful",
              description: "Successfully authenticated with ZOHO",
              variant: "success"
            })
          } catch (error) {
            setAuthStatus('error')
            toast({
              title: "Authentication Failed",
              description: error instanceof Error ? error.message : "Failed to complete authentication",
              variant: "destructive"
            })
          }
        }
      }

      window.addEventListener('message', handleMessage)
      return () => window.removeEventListener('message', handleMessage)

    } catch (error) {
      setAuthStatus('error')
      toast({
        title: "Authentication Failed",
        description: error instanceof Error ? error.message : "Failed to initialize authentication",
        variant: "destructive"
      })
    } finally {
      setIsAuthenticating(false)
    }
  }

  const testAPI = async () => {
    if (!accessToken) {
      toast({
        title: "Error",
        description: "Please authenticate first",
        variant: "destructive"
      })
      return
    }

    try {
      setIsTestingAPI(true)
      setApiStatus('idle')

      const response = await fetch('/api/zoho/crm/test', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error('API test failed')
      }

      const data = await response.json()
      setApiStatus('success')
      
      toast({
        title: "API Test Successful",
        description: "Successfully connected to ZOHO CRM API",
        variant: "success"
      })

    } catch (error) {
      setApiStatus('error')
      toast({
        title: "API Test Failed",
        description: error instanceof Error ? error.message : "Failed to test API connection",
        variant: "destructive"
      })
    } finally {
      setIsTestingAPI(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-te-papa-green">
              ZOHO Integration Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Authentication Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">1. Authentication</h3>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleAuthenticate}
                  disabled={isAuthenticating}
                  className="bg-chelsea-cucumber hover:bg-te-papa-green text-white"
                >
                  {isAuthenticating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Authenticate with ZOHO'
                  )}
                </Button>
                {authStatus === 'success' && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Authenticated
                  </div>
                )}
                {authStatus === 'error' && (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Authentication failed
                  </div>
                )}
              </div>
            </div>

            {/* API Test Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">2. API Test</h3>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={testAPI}
                  disabled={isTestingAPI || !accessToken}
                  className="bg-chelsea-cucumber hover:bg-te-papa-green text-white"
                >
                  {isTestingAPI ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Testing API...
                    </>
                  ) : (
                    'Test ZOHO API'
                  )}
                </Button>
                {apiStatus === 'success' && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    API test successful
                  </div>
                )}
                {apiStatus === 'error' && (
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    API test failed
                  </div>
                )}
              </div>
            </div>

            {/* Status Display */}
            {accessToken && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Access Token:</h4>
                <p className="text-sm text-gray-500 break-all font-mono">{accessToken}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div id="toast-container" className="fixed bottom-4 right-4 z-50" />
    </div>
  )
}