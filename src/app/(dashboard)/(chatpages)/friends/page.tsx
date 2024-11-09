import { Box } from '@mui/material';
import FriendPageContent from '@/components/friend/FriendPageContent';

export default function FriendsPage() {
    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
            }}
        >
            <FriendPageContent />
        </Box>
    );
}