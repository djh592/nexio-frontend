'use client';
import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '@/lib/hooks';
import { Box } from '@mui/material';
import { ChatMessage, ChatType } from "@/lib/definitions";
import ChatMessageUserAvatar from '@/components/chat/ChatMessageUserAvatar';
import ChatMessageBubble from '@/components/chat/ChatMessageBubble';
import ChatMessageReadBy from '@/components/chat/ChatMessageReadBy';


interface ChatMessageItemProps {
    chatType: ChatType;
    message: ChatMessage;
}

export default function ChatMessageItem({ chatType, message }: ChatMessageItemProps) {
    const { currentUser } = useCurrentUser();
    const [isMe, setIsMe] = useState<boolean>(false);

    useEffect(() => {
        setIsMe(currentUser.userId === message.fromUserId);
    }, [currentUser.userId, message.fromUserId]);

    const styles = {
        bubbleContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: isMe ? 'flex-end' : 'flex-start',
        },
    };

    return (
        <Box sx={styles.bubbleContainer}>
            {isMe ?
                <>
                    <ChatMessageUserAvatar userId={message.fromUserId} />
                    <ChatMessageBubble message={message} />
                    <ChatMessageReadBy meta={message.meta} chatType={chatType} />
                </>
                :
                <>
                    <ChatMessageReadBy meta={message.meta} chatType={chatType} />
                    <ChatMessageBubble message={message} />
                    <ChatMessageUserAvatar userId={message.fromUserId} />
                </>
            }
        </Box>
    );
}