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

    // Transform data
    const { data: transformedData, errors } = transformToDbFormat(data, entityType);

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validation errors', errors },
        { status: 400 }
      );
    }

    // Import data
    const { error: importError, count } = await supabase
      .from(entityType)
      .insert(transformedData);

    if (importError) {
      console.error('Import error:', importError);
      return NextResponse.json(
        { error: 'Failed to import data', details: importError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, count });
  } catch (error: any) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
