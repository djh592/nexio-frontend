import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/definitions";

interface AuthState {
    token: string;
    user: User;
}

const initialState: AuthState = {
    token: "",
    user: {
        id: "",
        name: "",
        password: "",
        email: "",
        phone: "",
        avatar: "",
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
        setUserName: (state, action: PayloadAction<string>) => {
            state.user.name = action.payload;
        },
        setUserPassword: (state, action: PayloadAction<string>) => {
            state.user.password = action.payload;
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.user.email = action.payload;
        },
        setUserPhone: (state, action: PayloadAction<string>) => {
            state.user.phone = action.payload;
        },
        setUserAvatar: (state, action: PayloadAction<string>) => {
            state.user.avatar = action.payload;
        },
        resetAuth: (state) => {
            state.token = "";
            state.user = {
                id: "",
                name: "",
                password: "",
                email: "",
                phone: "",
                avatar: "",
            };
        },
    },
});

export const { setToken, setUser, setUserName, setUserPassword, setUserEmail, setUserPhone, setUserAvatar, resetAuth } = authSlice.actions;
export default authSlice.reducer;
