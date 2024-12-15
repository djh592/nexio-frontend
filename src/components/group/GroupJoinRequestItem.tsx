'use client';
import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { ChatJoinRequest, ChatJoinRequestStatus } from '@/lib/definitions';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCurrentUser } from '@/lib/hooks';
import UserDisplayAvatar from '@/components/user/UserDisplayAvatar';
import { patchJoinRequests } from '@/lib/api';

interface GroupJoinRequestItemProps {
    joinRequestListId: string;
    joinRequest: ChatJoinRequest;
}

export default function GroupJoinRequestItem({ joinRequestListId, joinRequest }: GroupJoinRequestItemProps) {
    const { currentUser } = useCurrentUser();
    const fromUser = useLiveQuery(() => db.users.where('userId').equals(joinRequest.fromUserId).first());

    const handleAccept = async () => {
        if (!currentUser || !fromUser) return;
        try {
            const response = await patchJoinRequests(joinRequestListId, {
                fromUserId: currentUser.userId,
                chatJoinRequest: {
                    ...joinRequest,
                    status: ChatJoinRequestStatus.Accepted,
                },
            });
            if (response.code !== 0) {
                throw new Error(response.info);
            }
        } catch (error) {
            console.log('Error accepting join request:', error);
        }
    };

    const handleReject = async () => {
        if (!currentUser || !fromUser) return;
        try {
            const response = await patchJoinRequests(joinRequestListId, {
                fromUserId: currentUser.userId,
                chatJoinRequest: {
                    ...joinRequest,
                    status: ChatJoinRequestStatus.Rejected,
                },
            });
            if (response.code !== 0) {
                throw new Error(response.info);
            }
        } catch (error) {
            console.log('Error rejecting join request:', error);
        }
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: '1px solid #e0e0e0' }}>
            <UserDisplayAvatar userId={joinRequest.fromUserId} />
            <Box sx={{ marginLeft: 2, flex: 1 }}>
                <Typography variant="body1">{fromUser?.userName}</Typography>
                {joinRequest.status === ChatJoinRequestStatus.Pending ? (
                    <Stack direction="row" spacing={1}>
                        <Button size="small" color="primary" onClick={handleAccept}>
                            Accept
                        </Button>
                        <Button size="small" color="secondary" onClick={handleReject}>
                            Reject
                        </Button>
                    </Stack>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        {joinRequest.status === ChatJoinRequestStatus.Accepted ? 'Accepted' : 'Rejected'}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}