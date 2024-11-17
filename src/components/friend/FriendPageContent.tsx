'use client';
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Box, Typography, Divider } from "@mui/material";
import FriendGroupList from "@/components/friend/FriendGroupList";
import FriendSearch from '@/components/friend/FriendSearch';
import FriendRequestNotificationButton from "@/components/friend/FriendRequestNotificationButton";
import { setFriendGroups } from "@/lib/features/friend/friendSlice";

export default function FriendPageContent() {
    const dispatch = useAppDispatch();
    const friendGroups = useAppSelector((state) => state.friend.friendGroups);

    useEffect(() => {
        async function fetchFriendGroups() {
            try {
                const response = await fetch('/api/friends');
                const data = await response.json();
                dispatch(setFriendGroups(data.friendGroups));
            } catch (error) {
                console.log('Failed to fetch friend groups:', error);
            }
        }

        fetchFriendGroups();
    }, [dispatch]);

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 2 }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    ml: 1
                }}
            >
                Friends
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', mb: 2 }}>
                <FriendSearch />
                <FriendRequestNotificationButton />
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <FriendGroupList
                    friendGroups={friendGroups}
                />
            </Box>
        </Box>
    );
}