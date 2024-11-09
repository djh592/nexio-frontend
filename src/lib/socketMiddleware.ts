// src/lib/socketMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { setToken, resetAuth } from '@/lib/features/auth/authSlice';

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
            console.error('Connection error:', err);
        });

        // TODO: Handle incoming messages
        socket.on('message', (message) => {
            store.dispatch({ type: 'socket/message', payload: message });
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