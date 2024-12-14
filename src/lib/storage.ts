import { db } from '@/lib/db';
import {
    User, FriendGroup, FriendGroups, FriendRequest, FriendRequests,
    Chat, ChatMessageList, ChatParticipantList, ChatNotificationList,
    ChatJoinRequestList,
    ChatMessage,
} from '@/lib/definitions';
import { DEFAULT_FRIEND_GROUP_NAME } from '@/lib/definitions';
import {
    getUser as getUserFromBackend,
    postUsersBatch as getUsersFromBackend,
    getFriends as getFriendsFromBackend,
    getFriendsRequests as getFriendsRequestsFromBackend,
    getChats as getChatsFromBackend,
    getMessages as getMessagesFromBackend,
    getParticipants as getParticipantsFromBackend,
    getNotifications as getNotificationsFromBackend,
    getJoinRequests as getJoinRequestsFromBackend,
} from '@/lib/api';
import { decomposeResponseFriendGroups } from '@/lib/logic';


export const clearDatabase = async (): Promise<void> => {
    await db.users.clear();
    await db.friendGroups.clear();
    await db.friendRequests.clear();
    await db.chats.clear();
    await db.chatMessageLists.clear();
    await db.chatParticipantLists.clear();
    await db.chatNotificationLists.clear();
    await db.chatJoinRequestLists.clear();
}


// User
export const updateUsers = async (userIds: string[]): Promise<void> => {
    try {
        const response = await getUsersFromBackend({ userIds: userIds });
        if (response.code === 0) {
            const fetchedUsers = response.users;
            await upsertUsers(fetchedUsers);
        }
        else {
            throw new Error(response.info);
        }
    }
    catch (error) {
        console.log(`Failed to fetch users: ${error}`);
    }
}

export const updateUser = async (userId: string): Promise<void> => {
    try {
        const response = await getUserFromBackend(userId);
        if (response.code === 0) {
            const fetchedUser = response.user;
            await upsertUser(fetchedUser);
        }
        else {
            throw new Error(response.info);
        }
    }
    catch (error) {
        console.log(`Failed to fetch user: ${error}`);
    }
}

export const searchUsers = async (searchText: string): Promise<User[]> => {
    const users = await db.users.toArray();
    return users.filter(user => user.userName.toLowerCase().includes(searchText.toLowerCase()));
};

export const getUser = async (userId: string): Promise<User | undefined> => {
    return await db.users.where('userId').equals(userId).first();
};

export const getUsers = async (): Promise<User[]> => {
    return await db.users.toArray();
};

export const upsertUser = async (user: User): Promise<void> => {
    const existingUser = await db.users.where('userId').equals(user.userId).first();
    if (existingUser) {
        user.id = existingUser.id; // combine existing user with new user
    }
    await db.users.put(user); // upsert user
};

export const upsertUsers = async (users: User[]): Promise<void> => {
    const existingUsers = await db.users
        .where('userId')
        .anyOf(users.map(u => u.userId))
        .toArray();

    const userMap = new Map(existingUsers.map(u => [u.userId, u]));

    // combine existing users with new users
    const usersWithId = users.map(user => {
        const existingUser = userMap.get(user.userId);
        return existingUser ? { ...user, id: existingUser.id } : user;
    });

    await db.users.bulkPut(usersWithId);
};


export const deleteUser = async (userId: string): Promise<void> => {
    await db.users.where('userId').equals(userId).delete();
};

export const deleteUsers = async (userIds: string[]): Promise<void> => {
    await db.users.where('userId').anyOf(userIds).delete();
};


// Friend
export const addFriend = async (friendUserId: string): Promise<void> => {
    const groupOfFriend = await db.friendGroups.where('friends').equals(friendUserId).first();
    if (groupOfFriend) {
        throw new Error(`Friend ${friendUserId} already exists.`);
    }

    const defaultGroup = await db.friendGroups.where('groupName').equals(DEFAULT_FRIEND_GROUP_NAME).first();
    if (!defaultGroup) {
        throw new Error(`Default group does not exist.`);
    }
    defaultGroup.friends = [...defaultGroup.friends, friendUserId];
    await db.friendGroups.put(defaultGroup);
}

