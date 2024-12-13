'use client';
import React from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

interface ChatSessionTitleProps {
    chatId: string;
}

export default function ChatSessionTitle({ chatId }: ChatSessionTitleProps) {
    const chat = useLiveQuery(() => db.chats.get(chatId), [chatId]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, borderBottom: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={chat?.chatName} src={chat?.chatAvatarUrl} sx={{ marginRight: 2 }} />
                <Typography variant="h6" noWrap>
                    {chat?.chatName}
                </Typography>
            </Box>
            <Box>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </Box>
        </Box>
    );
}