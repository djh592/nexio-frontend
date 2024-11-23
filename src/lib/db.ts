import Dexie , { Table }from 'dexie';
import {FriendGroups, FriendRequest} from '@/lib/definitions';


export class AppDatabase extends Dexie {
    friendGroups!: Table<FriendGroups>;
    sentRequests!: Table<FriendRequest>;
    receivedRequests!: Table<FriendRequest>;

    constructor() {
        super('AppDatabase');
        this.version(1).stores({
            friendGroups: '++id, groupName, friends',
            sentRequests: '++id, requestId, createdAt, fromUserId, toUserId, status',
            receivedRequests: '++id, requestId, createdAt, fromUserId, toUserId, status',
        });

        this.friendGroups = this.table('friendGroups');
        this.sentRequests = this.table('sentRequests');
        this.receivedRequests = this.table('receivedRequests');
    }
}

export const db = new AppDatabase();