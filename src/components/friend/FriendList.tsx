'use client';
import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import { Stack } from '@mui/material';
import UserStack from '@/components/UserStack';

export default function FriendList() {
    const friends = useAppSelector((state) => state.friends.friends);

    return (
        <Stack spacing={2}>
            {friends.map((friend) => (
                <UserStack key={friend.userId} user={friend} />
            ))}
        </Stack>
    );
}