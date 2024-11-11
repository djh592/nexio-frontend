export type User = {
    userId: string;
    userName: string;
    phoneNumber: string;
    emailAddress: string;
    avatarUrl: string;
};

export type Friends = User[];

export type FriendGroup = {
    groupName: string;
    friends: Friends;
};

export type FriendGroups = FriendGroup[];

export const DEFAULT_GROUP_NAME = "My Friends";

export const initialFriendGroups: FriendGroups = [
    {
        groupName: DEFAULT_GROUP_NAME,
        friends: []
    }
];

export type FriendRequest = {
    requestId: string;
    createdAt: string;
    fromUserId: string;
    toUserId: string;
    status: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'failed';
};