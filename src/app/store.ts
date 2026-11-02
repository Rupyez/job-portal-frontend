
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Persist the refresh token for this browser tab.
store.subscribe(() => {
  const refreshToken = store.getState().auth.refreshToken;

  if (refreshToken) {
    sessionStorage.setItem("refreshToken", refreshToken);
  } else {
    sessionStorage.removeItem("refreshToken");
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
