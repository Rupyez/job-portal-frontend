
import axios, {
  type InternalAxiosRequestConfig,
} from "axios";

import { store } from "../app/store";
import {
  logout,
  setCredentials,
} from "../features/auth/authSlice";
import type { AuthResponse } from "../features/auth/types/auth.types";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  withCredentials: true,
});

// Attach the current access token to outgoing requests.
api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh the access token when an API request returns 401.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Avoid retrying the same request more than once.
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = store.getState().auth.refreshToken;

    if (!refreshToken) {
      store.dispatch(logout());
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Use axios directly to avoid triggering this interceptor again.
      const response = await axios.post<AuthResponse>(
        `${baseURL}/auth/refresh`,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 15000,
          withCredentials: true,
        }
      );

      // Save the new access and refresh tokens.
      store.dispatch(setCredentials(response.data));

      // Retry the original request with the new access token.
      originalRequest.headers.Authorization =
        `Bearer ${response.data.jwt}`;

      return api(originalRequest);
    } catch (refreshError) {
      // Refresh failed. Clear the expired session.
      store.dispatch(logout());

      return Promise.reject(refreshError);
    }
  }
);

export default api;
