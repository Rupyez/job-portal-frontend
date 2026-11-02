import api from "./api";

export interface HealthResponse {
  status: string;
}

export const checkBackendHealth = async (): Promise<HealthResponse> => {
  const response = await api.get<HealthResponse>("/health");
  return response.data;
};