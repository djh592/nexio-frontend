'use client';
import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions, Stack, Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { FriendRequest, FriendRequestStatus } from '@/lib/definitions';
import { updateRequest, removeSentRequest } from '@/lib/features/friend/friendSlice';

interface FriendRequestDisplayCardProps {
    request: FriendRequest;
}

export default function FriendRequestDisplayCard({ request }: FriendRequestDisplayCardProps) {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const userId = useAppSelector((state) => state.auth.user.userId);

    const handleAccept = async () => {
        try {
            const response = await fetch('/friends/requests', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    FriendRequest: {
                        ...request,
                        status: FriendRequestStatus.Accepted
                    }
                })
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(updateRequest(data.FriendRequest));
            } else {
                console.error('Failed to accept friend request');
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch('/friends/requests', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    FriendRequest: {
                        ...request,
                        status: FriendRequestStatus.Rejected
                    }
                })
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(updateRequest(data.FriendRequest));
            } else {
                console.error('Failed to reject friend request');
            }
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    const handleCancel = async () => {
        try {
            const response = await fetch('/friends/requests', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    FriendRequest: {
                        ...request,
                        status: FriendRequestStatus.Canceled
                    }
                })
            });
            if (response.ok) {
                const data = await response.json();
                dispatch(removeSentRequest(request.requestId));
            } else {
                console.error('Failed to cancel friend request');
            }
        } catch (error) {
            console.error('Error canceling friend request:', error);
        }
    };

    return (
        <Card sx={{
            width: '100%',
            border: 'none',
            boxShadow: 'none',
        }}>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={request.fromUserId} src={`/api/avatar/${request.fromUserId}`} />
                    <Box>
                        <Typography variant="h6">
                            {request.fromUserId === userId ? `To: ${request.toUserId}` : `From: ${request.fromUserId}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Status: {request.status}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
            <CardActions>
                {request.fromUserId !== userId && request.status === FriendRequestStatus.Pending && (
                    <>
                        <Button size="small" color="primary" onClick={handleAccept}>
                            Accept
                        </Button>
                        <Button size="small" color="secondary" onClick={handleReject}>
                            Reject
                        </Button>
                    </>
                )}
                {request.fromUserId === userId && request.status === FriendRequestStatus.Pending && (
                    <Button size="small" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}