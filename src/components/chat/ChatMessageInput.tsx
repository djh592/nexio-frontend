'use client';
import React, { useState } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Button,
    Tooltip,
} from '@mui/material';
import {
    Send as SendIcon,
    Image as ImageIcon,
    InsertDriveFile as FileIcon,
    VideoLibrary as VideoIcon,
    Audiotrack as AudioIcon,
} from '@mui/icons-material';
import { useCurrentUser } from '@/lib/hooks';
import { postMessages } from '@/lib/api';
import { ChatMessageContent, ChatMessageContentType } from '@/lib/definitions';
import { useAppSelector } from '@/lib/hooks';
import ChatMessageReply from '@/components/chat/ChatMessageReply';

interface ChatMessageInputProps {
    messageListId: string;
}

export default function ChatMessageInput({ messageListId }: ChatMessageInputProps) {
    const { currentUser } = useCurrentUser();
    const replyMessageId = useAppSelector((state) => state.chat.replyMessageId);
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        if (!message.trim()) return;
        try {
            const chatMessageContent: ChatMessageContent = {
                contentType: ChatMessageContentType.Text,
                contentPayload: btoa(message),
            };
            const chatMessageContents: ChatMessageContent[] = [chatMessageContent];
            const response = await postMessages(messageListId, {
                fromUserId: currentUser.userId,
                chatMessageContents: chatMessageContents,
                replyMessageId: replyMessageId,
            });

            if (response.code === 0) {
                setMessage('');
            } else {
                console.log(response.info);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, contentType: ChatMessageContentType) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const contentPayload = btoa(reader.result as string);
                    const chatMessageContent: ChatMessageContent = {
                        contentType,
                        contentPayload,
                    };
                    const response = await postMessages(messageListId, {
                        fromUserId: currentUser.userId,
                        chatMessageContents: [chatMessageContent],
                    });

                    if (response.code === 0) {
                        setMessage('');
                    } else {
                        console.error(response.info);
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            {
                replyMessageId &&
                <ChatMessageReply messageListId={messageListId} replyMessageId={replyMessageId} />
            }
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    px: 1,
                    // borderTop: '1px solid #ddd',
                    // overflow: 'hidden',
                    flexShrink: 0,
                }}
            >
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                        // borderRadius: 4,
                        flexGrow: 1,
                        overflow: 'auto',
                    }}
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexShrink: 0,
                }}
                >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Image">
                            <IconButton component="label" >
                                <ImageIcon />
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => handleFileUpload(e, ChatMessageContentType.Image)}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="File">
                            <IconButton component="label" >
                                <FileIcon />
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleFileUpload(e, ChatMessageContentType.File)}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Video">
                            <IconButton component="label" >
                                <VideoIcon />
                                <input
                                    type="file"
                                    accept="video/*"
                                    hidden
                                    onChange={(e) => handleFileUpload(e, ChatMessageContentType.Video)}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Audio">
                            <IconButton component="label" >
                                <AudioIcon />
                                <input
                                    type="file"
                                    accept="audio/*"
                                    hidden
                                    onChange={(e) => handleFileUpload(e, ChatMessageContentType.Audio)}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>


                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                        endIcon={<SendIcon />}
                    // sx={{ alignSelf: 'flex-start' }}
                    >
                        Send
                    </Button>
                </Box>
            </Box>
        </>
    );
}