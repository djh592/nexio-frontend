'use client';
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Box, Typography } from "@mui/material";
import FriendGroupList from "@/components/friend/FriendGroupList";
import FriendSearch from '@/components/friend/FriendSearch';
import FriendRequestNotificationButton from "@/components/friend/FriendRequestNotificationButton";
import { setFriendGroups } from "@/lib/features/friend/friendSlice";
import { getFriends } from "@/lib/api";

export default function FriendPageContent() {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const userId = useAppSelector((state) => state.auth.user.userId);

    useEffect(() => {
        async function fetchFriendGroups() {
            try {
                const response = await getFriends({
                    userId: userId,
                });
                if (response.code === 0) {
                    const friendGroups = response.friendGroups;
                    dispatch(setFriendGroups(friendGroups));
                }
                else {
                    console.log('Failed to fetch friend groups:', response.info);
                }
            } catch (error) {
                console.log('Failed to fetch friend groups:', error);
            }
        }

        fetchFriendGroups();
    }, [dispatch, token, userId]);

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
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', my: 1 }}>
                <FriendSearch />
                <FriendRequestNotificationButton />
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <FriendGroupList />
            </Box>
        </Box>
    );
}