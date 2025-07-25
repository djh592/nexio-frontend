'use client';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import GroupJoinDialog from '@/components/group/GroupJoinDialog';

interface GroupJoinButtonProps {
    chatId: string;
}

export default function GroupJoinButton({ chatId }: GroupJoinButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Join Chat
            </Button>
            <GroupJoinDialog chatId={chatId} open={open} onClose={() => setOpen(false)} />
        </>
    );
}