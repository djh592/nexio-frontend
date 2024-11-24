import { db } from '@/lib/db';
import { User, FriendGroups, FriendRequest, FriendRequests } from '@/lib/definitions';
import { DEFAULT_FRIEND_GROUP_NAME } from '@/lib/definitions';
import { getUsers as getUsersFromBackend } from '@/lib/api';

export const clearDatabase = async (): Promise<void> => {
    await db.users.clear();
    await db.friendGroups.clear();
    await db.friendRequests.clear();
}

// User
export const storeUsersByIds = async (userIds: string[]): Promise<void> => {
    const missingUserIds: string[] = [];

    for (const userId of userIds) {
        const user = await db.users.where('userId').equals(userId).first();
        if (!user) {
            missingUserIds.push(userId);
        }
    }

    if (missingUserIds.length > 0) {
        try {
            const response = await getUsersFromBackend({ userIds: missingUserIds });
            if (response.code === 0) {
                const fetchedUsers = response.users;
                await db.users.bulkPut(fetchedUsers);
            }
            else {
                throw new Error(response.info);
            }
        } catch (error) {
            throw new Error(`Failed to fetch users: ${error}`);
        }
    }
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


// Friend Requests
export const getSentRequests = async (userId: string): Promise<FriendRequests> => {
    return await db.friendRequests.where('fromUserId').equals(userId).toArray();
}

export const getReceivedRequests = async (userId: string): Promise<FriendRequests> => {
    return await db.friendRequests.where('toUserId').equals(userId).toArray();
}

export const addFriendRequest = async (request: FriendRequest): Promise<void> => {
    const requestExists = await db.friendRequests.where('requestId').equals(request.requestId).first();
    if (requestExists) {
        throw new Error(`Request with requestId ${request.requestId} already exists.`);
    }
    await db.friendRequests.add(request);
}

export const updateFriendRequest = async (request: FriendRequest): Promise<void> => {
    const existingRequest = await db.friendRequests.where('requestId').equals(request.requestId).first();
    if (existingRequest) {
        await db.friendRequests.put({ ...request, id: existingRequest.id });
    } else {
        throw new Error(`Request with requestId ${request.requestId} does not exist.`);
    }
}