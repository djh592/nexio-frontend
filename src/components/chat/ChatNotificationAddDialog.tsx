'use client';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useCurrentUser } from '@/lib/hooks';
import { postNotifications } from '@/lib/api';

interface ChatNotificationAddDialogProps {
    notificationListId: string;
    open: boolean;
    onClose: () => void;
}

export default function ChatNotificationAddDialog({ notificationListId, open, onClose }: ChatNotificationAddDialogProps) {
    const { currentUser } = useCurrentUser();
    const [notificationContent, setNotificationContent] = useState('');

    const handleSendNotification = async () => {
        if (!currentUser) return;
        try {
            const response = await postNotifications(notificationListId, {
                fromUserId: currentUser.userId,
                notification: notificationContent,
            });
            if (response.code !== 0) {
                throw new Error(response.info);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Add Notification</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Notification Content"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={notificationContent}
                    onChange={(e) => setNotificationContent(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSendNotification} color="primary">Send</Button>
            </DialogActions>
        </Dialog>
    );
}