'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCurrentUser } from '@/lib/hooks';
import { FriendRequestStatus } from '@/lib/definitions';


export function FriendRequestNotificationButtonLoading() {
    return (
        <IconButton
            disabled
            aria-label="notifications"
            sx={{ mx: 1 }}
        >
            <NotificationsIcon />
        </IconButton>
    );
}

export function FriendRequestNotificationButtonReady() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleNavigation = () => {
        const params = new URLSearchParams(searchParams);
        replace(`/friends/notifications?${params.toString()}`);
    };

    const [newRequestCount, setNewRequestCount] = useState(0);
    const { currentUser } = useCurrentUser();
    const receivedFriendRequests = useLiveQuery(() => {
        return db.friendRequests.where('toUserId').equals(currentUser?.userId).toArray();
    }, [currentUser]);

    useEffect(() => {
        if (receivedFriendRequests) {
            const count = receivedFriendRequests.filter((request) => request.status === FriendRequestStatus.Pending).length;
            setNewRequestCount(count);
        }
    }
        , [receivedFriendRequests]);

    const [invisible, setInvisible] = useState(newRequestCount === 0);
    useEffect(() => {
        setInvisible(newRequestCount === 0);
    }, [newRequestCount]);

    return (
        <IconButton
            onClick={handleNavigation}
            aria-label="notifications"
            sx={{ mx: 1 }}
        >
            <Badge
                color="error"
                badgeContent={newRequestCount}
                invisible={invisible}
            >
                <NotificationsIcon />
            </Badge>
        </IconButton>
    );
}

export default function FriendRequestNotificationButton() {
    return (
        <Suspense fallback={<FriendRequestNotificationButtonLoading />}>
            <FriendRequestNotificationButtonReady />
        </Suspense>
    );
}