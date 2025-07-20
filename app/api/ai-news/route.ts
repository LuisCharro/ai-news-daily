
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function GET() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const display_date = today.toISOString().slice(0, 10);
  // Query for today's news, fallback to all news if none
  const { data, error } = await supabase
    .from('ai_news')
    .select('*')
    .eq('display_date', display_date)
    .order('position', { ascending: true });

  console.log('API: Query for today', { display_date, data, error });

  if (error) {
    console.error('API: Error querying today', error);
    return NextResponse.json({ success: false, error: error.message, data: [] }, { status: 500 });
  }
  // If no news for today, get latest
  if (!data || data.length === 0) {
    const { data: latest, error: latestError } = await supabase
      .from('ai_news')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);
    console.log('API: Fallback to latest', { latest, latestError });
    if (latestError) {
      console.error('API: Error querying latest', latestError);
      return NextResponse.json({ success: false, error: latestError.message, data: [] }, { status: 500 });
    }
    return NextResponse.json({ success: true, data: latest });
  }
  return NextResponse.json({ success: true, data });
}
