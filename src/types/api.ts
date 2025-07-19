// API-specific types and interfaces

import { AiNews } from './index';

// API endpoint types
export interface GetNewsParams {
  date?: string; // YYYY-MM-DD format
  position?: 1 | 2 | 3;
}

export interface CreateNewsParams {
  day: number;
  month: number;
  year: number;
  title: string;
  summary: string;
  source?: string;
  display_date: string;
  position: 1 | 2 | 3;
}

// API response formats
export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  statusCode?: number;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Specific API responses
export type GetNewsResponse = ApiResponse<AiNews[]>;
export type CreateNewsResponse = ApiResponse<AiNews>;
export type UpdateNewsResponse = ApiResponse<AiNews>;
export type DeleteNewsResponse = ApiResponse<{ id: string }>;

// HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Request configuration
export interface RequestConfig {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number>;
}

// API client types
export interface ApiClient {
  get<T>(endpoint: string, params?: Record<string, unknown>): Promise<ApiResponse<T>>;
  post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>>;
  put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string): Promise<ApiResponse<T>>;
}

// Validation types
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}