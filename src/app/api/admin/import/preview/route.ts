import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { transformToDbFormat } from '@/lib/import/parser';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { entityType, data } = body;

    if (!entityType || !data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Transform and validate data
    const { data: transformedData, errors } = transformToDbFormat(data, entityType);

    return NextResponse.json({ data: transformedData, errors });
  } catch (error: any) {
    console.error('Preview error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
