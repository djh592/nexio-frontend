'use client';
import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from "@/lib/hooks";
import { Avatar, Badge, Box, ListItem, ListItemAvatar, Typography, } from "@mui/material";
import { Chat } from "@/lib/definitions";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { getUnreadMessageCount } from "@/lib/logic";

type ChatItemContentProps = {
    chat: Chat;
    onClick: () => void;
};

function ChatItemContent({ chat, onClick }: ChatItemContentProps) {
    const me = useAppSelector((state) => state.auth.user);
    const messageListId = chat.messageListId;
    const messageList = useLiveQuery(() => db.chatMessageLists.get(messageListId), [messageListId]);
    const lastMessage = messageList?.messages[0];
    const lastMessageTime = lastMessage ? lastMessage.createdAt : chat.createdAt;
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (messageList) {
            setUnreadCount(getUnreadMessageCount(messageList, me.userId));
        }
    }, [messageList, me.userId]);

    return (
        <ListItem
            onClick={onClick}
            sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
                display: "flex",
                alignItems: "center",
            }}
        >
            <ListItemAvatar>
                <Avatar alt={chat.chatName} src={chat.chatAvatarUrl} />
            </ListItemAvatar>

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="subtitle1" noWrap>
                        {chat.chatName}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ whiteSpace: "nowrap" }}
                    >
                        {new Date(lastMessageTime).toLocaleTimeString()}
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{ maxWidth: "100%" }}
                >
                    {lastMessage?.content.contentPayload || "No messages yet"}
                </Typography>
            </Box>

            <Badge
                badgeContent={unreadCount}
                color="error"
                sx={{ marginLeft: 2 }}
                invisible={unreadCount === 0}
            />
        </ListItem>
    );
};
interface ChatItemContentWithSearchParamsProps {
    chat: Chat;
}

function ChatItemContentWithSearchParams({ chat }: ChatItemContentWithSearchParamsProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleOpenChat = (chatId: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("chat", chatId);
        replace(`${pathname}?${params.toString()}`);
    };

    return <ChatItemContent chat={chat} onClick={() => handleOpenChat(chat.chatId)} />;
}

interface ChatItemContentWithoutSearchParamsProps {
    chat: Chat;
}

function ChatItemContentWithoutSearchParams({ chat }: ChatItemContentWithoutSearchParamsProps) {
    return <ChatItemContent chat={chat} onClick={() => { }} />;
}

interface ChatItemProps {
    chat: Chat;
};

export default function ChatItem(props: ChatItemProps) {
    return (
        <Suspense fallback={<ChatItemContentWithoutSearchParams chat={props.chat} />}>
            <ChatItemContentWithSearchParams chat={props.chat} />
        </Suspense >
    );
}