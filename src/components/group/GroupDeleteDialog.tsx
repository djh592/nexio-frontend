'use client';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { deleteChats } from '@/lib/api';
import { useCurrentUser } from '@/lib/hooks';



interface GroupDeleteDialogProps {
    chatId: string;
    open: boolean;
    onClose: () => void;
}

export default function GroupDeleteDialog({ chatId, open, onClose }: GroupDeleteDialogProps) {
    const { currentUser } = useCurrentUser();

    const handleDelete = async () => {
        if (currentUser.userId === '') return;
        try {
            const response = await deleteChats(chatId, { fromUserId: currentUser.userId });
            if (response.code !== 0) {
                throw new Error(response.info);
            }
            else {
                onClose();
            }
        }
        catch (e) {
            console.error(e);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Delete Group
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this group?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleDelete} color='error'>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}