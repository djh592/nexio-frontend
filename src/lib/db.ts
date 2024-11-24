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
    sentRequests!: Table<FriendRequest>;
    receivedRequests!: Table<FriendRequest>;
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
            sentRequests: '++id, requestId, createdAt, fromUserId, toUserId, status',
            receivedRequests: '++id, requestId, createdAt, fromUserId, toUserId, status',
        });

        this.users = this.table('users');
        this.friendGroups = this.table('friendGroups');
        this.sentRequests = this.table('sentRequests');
        this.receivedRequests = this.table('receivedRequests');
    }
}

export const db = new AppDatabase();