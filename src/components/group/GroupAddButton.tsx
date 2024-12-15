'use client';
import React, { useState } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupCreateDialog from '@/components/group/GroupCreateDialog';

export default function GroupAddButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Tooltip title="Add Group">
                <IconButton sx={{ mx: 1 }} onClick={() => setOpen(true)}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Tooltip>
            <GroupCreateDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
}