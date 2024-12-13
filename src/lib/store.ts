import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/lib/features/auth/authSlice';
import FriendReducer from '@/lib/features/friend/friendSlice';
import chatReducer from '@/lib/features/chat/chatSlice';
import socketMiddleware from '@/lib/middleware/socketMiddleware';

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            friend: FriendReducer,
            chat: chatReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(socketMiddleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']