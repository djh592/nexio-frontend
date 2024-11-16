'use client';
import React, { useState } from 'react';
import { Box, Avatar, Stack, Typography } from "@mui/material";
import UserDisplayDialog from '@/components/UserDisplayDialog';
import { User } from "@/lib/definitions";

interface UserDisplayCardProps {
    user: User;
}

export default function UserDisplayCard({ user }: UserDisplayCardProps) {
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
                    sizes="small"
                    alt={user.userName}
                    src={user.avatarUrl}
                    sx={{ width: 40, height: 40 }}
                />
                <Box sx={{ mr: 'auto' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                        {user.userName || 'UserName'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {user.emailAddress || 'EmailAddress'}
                    </Typography>
                </Box>
            </Stack>
            <UserDisplayDialog
                user={user}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}