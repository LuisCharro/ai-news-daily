import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local if it exists
try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  dotenv.config({ path: envPath });
  console.log('Loaded environment variables from .env.local');
} catch (error) {
  console.log('No .env.local file found, using environment variables from the environment');
}

// Get environment variables with validation
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`❌ Error: Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value;
}

const SUPABASE_URL = getEnvVar('SUPABASE_URL');
const SUPABASE_SERVICE_KEY = getEnvVar('SUPABASE_SERVICE_KEY');
const OPENAI_API_KEY = getEnvVar('OPENAI_API_KEY');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function generateNews(date: string) {
  const prompt = `Generate 3 important AI news stories for ${date}. Each story should be:
  - Relevant to artificial intelligence, machine learning, or AI industry
  - Realistic and educational
  - 2-3 sentences long
  - Include a compelling title
  - Include a source URL if possible

Return ONLY a valid JSON array with no additional text or explanations. Format as:
[
  {
    "title": "Story title",
    "summary": "Story summary",
    "source": "https://example.com"
  }
]`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 400,
  });

  const content = response.choices[0].message?.content;
  if (!content) throw new Error('No content from OpenAI');

  // Extract JSON from markdown code blocks and remove any trailing text
  let jsonString = content;
  
  // Check if content contains markdown code blocks
  const jsonBlockMatch = content.match(/```json\s*([\s\S]*?)\s*```/i) || content.match(/```\s*([\s\S]*?)\s*```/i);
  if (jsonBlockMatch) {
    jsonString = jsonBlockMatch[1];
  }
  
  // Remove any text after the JSON array ends
  const jsonArrayMatch = jsonString.match(/(\[[\s\S]*?\])/);
  if (jsonArrayMatch) {
    jsonString = jsonArrayMatch[1];
  }
  
  jsonString = jsonString.trim();

  let news: Array<{ title: string; summary: string; source?: string }> = [];
  try {
    const parsed = JSON.parse(jsonString);
    news = Array.isArray(parsed) ? parsed : [parsed];
  } catch (parseError) {
    console.error('OpenAI response:', content);
    console.error('Extracted JSON string:', jsonString);
    console.error('Parse error:', parseError);
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

// Main execution
async function run() {
  try {
    console.log('🚀 Starting AI news generation...');
    await main();
    console.log('✅ Successfully completed AI news generation');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error in AI news generation:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

run();
