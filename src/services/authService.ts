import type { AuthResponse, LoginRequest, RegisterRequest } from "../features/auth/types/auth.types";
import api from "./api";





// Register a new user
export const registerUser = async(request:RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/signup", request)
    return response.data;
}


export const loginUser = async (
  request: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    request
  );

  return response.data;
};


export const refreshAuthToken = async (
  refreshToken: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/refresh",
    { refreshToken }
  );

  return response.data;
};


export const logoutUser = async (
  refreshToken: string
): Promise<void> => {
  await api.post<void>(
    "/auth/logout",
    { refreshToken }
  );
};



export const exchangeOAuth2Code = async (
  code: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/oauth2/exchange",
    { code }
  );

  return response.data;
};
