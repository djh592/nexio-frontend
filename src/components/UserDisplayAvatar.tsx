'use client';
import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography } from "@mui/material";
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { updateUser } from '@/lib/storage';
import UserDisplayDialog from './UserDisplayDialog';

interface UserDisplayAvatarProps {
    userId: string;
}

export default function UserDisplayAvatar({ userId }: UserDisplayAvatarProps) {
    const user = useLiveQuery(() => db.users.where('userId').equals(userId).first(), [userId]);

    useEffect(() => {
        if (!user) {
            updateUser(userId);
        }
    }
        , [user, userId]);

    const [open, setOpen] = useState(false);

    return (
        <>
            <Box
                sx={{
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    },
                }}
                onClick={() => setOpen(true)}
            >
                <Avatar
                    sizes="small"
                    alt={user?.userName}
                    src={user?.avatarUrl}
                    sx={{ width: 30, height: 30 }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {user?.userName || 'UserName'}
                </Typography>
            </Box>
            <UserDisplayDialog
                userId={userId}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}