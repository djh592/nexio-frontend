import React, { useState } from 'react';
import { Button } from '@mui/material';
import GroupInviteDialog from '@/components/group/GroupInviteDialog';


interface GroupInviteButtonProps {
    chatId: string;
}

export default function GroupInviteButton({ chatId }: GroupInviteButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Invite Friend
            </Button>
            <GroupInviteDialog chatId={chatId} open={open} onClose={() => setOpen(false)} />
        </>
    )
}