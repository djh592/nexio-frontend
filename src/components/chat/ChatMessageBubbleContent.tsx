import React from "react";
import { ChatMessageContent, ChatMessageContentType, ChatMessage } from "@/lib/definitions";
import { Typography, Card, CardMedia, CardContent, Link, Box } from "@mui/material";

interface ChatMessageBubbleContentProps {
    content: ChatMessageContent;
}

export default function ChatMessageBubbleContent({ content }: ChatMessageBubbleContentProps) {
    const contentType = content.contentType;
    // Decode base64 payload
    const contentPayload = atob(content.contentPayload);

    switch (contentType) {
        case ChatMessageContentType.Text:
            return <ChatBubbleContentPayloadText contentPayload={contentPayload} />;
        case ChatMessageContentType.Image:
            return <ChatBubbleContentPayloadImage contentPayload={contentPayload} />;
        case ChatMessageContentType.File:
            return <ChatBubbleContentPayloadFile contentPayload={contentPayload} />;
        case ChatMessageContentType.Audio:
            return <ChatBubbleContentPayloadAudio contentPayload={contentPayload} />;
        case ChatMessageContentType.Video:
            return <ChatBubbleContentPayloadVideo contentPayload={contentPayload} />;
        case ChatMessageContentType.Forwarded:
            const forwardedMessages: ChatMessage[] = JSON.parse(contentPayload);
            return <ChatBubbleContentPayloadForwarded messages={forwardedMessages} />;
        default:
            return null;
    }
}

interface ChatBubbleContentPayloadProps {
    contentPayload: string;
}

function ChatBubbleContentPayloadText({ contentPayload }: ChatBubbleContentPayloadProps) {
    return (
        <Typography variant="body1">
            {contentPayload}
        </Typography>
    );
}

function ChatBubbleContentPayloadImage({ contentPayload }: ChatBubbleContentPayloadProps) {
    return (
        <Card>
            <CardMedia
                component="img"
                image={contentPayload}
                alt="Image"
            />
        </Card>
    );
}

function ChatBubbleContentPayloadFile({ contentPayload }: ChatBubbleContentPayloadProps) {
    return (
        <Link href={contentPayload} download>
            Download File
        </Link>
    );
}

function ChatBubbleContentPayloadAudio({ contentPayload }: ChatBubbleContentPayloadProps) {
    return (
        <Box component="audio" controls src={contentPayload}>
            Your browser does not support the audio element.
        </Box>
    );
}

function ChatBubbleContentPayloadVideo({ contentPayload }: ChatBubbleContentPayloadProps) {
    return (
        <Box component="video" controls src={contentPayload}>
            Your browser does not support the video element.
        </Box>
    );
}

interface ChatBubbleContentPayloadForwardedProps {
    messages: ChatMessage[];
}

function ChatBubbleContentPayloadForwarded({ messages }: ChatBubbleContentPayloadForwardedProps) {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                    Forwarded Message:
                </Typography>
                {messages.map((message, index) => (
                    <ChatMessageBubbleContent key={index} content={message.content} />
                ))}
            </CardContent>
        </Card>
    );
}