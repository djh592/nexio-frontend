'use client';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useCurrentUser, useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetIsForwarding } from '@/lib/features/chat/chatSlice';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Chat, ChatMessageContentType } from '@/lib/definitions';
import { postMessages } from '@/lib/api';


interface ChatMessageForwardDialogProps {
    chatId: string;
    open: boolean;
    onClose: () => void;
}

export default function ChatMessageForwardDialog({ chatId, open, onClose }: ChatMessageForwardDialogProps) {
    const { currentUser } = useCurrentUser();
    const dispatch = useAppDispatch();
    const forwardingMessages = useAppSelector(state => state.chat.forwardingMessages);
    const chats = useLiveQuery(() => db.chats.toArray(), []);
    const [allChats, setAllChats] = useState<Chat[]>();
    useEffect(() => {
        if (chats) {
            setAllChats(chats.filter(chat => chat.chatId !== chatId));
        }
    }
        , [chatId, chats]);

    const [selectedChatId, setSelectedChatId] = useState<string | undefined>(undefined);
    const [selectedChat, setSelectedChat] = useState<Chat | undefined>(undefined);
    useEffect(() => {
        if (selectedChatId && allChats) {
            setSelectedChat(allChats.find(chat => chat.chatId === selectedChatId));
        }
    }, [selectedChatId, allChats]);

    const handleForwardTogether = async () => {
        if (!currentUser || allChats === undefined || selectedChat === undefined) {
            return;
        }
        try {
            const fromUserId = currentUser.userId;
            const chatMessageContent = {
                contentType: ChatMessageContentType.Forwarded,
                contentPayload: String(forwardingMessages),
            }
            const response = await postMessages(selectedChat.messageListId, {
                fromUserId: fromUserId,
                chatMessageContents: [chatMessageContent],
            });
            if (response.code === 0) {
                dispatch(resetIsForwarding());
                onClose();
            }
            else {
                console.log(response.info);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleForwardSeparately = async () => {
        if (!currentUser || allChats === undefined || selectedChat === undefined) {
            return;
        }
        try {
            const fromUserId = currentUser.userId;
            const chatMessageContents = forwardingMessages.map(message => {
                return {
                    contentType: ChatMessageContentType.Forwarded,
                    contentPayload: String(message),
                }
            });
            const response = await postMessages(selectedChat.messageListId, {
                fromUserId: fromUserId,
                chatMessageContents: chatMessageContents,
            });
            if (response.code === 0) {
                dispatch(resetIsForwarding());
                onClose();
            }
            else {
                console.log(response.info);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleCancel = () => {
        dispatch(resetIsForwarding());
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Forward Message</DialogTitle>
            <DialogContent>
                <select value={selectedChatId} onChange={(e) => setSelectedChatId(e.target.value)}>
                    <option value="">Select a chat</option>
                    {allChats && allChats.map(chat => (
                        <option key={chat.chatId} value={chat.chatId}>{chat.chatName}</option>
                    ))}
                </select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleForwardTogether}>Forward Together</Button>
                <Button onClick={handleForwardSeparately}>Forward Separately</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}