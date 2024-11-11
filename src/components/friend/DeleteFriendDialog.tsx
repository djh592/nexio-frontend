'use client';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@mui/material';
import { useAppDispatch } from '@/lib/hooks';
import { removeFriend } from '@/lib/features/friend/friendSlice';
import { User } from '@/lib/definitions';

interface DeleteFriendDialogProps {
    user: User;
    open: boolean;
    onClose: () => void;
}

export default function DeleteFriendDialog({ user, open, onClose }: DeleteFriendDialogProps) {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(removeFriend(user));
        onClose();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth maxWidth="sm"
            >
                <DialogTitle>
                    <Typography variant="h6">Confirm Delete Friend</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {user.userName} from your friends?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" variant="contained">
                        Delete Friend
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}