'use client';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupJoinRequestDialog from '@/components/group/GroupJoinRequestDialog';

interface GroupJoinRequestButtonProps {
    chatId: string;
}

export default function GroupJoinButton({ chatId }: GroupJoinRequestButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton onClick={() => setOpen(true)}>
                <GroupAddIcon />
            </IconButton>
            <GroupJoinRequestDialog chatId={chatId} open={open} onClose={() => setOpen(false)} />
        </>
    );
}