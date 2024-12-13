import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        resetAuth: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { setToken, resetAuth } = authSlice.actions;
export default authSlice.reducer;
