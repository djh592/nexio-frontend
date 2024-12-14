'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { ChatType } from '@/lib/definitions';
import GroupDisplayItem from '@/components/group/GroupDisplayItem';

export default function GroupDisplayItemList() {
    const groups = useLiveQuery(() => db.chats.where('chatType').equals(ChatType.Group).sortBy('createdAt'), []);

    return (
        <Box sx={{ width: '100%', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {groups && groups.length > 0 ? (
                groups.map((group) => (
                    <GroupDisplayItem key={group.chatId} chatId={group.chatId} />
                ))
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                    No groups found
                </Typography>
            )}
        </Box>
    );
}