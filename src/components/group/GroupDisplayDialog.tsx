'use client';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import GroupParticipantDisplay from '@/components/group/GroupParticipantDisplay';


interface GroupDisplayDialogProps {
    chatId: string;
    open: boolean;
    onClose: () => void;
}


export default function GroupDisplayDialog({ chatId, open, onClose }: GroupDisplayDialogProps) {
    const chat = useLiveQuery(() => db.chats.where('chatId').equals(chatId).first(), [chatId]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll='paper'
        >
            <DialogTitle>
                {chat?.chatName || 'Group Name'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {chat?.createdAt || 'createdAt'}
                </DialogContentText>
                <GroupParticipantDisplay chatParticipantListId={chat?.participantListId || 'placeholder'} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}