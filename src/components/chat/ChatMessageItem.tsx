'use client';
import React, { useState, useEffect} from 'react';
import { useCurrentUser } from '@/lib/hooks';
import { Box } from '@mui/material';
import { ChatMessage } from "@/lib/definitions";
import ChatMessageBubble from '@/components/chat/ChatMessageBubble';
import ChatUserAvatar from '@/components/chat/ChatUserAvatar';

interface ChatMessageItemProps {
    message: ChatMessage;
}

export default function ChatMessageItem({ message }: ChatMessageItemProps) {
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
            {!isMe && <ChatUserAvatar userId={message.fromUserId} />}
            <ChatMessageBubble message={message} />
            {isMe && <ChatUserAvatar userId={message.fromUserId} />}
        </Box>
    );
}