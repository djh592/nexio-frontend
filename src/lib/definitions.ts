// Definition of types and constants used in the application


// User
export type User = {
    id?: number;
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

export type Users = User[];


// FriendGroup
export type FriendGroup = {
    id?: number;
    groupName: string;
    friends: Users;
};

export type FriendGroups = FriendGroup[];

export const DEFAULT_FRIEND_GROUP_NAME = "My Friends";

export const INITIAL_FRIEND_GROUPS: FriendGroups = [
    {
        groupName: DEFAULT_FRIEND_GROUP_NAME,
        friends: [],
    },
];


// FriendRequest
export enum FriendRequestStatus {
    // Only for sent requests
    Pending = 'Pending',
    Canceled = 'Canceled',
    // Only for received requests
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    // Error status
    Failed = 'Failed'
}

export type FriendRequest = {
    id?: number;
    requestId: string;
    createdAt: string;
    fromUserId: string;
    toUserId: string;
    status: FriendRequestStatus;
}

export type FriendRequests = FriendRequest[];


// Message
export enum MessageContentType {
    Text = 'Text',
    Image = 'Image',
    Video = 'Video',
    Audio = 'Audio',
    File = 'File',
    Forwarded = 'Forwarded'
}

export type MessageContent = {
    contentType: MessageContentType;
    contentPayload: string;
}

export type Message = {
    messageId: string;
    createdAt: string;
    fromUserId: string;
    content: MessageContent;

    readBy: string[]; // userIds
    withdrawn: boolean;
    deleted: boolean;

    replyMessageId?: string;
    repliedMessageId?: string;
}

export type Messages = Message[];

export type MessageList = {
    id?: number;
    messageListId: string;
    messages: Messages;
};


// ChatParticipant
export enum ChatParticipantType {
    Owner = 'Owner',
    Admin = 'Admin',
    Member = 'Member'
};

export type ChatParticipant = {
    userId: string;
    type: ChatParticipantType;
};

export type ChatParticipants = ChatParticipant[];

export type ChatParticipantList = {
    id?: number;
    chatParticipantListId: string;
    participants: ChatParticipants;
};


// ChatNotification
export type ChatNotification = {
    fromUserId: string;
    createdAt: string;
    notification: string;
};

export type ChatNotifications = ChatNotification[];

export type ChatNotificationList = {
    id?: number;
    chatNotificationListId: string;
    notifications: ChatNotifications;
};


// JoinChatRequest
export enum JoinChatRequestStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Canceled = 'Canceled',
    Failed = 'Failed'
}

export type JoinChatRequest = {
    requestId: string;
    createdAt: string;
    fromUserId: string;
    toChatId: string;
    status: JoinChatRequestStatus;
};

export type JoinChatRequests = JoinChatRequest[];

export type JoinChatRequestList = {
    id?: number;
    joinChatRequestListId: string;
    requests: JoinChatRequests;
};


// Chat
export enum ChatType {
    Private = 'Private',
    Group = 'Group'
}

export type ChatSettings = {
    isMuted: boolean;
    isPinned: boolean;
};

export const DEFAULT_CHAT_SETTINGS: ChatSettings = {
    isMuted: false,
    isPinned: false,
};

export type Chat = {
    id?: number;
    chatId: string;
    createdAt: string;
    chatType: ChatType;
    chatName: string;
    chatAvatarUrl: string;

    messageListId: string;
    participantListId: string;
    notificationListId: string;
    joinRequestListId: string;

    unreadCount: number;
    settings: ChatSettings;
};
