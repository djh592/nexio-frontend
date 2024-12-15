'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Avatar, Badge, Box, ListItem, ListItemAvatar, Typography, } from "@mui/material";
import { Chat } from "@/lib/definitions";
import { useCurrentUser } from "@/lib/hooks";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { getUnreadMessageCount } from "@/lib/logic";

type ChatItemContentProps = {
    chat: Chat;
};

export default function ChatItemContent({ chat }: ChatItemContentProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const { currentUser } = useCurrentUser();

    const [messageListId, setMessageListId] = useState(chat.messageListId);
    useEffect(() => {
        setMessageListId(chat.messageListId);
    }
        , [chat.messageListId]);
    const messageList = useLiveQuery(() => db.chatMessageLists.get(messageListId), [messageListId]);

    const [lastMessage, setLastMessage] = useState(messageList?.messages[0]);
    const [lastMessageTime, setLastMessageTime] = useState(chat.createdAt);
    useEffect(() => {
        setLastMessage(messageList?.messages[0]);
        setLastMessageTime(lastMessage ? lastMessage.createdAt : chat.createdAt);
    }
        , [chat, lastMessage, messageList]);
        
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (messageList) {
            setUnreadCount(getUnreadMessageCount(messageList, currentUser.userId));
        }
    }, [messageList, currentUser.userId]);

    const handleOpenChat = (chatId: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("chat", chatId);
        replace(`${pathname}?${params.toString()}`);
    };

    const[invisible, setInvisible] = useState(unreadCount === 0);

    useEffect(() => {
        setInvisible(unreadCount === 0);
    }, [unreadCount]);

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
                <Badge
                    color="error"
                    badgeContent={unreadCount}
                    invisible={invisible}
                >
                    <Avatar
                        variant="rounded"
                        alt={chat.chatName}
                        src={chat.chatAvatarUrl}
                    />
                </Badge>
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
                        marginBottom: 0.75,
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: '16px' }}>
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
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {lastMessage?.content.contentPayload || "No messages yet"}
                </Typography>
            </Box>
        </ListItem>
    );
};
