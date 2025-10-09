// Essential type definitions for API responses

// Base API response structure
export interface BaseApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User types
export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  token?: string;
}

// Document types
export interface DocumentProcessingResult {
  id: string;
  filename: string;
  processedData: any;
  status: 'processing' | 'completed' | 'failed';
}

// Form validation
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Loading state
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}