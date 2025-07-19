export function shareOnTwitter(text: string, url: string) {
  const tweetText = encodeURIComponent(`${text} ${url} #AI #ArtificialIntelligence`);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      if (document.execCommand('copy')) {
        resolve();
      } else {
        reject(new Error('Copy failed'));
      }
      document.body.removeChild(textArea);
    });
  }
}

export function updateUrlWithDate(date: string) {
  const url = new URL(window.location.href);
  if (date === getToday()) {
    url.searchParams.delete('date');
  } else {
    url.searchParams.set('date', date);
  }
  window.history.pushState({}, '', url.toString());
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}