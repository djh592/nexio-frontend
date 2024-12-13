import { io, Socket } from 'socket.io-client';
import {
    upsertUser,
    deleteUser,
    upsertFriendRequest,
    addFriend,
    removeFriend,
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
};