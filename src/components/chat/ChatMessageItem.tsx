'use client';
import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '@/lib/hooks';
import { Box } from '@mui/material';
import { ChatMessage, ChatType } from "@/lib/definitions";
import ChatMessageUserAvatar from '@/components/chat/ChatMessageUserAvatar';
import ChatMessageBubble from '@/components/chat/ChatMessageBubble';
import ChatMessageReadBy from '@/components/chat/ChatMessageReadBy';

interface ChatMessageItemProps {
    messageListId: string;
    chatType: ChatType;
    message: ChatMessage;

}

export default function ChatMessageItem({ messageListId, chatType, message }: ChatMessageItemProps) {
    const { currentUser } = useCurrentUser();
    const [isMe, setIsMe] = useState<boolean>(false);

    useEffect(() => {
        setIsMe(currentUser.userId === message.fromUserId);
    }, [currentUser.userId, message.fromUserId]);

    const styles = {
        bubbleContainer: {
            width: '100%',
            my: 4,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: isMe ? 'flex-end' : 'flex-start',
        },
        readByContainer: {
            display: 'flex',
            alignItems: 'flex-end',
        },
    };

    return (
        <Box sx={styles.bubbleContainer}>
            {isMe ? (
                <>
                    <Box sx={styles.readByContainer}>
                        <ChatMessageReadBy meta={message.meta} chatType={chatType} />
                    </Box>
                    <ChatMessageBubble messageListId={messageListId} chatType={chatType} message={message} />
                    <ChatMessageUserAvatar userId={message.fromUserId} />
                </>
            ) : (
                <>
                    <ChatMessageUserAvatar userId={message.fromUserId} />
                    <ChatMessageBubble messageListId={messageListId} chatType={chatType} message={message} />
                    <Box sx={styles.readByContainer}>
                        <ChatMessageReadBy meta={message.meta} chatType={chatType} />
                    </Box>
                </>
            )}
        </Box>
    );
}