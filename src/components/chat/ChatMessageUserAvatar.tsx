'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { updateUser } from '@/lib/storage';
import { Avatar, Box, } from '@mui/material';
import UserDisplayDialog from '@/components/user/UserDisplayDialog';

interface ChatMessageUserAvatarProps {
    userId: string;
}

export default function ChatMessageUserAvatar({ userId }: ChatMessageUserAvatarProps) {
    const user = useLiveQuery(() => db.users.get(userId), [userId]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            updateUser(userId);
        }
    }, [userId, user]);

    return (
        <>
            <Box
                sx={{
                    cursor: 'pointer',
                    mx: 1,
                }}
                onClick={() => setOpen(true)}
            >
                <Avatar alt={user?.userName} src={user?.avatarUrl} sx={{ width: 45, height: 45, mt: 0.5 }} />
            </Box>
            <UserDisplayDialog
                userId={userId}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}