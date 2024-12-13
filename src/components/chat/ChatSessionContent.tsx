'use client';
import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { ChatType } from '@/lib/definitions';
import ChatMessageInput from "@/components/chat/ChatMessageInput";
import ChatMessageItemList from '@/components/chat/ChatMessageItemList';

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
        <Box sx={{ p: 1, height: '100%', width: '100%' }}>
            <Box sx={{ height: '10%', width: '100%' }}>
                <Typography variant="h5">
                    {`Chat chatId: ${chatId}; messageListId: ${messageListId}; participantListId: ${participantListId}; notificationListId: ${notificationListId}; joinRequestListId: ${joinRequestListId}`}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ height: '70%', width: '100%' }}>
                <ChatMessageItemList
                    chatType={ChatType.Group}
                    messageListId={messageListId ? messageListId : ''}
                />
            </Box>
            <Box sx={{ height: '20%', width: '100%' }}>
                <ChatMessageInput
                    messageListId={messageListId ? messageListId : ''}
                />
            </Box>
        </Box>
    );
}