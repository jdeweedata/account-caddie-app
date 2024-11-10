'use client'

import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

export function useZohoFields() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const createFields = async (fieldGroup: 'CONSULTATION' | 'BUSINESS' | 'all') => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/zoho/crm/fields', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fieldGroup })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create fields')
      }

      const result = await response.json()
      
      toast({
        title: 'Success',
        description: 'Custom fields created successfully',
        variant: 'default'
      })

      return result.data

    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create fields',
        variant: 'destructive'
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getFields = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/zoho/crm/fields')
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch fields')
      }

      const result = await response.json()
      return result.data

    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch fields',
        variant: 'destructive'
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createFields,
    getFields,
    isLoading
  }
} 