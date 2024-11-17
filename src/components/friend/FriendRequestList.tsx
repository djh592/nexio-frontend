'use client';
import React from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';
import { useAppSelector } from '@/lib/hooks';
import FriendRequestDisplayCard from './FriendRequestDisplayCard';
import { FriendRequest } from '@/lib/definitions';

export default function FriendRequestList() {
    const sentRequests = useAppSelector((state) => state.friend.sentRequests);
    const receivedRequests = useAppSelector((state) => state.friend.receivedRequests);

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Friend Requests
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
                Received Requests
            </Typography>
            <Stack spacing={2} sx={{ mb: 4 }}>
                {receivedRequests.length > 0 ? (
                    receivedRequests.map((request: FriendRequest) => (
                        <FriendRequestDisplayCard key={request.requestId} request={request} />
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No received requests.
                    </Typography>
                )}
            </Stack>
            <Typography variant="h6" gutterBottom>
                Sent Requests
            </Typography>
            <Stack spacing={2}>
                {sentRequests.length > 0 ? (
                    sentRequests.map((request: FriendRequest) => (
                        <FriendRequestDisplayCard key={request.requestId} request={request} />
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No sent requests.
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}