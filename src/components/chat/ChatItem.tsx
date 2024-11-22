'use client';
import React from "react";
import {
    Avatar,
    Badge,
    Box,
    ListItem,
    ListItemAvatar,
    Typography,
} from "@mui/material";
import { Chat } from "@/lib/definitions";
import { useAppSelector } from "@/lib/hooks";

type ChatItemProps = {
    chat: Chat;
};

export default function ChatItem(
    { chat }: ChatItemProps
) {
    const me = useAppSelector((state) => state.auth.user);
    const others = chat.participants.filter((p) => p.userId !== me.userId);
    const isFriendChat = others.length === 1;
    const isGroupChat = others.length > 1;

    const chatName = isFriendChat
        ? others[0].userName
        : isGroupChat
            ? others.map((p) => p.userName).join(", ").slice(0, 16).concat("...")
            : "Unknown";
    const chatAvatarUrl = isFriendChat
        ? others[0].avatarUrl
        : isGroupChat
            ? "/images/group.png"
            : "/images/unknown.png";
    const lastMessage = chat.messages.length > 0 ? chat.messages[0] : null;
    const lastMessageTime = lastMessage ? lastMessage.createdAt : chat.createdAt;

    const handleOpenChat = (chatId: string) => {
        console.log("Open chat:", chatId);
        // to be implemented
    };

    return (
        <ListItem
            onClick={() => handleOpenChat(chat.chatId)}
            sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
                display: "flex",
                alignItems: "center",
            }}
        >
            <ListItemAvatar>
                <Avatar alt={chatName} src={chatAvatarUrl} />
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
                        {chatName}
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
                    {lastMessage?.content || "No messages yet"}
                </Typography>
            </Box>

            <Badge
                badgeContent={chat.unreadCount}
                color="error"
                sx={{ marginLeft: 2 }}
                invisible={chat.unreadCount === 0}
            />
        </ListItem>
    );
};
