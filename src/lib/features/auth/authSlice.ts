import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/definitions";

interface AuthState {
    token: string;
    user: User;
}

const initialState: AuthState = {
    token: "",
    user: {
        userId: "",
        userName: "",
        phoneNumber: "",
        emailAddress: "",
        avatarUrl: "",
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.user.userId = action.payload;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.user.userName = action.payload;
        },
        setUserPhone: (state, action: PayloadAction<string>) => {
            state.user.phoneNumber = action.payload;
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.user.emailAddress = action.payload;
        },
        setUserAvatar: (state, action: PayloadAction<string>) => {
            state.user.avatarUrl = action.payload;
        },
        resetAuth: (state) => {
            state.token = "";
            state.user = {
                userId: "",
                userName: "",
                phoneNumber: "",
                emailAddress: "",
                avatarUrl: "",
            };
        },
    },
});

export const { setToken, setUser, setUserId, setUserName, setUserPhone, setUserEmail, setUserAvatar, resetAuth } = authSlice.actions;
export default authSlice.reducer;
