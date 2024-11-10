import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createCRMContact } from '@/lib/zoho/api/crm-client';
import type { CreateContactInput } from '@/lib/zoho/api/crm-client';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('zoho_access_token')?.value;

    if (!accessToken) {
      console.error('No access token found in cookies');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const contactData: CreateContactInput = await request.json();
    
    console.log('Creating contact with data:', contactData);
    
    const contact = await createCRMContact(accessToken, contactData);
    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create contact',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 