import { Box } from "@mui/material";
import ChatItem from "./ChatItem";
import { ChatType } from "@/lib/definitions";


export default function ChatPageContent() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
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