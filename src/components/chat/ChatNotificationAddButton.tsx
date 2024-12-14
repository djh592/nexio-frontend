'use client';
import React, { useState } from "react";
import { Button } from '@mui/material';
import ChatNotificationAddDialog from '@/components/chat/ChatNotificationAddDialog';


interface ChatNotificationAddButtonProps {
    notificationListId: string;
}

export default function ChatNotificationButton({ notificationListId }: ChatNotificationAddButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Add Notification
            </Button >
            <ChatNotificationAddDialog notificationListId={notificationListId} open={open} onClose={() => setOpen(false)} />
        </>
    );
}