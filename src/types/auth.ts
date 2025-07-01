export interface User {
  id: string
  email: string
  username: string
  firstName?: string
  lastName?: string
  bio?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  username: string
  password: string
  firstName?: string
  lastName?: string
  bio?: string
  avatar?: string
}

export interface RefreshTokenDto {
  refreshToken: string
}

export interface ChangePasswordDto {
  currentPassword: string
  newPassword: string
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
} 