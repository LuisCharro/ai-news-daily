export async function fetchAiNews(date?: string): Promise<unknown[]> {
  const url = new URL('/api/ai-news', window.location.origin);
  if (date) {
    url.searchParams.set('date', date);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch AI news: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data || [];
}