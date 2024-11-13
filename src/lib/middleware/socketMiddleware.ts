import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { setToken, resetAuth } from '@/lib/features/auth/authSlice';
import {
    addReceivedRequest,
    updateRequest,
    addFriend,
    removeFriend,
    updateFriendProfile,
} from '@/lib/features/friend/friendSlice';
import { User, FriendRequest } from '../definitions';

const SOCKET_URL = 'https://nexio-backend-nexio.app.secoder.net';

let socket: Socket;

const socketMiddleware: Middleware = (store) => (next) => (action) => {
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

        socket.on('friend_request_receive', (data) => {
            try {
                const request: FriendRequest = data.friendRequest;
                store.dispatch(addReceivedRequest(request));
            }
            catch (e) {
                console.log(e);
            }
        });

        socket.on('friend_request_update', (data) => {
            try {
                const request: FriendRequest = data.friendRequest;
                store.dispatch(updateRequest(request));
            }
            catch (e) {
                console.log(e);
            }
        });

        socket.on('friend_added', (data) => {
            try {
                const friend: User = data.user;
                store.dispatch(addFriend(friend));
            }
            catch (e) {
                console.log(e);
            }
        });

        socket.on('friend_removed', (data) => {
            try {
                const friend: User = data.user;
                store.dispatch(removeFriend(friend));
            }
            catch (e) {
                console.log(e);
            }
        });

        socket.on('friend_profile_update', (data) => {
            try {
                const friend: User = data.user;
                store.dispatch(updateFriendProfile(friend));
            }
            catch (e) {
                console.log(e);
            }
        });

        socket.on('friend_unregister', (data) => {
            try {
                const friend: User = data.user;
                store.dispatch(removeFriend(friend));
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
