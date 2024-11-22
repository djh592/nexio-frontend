import { Box } from '@mui/material';
import ChatPageContent from '@/components/chat/ChatPageContent';

export default function ChatsPage() {
    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
            }}
        >
            <ChatPageContent />
        </Box>
    );
}