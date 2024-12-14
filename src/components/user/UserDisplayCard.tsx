'use client';
import React, { useEffect, useState } from 'react';
import { Box, Avatar, Stack, Typography } from "@mui/material";
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { updateUser } from '@/lib/storage';
import UserDisplayDialog from '@/components/user/UserDisplayDialog';

interface UserDisplayCardProps {
    userId: string;
}

export default function UserDisplayCard({ userId }: UserDisplayCardProps) {
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
            <Stack
                direction="row"
                sx={{
                    padding: 1,
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
                    sizes="small"
                    alt={user?.userName}
                    src={user?.avatarUrl}
                    sx={{ width: 40, height: 40 }}
                />
                <Box sx={{ mr: 'auto' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                        {user?.userName || 'UserName'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {user?.emailAddress || 'EmailAddress'}
                    </Typography>
                </Box>
            </Stack>
            <UserDisplayDialog
                userId={userId}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}