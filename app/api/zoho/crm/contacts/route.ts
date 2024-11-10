import { NextRequest, NextResponse } from 'next/server';
import { fetchCRMContacts } from '@/lib/zoho/api/crm-client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const params = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      per_page: searchParams.get('per_page') ? parseInt(searchParams.get('per_page')!) : undefined,
      sort_by: searchParams.get('sort_by') || undefined,
      sort_order: (searchParams.get('sort_order') as 'asc' | 'desc') || undefined,
      search: searchParams.get('search') || undefined,
    };

    const contacts = await fetchCRMContacts(params);
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to fetch contacts', details: errorMessage },
      { status: 500 }
    );
  }
} 