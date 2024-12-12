'use client';
import React, { useState, MouseEvent } from 'react';
import { ChatMessageMeta, ChatType } from '@/lib/definitions';
import { Box, Typography } from '@mui/material';
import ChatMessageReadByPopover from '@/components/chat/ChatMessageReadByPopover';

interface ChatMessageReadByProps {
    meta: ChatMessageMeta;
    chatType: ChatType;
}

export default function ChatMessageReadBy({ meta, chatType }: ChatMessageReadByProps) {
    const [popover, setPopover] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const handlePopover = (event: MouseEvent) => {
        event.preventDefault();
        setPopover(
            popover === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : null,
        );
    };

    const handleClose = () => {
        setPopover(null);
    };

    return (
        <Box
            onClick={handlePopover}
            sx={{
                cursor: chatType === ChatType.Group ? 'pointer' : 'default',
                mx: 1,
            }}
        >
            {chatType === ChatType.Private ? (
                <Typography variant="caption" color="textSecondary">
                    {meta.readBy.length > 0 ? 'Read' : 'Unread'}
                </Typography>
            ) : (
                <Typography variant="caption" color="textSecondary">
                    {`${meta.readBy.length} people read`}
                </Typography>
            )}

            <ChatMessageReadByPopover
                anchorReference="anchorPosition"
                anchorPosition={popover ? { top: popover.mouseY, left: popover.mouseX } : undefined}
                open={chatType === ChatType.Group && meta.readBy.length > 0 && popover !== null}
                readBys={meta.readBy}
                onClose={handleClose}
            />
        </Box>
    );
}