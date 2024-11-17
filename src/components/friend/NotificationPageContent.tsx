'use client';
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Box, Typography, Stack } from "@mui/material";
import FriendRequestList from "@/components/friend/FriendRequestList";
import BackButton from "@/components/BackButton";
import { setSentRequests, setReceivedRequests } from "@/lib/features/friend/friendSlice";

export default function NotificationPageContent() {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const userId = useAppSelector((state) => state.auth.user.userId);

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const headers = new Headers();
                headers.append("Authorization", token);
                const response = await fetch(
                    '/api/friends/requests',
                    {
                        method: 'GET',
                        headers: headers,
                        body: JSON.stringify({
                            userId: userId,
                        })
                    }
                );
                const data = await response.json();
                dispatch(setSentRequests(data.sentRequests));
                dispatch(setReceivedRequests(data.receivedRequests));
            } catch (error) {
                console.log('Failed to fetch friend groups:', error);
            }
        }

        fetchNotifications()
    }, [dispatch, token, userId]);

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <BackButton to="/friends" />
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        ml: 1
                    }}
                >
                    Notifications
                </Typography>
            </Stack>
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <FriendRequestList />
            </Box>
        </Box>
    );
}