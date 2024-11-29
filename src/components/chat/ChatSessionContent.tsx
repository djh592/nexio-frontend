'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';

interface ChatSessionContentProps {
    chatId: string;
}

export default function ChatSessionContent({ chatId }: ChatSessionContentProps) {
    const chat = useLiveQuery(() => db.chats.get(chatId), [chatId]);
    const [messageListId, setMessageListId] = useState<string | null>(null);
    const [participantListId, setParticipantListId] = useState<string | null>(null);
    const [notificationListId, setNotificationListId] = useState<string | null>(null);
    const [joinRequestListId, setJoinRequestListId] = useState<string | null>(null);

    useEffect(() => {
        if (chat) {
            setMessageListId(chat.messageListId);
            setParticipantListId(chat.participantListId);
            setNotificationListId(chat.notificationListId);
            setJoinRequestListId(chat.joinRequestListId);
        }
    }, [chat]);

    return (
        <>
            <h1>Chat Session</h1>
            <p>Chat ID: {chatId}</p>
            <p>{messageListId}</p>
            <p>{participantListId}</p>
            <p>{notificationListId}</p>
            <p>{joinRequestListId}</p>
        </>
    );
}