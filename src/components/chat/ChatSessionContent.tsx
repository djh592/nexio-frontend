'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { ChatType, ChatMessageContentType } from '@/lib/definitions';
import ChatMessageItem from '@/components/chat/ChatMessageItem';
import ChatMessageReadBy from './ChatMessageReadBy';

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
            <ChatMessageItem
                message={
                    {
                        messageId: "0",
                        createdAt: '2021-10-01T00:00:00Z',
                        fromUserId: '2',
                        content: { contentType: ChatMessageContentType.Text, contentPayload: btoa('Hello, World!') },
                        meta: { withdrawn: false, deleted: false, readBy: [], repliedBy: [] }
                    }}
                chatType={ChatType.Group}
            />
            <ChatMessageReadBy
                meta={{
                    withdrawn: false, deleted: false, readBy: [
                        '1', '2', '3'
                    ], repliedBy: []
                }}
                chatType={ChatType.Group}
            />
            <ChatMessageReadBy
                meta={{
                    withdrawn: false, deleted: false, readBy: [
                        '2'
                    ], repliedBy: []
                }}
                chatType={ChatType.Private}
            />
        </>
    );
}