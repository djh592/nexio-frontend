import Dexie, { Table } from 'dexie';
import {
    User, FriendGroup, FriendRequest,
    ChatMessageList, ChatParticipantList,
    ChatNotificationList, ChatJoinRequestList,
    Chat
} from '@/lib/definitions';


export class AppDatabase extends Dexie {
    // All Users
    users!: Table<User>;
    // Friend
    friendGroups!: Table<FriendGroup>;
    friendRequests!: Table<FriendRequest>;
    // Chat
    chats!: Table<Chat>;
    chatMessageLists!: Table<ChatMessageList>;
    chatParticipantLists!: Table<ChatParticipantList>;
    chatNotificationLists!: Table<ChatNotificationList>;
    chatJoinRequestLists!: Table<ChatJoinRequestList>;

    constructor() {
        super('AppDatabase');
        this.version(1).stores({
            users: '++id, &userId, userName, emailAddress, phoneNumber, avatarUrl',
            friendGroups: '++id, &groupId, groupName, friends',
            friendRequests: '++id, &requestId, createdAt, fromUserId, toUserId, status',
            chats: '++id, &chatId, createdAt, chatType, chatName, chatAvatarUrl, chatSettings, messageListId, participantListId,notificationListId, joinRequestListId',
            chatMessageLists: '++id, &messageListId, messages',
            chatParticipantLists: '++id, &participantListId, participants',
            chatNotificationLists: '++id, &notificationListId, notifications',
            chatJoinRequestLists: '++id, &joinRequestListId, joinRequests'
        });

        this.users = this.table('users');
        this.friendGroups = this.table('friendGroups');
        this.friendRequests = this.table('friendRequests');
        this.chats = this.table('chats');
        this.chatMessageLists = this.table('chatMessageLists');
        this.chatParticipantLists = this.table('chatParticipantLists');
        this.chatNotificationLists = this.table('chatNotificationLists');
        this.chatJoinRequestLists = this.table('chatJoinRequestLists');
    }
}

export const db = new AppDatabase();