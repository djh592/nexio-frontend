import { createSlice } from '@reduxjs/toolkit';

interface ChatState {
    replyMessageId?: string;
}

const initialState: ChatState = {
    replyMessageId: undefined,
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
    },
});

export const {
    setReplyMessageId,
    resetReplyMessageId,
} = chatSlice.actions;

export default chatSlice.reducer;