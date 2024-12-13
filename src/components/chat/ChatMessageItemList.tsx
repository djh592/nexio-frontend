'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import ChatMessageItem from '@/components/chat/ChatMessageItem';
import ChatMessageTimestamp from '@/components/chat/ChatMessageTimestamp';
import ChatMessageWithdrawn from '@/components/chat/ChatMessageWithdrawn';
import { ChatMessage, ChatType } from '@/lib/definitions';

interface ChatMessageItemListProps {
    chatType: ChatType;
    messageListId: string;
}

export default function ChatMessageItemList({ chatType, messageListId }: ChatMessageItemListProps) {
    const messageList = useLiveQuery(() => db.chatMessageLists.where('messageListId').equals(messageListId).first(), [messageListId]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        if (messageList) {
            setMessages(messageList.messages);
        }
    }, [messageList]);

    const renderMessages = () => {
        if (!messages.length) return null;

        const renderedMessages = [];
        let lastTimestamp = new Date(messages[0].createdAt).getTime() - 100 * 60 * 1000;

        renderedMessages.push(
            <ChatMessageTimestamp key={`timestamp-${messages[0].messageId}`} timestamp={messages[0].createdAt} />
        );

        messages.forEach(message => {
            const currentTimestamp = new Date(message.createdAt).getTime();
            const timeDiff = currentTimestamp - lastTimestamp;

            if (timeDiff > 5 * 60 * 1000) { // 5 minutes
                renderedMessages.push(
                    <ChatMessageTimestamp key={`timestamp-${message.messageId}`} timestamp={message.createdAt} />
                );
                lastTimestamp = currentTimestamp;
            }

            if (message.meta.deleted) return;

            if (message.meta.withdrawn) {
                renderedMessages.push(
                    <ChatMessageWithdrawn key={message.messageId} fromUserId={message.fromUserId} />
                );
            } else {
                renderedMessages.push(
                    <ChatMessageItem key={message.messageId} messageListId={messageListId} chatType={chatType} message={message} />
                );
            }
        });

        return renderedMessages;
    };

    return (
        <Box sx={{ width: '100%', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {renderMessages()}
        </Box>
    );
}