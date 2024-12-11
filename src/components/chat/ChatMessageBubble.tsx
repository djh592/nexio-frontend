'use client';
import React, { useState, useEffect, MouseEvent } from 'react';
import { useCurrentUser } from '@/lib/hooks';
import { Box } from '@mui/material';
import { ChatMessage } from "@/lib/definitions";
import ChatMessageBubbleContent from '@/components/chat/ChatMessageBubbleContent';
import ChatUserAvatar from '@/components/chat/ChatUserAvatar';
import MessageContextMenu from '@/components/chat/MessageContextMenu';

interface ChatMessageBubbleProps {
    message: ChatMessage;
}

export default function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
    const { currentUser } = useCurrentUser();
    const [isMe, setIsMe] = useState<boolean>(false);
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    useEffect(() => {
        setIsMe(currentUser.userId === message.fromUserId);
    }, [currentUser.userId, message.fromUserId]);

    const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                      mouseX: event.clientX - 2,
                      mouseY: event.clientY - 4,
                  }
                : null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleWithdraw = () => {
        // 撤回消息的逻辑
        handleClose();
    };

    const handleDelete = () => {
        // 删除消息的逻辑
        handleClose();
    }

    const handleReply = () => {
        // 回复消息的逻辑
        handleClose();
    };

    const handleForward = () => {
        // 转发消息的逻辑
        handleClose();
    };

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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: isMe ? 'flex-end' : 'flex-start',
        },
    };

    return (
        <Box sx={styles.bubbleContainer} onContextMenu={handleContextMenu}>
            {!isMe && <ChatUserAvatar userId={message.fromUserId} />}
            <Box sx={styles.bubble}>
                <ChatMessageBubbleContent content={message.content} />
            </Box>
            {isMe && <ChatUserAvatar userId={message.fromUserId} />}
            <MessageContextMenu
                anchorReference="anchorPosition"
                anchorPosition={contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
                open={Boolean(contextMenu)}
                onClose={handleClose}
                onWithdraw={handleWithdraw}
                onDelete={handleDelete}
                onReply={handleReply}
                onForward={handleForward}
            />
        </Box>
    );
}