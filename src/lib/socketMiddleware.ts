import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { setToken, resetAuth } from '@/lib/features/auth/authSlice';
import { 
    addSentRequest,
    addReceivedRequest,
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
            // console.error('Connection error:', err);
            console.log('Connection error:', err);
        });

        // Handle incoming friend requests
        socket.on('friend_request', (request) => {
            store.dispatch(addReceivedRequest(request));
        });

        // TODO: Handle incoming messages
        socket.on('message', () => {
            // to be implemented
        });
    }

    if (resetAuth.match(action)) {
        if (socket) {
            socket.disconnect();
        }
    }

    if (addSentRequest.match(action)) {
        socket.emit('friend_request', action.payload);
    }

    return next(action);
};

export default socketMiddleware;