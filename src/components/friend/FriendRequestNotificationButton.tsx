'use client';
import React from 'react';
import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

export default function FriendRequestNotificationButton() {
    const router = useRouter();
    const newRequestCount = useAppSelector((state) => state.friend.newRequestCount);

    const handleClick = () => {
        router.push('/notifications');
    };

    return (
        <IconButton
            onClick={handleClick}
            aria-label="notifications"
            sx={{ mx: 1 }}
        >
            <Badge badgeContent={newRequestCount} color="error">
                <NotificationsIcon />
            </Badge>
        </IconButton>
    );
}