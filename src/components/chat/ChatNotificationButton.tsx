'use client';
import React, { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import ChatNotificationListDialog from "./ChatNotificationListDialog";


interface ChatNotificationButtonProps {
    chatId: string;
}

export default function ChatNotificationButton({ chatId }: ChatNotificationButtonProps) {
    const chat = useLiveQuery(() => db.chats.where('chatId').equals(chatId).first(), [chatId]);

    const [open, setOpen] = useState(false);

    const [notificationListId, setNotificationListId] = useState<string>('');
    useEffect(() => {
        if (!chat) {
            setNotificationListId('');
        }
        else {
            setNotificationListId(chat.notificationListId);
        }
    }, [chat]);

    return (
        <>
            <IconButton>
                <NotificationsIcon />
            </IconButton>
            <ChatNotificationListDialog notificationListId={notificationListId} open={open} onClose={() => setOpen(false)} />
        </>
    );
}