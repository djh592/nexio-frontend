'use client';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useCurrentUser } from '@/lib/hooks';
import { deleteFriends } from '@/lib/api';
import { removeFriend } from '@/lib/storage';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';

interface DeleteFriendDialogProps {
    friendUserId: string;
    open: boolean;
    onClose: () => void;
}

export default function DeleteFriendDialog({ friendUserId, open, onClose }: DeleteFriendDialogProps) {
    const friend = useLiveQuery(() => db.users.get(friendUserId), [friendUserId]);
    const { currentUser } = useCurrentUser();

    const handleDelete = async () => {
        try {
            if (!friend) return;
            const response = await deleteFriends(
                {
                    userId: currentUser.userId,
                    friendId: friend.userId
                });
            if (response.code === 0) {
                try {
                    await removeFriend(friend.userId);
                }
                catch (err) {
                    throw new Error(String(err));
                }
            }
            else {
                throw new Error(response.info);
            }
        } catch (error) {
            console.log('Error deleting friend:', error);
        } finally {
            onClose();
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth maxWidth="sm"
            >
                <DialogTitle>
                    Confirm Delete Friend
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {friend?.userName} from your friends?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="secondary" variant="contained">
                        Delete Friend
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}