import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useAppDispatch } from '@/lib/hooks';
import { addSentRequest } from '@/lib/features/friend/friendSlice';
import { User, FriendRequestStatus } from '@/lib/definitions';

interface SendFriendRequestDialogProps {
    user: User;
    open: boolean;
    onClose: () => void;
}

export default function SendFriendRequestDialog({ user, open, onClose }: SendFriendRequestDialogProps) {
    const dispatch = useAppDispatch();

    const handleSendRequest = () => {
        dispatch(addSentRequest({ requestId: '', createdAt: new Date().toISOString(), fromUserId: user.userId, toUserId: user.userId, status: FriendRequestStatus.Pending }));
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    Confirm Send Friend Request
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