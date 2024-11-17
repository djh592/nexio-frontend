'use client';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { removeFriend } from '@/lib/features/friend/friendSlice';
import { User } from '@/lib/definitions';

interface DeleteFriendDialogProps {
    friend: User;
    open: boolean;
    onClose: () => void;
}

export default function DeleteFriendDialog({ friend, open, onClose }: DeleteFriendDialogProps) {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const userId = useAppSelector((state) => state.auth.user.userId);

    const handleDelete = async () => {
        try {
            const headers = new Headers();
            headers.append("Authorization", token);
            const response = await fetch(`/api/friends/${friend.userId}`, {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify({ userId: userId })
            });
            if (response.ok) {
                dispatch(removeFriend(friend));
                onClose();
            }
            else {
                const data = await response.json();
                alert("Delete failed: " + data.message);
            }
        } catch (error) {
            console.log('Error deleting friend:', error);
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