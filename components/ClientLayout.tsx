'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const Header = dynamic(() => import('@/components/Header'), {
  ssr: true,
  loading: () => (
    <div className="h-16 bg-white shadow-md animate-pulse" />
  ),
})

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true,
  loading: () => (
    <div className="h-64 bg-te-papa-green animate-pulse" />
  ),
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}