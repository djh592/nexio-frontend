'use client';
import React, { useState, useEffect } from "react";
import { ChatMessage, ChatMessageContentType } from "@/lib/definitions";
import { Typography } from "@mui/material";
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { updateUser } from "@/lib/storage";



interface ChatMessageReplyProps {
    messageListId: string;
    replyMessageId: string;
}

export default function ChatMessageReply({ messageListId, replyMessageId }: ChatMessageReplyProps) {
    const [replyMessage, setReplyMessage] = useState<ChatMessage | null>(null);

    const replyUser = useLiveQuery(
        () => db.users.where('userId').equals(replyMessage?.fromUserId ? replyMessage?.fromUserId : "").first(),
        [replyMessage?.fromUserId]
    );
    const messageList = useLiveQuery(
        () => db.chatMessageLists.where('messageListId').equals(messageListId).first(),
        [messageListId],
    );

    useEffect(() => {
        if (messageList && messageList.messages) {
            const replyMessage = messageList.messages.find((message) => message.messageId === replyMessageId);
            setReplyMessage(replyMessage || null);
        }
    }, [messageList, replyMessageId]);

    useEffect(() => {
        if (replyMessage && !replyUser) {
            updateUser(replyMessage.fromUserId);
        }
    }
        , [replyMessage, replyUser]);

    const messageToDisplay = (replyMessage: ChatMessage | null) => {
        if (!replyMessage) {
            return "Someone replied to a message";
        }
        if (replyMessage.meta.withdrawn) {
            return 'Message withdrawn';
        }
        const content = replyMessage.content;
        const contentType = content.contentType;
        const contentPayload = content.contentPayload;
        switch (contentType) {
            case ChatMessageContentType.Text:
                return btoa(contentPayload);
            case ChatMessageContentType.Image:
                return '[Image]';
            case ChatMessageContentType.Video:
                return '[Video]';
            case ChatMessageContentType.Audio:
                return '[Audio]';
            case ChatMessageContentType.File:
                return '[File]';
            case ChatMessageContentType.Forwarded:
                return '[Forwarded]';
            default:
                return '[Unknown]';
        }
    }

    return (
        <Typography
            variant="body2"
            sx={{
                width: "100%",
                color: "gray",
                fontSize: "0.875rem",
                backgroundColor: "#f0f0f0",
                paddingX: 2,
                paddingY: 0.5,
                borderRadius: 2,
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
            }}
        >
            {`${replyUser?.userName}: ${messageToDisplay(replyMessage)}`}
        </Typography>
    );
};