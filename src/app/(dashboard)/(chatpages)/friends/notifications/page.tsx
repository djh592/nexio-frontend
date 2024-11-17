import { Box } from '@mui/material';
import NotificationPageContent from '@/components/friend/NotificationPageContent';

export default function NotificationsPage() {
    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
            }}
        >
            <NotificationPageContent />
        </Box>
    );
}