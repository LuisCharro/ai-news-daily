"use client";

import dynamic from 'next/dynamic';
import LoadingSpinner from "@/components/loading-spinner";
import { useEffect, useState } from 'react';
import { getLatestNews } from '@/lib/ai-news';

const NewsDisplay = dynamic(() => import('@/components/news-display'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getLatestNews()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load AI news.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="terminal-container w-full max-w-4xl mx-auto p-6 sm:p-12 rounded-xl shadow-lg border border-cyan-500/20 bg-slate-950/90 backdrop-blur-md mt-8">
      <h1 className="typewriter text-4xl font-mono font-bold text-cyan-400 mb-8 text-center">AI News Daily</h1>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-lg text-red-500 text-center py-8">{error}</div>
      ) : (
        <NewsDisplay />
      )}
    </div>
  );
}
