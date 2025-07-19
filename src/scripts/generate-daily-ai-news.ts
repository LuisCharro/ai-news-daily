import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function generateNews(date: string) {
  const prompt = `Generate 1 important AI news story for ${date}. The story should be:
  - Relevant to artificial intelligence, machine learning, or AI industry
  - Realistic and educational
  - 2-3 sentences long
  - Include a compelling title
Format as a JSON object with title, summary, and source fields.`;

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
  } catch (err) {
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

  for (let i = 0; i < news.length; i++) {
    const item = news[i];
    const { title, summary, source } = item;
    const position = 1; // Always 1 for single news
    const { error } = await supabase.from('ai_news').upsert({
      day,
      month,
      year,
      title,
      summary,
      source,
      display_date: date,
      position,
    }, { onConflict: 'display_date,position' });
    if (error) {
      console.error(`Error saving news:`, error.message);
    } else {
      console.log(`Saved news: ${title}`);
    }
  }
}

async function main() {
  const date = process.argv[2] || new Date().toISOString().slice(0, 10);
  console.log(`Generating AI news for ${date}...`);
  const news = await generateNews(date);
  await saveNews(date, news);
  console.log('Done.');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