export const removeFriend = async (friendUserId: string): Promise<void> => {
    const groupOfFriend = await db.friendGroups.where('friends').equals(friendUserId).first();
    if (!groupOfFriend) {
        throw new Error(`Friend ${friendUserId} not found.`);
    }
    groupOfFriend.friends = groupOfFriend.friends.filter(friend => friend !== friendUserId);
    await db.friendGroups.put(groupOfFriend);
}

export const moveFriendToGroup = async (friendUserId: string, fromGroupName: string, toGroupName: string): Promise<void> => {
    const fromGroup = await db.friendGroups.where('groupName').equals(fromGroupName).first();
    const toGroup = await db.friendGroups.where('groupName').equals(toGroupName).first();

    if (!fromGroup) {
        throw new Error(`Source group ${fromGroupName} not found.`);
    }
    if (!toGroup) {
        throw new Error(`Target group ${toGroupName} not found.`);
    }

    const friendIndex = fromGroup.friends.findIndex(userId => userId === friendUserId);
    if (friendIndex === -1) {
        throw new Error("Friend not found in the source group.");
    }

    const friend = fromGroup.friends[friendIndex];
    fromGroup.friends = fromGroup.friends.filter(userId => userId !== friendUserId);
    toGroup.friends = [...toGroup.friends, friend];

    await db.friendGroups.put(fromGroup);
    await db.friendGroups.put(toGroup);
};

// Friend Groups
export const updateFriendGroups = async (userId: string): Promise<void> => {
    try {
        const response = await getFriendsFromBackend({ userId: userId });
        if (response.code === 0) {
            const fetchedGroups = response.friendGroups;
            const { friendGroups, users } = decomposeResponseFriendGroups(fetchedGroups);
            await upsertFriendGroups(friendGroups);
            await upsertUsers(users);
        }
        else {
            throw new Error(response.info);
        }
    } catch (error) {
        console.log(`Failed to fetch friend groups: ${error}`);
    }
}

export const getFriendGroups = async (): Promise<FriendGroups> => {
    return await db.friendGroups.toArray();
};

export const upsertFriendGroup = async (group: FriendGroup): Promise<void> => {
    const existingGroup = await db.friendGroups.where('groupId').equals(group.groupId).first();
    if (existingGroup) {
        group.id = existingGroup.id; // combine existing group with new group
    }
    await db.friendGroups.put(group); // upsert group
}

export const upsertFriendGroups = async (groups: FriendGroups): Promise<void> => {
    const existingGroups = await db.friendGroups
        .where('groupId')
        .anyOf(groups.map(g => g.groupId))
        .toArray();

    const groupMap = new Map(existingGroups.map(g => [g.groupId, g]));

    // combine existing groups with new groups
    const groupsWithId = groups.map(group => {
        const existingGroup = groupMap.get(group.groupId);
        return existingGroup ? { ...group, id: existingGroup.id } : group;
    });

    await db.friendGroups.bulkPut(groupsWithId);
}

