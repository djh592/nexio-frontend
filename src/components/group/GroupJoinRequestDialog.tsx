'use client';
import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import GroupJoinRequestItemList from '@/components/group/GroupJoinRequestItemList';
import { useCurrentUser } from '@/lib/hooks';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { updateChatJoinRequestList } from '@/lib/storage';

interface GroupJoinRequestDialogProps {
    chatId: string;
    open: boolean;
    onClose: () => void;
}

export default function GroupJoinRequestDialog({ chatId, open, onClose }: GroupJoinRequestDialogProps) {
    const { currentUser } = useCurrentUser();
    const joinRequestList = useLiveQuery(() => db.chatJoinRequestLists.where('chatId').equals(chatId).first(), [chatId]);

    useEffect(() => {
        if (currentUser && joinRequestList) {
            updateChatJoinRequestList(currentUser.userId, joinRequestList.joinRequestListId);
        }
    }, [currentUser, joinRequestList]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll='paper'
            fullWidth
        >
            <DialogTitle>Join Requests</DialogTitle>
            <DialogContent>
                {joinRequestList ? (
                    <GroupJoinRequestItemList joinRequestListId={joinRequestList.joinRequestListId} />
                ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                        No join requests found
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}