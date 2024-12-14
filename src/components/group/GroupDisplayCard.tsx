'use client';
import React, { useState } from 'react';
import { Box, Avatar, Stack, Typography } from "@mui/material";
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import GroupDisplayDialog from '@/components/group/GroupDisplayDialog';


interface GroupDisplayCardProps {
    chatId: string;
}

export default function GroupDisplayCard({ chatId }: GroupDisplayCardProps) {
    const chat = useLiveQuery(() => db.chats.where('chatId').equals(chatId).first(), [chatId]);

    const [open, setOpen] = useState(false);

    return (
        <>
            <Stack
                direction="row"
                sx={{
                    p: 1,
                    gap: 2,
                    alignItems: 'center',
                    width: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    },
                }}
                onClick={() => setOpen(true)}
            >
                <Avatar
                    variant="rounded"
                    sizes="small"
                    alt={chat?.chatName}
                    src={chat?.chatAvatarUrl}
                    sx={{ width: 40, height: 40 }}
                />
                <Box sx={{ mr: 'auto' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                        {chat?.chatName || 'Group Name'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {chat?.createdAt || 'createdAt'}
                    </Typography>
                </Box>
            </Stack>
            <GroupDisplayDialog
                chatId={chatId}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}