import { Box } from '@mui/material';
import FriendRequestList from '@/components/friend/FriendRequestList';

export default function NotificationsPage() {
    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
            }}
        >
            <FriendRequestList />
        </Box>
    );
}