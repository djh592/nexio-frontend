import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { setToken, resetAuth } from '@/lib/features/auth/authSlice';
import { 
    addSentRequest,
    addReceivedRequest,
    updateRequestStatus,
    addFriend,
} from '@/lib/features/friend/friendSlice';

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

        socket.on('friend_request_sent', (data) => {
            store.dispatch(addSentRequest(data));
        });

        socket.on('friend_request_received', (data) => {
            store.dispatch(addReceivedRequest(data));
        });

        socket.on('friend_request_status_update', (data) => {
            store.dispatch(updateRequestStatus(data));
        });

        socket.on('friend_added', (data) => {
            store.dispatch(addFriend(data));
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
