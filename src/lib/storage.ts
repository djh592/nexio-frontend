// src/lib/storage.ts
import { db } from './db';
import { FriendGroups, FriendRequest } from '@/lib/definitions';

// Friend Groups
export const setFriendGroups = async (friendGroups: FriendGroups) => {
    await db.friendGroups.clear();
    await db.friendGroups.add(friendGroups);
};

export const getFriendGroups = async (): Promise<FriendGroups | undefined> => {
    return await db.friendGroups.toCollection().first();
};

export const addFriendGroup = async (friendGroup: FriendGroups) => {
    await db.friendGroups.add(friendGroup);
};

export const removeFriendGroup = async (friendGroupId: number) => {
    await db.friendGroups.delete(friendGroupId);
};

export const updateFriendGroup = async (friendGroupId: number, friendGroup: FriendGroups) => {
    await db.friendGroups.update(friendGroupId, friendGroup);
};

// Sent Requests
export const setSentRequests = async (sentRequests: FriendRequest[]) => {
    await db.sentRequests.clear();
    await db.sentRequests.bulkAdd(sentRequests);
};

export const getSentRequests = async (): Promise<FriendRequest[]> => {
    return await db.sentRequests.toArray();
};

// Received Requests
export const setReceivedRequests = async (receivedRequests: FriendRequest[]) => {
    await db.receivedRequests.clear();
    await db.receivedRequests.bulkAdd(receivedRequests);
};

export const getReceivedRequests = async (): Promise<FriendRequest[]> => {
    return await db.receivedRequests.toArray();
};