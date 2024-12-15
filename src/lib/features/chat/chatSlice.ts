import { createSlice } from '@reduxjs/toolkit';
import { ChatMessage } from '@/lib/definitions';

interface ChatState {
    replyMessageId?: string;
    isForwarding: boolean;
    forwardingMessages: ChatMessage[];
}

const initialState: ChatState = {
    replyMessageId: undefined,
    isForwarding: false,
    forwardingMessages: [],
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
            state.forwardingMessages = [];
        },
        resetIsForwarding: (state) => {
            state.isForwarding = false;
            state.forwardingMessages = [];
        },
        addForwardingMessage: (state, action) => {
            if (state.isForwarding) {
                state.forwardingMessages.push(action.payload);
            }
        },
        removeForwardingMessage: (state, action) => {
            if (state.isForwarding) {
                const newForwardingMessageIds = state.forwardingMessages.filter(message => message.messageId !== action.payload.messageId);
                state.forwardingMessages = newForwardingMessageIds;
            }
        },
    }
});

export const {
    setReplyMessageId,
    resetReplyMessageId,
    setIsForwarding,
    resetIsForwarding,
    addForwardingMessage,
    removeForwardingMessage,
} = chatSlice.actions;

export default chatSlice.reducer;