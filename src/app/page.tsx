"use client";
// ...existing code...

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { fetchAiNews } from '@/lib/ai-news';

const NewsDisplay = dynamic(() => import('@/components/news-display'), { ssr: false });

import type { AiNews } from '@/types';

export default function Home() {
  const [news, setNews] = useState<AiNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAiNews()
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load AI news.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">AI News Daily</h1>
      {loading ? (
        <div className="text-lg text-muted-foreground">Loading news...</div>
      ) : error ? (
        <div className="text-lg text-red-500">{error}</div>
      ) : (
        <NewsDisplay news={news} />
      )}
    </div>
  );
}
