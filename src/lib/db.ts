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
    chatMessageLists!: Table<ChatMessageList>;
    chatParticipantLists!: Table<ChatParticipantList>;
    chatNotificationLists!: Table<ChatNotificationList>;
    chatJoinRequestLists!: Table<ChatJoinRequestList>;
    chats!: Table<Chat>;

    constructor() {
        super('AppDatabase');
        this.version(1).stores({
            users: '++id, userId, userName, emailAddress, phoneNumber, avatarUrl',
            friendGroups: '++id, groupName, friends',
            friendRequests: '++id, requestId, createdAt, fromUserId, toUserId, status',
        });

        this.users = this.table('users');
        this.friendGroups = this.table('friendGroups');
        this.friendRequests = this.table('friendRequests');
    }
}

export const db = new AppDatabase();