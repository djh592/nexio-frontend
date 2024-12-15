'use client';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useAppSelector } from '@/lib/hooks';
import ChatMessageForwardDialog from '@/components/chat/ChatMessageForwardDialog';

interface ChatMessageForwardButtonProps {
    chatId: string;
}

export default function ChatMessageForwardButton({ chatId }: ChatMessageForwardButtonProps) {
    const isForwarding = useAppSelector(state => state.chat.isForwarding);
    const forwardingMessages = useAppSelector(state => state.chat.forwardingMessages);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                disabled={!(isForwarding && forwardingMessages.length > 0)}
            >
                Forward
            </Button>
            <ChatMessageForwardDialog chatId={chatId} open={open} onClose={() => setOpen(false)} />
        </>
    );
}