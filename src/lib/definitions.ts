export type User = {
    userId: string;
    userName: string;
    emailAddress: string;
    phoneNumber: string;
    avatarUrl: string;
};

export type Friends = User[];

export type FriendGroup = {
    groupName: string;
    friends: Friends;
};

export type FriendGroups = FriendGroup[];

export const DEFAULT_FRIEND_GROUP_NAME = "My Friends";

export const initialFriendGroups: FriendGroups = [
    {
        groupName: DEFAULT_FRIEND_GROUP_NAME,
        friends: []
    }
];

export enum FriendRequestStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Canceled = 'Canceled',
    Failed = 'Failed'
}

export type FriendRequest = {
    requestId: string;
    createdAt: string;
    fromUserId: string;
    toUserId: string;
    status: FriendRequestStatus;
};