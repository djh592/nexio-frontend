import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useCurrentUser } from '@/lib/hooks';
import { postFriendsRequests } from '@/lib/api';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { upsertFriendRequest } from '@/lib/storage';

interface SendFriendRequestDialogProps {
    toUserId: string;
    open: boolean;
    onClose: () => void;
}

export default function SendFriendRequestDialog({ toUserId, open, onClose }: SendFriendRequestDialogProps) {
    const toUser = useLiveQuery(() => db.users.where('userId').equals(toUserId).first(), [toUserId]);
    const { currentUser } = useCurrentUser();

    const handleSendRequest = async () => {
        if (!toUser) return;
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
        finally {
            onClose();
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
                        Are you sure you want to send a friend request to {toUser?.userName}?
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