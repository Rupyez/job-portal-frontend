import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface AuthUser{
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;

}

interface AuthState{
    user: AuthUser | null;
    isAuthenticated:boolean;
}
const initialState: AuthState ={
    user:null,
    isAuthenticated:false,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state, action:PayloadAction<AuthUser>) =>{
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        logout:(state) =>{
            state.user = null;
            state.isAuthenticated = false;
        }
    }
})

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;