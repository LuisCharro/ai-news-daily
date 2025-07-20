
"use client";
import { useEffect, useState } from "react";
import NewsCard from "./news-card";
import { Bot, Calendar, Zap } from "lucide-react";
import { NewsItem, getLatestNews } from "@/lib/ai-news";

export default function NewsDisplay() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLatestNews()
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load AI news.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-lg text-muted-foreground">Loading news...</div>;
  }
  if (error || news.length === 0) {
    return (
      <div className="text-center py-12">
        <Bot className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">No AI news available for today. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-8 space-x-4">
        <Calendar className="w-6 h-6 text-cyan-400" />
        <span className="text-cyan-300 text-lg font-medium">{news[0].display_date}</span>
        <Zap className="w-6 h-6 text-purple-400" />
      </div>
      <div className="space-y-8">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
}