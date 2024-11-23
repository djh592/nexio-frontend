import { db } from '@/lib/db';
import { User, FriendGroups, FriendRequest } from '@/lib/definitions';
import { DEFAULT_FRIEND_GROUP_NAME } from '@/lib/definitions';

export const clearDatabase = async (): Promise<void> => {
    await db.users.clear();
    await db.friendGroups.clear();
    await db.sentRequests.clear();
    await db.receivedRequests.clear();
}

// User
export const setUsers = async (users: User[]): Promise<void> => {
    await db.users.bulkPut(users);
}

export const getUsers = async (): Promise<User[]> => {
    return await db.users.toArray();
};

export const searchUsers = async (searchText: string): Promise<User[]> => {
    const users = await db.users.toArray();
    return users.filter(user => user.userName.toLowerCase().includes(searchText.toLowerCase()));
};

export const getUser = async (userId: string): Promise<User | undefined> => {
    return await db.users.where('userId').equals(userId).first();
};

export const addUser = async (user: User): Promise<void> => {
    const userExists = await db.users.where('userId').equals(user.userId).first();
    if (userExists) {
        // if user already exists, throw an error
        // must use updateUser to update an existing user
        throw new Error(`User with userId ${user.userId} already exists.`);
    } else {
        await db.users.add(user);
    }
};

export const updateUser = async (user: User): Promise<void> => {
    const existingUser = await db.users.where('userId').equals(user.userId).first();
    if (existingUser) {
        await db.users.put({ ...user, id: existingUser.id });
    } else {
        // if user does not exist, throw an error
        // must use addUser to add a new user
        throw new Error(`User with userId ${user.userId} does not exist.`);
    }
};

export const deleteUser = async (userId: string): Promise<void> => {
    await db.users.where('userId').equals(userId).delete();
};

// Friend
export const addFriend = async (friend: User): Promise<void> => {
    const group = await db.friendGroups.where('groupName').equals(DEFAULT_FRIEND_GROUP_NAME).first();
    if (!group) {
        throw new Error(`Default group does not exist.`);
    }
    group.friends = [...group.friends, friend];
    await db.friendGroups.put(group);
}

export const removeFriend = async (friendId: string): Promise<void> => {
    const group = await db.friendGroups.where('groupName').equals(DEFAULT_FRIEND_GROUP_NAME).first();
    if (!group) {
        throw new Error(`Default group does not exist.`);
    }
    group.friends = group.friends.filter(friend => friend.userId !== friendId);
    await db.friendGroups.put(group);
}

export const moveFriendToGroup = async (friendId: string, fromGroupName: string, toGroupName: string): Promise<void> => {
    const fromGroup = await db.friendGroups.where('groupName').equals(fromGroupName).first();
    const toGroup = await db.friendGroups.where('groupName').equals(toGroupName).first();

    if (!fromGroup) {
        throw new Error(`Source group ${fromGroupName} not found.`);
    }
    if (!toGroup) {
        throw new Error(`Target group ${toGroupName} not found.`);
    }

    const friendIndex = fromGroup.friends.findIndex(friend => friend.userId === friendId);
    if (friendIndex === -1) {
        throw new Error("Friend not found in the source group.");
    }

    const friend = fromGroup.friends[friendIndex];
    fromGroup.friends = fromGroup.friends.filter(f => f.userId !== friendId);
    toGroup.friends = [...toGroup.friends, friend];

    await db.friendGroups.put(fromGroup);
    await db.friendGroups.put(toGroup);
};

// Friend Groups
export const getFriendGroups = async (): Promise<FriendGroups> => {
    return await db.friendGroups.toArray();
};

export const addFriendGroup = async (groupName: string): Promise<void> => {
    const groupAlreadyExists = await db.friendGroups.where('groupName').equals(groupName).first();
    if (groupAlreadyExists) {
        throw new Error(`Group ${groupName} already exists.`);
    }
    await db.friendGroups.add({ groupName, friends: [] });
};

export const removeFriendGroup = async (groupName: string): Promise<void> => {
    const defaultGroup = await db.friendGroups.where('groupName').equals(DEFAULT_FRIEND_GROUP_NAME).first();
    const group = await db.friendGroups.where('groupName').equals(groupName).first();
    if (!defaultGroup) {
        throw new Error(`Default group does not exist.`);
    }
    else if (!group) {
        throw new Error(`Group ${groupName} does not exist.`);
    }
    else if (group.groupName === defaultGroup.groupName) {
        throw new Error(`Cannot remove the default group.`);
    }
    else {
        defaultGroup.friends = [...defaultGroup.friends, ...group.friends];
        await db.friendGroups.put(defaultGroup);
        await db.friendGroups.where('groupName').equals(groupName).delete();
    }
};

// Sent Requests
export const setSentRequests = async (requests: FriendRequest[]): Promise<void> => {
    await db.sentRequests.bulkPut(requests);
}

export const getSentRequests = async (): Promise<FriendRequest[]> => {
    return await db.sentRequests.toArray();
};

export const addSentRequest = async (request: FriendRequest): Promise<void> => {
    await db.sentRequests.add(request);
};

export const removeSentRequest = async (requestId: string): Promise<void> => {
    await db.sentRequests.where('requestId').equals(requestId).delete();
};

// Received Requests
export const getReceivedRequests = async (): Promise<FriendRequest[]> => {
    return await db.receivedRequests.toArray();
};

export const addReceivedRequest = async (request: FriendRequest): Promise<void> => {
    await db.receivedRequests.add(request);
};

export const removeReceivedRequest = async (requestId: string): Promise<void> => {
    await db.receivedRequests.where('requestId').equals(requestId).delete();
};

export const updateRequest = async (request: FriendRequest): Promise<void> => {
    const existingRequest = await db.sentRequests.where('requestId').equals(request.requestId).first();
    if (existingRequest) {
        await db.sentRequests.put(request);
    } else {
        const receivedRequest = await db.receivedRequests.where('requestId').equals(request.requestId).first();
        if (receivedRequest) {
            await db.receivedRequests.put(request);
        } else {
            throw new Error(`Request not found: ${request.requestId}`);
        }
    }
};