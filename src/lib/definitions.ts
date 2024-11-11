export type User = {
    userId: string;
    userName: string;
    phoneNumber: string;
    emailAddress: string;
    avatarUrl: string;
};

export type Friends = User[];

export type FriendRequest = {
    requestId: string;
    createdAt: string;
    fromUserId: string;
    toUserId: string;
    status: 'pending' | 'accepted' | 'rejected';
};