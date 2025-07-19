import { AiNews, ApiResponse, isAiNews } from '@/types';

export async function fetchAiNews(date?: string): Promise<AiNews[]> {
  const url = new URL('/api/ai-news', window.location.origin);
  if (date) {
    url.searchParams.set('date', date);
  }

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`Failed to fetch AI news: ${response.statusText}`);
  }

  const data: ApiResponse<AiNews[]> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch AI news');
  }

  return data.data || [];
}

export function validateAiNews(news: any): news is AiNews {
  return isAiNews(news);
}

export function sortNewsByPosition(news: AiNews[]): AiNews[] {
  return [...news].sort((a, b) => a.position - b.position);
}