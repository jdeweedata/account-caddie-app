// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Suspense } from 'react'
import { ToastProvider } from '@/components/ui/toast/toast-provider'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Account Caddie - Expert Financial Guidance for Your Business',
  description: 'Account Caddie provides expert financial guidance, accounting, and tax services for businesses. Let us handle your finances so you can focus on what you do best.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="flex flex-col min-h-screen bg-white">
        <ErrorBoundary>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-pulse text-chelsea-cucumber">Loading...</div>
            </div>
          }>
            <ClientLayout>
              {children}
              <ToastProvider />
            </ClientLayout>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  )
}