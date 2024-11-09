import { NextResponse } from 'next/server'
import { ZohoClient } from '@/lib/zoho/client'
import { PIScoreFormData } from '@/components/PIScoreWizard/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { formData, consultationDateTime } = body as {
      formData: PIScoreFormData
      consultationDateTime?: string
    }

    const client = new ZohoClient()
    const response = await client.createLead(formData, consultationDateTime)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error creating Zoho lead:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}