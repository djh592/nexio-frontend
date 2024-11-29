'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {Avatar,Badge,Box,ListItem,ListItemAvatar,Typography,} from "@mui/material";
import { Chat } from "@/lib/definitions";
import { useAppSelector } from "@/lib/hooks";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { getUnreadMessageCount } from "@/lib/logic";

type ChatItemContentProps = {
    chat: Chat;
};

export default function ChatItemContent(  { chat }: ChatItemContentProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
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

    const handleOpenChat = (chatId: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("chat", chatId);
        replace(`${pathname}?${params.toString()}`);
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
