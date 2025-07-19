import { AiNews, CreateNewsItem } from './index';

// Validation schemas
export interface ValidationRule<T> {
  field: keyof T;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean | string;
}

export interface ValidationSchema<T> {
  rules: ValidationRule<T>[];
}

// Validation results
export interface FieldError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FieldError[];
}

// Specific validation schemas
export const AiNewsValidationSchema: ValidationSchema<AiNews> = {
  rules: [
    { field: 'title', required: true, minLength: 10, maxLength: 200 },
    { field: 'summary', required: true, minLength: 50, maxLength: 1000 },
    { field: 'display_date', required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ },
    { field: 'position', required: true, custom: (value) => typeof value === 'number' && [1, 2, 3].includes(value) },
    { field: 'day', required: true, custom: (value) => typeof value === 'number' && value >= 1 && value <= 31 },
    { field: 'month', required: true, custom: (value) => typeof value === 'number' && value >= 1 && value <= 12 },
    { field: 'year', required: true, custom: (value) => typeof value === 'number' && value >= 2020 && value <= 2030 },
  ],
};

export const CreateNewsValidationSchema: ValidationSchema<CreateNewsItem> = {
  rules: [
    { field: 'title', required: true, minLength: 10, maxLength: 200 },
    { field: 'summary', required: true, minLength: 50, maxLength: 1000 },
    { field: 'display_date', required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ },
    { field: 'position', required: true, custom: (value) => typeof value === 'number' && [1, 2, 3].includes(value) },
    { field: 'day', required: true, custom: (value) => typeof value === 'number' && value >= 1 && value <= 31 },
    { field: 'month', required: true, custom: (value) => typeof value === 'number' && value >= 1 && value <= 12 },
    { field: 'year', required: true, custom: (value) => typeof value === 'number' && value >= 2020 && value <= 2030 },
  ],
};

// Validation error codes
export enum ValidationErrorCode {
  REQUIRED = 'REQUIRED',
  MIN_LENGTH = 'MIN_LENGTH',
  MAX_LENGTH = 'MAX_LENGTH',
  INVALID_FORMAT = 'INVALID_FORMAT',
  INVALID_VALUE = 'INVALID_VALUE',
  DUPLICATE_POSITION = 'DUPLICATE_POSITION',
  INVALID_DATE = 'INVALID_DATE',
}

// Type guards
export function isAiNews(obj: unknown): obj is AiNews {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'summary' in obj &&
    'display_date' in obj &&
    'position' in obj &&
    'day' in obj &&
    'month' in obj &&
    'year' in obj &&
    typeof (obj as Record<string, unknown>).id === 'number' &&
    typeof (obj as Record<string, unknown>).title === 'string' &&
    typeof (obj as Record<string, unknown>).summary === 'string' &&
    typeof (obj as Record<string, unknown>).display_date === 'string' &&
    typeof (obj as Record<string, unknown>).position === 'number' &&
    typeof (obj as Record<string, unknown>).day === 'number' &&
    typeof (obj as Record<string, unknown>).month === 'number' &&
    typeof (obj as Record<string, unknown>).year === 'number' &&
    [1, 2, 3].includes((obj as Record<string, unknown>).position as number)
  );
}

export function isCreateNewsItem(obj: unknown): obj is CreateNewsItem {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'title' in obj &&
    'summary' in obj &&
    'display_date' in obj &&
    'position' in obj &&
    'day' in obj &&
    'month' in obj &&
    'year' in obj &&
    typeof (obj as Record<string, unknown>).title === 'string' &&
    typeof (obj as Record<string, unknown>).summary === 'string' &&
    typeof (obj as Record<string, unknown>).display_date === 'string' &&
    typeof (obj as Record<string, unknown>).position === 'number' &&
    typeof (obj as Record<string, unknown>).day === 'number' &&
    typeof (obj as Record<string, unknown>).month === 'number' &&
    typeof (obj as Record<string, unknown>).year === 'number' &&
    [1, 2, 3].includes((obj as Record<string, unknown>).position as number)
  );
}

// Date validation utilities
export function isValidDateString(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString + 'T00:00:00.000Z');
  return date.toISOString().startsWith(dateString);
}

export function isValidDateComponents(day: number, month: number, year: number): boolean {
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 2020 || year > 2030) return false;
  
  // Check if the date is valid
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && 
         date.getMonth() === month - 1 && 
         date.getDate() === day;
}