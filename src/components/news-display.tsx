import React from 'react';
import type { AiNews } from '@/types';

interface NewsDisplayProps {
  news: AiNews[];
}

export default function NewsDisplay({ news }: NewsDisplayProps) {
  if (!news || news.length === 0) {
    return <div className="text-center text-lg text-muted-foreground">No AI news available for today.</div>;
  }
  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      {news.map(item => (
        <div key={item.id} className="border rounded-lg p-4 bg-background shadow">
          <h2 className="font-bold text-xl mb-2">{item.title}</h2>
          <p className="text-base mb-1">{item.summary}</p>
          <div className="text-xs text-muted-foreground">Source: {item.source || 'Unknown'} | Date: {item.display_date}</div>
        </div>
      ))}
    </div>
  );
}
