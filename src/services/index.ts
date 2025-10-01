// Centralized exports for all API services
export { apiService, ApiService } from './apiService';
export { authApi, AuthApi } from './authApi';
export { lapCalculationApi, LapCalculationApi } from './lapCalculationApi';

// Export types
export type { ApiResponse } from './apiService';
export type { 
  User, 
  LoginRequest, 
  SignupRequest, 
  SignupData, 
  LoginResponse, 
  SignupResponse 
} from './authApi';
export type { 
  WaterfallStep, 
  WaterfallMetrics, 
  DocumentProcessingResult, 
  UploadResponse, 
  ValidationResult 
} from './lapCalculationApi';