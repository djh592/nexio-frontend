import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@mui/material';
import { useAppDispatch } from '@/lib/hooks';
import { addSentRequest } from '@/lib/features/friends/friendsSlice';
import { User } from '@/lib/definitions';

interface SendFriendRequestDialogProps {
    user: User;
    open: boolean;
    onClose: () => void;
}

export default function SendFriendRequestDialog({ user, open, onClose }: SendFriendRequestDialogProps) {
    const dispatch = useAppDispatch();

    const handleSendRequest = () => {
        dispatch(addSentRequest({ requestId: '', createdAt: new Date().toISOString(), fromUser: user, toUser: user, status: 'pending' }));
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Typography variant="h6">Confirm Send Friend Request</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to send a friend request to {user.userName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSendRequest} color="primary" variant="contained">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}