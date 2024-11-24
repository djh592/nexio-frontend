'use client';
import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions, Stack, Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { FriendRequest, FriendRequestStatus } from '@/lib/definitions';
import { updateRequest } from '@/lib/features/friend/friendSlice';
import { patchFriendsRequests } from '@/lib/api';

interface FriendRequestDisplayCardProps {
    request: FriendRequest;
}

export default function FriendRequestDisplayCard({ request }: FriendRequestDisplayCardProps) {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.user.userId);

    const handleAccept = async () => {
        try {
            const response = await patchFriendsRequests({
                friendRequest: {
                    ...request,
                    status: FriendRequestStatus.Accepted
                }
            });
            if (response.code === 0) {
                const updatedRequest = response.friendRequest;
                dispatch(updateRequest(updatedRequest));
            } else {
                console.log('Failed to accept friend request:', response.info);
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await patchFriendsRequests({
                friendRequest: {
                    ...request,
                    status: FriendRequestStatus.Rejected
                }
            });
            if (response.code === 0) {
                const updatedRequest = response.friendRequest;
                dispatch(updateRequest(updatedRequest));
            } else {
                console.log('Failed to reject friend request:', response.info);
            }
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    const handleCancel = async () => {
        try {
            const response = await patchFriendsRequests({
                friendRequest: {
                    ...request,
                    status: FriendRequestStatus.Canceled
                }
            });
            if (response.code === 0) {
                const updatedRequest = response.friendRequest;
                dispatch(updateRequest(updatedRequest));
            } else {
                console.log('Failed to cancel friend request:', response.info);
            }
        } catch (error) {
            console.error('Error cancelling friend request:', error);
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