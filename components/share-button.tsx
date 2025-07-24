"use client";

import { Button } from "@/components/ui/button";
import { Share2, Twitter } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  summary: string;
  date: string;
}

export default function ShareButton({ title, summary, date }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = () => {
    setIsSharing(true);
    
    // Get current URL
    const currentUrl = window.location.href;
    
    // Create tweet text with title and URL
    const tweetText = `${title}\n\n${currentUrl}\n\n#AI #ArtificialIntelligence #TechNews`;
    
    // Check if tweet is within character limit (280 chars)
    const maxLength = 280;
    let finalTweetText = tweetText;
    
    if (tweetText.length > maxLength) {
      // Truncate title if needed, keeping URL and hashtags
      const urlAndHashtags = `\n\n${currentUrl}\n\n#AI #ArtificialIntelligence #TechNews`;
      const availableForTitle = maxLength - urlAndHashtags.length - 3; // -3 for "..."
      
      if (title.length > availableForTitle) {
        const truncatedTitle = title.substring(0, availableForTitle) + "...";
        finalTweetText = `${truncatedTitle}${urlAndHashtags}`;
      }
    }
    
    // Create Twitter share URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(finalTweetText)}`;
    
    // Open in new window
    window.open(twitterUrl, '_blank', 'width=550,height=420');
    
    // Reset sharing state after a short delay
    setTimeout(() => setIsSharing(false), 1000);
  };

  return (
    <Button
      onClick={handleShare}
      disabled={isSharing}
      variant="outline"
      size="sm"
      className="border-cyan-400/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all duration-200"
    >
      {isSharing ? (
        <>
          <Share2 className="w-4 h-4 mr-2 animate-pulse" />
          Sharing...
        </>
      ) : (
        <>
          <Twitter className="w-4 h-4 mr-2" />
          Share on X
        </>
      )}
    </Button>
  );
}