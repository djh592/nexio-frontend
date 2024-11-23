import Dexie, { Table } from 'dexie';
import { User, FriendGroup, FriendRequest } from '@/lib/definitions';


export class AppDatabase extends Dexie {
    users!: Table<User>;
    friendGroups!: Table<FriendGroup>;
    sentRequests!: Table<FriendRequest>;
    receivedRequests!: Table<FriendRequest>;

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