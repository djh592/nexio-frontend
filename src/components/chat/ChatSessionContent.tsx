'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { ChatType } from '@/lib/definitions';
import ChatMessageInput from "@/components/chat/ChatMessageInput";
import ChatMessageItemList from '@/components/chat/ChatMessageItemList';
import ChatSessionTitle from '@/components/chat/ChatSessionTitle';

interface ChatSessionContentProps {
    chatId: string;
}

export default function ChatSessionContent({ chatId }: ChatSessionContentProps) {
    const chat = useLiveQuery(() => db.chats.get(chatId), [chatId]);
    const [messageListId, setMessageListId] = useState<string | null>(null);

    useEffect(() => {
        if (chat) {
            setMessageListId(chat.messageListId);
        }
    }, [chat]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 2 }}>
            <Box sx={{ flexShrink: 0 }}>
                <ChatSessionTitle chatId={chatId} />
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <ChatMessageItemList
                    chatType={ChatType.Group}
                    messageListId={messageListId ? messageListId : ''}
                />
            </Box>
            <Box sx={{ flexShrink: 0 }}>
                <ChatMessageInput
                    messageListId={messageListId ? messageListId : ''}
                />
            </Box>
        </Box>
    );
}