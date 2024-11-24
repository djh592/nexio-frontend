'use client';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { removeFriend } from '@/lib/features/friend/friendSlice';
import { User } from '@/lib/definitions';
import { deleteFriends } from '@/lib/api';

interface DeleteFriendDialogProps {
    friend: User;
    open: boolean;
    onClose: () => void;
}

export default function DeleteFriendDialog({ friend, open, onClose }: DeleteFriendDialogProps) {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.user.userId);

    const handleDelete = async () => {
        try {
            const response = await deleteFriends(
                {
                    userId: userId,
                    friendId: friend.userId
                });
            if (response.code === 0) {
                dispatch(removeFriend(friend));
            }
            else {
                console.log('Error deleting friend:', response.info);
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
                        Are you sure you want to delete {friend.userName} from your friends?
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