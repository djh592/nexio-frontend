'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { updateUser } from '@/lib/storage';
import { Avatar, Box } from '@mui/material';
import UserDisplayDialog from '@/components/UserDisplayDialog';

interface ChatUserAvatarProps {
    userId: string;
}

export default function ChatUserAvatar({ userId }: ChatUserAvatarProps) {
    const user = useLiveQuery(() => db.users.get(userId), [userId]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            updateUser(userId);
        }
    }, [userId, user]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', mx: 1 }} onClick={handleOpen}>
            <Avatar alt={user?.userName} src={user?.avatarUrl} sx={{ width: 40, height: 40, mt: 0.5 }} />
            {user && (
                <UserDisplayDialog user={user} open={open} onClose={handleClose} />
            )}
        </Box>
    );
}