'use client';
import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CardActions, Stack, Avatar } from '@mui/material';
import { useCurrentUser} from '@/lib/hooks';
import { FriendRequest, FriendRequestStatus } from '@/lib/definitions';
import { patchFriendsRequests } from '@/lib/api';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { updateUsers, upsertFriendRequest } from '@/lib/storage';

interface FriendRequestDisplayCardProps {
    request: FriendRequest;
}

export default function FriendRequestDisplayCard({ request }: FriendRequestDisplayCardProps) {
    const { currentUser } = useCurrentUser();
    const fromUserId = request.fromUserId;
    const toUserId = request.toUserId;
    const isSender = fromUserId === currentUser.userId;
    const isReceiver = toUserId === currentUser.userId;
    const fromUser = useLiveQuery(() => db.users.where('userId').equals(fromUserId).first());
    const toUser = useLiveQuery(() => db.users.where('userId').equals(toUserId).first());

    useEffect(() => { updateUsers([fromUserId, toUserId]); }, [fromUserId, toUserId]);

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
                try {
                    await upsertFriendRequest(updatedRequest);
                }
                catch (err) {
                    throw new Error(String(err));
                }
            } else {
                throw new Error(response.info);
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
                try {
                    await upsertFriendRequest(updatedRequest);
                }
                catch (err) {
                    throw new Error(String(err));
                }
            } else {
                throw new Error(response.info);
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
                try {
                    await upsertFriendRequest(updatedRequest);
                }
                catch (err) {
                    throw new Error(String(err));
                }
            } else {
                throw new Error(response.info);
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
                    {
                        isSender && fromUser && fromUser.avatarUrl &&
                        <Avatar src={fromUser.avatarUrl} alt={fromUser.userName} />
                    }
                    {
                        isReceiver && toUser && toUser.avatarUrl &&
                        <Avatar src={toUser.avatarUrl} alt={toUser.userName} />
                    }
                    <Box>
                        {isSender && toUser && (
                            <Typography variant="h6">
                                To: {toUser.userName}
                            </Typography>
                        )}
                        {isReceiver && fromUser && (
                            <Typography variant="h6">
                                From: {fromUser.userName}
                            </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary">
                            Status: {request.status}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
            <CardActions>
                {
                    request.status === FriendRequestStatus.Pending && isSender &&
                    <Button size="small" color="warning" onClick={handleCancel}>
                        Cancel
                    </Button>
                }
                {
                    request.status === FriendRequestStatus.Pending && isReceiver &&
                    <>
                        <Button size="small" color="primary" onClick={handleAccept}>
                            Accept
                        </Button>
                        <Button size="small" color="secondary" onClick={handleReject}>
                            Reject
                        </Button>
                    </>
                }
                {
                    request.status === FriendRequestStatus.Accepted &&
                    <Typography variant="body2" color="text.secondary">
                        You are now friends
                    </Typography>
                }
                {
                    request.status === FriendRequestStatus.Rejected &&
                    <Typography variant="body2" color="text.secondary">
                        Friend request rejected
                    </Typography>
                }
            </CardActions>
        </Card>
    );
}