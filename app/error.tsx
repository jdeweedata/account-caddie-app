'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pampas">
      <h2 className="text-2xl font-bold text-te-papa-green mb-4">Something went wrong!</h2>
      <Button
        onClick={() => reset()}
        className="bg-chelsea-cucumber text-white hover:bg-te-papa-green"
      >
        Try again
      </Button>
    </div>
  )
}