import React, { useState } from 'react';
import { Box, Avatar, Stack, Typography, Dialog } from "@mui/material";
import { User } from "@/lib/definitions";
import UserDialog from './UserDialog';

interface UserStackProps {
    user: User;
}

export default function UserStack({ user }: UserStackProps) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 2,
                    alignItems: 'center',
                    width: '100%',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    },
                }}
                onClick={handleClick}
            >
                <Avatar
                    sizes="small"
                    alt={user.userName}
                    src={user.avatarUrl}
                    sx={{ width: 40, height: 40 }}
                />
                <Box sx={{ mr: 'auto' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                        {user.userName || 'UserName'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {user.emailAddress || 'EmailAddress'}
                    </Typography>
                </Box>
            </Stack>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <UserDialog user={user} onClose={handleClose} />
            </Dialog>
        </>
    );
}