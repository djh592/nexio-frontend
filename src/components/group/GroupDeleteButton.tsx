'use client';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import GroupDeleteDialog from '@/components/group/GroupDeleteDialog';

interface GroupDeleteButtonProps {
    chatId: string;
}

export default function GroupDeleteButton({ chatId }: GroupDeleteButtonProps) {
    const [open, setOpen] = useState(false);


    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Delete Group
            </Button>
            <GroupDeleteDialog chatId={chatId} open={open} onClose={() => setOpen(false)} />
        </>
    );
}