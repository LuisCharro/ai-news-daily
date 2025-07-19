// Database-specific types and utilities

import { AiNews, CreateNewsItem, UpdateNewsItem } from './index';

// Supabase database schema types
export interface Database {
  public: {
    Tables: {
      ai_news: {
        Row: AiNews;
        Insert: Omit<AiNews, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<AiNews, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}

// Database query filters
export interface NewsQueryFilters {
  display_date?: string;
  day?: number;
  month?: number;
  year?: number;
  position?: 1 | 2 | 3;
  limit?: number;
  offset?: number;
}

// Database operation results
export interface DatabaseResult<T> {
  data: T | null;
  error: Error | null;
  count?: number;
}

// Batch operations
export interface BatchCreateNews {
  items: CreateNewsItem[];
}

export interface BatchUpdateNews {
  items: UpdateNewsItem[];
}

// Database connection types
export interface DatabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
}

// Query builder types
export type SortOrder = 'asc' | 'desc';

export interface QueryOptions {
  orderBy?: {
    column: keyof AiNews;
    order: SortOrder;
  };
  limit?: number;
  offset?: number;
}