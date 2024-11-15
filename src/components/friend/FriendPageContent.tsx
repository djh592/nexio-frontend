'use client';
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { Box, Typography, Divider } from "@mui/material";
import FriendGroupList from "@/components/friend/FriendGroupList";
import FriendSearch from '@/components/friend/FriendSearch';

export default function FriendPageContent() {
    const friendGroups = useAppSelector((state) => state.friend.friendGroups);

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 2 }}>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    ml: 1
                }}
            >
                My Friends
            </Typography>
            <Divider />
            <FriendSearch />
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <FriendGroupList
                    friendGroups={friendGroups}
                />
            </Box>
        </Box>
    );
}