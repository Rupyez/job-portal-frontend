export interface LoginRequest {
  email: string;
  password: string;
}



export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}


export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
  userStatus?: string;
  role?: string;
  enabled?: boolean;
}

export interface AuthResponse {
  jwt: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  title: string;
  message: string;
  user: AuthUser;
}


export interface ApiErrorResponse {
  message?: string;
  error?: string;
}