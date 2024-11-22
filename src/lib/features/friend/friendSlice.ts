import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, FriendGroups, FriendRequest, FriendRequestStatus } from '@/lib/definitions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { INITIAL_FRIEND_GROUPS } from '@/lib/definitions';

interface FriendsState {
    friendGroups: FriendGroups;
    sentRequests: FriendRequest[];
    receivedRequests: FriendRequest[];
    newRequestCount: number;
}

const placeholderFriendGroups: FriendGroups = [
    {
        groupName: 'My Friends',
        friends: [
            {
                userId: '1',
                userName: 'Alice',
                emailAddress: 'alice@123.com',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
            {
                userId: '2',
                userName: 'Bob',
                emailAddress: '',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
            {
                userId: '3',
                userName: 'Charlie',
                emailAddress: '',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
        ],
    },
    {
        groupName: 'Family',
        friends: [
            {
                userId: '4',
                userName: 'David',
                emailAddress: '',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
            {
                userId: '5',
                userName: 'Eve',
                emailAddress: '',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
        ],
    },
    {
        groupName: 'Work',
        friends: [
            {
                userId: '6',
                userName: 'Frank',
                emailAddress: '',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
        ],
    },
];

const placeholderSentRequests: FriendRequest[] = [
    {
        requestId: '1',
        createdAt: '2021-08-01T12:00:00Z',
        fromUserId: '7',
        toUserId: '1',
        status: 'Pending' as FriendRequestStatus,
    },
    {
        requestId: '2',
        createdAt: '2021-08-01T12:00:00Z',
        fromUserId: '8',
        toUserId: '1',
        status: 'Pending' as FriendRequestStatus,
    },
];

const placeholderReceivedRequests: FriendRequest[] = [
    {
        requestId: '3',
        createdAt: '2021-08-01T12:00:00Z',
        fromUserId: '1',
        toUserId: '9',
        status: 'Pending' as FriendRequestStatus,
    },
    {
        requestId: '4',
        createdAt: '2021-08-01T12:00:00Z',
        fromUserId: '1',
        toUserId: '10',
        status: 'Pending' as FriendRequestStatus,
    },
];


const initialState: FriendsState = {
    friendGroups: placeholderFriendGroups,
    sentRequests: placeholderSentRequests,
    receivedRequests: placeholderReceivedRequests,
    newRequestCount: 0,
};

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        setFriendGroups: (state, action: PayloadAction<FriendGroups>) => {
            state.friendGroups = action.payload;
        },
        addFriend: (state, action: PayloadAction<User>) => {
            state.friendGroups[0].friends.push(action.payload);
        },
        removeFriend: (state, action: PayloadAction<User>) => {
            state.friendGroups.forEach((group) => {
                group.friends = group.friends.filter((friend) => friend.userId !== action.payload.userId);
            });
        },
        updateFriendProfile: (state, action: PayloadAction<User>) => {
            const updatedUser = action.payload;
            state.friendGroups = state.friendGroups.map((group) => {
                group.friends = group.friends.map((friend) => {
                    if (friend.userId === updatedUser.userId) {
                        return updatedUser;
                    }
                    return friend;
                });
                return group;
            });
        },
        // note: use try/catch block to handle errors
        addFriendGroup: (state, action: PayloadAction<string>) => {
            const newGroupName = action.payload;
            if (state.friendGroups.some(group => group.groupName === newGroupName)) {
                throw new Error(`Group ${newGroupName} already exists.`);
            }
            state.friendGroups.push({ groupName: newGroupName, friends: [] });
        },
        // note: use try/catch block to handle errors
        removeFriendGroup: (state, action: PayloadAction<string>) => {
            const groupName = action.payload;
            const group = state.friendGroups.find(group => group.groupName === groupName);
            if (group) {
                state.friendGroups[0].friends = [...state.friendGroups[0].friends, ...group.friends];
                state.friendGroups = state.friendGroups.filter(group => group.groupName !== groupName);
            }
            else {
                throw new Error(`Group ${groupName} does not exist.`);
            }
        },
        // note: use try/catch block to handle errors
        moveFriendToGroup: (state, action: PayloadAction<{ friendId: string; fromGroupName: string; toGroupName: string }>) => {
            const { friendId, fromGroupName, toGroupName } = action.payload;
            const fromGroup = state.friendGroups.find(group => group.groupName === fromGroupName);
            const toGroup = state.friendGroups.find(group => group.groupName === toGroupName);

            if (!fromGroup) {
                throw new Error(`Source group ${fromGroupName} not found.`);
            }
            if (!toGroup) {
                throw new Error(`Target group ${toGroupName} not found.`);
            }

            const friendIndex = fromGroup.friends.findIndex(friend => friend.userId === friendId);
            if (friendIndex === -1) {
                throw new Error(`Friend not found in group ${fromGroupName}.`);
            }

            const friend = fromGroup.friends[friendIndex];
            fromGroup.friends = fromGroup.friends.filter(f => f.userId !== friendId);
            toGroup.friends.push(friend);
        },
        setSentRequests: (state, action: PayloadAction<FriendRequest[]>) => {
            state.sentRequests = action.payload;
        },
        addSentRequest: (state, action: PayloadAction<FriendRequest>) => {
            state.sentRequests.push(action.payload);
        },
        removeSentRequest: (state, action: PayloadAction<string>) => {
            const requestId = action.payload;
            state.sentRequests = state.sentRequests.filter((req) => req.requestId !== requestId);
        },
        setReceivedRequests: (state, action: PayloadAction<FriendRequest[]>) => {
            state.receivedRequests = action.payload;
        },
        addReceivedRequest: (state, action: PayloadAction<FriendRequest>) => {
            state.receivedRequests.push(action.payload);
        },
        removeReceivedRequest: (state, action: PayloadAction<string>) => {
            const requestId = action.payload;
            state.receivedRequests = state.receivedRequests.filter((req) => req.requestId !== requestId);
        },
        // note: use try/catch block to handle errors
        updateRequest: (state, action: PayloadAction<FriendRequest>) => {
            const newRequest = action.payload;
            let found = false;
            state.sentRequests = state.sentRequests.map((req) => {
                if (req.requestId === newRequest.requestId) {
                    found = true;
                    return newRequest;
                }
                return req;
            });
            if (!found) {
                state.receivedRequests = state.receivedRequests.map((req) => {
                    if (req.requestId === newRequest.requestId) {
                        found = true;
                        return newRequest;
                    }
                    return req;
                });
            }
            if (!found) {
                throw new Error(`Request not found: ${newRequest.requestId}`);
            }
        },
    },
});

export const {
    setFriendGroups,
    addFriend,
    removeFriend,
    updateFriendProfile,
    addFriendGroup,
    removeFriendGroup,
    moveFriendToGroup,
    setSentRequests,
    addSentRequest,
    removeSentRequest,
    setReceivedRequests,
    addReceivedRequest,
    removeReceivedRequest,
    updateRequest,
} = friendSlice.actions;

export default friendSlice.reducer;