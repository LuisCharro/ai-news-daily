
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function GET() {
  // Query for all news, ordered by display_date (descending) and position (ascending)
  const { data, error } = await supabase
    .from('ai_news')
    .select('*')
    .order('display_date', { ascending: false })
    .order('position', { ascending: true });

  console.log('API: Fetched all news items:', {
    count: data?.length || 0,
    data: data ? 'Data available' : 'No data'
  });

  if (error) {
    console.error('API: Error fetching news:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message, 
      data: [] 
    }, { status: 500 });
  }

  return NextResponse.json({ 
    success: true, 
    data: data || []
  });
}
