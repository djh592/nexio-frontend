import { Box, Typography } from "@mui/material";
import { ChatType } from "@/lib/definitions";
import ChatItem from "./ChatItem";
import ChatItemList from "./ChatItemList";

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
            <ChatItem
                chat={{
                    chatId: "1",
                    createdAt: new Date().toISOString(),
                    chatType: ChatType.Group,
                    chatName: "Group Chat",
                    chatAvatarUrl: "",
                    chatSettings: {
                        isMuted: false,
                        isPinned: false,
                    },
                    messageListId: "1",
                    participantListId: "1",
                    notificationListId: "1",
                    joinRequestListId: "1",
                }}
            />
        </Box>
    );
}