export const deleteFriendGroup = async (groupName: string): Promise<void> => {
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
export const updateFriendRequests = async (userId: string): Promise<void> => {
    try {
        const response = await getFriendsRequestsFromBackend({ userId: userId });
        if (response.code === 0) {
            const fetchedRequests = [...response.sentRequests, ...response.receivedRequests];
            await upsertFriendRequests(fetchedRequests);
        }
        else {
            throw new Error(response.info);
        }
    }
    catch (error) {
        console.log(`Failed to fetch friend requests: ${error}`);
    }
}

export const getSentRequests = async (userId: string): Promise<FriendRequests> => {
    return await db.friendRequests.where('fromUserId').equals(userId).toArray();
}

export const getReceivedRequests = async (userId: string): Promise<FriendRequests> => {
    return await db.friendRequests.where('toUserId').equals(userId).toArray();
}

export const upsertFriendRequest = async (request: FriendRequest): Promise<void> => {
    const existingRequest = await db.friendRequests.where('requestId').equals(request.requestId).first();
    if (existingRequest) {
        request.id = existingRequest.id; // combine existing request with new request
    }
    await db.friendRequests.put(request); // upsert request
}

export const upsertFriendRequests = async (requests: FriendRequest[]): Promise<void> => {
    const existingRequests = await db.friendRequests
        .where('requestId')
        .anyOf(requests.map(r => r.requestId))
        .toArray();

    const requestMap = new Map(existingRequests.map(r => [r.requestId, r]));

    // combine existing requests with new requests
    const requestsWithId = requests.map(request => {
        const existingRequest = requestMap.get(request.requestId);
        return existingRequest ? { ...request, id: existingRequest.id } : request;
    });

    await db.friendRequests.bulkPut(requestsWithId);
}

export const deleteFriendRequest = async (requestId: string): Promise<void> => {
    await db.friendRequests.where('requestId').equals(requestId).delete();
}

export const deleteFriendRequests = async (requestIds: string[]): Promise<void> => {
    await db.friendRequests.where('requestId').anyOf(requestIds).delete();
}


// Chats
export const updateChats = async (userId: string): Promise<void> => {
    try {
        const response = await getChatsFromBackend({ userId: userId });
        if (response.code === 0) {
            const fetchedChats = response.chats;
            await upsertChats(fetchedChats);
        }
        else {
            throw new Error(response.info);
        }
    }
    catch (error) {
        console.log(`Failed to fetch chats: ${error}`);
    }
}

export const getChats = async (): Promise<Chat[]> => {
    return await db.chats.toArray();
}

export const upsertChat = async (chat: Chat): Promise<void> => {
    const existingChat = await db.chats.where('chatId').equals(chat.chatId).first();
    if (existingChat) {
        chat.id = existingChat.id; // combine existing chat with new chat
    }
    await db.chats.put(chat); // upsert chat
}

export const upsertChats = async (chats: Chat[]): Promise<void> => {
    const existingChats = await db.chats
        .where('chatId')
        .anyOf(chats.map(c => c.chatId))
        .toArray();

    const chatMap = new Map(existingChats.map(c => [c.chatId, c]));

    // combine existing chats with new chats
    const chatsWithId = chats.map(chat => {
        const existingChat = chatMap.get(chat.chatId);
        return existingChat ? { ...chat, id: existingChat.id } : chat;
    });

    await db.chats.bulkPut(chatsWithId);
}

export const deleteChat = async (chatId: string): Promise<void> => {
    await db.chats.where('chatId').equals(chatId).delete();
}

export const deleteChats = async (chatIds: string[]): Promise<void> => {
    await db.chats.where('chatId').anyOf(chatIds).delete();
}


// Messages
export const updateChatMessageList = async (messageListId: string, fromUserId: string): Promise<void> => {
    try {
        const response = await getMessagesFromBackend(messageListId, { fromUserId: fromUserId });
        if (response.code === 0) {
            const fetchedMessages = response.chatMessageList;
            await upsertChatMessageList(fetchedMessages);
        }
    }
    catch (error) {
        console.log(`Failed to fetch chat message list: ${error}`);
    }
}

export const getChatMessageList = async (messageListId: string): Promise<ChatMessageList | undefined> => {
    return await db.chatMessageLists.where('messageListId').equals(messageListId).first();
}

export const upsertChatMessageList = async (chatMessageList: ChatMessageList): Promise<void> => {
    const existingChatMessageList = await db.chatMessageLists.where('messageListId').equals(chatMessageList.messageListId).first();
    if (existingChatMessageList) {
        chatMessageList.id = existingChatMessageList.id; // combine existing chatMessageList with new chatMessageList
    }
    await db.chatMessageLists.put(chatMessageList); // upsert chatMessageList
}

export const deleteChatMessageList = async (messageListId: string): Promise<void> => {
    await db.chatMessageLists.where('messageListId').equals(messageListId).delete();
}

export const upsertChatMessage = async (chatMessageListId: string, chatMessage: ChatMessage): Promise<void> => {
    const chatMessageList = await db.chatMessageLists.where('messageListId').equals(chatMessageListId).first();
    if (!chatMessageList) {
        throw new Error(`Chat message list ${chatMessageListId} does not exist.`);
    }

    const existingChatMessageIdx = chatMessageList.messages.findIndex(m => m.messageId === chatMessage.messageId);
    if (existingChatMessageIdx !== -1) {
        chatMessageList.messages[existingChatMessageIdx] = chatMessage; // update existing chat message
    }
    else {
        chatMessageList.messages.push(chatMessage); // add new chat message
    }

    await db.chatMessageLists.put(chatMessageList); // upsert chatMessageList
}


// Participants
export const updateChatParticipantList = async (participantListId: string, fromUserId: string): Promise<void> => {
    try {
        const response = await getParticipantsFromBackend(participantListId, { fromUserId: fromUserId });
        if (response.code === 0) {
            const fetchedParticipants = response.chatParticipantList;
            await upsertChatParticipantList(fetchedParticipants);
        }
    }
    catch (error) {
        console.log(`Failed to fetch chat participant list: ${error}`);
    }
}

export const getChatParticipantList = async (participantListId: string): Promise<ChatParticipantList | undefined> => {
    return await db.chatParticipantLists.where('participantListId').equals(participantListId).first();
}

export const upsertChatParticipantList = async (chatParticipantList: ChatParticipantList): Promise<void> => {
    const existingChatParticipantList = await db.chatParticipantLists.where('participantListId').equals(chatParticipantList.participantListId).first();
    if (existingChatParticipantList) {
        chatParticipantList.id = existingChatParticipantList.id; // combine existing chatParticipantList with new chatParticipantList
    }
    await db.chatParticipantLists.put(chatParticipantList); // upsert chatParticipantList
}

export const deleteChatParticipantList = async (participantListId: string): Promise<void> => {
    await db.chatParticipantLists.where('participantListId').equals(participantListId).delete();
}


// Notifications
export const updateChatNotificationList = async (notificationListId: string, fromUserId: string): Promise<void> => {
    try {
        const response = await getNotificationsFromBackend(notificationListId, { fromUserId: fromUserId });
        if (response.code === 0) {
            const fetchedNotifications = response.chatNotificationList;
            await upsertChatNotificationList(fetchedNotifications);
        }
    }
    catch (error) {
        console.log(`Failed to fetch chat notification list: ${error}`);
    }
}

export const getChatNotificationList = async (notificationListId: string): Promise<ChatNotificationList | undefined> => {
    return await db.chatNotificationLists.where('notificationListId').equals(notificationListId).first();
}

export const upsertChatNotificationList = async (chatNotificationList: ChatNotificationList): Promise<void> => {
    const existingChatNotificationList = await db.chatNotificationLists.where('notificationListId').equals(chatNotificationList.notificationListId).first();
    if (existingChatNotificationList) {
        chatNotificationList.id = existingChatNotificationList.id; // combine existing chatNotificationList with new chatNotificationList
    }
    await db.chatNotificationLists.put(chatNotificationList); // upsert chatNotificationList
}

export const deleteChatNotificationList = async (notificationListId: string): Promise<void> => {
    await db.chatNotificationLists.where('notificationListId').equals(notificationListId).delete();
}

// Join Requests
export const updateChatJoinRequestList = async (joinRequestListId: string, fromUserId: string): Promise<void> => {
    try {
        const response = await getJoinRequestsFromBackend(joinRequestListId, { fromUserId: fromUserId });
        if (response.code === 0) {
            const fetchedJoinRequests = response.chatJoinRequestList;
            await upsertChatJoinRequestList(fetchedJoinRequests);
        }
    }
    catch (error) {
        console.log(`Failed to fetch chat join request list: ${error}`);
    }
}

export const getChatJoinRequestList = async (joinRequestListId: string): Promise<ChatJoinRequestList | undefined> => {
    return await db.chatJoinRequestLists.where('joinRequestListId').equals(joinRequestListId).first();
}

export const upsertChatJoinRequestList = async (chatJoinRequestList: ChatJoinRequestList): Promise<void> => {
    const existingChatJoinRequestList = await db.chatJoinRequestLists.where('joinRequestListId').equals(chatJoinRequestList.joinRequestListId).first();
    if (existingChatJoinRequestList) {
        chatJoinRequestList.id = existingChatJoinRequestList.id; // combine existing chatJoinRequestList with new chatJoinRequestList
    }
    await db.chatJoinRequestLists.put(chatJoinRequestList); // upsert chatJoinRequestList
}

export const deleteChatJoinRequestList = async (joinRequestListId: string): Promise<void> => {
    await db.chatJoinRequestLists.where('joinRequestListId').equals(joinRequestListId).delete();
}