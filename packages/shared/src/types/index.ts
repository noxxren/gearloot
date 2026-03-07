// Shared TypeScript types across frontend and backend

/**
 * Example types
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

/**
 * User roles in the application
 */
export type UserRole = 'user' | 'admin'

/**
 * User object (decrypted, for API responses)
 */
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export type PublicUser = Omit<User, 'createdAt' | 'updatedAt'>

/**
 * OAuth providers
 */
export type OAuthProvider = 'google' | 'github'

/**
 * OAuth token information
 */
export interface OAuthToken {
  provider: OAuthProvider
  accessToken: string
  refreshToken?: string
  expiresAt?: string
}

/**
 * API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}

/**
 * Authentication responses
 */
export interface LoginResponse {
  user: User
  token: string
}

export interface RegisterRequest {
  email: string
  password: string
  name?: string
}

export interface LoginRequest {
  email: string
  password: string
}

/**
 * Pagination
 */
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
