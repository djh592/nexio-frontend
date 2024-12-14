'use client';
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem } from '@mui/material';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import ChatNotificationItem from "@/components/chat/ChatNotificationItem";


interface ChatNotificationListDialogProps {
    notificationListId: string;
    open: boolean;
    onClose: () => void;
}

export default function ChatNotificationListDialog({ notificationListId, open, onClose }: ChatNotificationListDialogProps) {
    const notificationList = useLiveQuery(() => db.chatNotificationLists.where('notificationListId').equals(notificationListId).first(), [notificationListId]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll='paper'
        >
            <DialogTitle>
                Notifications
            </DialogTitle>
            <DialogContent>
                <List>
                    {notificationList?.notifications.map((notification) => (
                        <ListItem key={notification.notificationId}>
                            <ChatNotificationItem notification={notification} />
                        </ListItem>))
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}