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
export type ResponseFriendGroup = {
    id?: number;
    groupId: string;
    groupName: string;
    friends: Users;
};

export type ResponseFriendGroups = ResponseFriendGroup[];

export type FriendGroup = {
    id?: number;
    groupId: string;
    groupName: string;
    friends: string[]; // userIds
};

export type FriendGroups = FriendGroup[];

export const DEFAULT_FRIEND_GROUP_NAME = "My Friends";

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


// ChatMessage
export enum ChatMessageContentType {
    Text = 'Text',
    Image = 'Image',
    Video = 'Video',
    Audio = 'Audio',
    File = 'File',
    Forwarded = 'Forwarded'
}

export type ChatMessageContent = {
    contentType: ChatMessageContentType;
    contentPayload: string;
}

export type ChatMessageMeta = {
    withdrawn: boolean;
    deleted: boolean;
    readBy: string[]; // userIds
    repliedBy: string[]; // messageIds
    replyMessageId?: string;
}

export const DEFAULT_CHAT_MESSAGE_META: ChatMessageMeta = {
    withdrawn: false,
    deleted: false,
    readBy: [],
    repliedBy: [],
};

export type ChatMessage = {
    messageId: string;
    createdAt: string;
    fromUserId: string;
    content: ChatMessageContent;
    meta: ChatMessageMeta;
}

export type ChatMessages = ChatMessage[];

export type ChatMessageList = {
    id?: number;
    messageListId: string;
    messages: ChatMessages;
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
    participantListId: string;
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
    notificationListId: string;
    notifications: ChatNotifications;
};


// ChatJoinRequest
export enum ChatJoinRequestStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Canceled = 'Canceled',
    Failed = 'Failed'
}

export type ChatJoinRequest = {
    requestId: string;
    createdAt: string;
    fromUserId: string;
    toChatId: string;
    status: ChatJoinRequestStatus;
};

export type ChatJoinRequests = ChatJoinRequest[];

export type ChatJoinRequestList = {
    id?: number;
    joinRequestListId: string;
    joinRequests: ChatJoinRequests;
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
    chatSettings: ChatSettings;

    messageListId: string;
    participantListId: string;
    notificationListId: string;
    joinRequestListId: string;
};
