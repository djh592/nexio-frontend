'use client';
import React, { useEffect } from 'react';
import { Popover, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { updateUsers } from '@/lib/storage';

interface ChatMessageReadByPopoverProps {
    anchorReference: 'anchorPosition';
    anchorPosition: { top: number; left: number } | undefined;
    open: boolean;
    readBys: string[];
    onClose: () => void;
}

export default function ChatMessageReadByPopover({
    anchorReference,
    anchorPosition,
    open,
    readBys,
    onClose,
}: ChatMessageReadByPopoverProps) {
    const users = useLiveQuery(() => db.users.where('userId').anyOf(readBys).toArray(), [readBys]);

    useEffect(() => {
        if (users?.length !== readBys.length) {
            updateUsers(readBys);
        }
    }, [readBys, users?.length]);

    return (
        <Popover
            anchorReference={anchorReference}
            anchorPosition={anchorPosition}
            open={open}
            onClose={onClose}
            sx={{ maxHeight: 300 }}
        >
            <List>
                {users?.map((user) => (
                    <ListItem key={user.userId}>
                        <Avatar
                            alt={user.userName}
                            src={user.avatarUrl}
                            sx={{ width: 30, height: 30, mr: 1 }}
                        />
                        <ListItemText primary={user.userName} />
                    </ListItem>
                ))}
            </List>
        </Popover>
    );

}