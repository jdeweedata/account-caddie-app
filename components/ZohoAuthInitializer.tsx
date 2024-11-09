'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { ZohoAuth } from "@/lib/zoho/auth"

export function ZohoAuthInitializer() {
  const handleAuth = () => {
    const authUrl = ZohoAuth.getAuthUrl()
    window.location.href = authUrl
  }

  return (
    <Button 
      onClick={handleAuth}
      className="bg-chelsea-cucumber hover:bg-te-papa-green text-white"
    >
      Initialize ZOHO Integration
    </Button>
  )
}