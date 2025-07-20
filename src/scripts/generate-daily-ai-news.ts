import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function generateNews(date: string) {
  const prompt = `Generate 3 important AI news stories for ${date}. Each story should be:
  - Relevant to artificial intelligence, machine learning, or AI industry
  - Realistic and educational
  - 2-3 sentences long
  - Include a compelling title
  - Include a source URL if possible
Format as a JSON array of objects with title, summary, and source fields.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 400,
  });

  const content = response.choices[0].message?.content;
  if (!content) throw new Error('No content from OpenAI');

  // Remove triple backticks and any markdown formatting
  const jsonString = content
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  let news: Array<{ title: string; summary: string; source?: string }> = [];
  try {
    const parsed = JSON.parse(jsonString);
    news = Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    console.error('OpenAI response:', content);
    throw new Error('Failed to parse OpenAI response as JSON');
  }
  return news;
}

async function saveNews(date: string, news: Array<{ title: string; summary: string; source?: string }>) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  // First, get the current maximum position for this date
  const { data: existingNews, error: fetchError } = await supabase
    .from('ai_news')
    .select('*')
    .eq('display_date', date)
    .order('position', { ascending: false })
    .limit(1);

  if (fetchError) {
    console.error('Error fetching existing news:', fetchError.message);
    return;
  }

  // Calculate the starting position (either after the last item or 1 if no items exist)
  const startPosition = existingNews && existingNews.length > 0 ? existingNews[0].position + 1 : 1;

  // Then insert all new news items with unique positions
  const newsToInsert = news.map((item, index) => ({
    day,
    month,
    year,
    title: item.title,
    summary: item.summary,
    source: item.source,
    display_date: date,
    position: startPosition + index, // Assign unique position to each news item
  }));

  const { error } = await supabase
    .from('ai_news')
    .insert(newsToInsert);

  if (error) {
    console.error('Error saving news:', error.message);
  } else {
    console.log(`Saved ${newsToInsert.length} news items for ${date}`);
  }
}

async function main() {
  const date = process.argv[2] || new Date().toISOString().slice(0, 10);
  console.log(`Generating AI news for ${date}...`);
  const news = await generateNews(date);
  await saveNews(date, news);
  console.log('Done.');
}

main().catch(() => {
  console.error('Error occurred in main');
});
