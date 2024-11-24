'use client';
import React from "react";
import { Box, Typography } from "@mui/material";
import FriendGroupList from "@/components/friend/FriendGroupList";
import FriendSearch from '@/components/friend/FriendSearch';
import FriendRequestNotificationButton from "@/components/friend/FriendRequestNotificationButton";

export default function FriendPageContent() {
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