'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { updateChatJoinRequestList } from '@/lib/storage';
import { useCurrentUser } from '@/lib/hooks';
import GroupJoinRequestItem from '@/components/group/GroupJoinRequestItem';

interface GroupJoinRequestItemListProps {
    joinRequestListId: string;
}

export default function GroupJoinRequestItemList({ joinRequestListId }: GroupJoinRequestItemListProps) {
    const { currentUser } = useCurrentUser();
    const joinRequestList = useLiveQuery(
        () => db.chatJoinRequestLists.where('joinRequestListId').equals(joinRequestListId).first(),
        [joinRequestListId]
    );

    if (currentUser) {
        updateChatJoinRequestList(currentUser.userId, joinRequestListId);
    }

    if (!joinRequestList) {
        return (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                No join requests found
            </Typography>
        );
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {joinRequestList.joinRequests.map((joinRequest) => (
                <GroupJoinRequestItem
                    key={joinRequest.joinRequestId}
                    joinRequestListId={joinRequestListId}
                    joinRequest={joinRequest}
                />
            ))}
        </Box>
    );
}