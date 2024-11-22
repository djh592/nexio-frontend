import { Box } from "@mui/material";
import ChatItem from "./ChatItem";
import { Chat } from "@/lib/definitions";


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
                chat={
                    {
                        chatId: "1",
                        createdAt: "2022-01-01T00:00:00Z",
                        participants: [
                            {
                                userId: "1",
                                userName: "Alice",
                                avatarUrl: "/images/alice.png",
                            },
                            {
                                userId: "2",
                                userName: "Bob",
                                avatarUrl: "/images/bob.png",
                            },
                        ],
                        messages: [
                            {
                                messageId: "1",
                                createdAt: "2022-01-01T00:00:00Z",
                                fromUserId: "1",
                                type: "Text",
                                content: "Hello, Bob!",
                            },
                            {
                                messageId: "2",
                                createdAt: "2022-01-01T00:00:01Z",
                                fromUserId: "2",
                                type: "Text",
                                content: "Hi, Alice!",
                            },
                        ],
                    } as Chat
                }
            />
        </Box>
    );
}