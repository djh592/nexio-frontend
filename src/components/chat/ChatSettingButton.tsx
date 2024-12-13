'use client';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatSettingPopover from '@/components/chat/ChatSettingPopover';

interface ChatSettingButtonProps {
    chatId: string;
}

export default function ChatSettingButton({ chatId }: ChatSettingButtonProps) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton >
            <ChatSettingPopover
                chatId={chatId}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setOpen(false)}
            />
        </>
    );
}