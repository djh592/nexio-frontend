import { Box, Typography, Divider } from "@mui/material";
import FriendRequestList from "@/components/friend/FriendRequestList";

export default function NotificationPageContent() {

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
                Notifications
            </Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <FriendRequestList />
            </Box>
        </Box>
    );
}