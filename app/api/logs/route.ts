import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

export async function GET() {
  try {
    const logs = logger.getErrorLogs()
    return NextResponse.json({ logs })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch error logs' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    logger.clearErrorLogs()
    return NextResponse.json({ message: 'Error logs cleared successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clear error logs' },
      { status: 500 }
    )
  }
}