'use client';
import React, { useState, useEffect, MouseEvent } from 'react';
import { useCurrentUser } from '@/lib/hooks';
import { Box, Typography } from '@mui/material';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { ChatType, ChatMessage, ChatMessageMeta } from "@/lib/definitions";
import { patchMessages } from '@/lib/api';
import ChatMessageBubbleContent from '@/components/chat/ChatMessageBubbleContent';
import ChatMessageContextMenu from '@/components/chat/ChatMessageContextMenu';

interface ChatMessageBubbleProps {
    messageListId: string;
    chatType: ChatType;
    message: ChatMessage;
}

export default function ChatMessageBubble({ messageListId, chatType, message }: ChatMessageBubbleProps) {
    const { currentUser } = useCurrentUser();
    const fromUser = useLiveQuery(() => db.users.where('userId').equals(message.fromUserId).first(), [message.fromUserId]);
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

    const handleWithdraw = async () => {
        try {
            const newChatMessage = { ...message };
            const newChatMessageMeta: ChatMessageMeta = {
                ...newChatMessage.meta,
                withdrawn: true,
            };
            newChatMessage.meta = newChatMessageMeta;
            const response = await patchMessages(messageListId, {
                fromUserId: currentUser.userId,
                chatMessage: newChatMessage,
            });
            if (response.code ===0) {
                console.log('Withdraw message successfully');
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            handleClose();
        }
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
        bubbleContainer: {
            display: 'flex',
            maxWidth: '70%',
            flexDirection: 'column',
            alignItems: isMe ? 'flex-end' : 'flex-start',
        },
        bubble: {
            display: 'inline-block',
            padding: '12px 16px',
            borderRadius: '12px',
            alignSelf: isMe ? 'flex-end' : 'flex-start',
            background: isMe
                ? 'linear-gradient(135deg, #308ae9, #eef4f7)' // blue
                : 'linear-gradient(135deg, #eef4f7, #976edb)', // purple
            color: '#133953', // dark blue
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            wordWrap: 'break-word',
        },
        userName: {
            alignSelf: isMe ? 'flex-end' : 'flex-start',
            marginBottom: '4px',
            color: '#888',
        },
    };

    return (
        <Box sx={styles.bubbleContainer}>
            {chatType === ChatType.Group && !isMe && (
                <Typography variant="caption" sx={styles.userName}>
                    {fromUser ? fromUser.userName : 'Unknown User'}
                </Typography>
            )}
            <Box sx={styles.bubble} onContextMenu={handleContextMenu}>
                <ChatMessageBubbleContent content={message.content} />
                <ChatMessageContextMenu
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
        </Box>
    );
}