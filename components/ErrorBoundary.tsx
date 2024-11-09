'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from "@/components/ui/button"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pampas p-4">
          <h2 className="text-2xl font-bold text-te-papa-green mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            We apologize for the inconvenience. Please try again.
          </p>
          <Button
            onClick={() => {
              this.setState({ hasError: false })
              window.location.reload()
            }}
            className="bg-chelsea-cucumber text-white hover:bg-te-papa-green"
          >
            Reload Page
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary