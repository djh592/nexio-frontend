export type User = {
    userId: string;
    userName: string;
    emailAddress: string;
    phoneNumber: string;
    avatarUrl: string;
};

export const INITIAL_USER: User = {
    userId: "",
    userName: "",
    emailAddress: "",
    phoneNumber: "",
    avatarUrl: "",
};

export type Friends = User[];

export type FriendGroup = {
    groupName: string;
    friends: Friends;
};

export type FriendGroups = FriendGroup[];

export const DEFAULT_FRIEND_GROUP_NAME = "My Friends";

export const INITIAL_FRIEND_GROUPS: FriendGroups = [
    {
        groupName: DEFAULT_FRIEND_GROUP_NAME,
        friends: [],
    },
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
}

export enum MessageType {
    Text = 'Text',
    Image = 'Image',
    Video = 'Video',
    Audio = 'Audio',
    File = 'File',
    Forwarded = 'Forwarded'
}

export type Message = {
    messageId: string;
    createdAt: string;
    fromUserId: string;
    type: MessageType;
    content: string;
    replyMessageId?: string;
    repliedMessageId?: string;
}

export type Messages = Message[];

export type Chat = {
    chatId: string;
    chatName: string;
    chatAvatarUrl: string;
    createdAt: string;
    participants: User[];
    messages: Messages;
    unreadCount: number;
    isMuted: boolean;
    isPinned: boolean;
};
