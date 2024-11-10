import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { deleteCRMContact } from '@/lib/zoho/api/crm-client';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('zoho_access_token')?.value;

    if (!accessToken) {
      console.error('No access token found in cookies');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const contactId = params.id;
    console.log('Deleting contact with ID:', contactId);
    
    await deleteCRMContact(accessToken, contactId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete contact',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 