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
            padding: '12px 16px',
            borderRadius: '12px',
            margin: '8px 0',
            alignSelf: isMe ? 'flex-end' : 'flex-start',
            background: isMe
                ? 'linear-gradient(135deg, #308ae9, #eef4f7)' // blue
                : 'linear-gradient(135deg, #eef4f7, #976edb)', // purple
            color: '#133953', // dark blue
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            wordWrap: 'break-word',
        },
        bubbleContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMe ? 'flex-end' : 'flex-start',
        },
    };

    return (
        <Box sx={styles.bubbleContainer}>
            <Box sx={styles.bubble}>
                <ChatBubbleContent content={message.content} />
            </Box>
        </Box>
    );
};

export default ChatBubble;
