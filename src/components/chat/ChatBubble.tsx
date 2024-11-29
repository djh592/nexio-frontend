import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import { Box } from '@mui/material';
import { ChatMessage } from "@/lib/definitions";
import ChatBubbleContent from '@/components/chat/ChatBubbleContent';

interface ChatBubbleProps {
    message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }: ChatBubbleProps) => {
    const me = useAppSelector((state) => state.auth.user);
    const isMe = message.fromUserId === me.userId;
    const styles = {
        bubble: {
            display: 'inline-block',
            maxWidth: '70%',
            padding: '10px',
            borderRadius: '10px',
            margin: '5px 0',
            backgroundColor: isMe ? '#dcf8c6' : '#ffffff',
            alignSelf: isMe ? 'flex-end' : 'flex-start',
            boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
        },
    };

    return (
        <Box sx={styles.bubble}>
            <ChatBubbleContent content={message.content} />
        </Box>
    );
};

export default ChatBubble;