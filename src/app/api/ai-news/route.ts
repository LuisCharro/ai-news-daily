import { NextResponse } from 'next/server';
import type { AiNews } from '@/types';

// Temporary: hardcoded news for demo
const today = new Date();
const display_date = today.toISOString().slice(0, 10);

const demoNews: AiNews[] = [
  {
    id: 1,
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    title: 'OpenAI releases new GPT-5 model',
    summary: 'The latest GPT-5 model offers improved reasoning and context retention for AI applications.',
    source: 'openai.com',
    display_date,
    position: 1,
    created_at: today.toISOString(),
    updated_at: today.toISOString(),
  },
  {
    id: 2,
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    title: 'Google DeepMind unveils new RL algorithm',
    summary: 'DeepMind introduces a reinforcement learning algorithm that outperforms previous benchmarks.',
    source: 'deepmind.com',
    display_date,
    position: 2,
    created_at: today.toISOString(),
    updated_at: today.toISOString(),
  },
  {
    id: 3,
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    title: 'Meta AI launches open-source vision model',
    summary: 'Meta AI releases a new open-source computer vision model for researchers and developers.',
    source: 'ai.facebook.com',
    display_date,
    position: 3,
    created_at: today.toISOString(),
    updated_at: today.toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: demoNews });
}
