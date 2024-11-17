'use client';
import { Box, Typography, Stack } from "@mui/material";
import FriendRequestList from "@/components/friend/FriendRequestList";
import BackButton from "@/components/BackButton";

export default function NotificationPageContent() {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <BackButton to="/friends" />
                <Typography
                    variant="h5"
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