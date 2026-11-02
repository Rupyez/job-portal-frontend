import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type{ AuthResponse, AuthUser } from "./types/auth.types";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: string | null;
  refreshTokenExpiresAt: string | null;
  isAuthenticated: boolean;
}

interface AuthState{
    user: AuthUser | null;
    isAuthenticated:boolean;
}


const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  accessTokenExpiresAt: null,
  refreshTokenExpiresAt: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state, action:PayloadAction<AuthResponse>) =>{
            const response = action.payload;
            state.user = response.user;
            state.accessToken = response.jwt;
            state.refreshToken = response.refreshToken;
            state.accessTokenExpiresAt = response.accessTokenExpiresAt;
            state.refreshTokenExpiresAt = response.refreshTokenExpiresAt;
            state.isAuthenticated = true;

        },
        setUser:(state, action:PayloadAction<AuthUser>) =>{
            state.user = action.payload;
            state.isAuthenticated = true;
        },

           logout: () => initialState,
    }
})

export const {setCredentials, setUser, logout} = authSlice.actions;
export default authSlice.reducer;