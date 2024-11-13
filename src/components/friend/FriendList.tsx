'use client';
import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import { Box, Stack } from '@mui/material';
import UserStack from '@/components/UserStack';

export default function FriendList() {
    const friendGroups = useAppSelector((state) => state.friend.friendGroups);
    // const friends = [
    //     {
    //         userId: '1',
    //         userName: 'User1',
    //         emailAddress: '',
    //         phoneNumber: '',
    //         avatarUrl: '',
    //     },
    //     {
    //         userId: '2',
    //         userName: 'User2',
    //         emailAddress: '',
    //         phoneNumber: '',
    //         avatarUrl: '',
    //     },
    //     {
    //         userId: '3',
    //         userName: 'User3',
    //         emailAddress: '',
    //         phoneNumber: '',
    //         avatarUrl: '',
    //     },
    //     {
    //         userId: '4',
    //         userName: 'User4',
    //         emailAddress: '',
    //         phoneNumber: '',
    //         avatarUrl: '',
    //     },
    //     {
    //         userId: '5',
    //         userName: 'User5',
    //         emailAddress: '',
    //         phoneNumber: '',
    //         avatarUrl: '',
    //     },
    //     {
    //         userId: '6',
    //         userName: 'User6',
    //         emailAddress: '',
    //         phoneNumber: '',
    //         avatarUrl: '',
    //     },
    //     {
    //         userId: '7',
    //         userName: 'User7',
    //         emailAddress: '',
    //         phoneNumber: '',
    //         avatarUrl: '',
    //     },
    //     {
    //         userId: '8',
    //         userName: 'User8',
    //         emailAddress: '',
    //         phoneNumber: '',
    //         avatarUrl: '',
    //     },
    //     {
    //         userId: '9',
    //         userName: 'User9',
    //         emailAddress: '',
    //         phoneNumber: '',
    //         avatarUrl: '',
    //     },
    //     {
    //         userId: '10',
    //         userName: 'User10',
    //         emailAddress: '',
    //         phoneNumber: '',
    //         avatarUrl: '',
    //     },
    // ];

    return (
        <Box sx={{ height: '100%', overflowY: 'auto' }}>
            <Stack spacing={2} >
                {friendGroups.map((group) => (
                    <Stack key={group.groupName} spacing={1}>
                        {group.friends.map((friend) => (
                            <UserStack key={friend.userId} user={friend} />
                        ))}
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
}