'use client';
import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { ChatType } from '@/lib/definitions';
import ChatSettingButton from '@/components/chat/ChatSettingButton';
import ChatNotificationButton from '@/components/chat/ChatNotificationButton';

interface ChatSessionTitleProps {
    chatId: string;
}

export default function ChatSessionTitle({ chatId }: ChatSessionTitleProps) {
    const chat = useLiveQuery(() => db.chats.where('chatId').equals(chatId).first(), [chatId]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, borderBottom: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={chat?.chatName} src={chat?.chatAvatarUrl} sx={{ marginRight: 2 }} />
                <Typography variant="h6" noWrap>
                    {chat?.chatName}
                </Typography>
            </Box>
            <Box>
                <ChatNotificationButton chatId={chatId} />
                <ChatSettingButton chatId={chatId} />
            </Box>
        </Box>
    );
}