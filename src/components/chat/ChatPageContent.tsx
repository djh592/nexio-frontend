import { Box, Typography } from "@mui/material";
import ChatItemList from "@/components/chat/ChatItemList";

export default function ChatPageContent() {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 2 }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    marginLeft: 1,
                    marginBottom: 1
                }}
            >
                Chats
            </Typography>
            <ChatItemList />
        </Box>
    );
}