import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
    replyMessageId?: string;
    isForwarding: boolean;
}

const initialState: ChatState = {
    replyMessageId: undefined,
    isForwarding: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setReplyMessageId: (state, action) => {
            state.replyMessageId = action.payload;
        },
        resetReplyMessageId: (state) => {
            state.replyMessageId = undefined;
        },
        setIsForwarding: (state, action) => {
            state.isForwarding = action.payload;
        },
        resetIsForwarding: (state) => {
            state.isForwarding = false;
        }
    },
});

export const {
    setReplyMessageId,
    resetReplyMessageId,
    setIsForwarding,
    resetIsForwarding,
} = chatSlice.actions;

export default chatSlice.reducer;