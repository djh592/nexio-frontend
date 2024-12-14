import { io, Socket } from 'socket.io-client';
import {
    upsertUser, deleteUser,
    upsertFriendRequest,
    addFriend, removeFriend,
    upsertChat, deleteChat,
    upsertChatMessageList, deleteChatMessageList,
    upsertChatParticipantList, deleteChatParticipantList,
    upsertChatNotificationList, deleteChatNotificationList,
    upsertChatJoinRequestList, deleteChatJoinRequestList,
} from '@/lib/storage';
import { User, FriendRequest } from '@/lib/definitions';

const SOCKET_URL = 'https://nexio-backend-nexio.app.secoder.net';

let socket: Socket;

export const connectSocket = (token: string) => {
    if (socket) {
        socket.disconnect();
    }

    socket = io(SOCKET_URL, {
        autoConnect: false,
        auth: {
            token,
        },
    });

    registerSocketEvents();

    socket.connect();
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};

const registerSocketEvents = () => {
    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
    });

    socket.on('connect_error', (err) => {
        console.log('Connection error:', err);
    });

    socket.on('user_profile_update', async (data) => {
        try {
            const user: User = data.user;
            await upsertUser(user);
        } catch (e) {
            console.log(e);
        }
    });

    socket.on('user_unregister', (data) => {
        try {
            const user: User = data.user;
            deleteUser(user.userId);
        } catch (e) {
            console.log(e);
        }
    });

    socket.on('friend_request_receive', async (data) => {
        try {
            const request: FriendRequest = data.friendRequest;
            await upsertFriendRequest(request);
        } catch (e) {
            console.log(e);
        }
    });

    socket.on('friend_request_update', async (data) => {
        try {
            const request: FriendRequest = data.friendRequest;
            await upsertFriendRequest(request);
        } catch (e) {
            console.log(e);
        }
    });

    socket.on('friend_added', async (data) => {
        try {
            const friend: User = data.user;
            await addFriend(friend.userId);
        } catch (e) {
            console.log(e);
        }
    });

    socket.on('friend_removed', async (data) => {
        try {
            const friend: User = data.user;
            await removeFriend(friend.userId);
        } catch (e) {
            console.log(e);
        }
    });

    socket.on('chat_update', async (data) => {
        try {
            const chat = data.chat;
            await upsertChat(chat);
        }
        catch (e) {
            console.log(e);
        }
    });


    socket.on('chat_deleted', async (data) => {
        try {
            const chatId = data.chatId;
            await deleteChat(chatId);
        }
        catch (e) {
            console.log(e);
        }
    });

    socket.on('message_list_update', async (data) => {
        try {
            const chatMessageList = data.chatMessageList;
            await upsertChatMessageList(chatMessageList);
        }
        catch (e) {
            console.log(e);
        }
    });

    socket.on('message_list_deleted', async (data) => {
        try {
            const chatId = data.chatId;
            await deleteChatMessageList(chatId);
        }
        catch (e) {
            console.log(e);
        }
    });

    socket.on('participant_list_update', async (data) => {
        try {
            const chatParticipantList = data.chatParticipantList;
            await upsertChatParticipantList(chatParticipantList);
        }
        catch (e) {
            console.log(e);
        }
    });

    socket.on('participant_list_deleted', async (data) => {
        try {
            const chatId = data.chatId;
            await deleteChatParticipantList(chatId);
        }
        catch (e) {
            console.log(e);
        }
    });


    socket.on('notification_list_update', async (data) => {
        try {
            const chatNotificationList = data.chatNotificationList;
            await upsertChatNotificationList(chatNotificationList);
        }
        catch (e) {
            console.log(e);
        }
    });


    socket.on('notification_list_deleted', async (data) => {
        try {
            const chatId = data.chatId;
            await deleteChatNotificationList(chatId);
        }
        catch (e) {
            console.log(e);
        }
    });

    socket.on('join_request_list_update', async (data) => {
        try {
            const chatJoinRequestList = data.chatJoinRequestList;
            await upsertChatJoinRequestList(chatJoinRequestList);
        }
        catch (e) {
            console.log(e);
        }
    });

    socket.on('join_request_list_deleted', async (data) => {
        try {
            const chatId = data.chatId;
            await deleteChatJoinRequestList(chatId);
        }
        catch (e) {
            console.log(e);
        }
    });
};