'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { updateChats } from '@/lib/storage';
import { useCurrentUser } from '@/lib/hooks';
import { Chat } from '@/lib/definitions';
import ChatItem from '@/components/chat/ChatItem';


export default function ChatItemList() {
    const { currentUser } = useCurrentUser();
    const chats = useLiveQuery(() => db.chats.toArray());
    const [sortedChats, setSortedChats] = useState<Chat[]>([]);

    useEffect(() => {
        if (currentUser.userId !== '') {
            updateChats(currentUser.userId);
        }
    }, [currentUser]);

    useEffect(() => {
        if (chats) {
            const fetchLatestMessages = async () => {
                const chatWithLatestMessages = await Promise.all(
                    chats.map(async (chat) => {
                        const messageList = await db.chatMessageLists.get(chat.messageListId);
                        const latestMessage = messageList?.messages[0];
                        return { ...chat, latestMessage };
                    })
                );

                const pinnedChats = chatWithLatestMessages
                    .filter(chat => chat.chatSettings.isPinned)
                    .sort((a, b) => new Date(b.latestMessage?.createdAt || 0).getTime() - new Date(a.latestMessage?.createdAt || 0).getTime());

                const unpinnedChats = chatWithLatestMessages
                    .filter(chat => !chat.chatSettings.isPinned)
                    .sort((a, b) => new Date(b.latestMessage?.createdAt || 0).getTime() - new Date(a.latestMessage?.createdAt || 0).getTime());

                setSortedChats([...pinnedChats, ...unpinnedChats]);
            };

            fetchLatestMessages();
        }
    }, [chats]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {sortedChats.length > 0 ? (
                sortedChats.map((chat) => (
                    <Box
                        key={chat.chatId}
                        sx={{
                            width: '100%',
                            backgroundColor: chat.chatSettings.isPinned ? '#f0f0f0' : 'inherit',
                            borderBottom: '1px solid #e0e0e0',
                        }}
                    >
                        <ChatItem chat={chat} />
                    </Box>
                ))
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                    No chats available
                </Typography>
            )}
        </Box>
    );
}