// Core data models and types for AI News Daily

// Re-export all types for easy importing
export * from './database';
export * from './api';
export * from './validation';

export interface AiNews {
  id: number;
  day: number;
  month: number;
  year: number;
  title: string;
  summary: string;
  source?: string;
  display_date: string; // YYYY-MM-DD format
  position: 1 | 2 | 3; // Position of the news item (1st, 2nd, or 3rd story)
  created_at?: string; // ISO timestamp
  updated_at?: string; // ISO timestamp
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

export type NewsApiResponse = ApiResponse<AiNews[]>;

// Database operation types
export interface CreateNewsItem {
  day: number;
  month: number;
  year: number;
  title: string;
  summary: string;
  source?: string;
  display_date: string;
  position: 1 | 2 | 3;
}

export interface UpdateNewsItem extends Partial<CreateNewsItem> {
  id: number;
}

// Component prop types
export interface NewsDisplayProps {
  news: AiNews[];
  loading?: boolean;
  error?: string;
}

export interface TerminalProps {
  children: React.ReactNode;
  className?: string;
}

export interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export interface DateNavigationProps {
  currentDate: string;
  onDateChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
}

export interface ShareButtonProps {
  date: string;
  newsItems: AiNews[];
  className?: string;
}

// Utility types
export type DateString = string; // YYYY-MM-DD format
export type ISOTimestamp = string; // ISO 8601 timestamp

// Error types
export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Social media sharing types
export interface ShareData {
  text: string;
  url: string;
  hashtags: string[];
}

// Terminal animation types
export interface TypewriterEffect {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export interface TerminalCursor {
  visible: boolean;
  blinkSpeed?: number;
}

// Content generation types
export interface GeneratedNewsStory {
  title: string;
  summary: string;
  source?: string;
}

export interface ContentGenerationRequest {
  date: string;
  count: number;
  topics?: string[];
}

export interface ContentGenerationResponse {
  stories: GeneratedNewsStory[];
  metadata: {
    generatedAt: string;
    model: string;
    tokensUsed?: number;
  };
}

// Navigation types
export interface DateNavigation {
  currentDate: string;
  canGoBack: boolean;
  canGoForward: boolean;
  minDate?: string;
  maxDate?: string;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'terminal';

export interface ThemeConfig {
  mode: ThemeMode;
  colors: {
    background: string;
    foreground: string;
    accent: string;
    muted: string;
  };
}

// Performance monitoring types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  apiResponseTime: number;
  errorCount: number;
}

// SEO and metadata types
export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}