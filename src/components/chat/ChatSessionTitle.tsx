'use client';
import React, { useEffect } from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { useCurrentUser } from '@/lib/hooks';
import { ChatType, ChatParticipantType } from '@/lib/definitions';
import ChatSettingButton from '@/components/chat/ChatSettingButton';
import ChatNotificationButton from '@/components/chat/ChatNotificationButton';
import GroupJoinRequestButton from '@/components/group/GroupJoinRequestButton';

interface ChatSessionTitleProps {
    chatId: string;
}

export default function ChatSessionTitle({ chatId }: ChatSessionTitleProps) {
    const { currentUser } = useCurrentUser();
    const [myParticipantType, setMyParticipantType] = React.useState<ChatParticipantType | undefined>(undefined);
    const chat = useLiveQuery(() => db.chats.where('chatId').equals(chatId).first(), [chatId]);

    useEffect(() => {
        const fetchParticipantType = async () => {
            if (!currentUser.userId || !chat) return;
            const participantList = await db.chatParticipantLists.where('participantListId').equals(chat.participantListId).first();
            const myType = participantList?.participants.find((participant) => participant.userId === currentUser.userId)?.type;
            setMyParticipantType(myType);
        };
        fetchParticipantType();
    }, [currentUser.userId, chat]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, borderBottom: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={chat?.chatName} src={chat?.chatAvatarUrl} sx={{ marginRight: 2 }} />
                <Typography variant="h6" noWrap>
                    {chat?.chatName}
                </Typography>
            </Box>
            <Box>
                {
                    chat?.chatType === ChatType.Group &&
                        (myParticipantType === ChatParticipantType.Admin || myParticipantType === ChatParticipantType.Owner) ? (
                        <GroupJoinRequestButton chatId={chatId} />
                    ) : null
                }
                <ChatNotificationButton chatId={chatId} />
                <ChatSettingButton chatId={chatId} />
            </Box>
        </Box>
    );
}