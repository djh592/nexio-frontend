import { socket } from '@/lib/socketMiddleware';

export const sendFriendRequest = (toUserId: string) => {
    socket.emit('sendFriendRequest', { toUserId });
};

export const respondToFriendRequest = (requestId: string, status: 'accepted' | 'rejected') => {
    socket.emit('respondToFriendRequest', { requestId, status });
};

export const sendMessage = (chatId: string, message: string) => {
    socket.emit('sendMessage', { chatId, message });
};