'use client';
import React, { useState, useEffect } from 'react';
import { Popover, FormControlLabel, Switch, Box } from '@mui/material';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { patchChats } from '@/lib/api';
import { upsertChat } from '@/lib/storage';
import { useCurrentUser } from '@/lib/hooks';


interface ChatSettingPopoverProps {
    chatId: string;
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
}

export default function ChatSettingPopover({ chatId, open, anchorEl, onClose }: ChatSettingPopoverProps) {
    const { currentUser } = useCurrentUser();
    const chat = useLiveQuery(() => db.chats.where('chatId').equals(chatId).first(), [chatId]);
    const [isMuted, setIsMuted] = useState(false);
    const [isPinned, setIsPinned] = useState(false);

    useEffect(() => {
        if (chat) {
            setIsMuted(chat.chatSettings.isMuted);
            setIsPinned(chat.chatSettings.isPinned);
        }
    }, [chat]);

    const handleIsMutedChange = async () => {
        if (!chat) {
            return;
        }
        try {
            const newChatSettings = { ...chat.chatSettings, isMuted: !isMuted };
            const response = await patchChats(chatId, {
                fromUserId: currentUser.userId,
                chat: {
                    ...chat,
                    chatSettings: newChatSettings,
                }
            });
            if (response.code === 0) {
                const modifiedChat = response.chat;
                await upsertChat(modifiedChat);
                setIsMuted(!isMuted);
            }
            else {
                throw new Error(response.info);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleIsPinnedChange = async () => {
        if (!chat) {
            return;
        }
        try {
            const newChatSettings = { ...chat.chatSettings, isPinned: !isPinned };
            const response = await patchChats(chatId, {
                fromUserId: currentUser.userId,
                chat: {
                    ...chat,
                    chatSettings: newChatSettings,
                }
            });
            if (response.code === 0) {
                const modifiedChat = response.chat;
                await upsertChat(modifiedChat);
                setIsPinned(!isPinned);
            }
            else {
                throw new Error(response.info);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, m: 2 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isMuted}
                            onChange={handleIsMutedChange}
                            color="primary"
                        />
                    }
                    label="Mute Chat"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={isPinned}
                            onChange={handleIsPinnedChange}
                            color="primary"
                        />
                    }
                    label="Pin Chat"
                />
            </Box>
        </Popover>
    );
}