'use client';
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@mui/material';
import { useAppDispatch } from '@/lib/hooks';
import { removeFriend } from '@/lib/features/friends/friendsSlice';
import { User } from '@/lib/definitions';

interface DeleteFriendDialogProps {
    user: User;
    onClose: () => void;
}

export default function DeleteFriendDialog({ user, onClose }: DeleteFriendDialogProps) {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(removeFriend(user));
        setOpen(false);
        onClose();
    };

    return (
        <>
            <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
                Delete Friend
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Typography variant="h6">Confirm Delete Friend</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {user.userName} from your friends?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}