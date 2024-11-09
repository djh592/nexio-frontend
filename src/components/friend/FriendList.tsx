'use client';
import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import { Box, Typography, Stack } from '@mui/material';
import UserStack from '@/components/UserStack';

export default function FriendList() {
    const friends = useAppSelector((state) => state.friends.friends);

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                My Friends
            </Typography>
            <Stack spacing={2}>
                {friends.map((friend) => (
                    <UserStack key={friend.userId} user={friend} />
                ))}
            </Stack>
        </Box>
    );
}