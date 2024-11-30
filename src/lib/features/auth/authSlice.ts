import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/definitions";

interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            localStorage.setItem("token", action.payload);
            state.isAuthenticated = true;
        },
        setUser: (state, action: PayloadAction<User>) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        resetAuth: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { setToken, setUser, resetAuth } = authSlice.actions;
export default authSlice.reducer;
