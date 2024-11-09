import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Friends, FriendRequest } from '@/lib/definitions';

interface FriendsState {
    friends: Friends;
    sentRequests: FriendRequest[];
    receivedRequests: FriendRequest[];
}

const initialState: FriendsState = {
    friends: [],
    sentRequests: [],
    receivedRequests: [],
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        setFriends: (state, action: PayloadAction<Friends>) => {
            state.friends = action.payload;
        },
        addFriend: (state, action: PayloadAction<User>) => {
            state.friends.push(action.payload);
        },
        removeFriend: (state, action: PayloadAction<User>) => {
            state.friends = state.friends.filter((friend) => friend.userId !== action.payload.userId);
        },
        setSentRequests: (state, action: PayloadAction<FriendRequest[]>) => {
            state.sentRequests = action.payload;
        },
        addSentRequest: (state, action: PayloadAction<FriendRequest>) => {
            state.sentRequests.push(action.payload);
        },
        setReceivedRequests: (state, action: PayloadAction<FriendRequest[]>) => {
            state.receivedRequests = action.payload;
        },
        addReceivedRequest: (state, action: PayloadAction<FriendRequest>) => {
            state.receivedRequests.push(action.payload);
        },
        updateRequestStatus: (state, action: PayloadAction<{ id: string; status: 'accepted' | 'rejected' }>) => {
            const { id, status } = action.payload;
            const request = state.receivedRequests.find(req => req.requestId === id);
            if (request) {
                request.status = status;
            }
        },
    },
});

export const {
    setFriends,
    addFriend,
    removeFriend,
    setSentRequests,
    addSentRequest,
    setReceivedRequests,
    addReceivedRequest,
    updateRequestStatus,
} = friendsSlice.actions;

export default friendsSlice.reducer;