import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { setToken, resetAuth } from '@/lib/features/auth/authSlice';
import {
    upsertUser,
    deleteUser,
    upsertFriendRequest,
    addFriend,
    removeFriend,
} from '@/lib/storage';
import { User, FriendRequest } from '../definitions';

const SOCKET_URL = 'https://nexio-backend-nexio.app.secoder.net';

let socket: Socket;

const socketMiddleware: Middleware = () => (next) => (action) => {
    if (setToken.match(action)) {
        const token = action.payload;
        socket = io(SOCKET_URL, {
            auth: {
                token,
            },
        });

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
            }
            catch (e) {
                console.log(e);
            }
        });

        socket.on('user_unregister', (data) => {
            try {
                const user: User = data.user;
                deleteUser(user.userId);
            }
            catch (e) {
                console.log(e);
            }
        });

        socket.on('friend_request_receive', async (data) => {
            try {
                const request: FriendRequest = data.friendRequest;
                await upsertFriendRequest(request);
            }
            catch (e) {
                console.log(e);
            }
        });

        socket.on('friend_request_update', async (data) => {
            try {
                const request: FriendRequest = data.friendRequest;
                await upsertFriendRequest(request);
            }
            catch (e) {
                console.log(e);
            }
        });

        socket.on('friend_added', async (data) => {
            try {
                const friend: User = data.user;
                await addFriend(friend.userId);
            }
            catch (e) {
                console.log(e);
            }
        });

        socket.on('friend_removed', async (data) => {
            try {
                const friend: User = data.user;
                await removeFriend(friend.userId);
            }
            catch (e) {
                console.log(e);
            }
        });


    }

    if (resetAuth.match(action)) {
        if (socket) {
            socket.disconnect();
        }
    }

    return next(action);
};

export default socketMiddleware;
