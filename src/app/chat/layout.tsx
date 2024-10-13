import { Box } from '@mui/material';
import ChatAppBar from '@/components/chat/ChatAppBar';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ChatAppBar />
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                }}
            >
                {children}
            </Box>
        </>
    );
}