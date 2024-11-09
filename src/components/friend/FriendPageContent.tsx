import { Box, Typography, Divider } from "@mui/material";
import FriendList from "@/components/friend/FriendList";

export default function FriendPageContent() {
    return (
        <Box sx={{ width: '100%', padding: 2 }}>
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
            <FriendList />
        </Box>
    );
}