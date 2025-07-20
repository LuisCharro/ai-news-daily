export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source?: string;
  display_date: string;
  created_at: string;
}

export async function getLatestNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/ai-news`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}