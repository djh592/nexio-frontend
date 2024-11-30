import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useCurrentUser } from '@/lib/hooks';
import { User } from '@/lib/definitions';
import { postFriendsRequests } from '@/lib/api';
import { upsertFriendRequest } from '@/lib/storage';

interface SendFriendRequestDialogProps {
    toUser: User;
    open: boolean;
    onClose: () => void;
}

export default function SendFriendRequestDialog({ toUser, open, onClose }: SendFriendRequestDialogProps) {
    const { currentUser } = useCurrentUser();

    const handleSendRequest = async () => {
        try {
            const response = await postFriendsRequests({
                fromUserId: currentUser.userId,
                toUserId: toUser.userId
            });
            if (response.code === 0) {
                const newFriendRequest = response.friendRequest;
                try {
                    await upsertFriendRequest(newFriendRequest);
                }
                catch (err) {
                    throw new Error(String(err));
                }
            }
            else {
                throw new Error(response.info);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    Confirm Send Friend Request
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to send a friend request to {toUser.userName}?
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