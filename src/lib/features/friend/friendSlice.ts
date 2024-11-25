import { createSlice } from '@reduxjs/toolkit';
interface FriendsState {
    newRequestCount: number;
}

const initialState: FriendsState = {
    newRequestCount: 0,
};

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        incrementNewRequestCount: (state) => {
            state.newRequestCount += 1;
        },
        decrementNewRequestCount: (state) => {
            state.newRequestCount -= 1;
        },
        resetNewRequestCount: (state) => {
            state.newRequestCount = 0;
        },
    },
});

export const {
    incrementNewRequestCount,
    decrementNewRequestCount,
    resetNewRequestCount,
} = friendSlice.actions;

export default friendSlice.reducer;


