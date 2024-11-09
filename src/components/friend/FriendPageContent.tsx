import { Box, Typography, Divider } from "@mui/material";
import FriendList from "@/components/friend/FriendList";
import FriendSearch from '@/components/friend/FriendSearch';

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
            <FriendSearch />
            <FriendList />
        </Box>
    );
}