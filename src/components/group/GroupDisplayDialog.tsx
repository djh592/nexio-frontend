'use client';
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ChatParticipantType } from '@/lib/definitions';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCurrentUser } from '@/lib/hooks';
import GroupParticipantDisplay from '@/components/group/GroupParticipantDisplay';


interface GroupDisplayDialogProps {
    chatId: string;
    open: boolean;
    onClose: () => void;
}


export default function GroupDisplayDialog({ chatId, open, onClose }: GroupDisplayDialogProps) {
    const chat = useLiveQuery(() => db.chats.where('chatId').equals(chatId).first(), [chatId]);
    const chatParticipants = useLiveQuery(() => db.chatParticipantLists.where('participantListId').equals(chat?.participantListId || '').first(), [chat?.participantListId]);

    const { currentUser } = useCurrentUser();
    const [myParticipantType, setMyParticipantType] = useState<ChatParticipantType | undefined>(undefined);

    useEffect(() => {
        if (!chatParticipants || !currentUser.userId) return;
        const myParticipant = chatParticipants.participants.find((participant) => participant.userId === currentUser.userId);
        setMyParticipantType(myParticipant?.type);
    }, [currentUser.userId, chat, chatParticipants]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            scroll='paper'
        >
            <DialogTitle>
                {chat?.chatName || 'Group Name'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {chat?.createdAt || 'createdAt'}
                </DialogContentText>
                <GroupParticipantDisplay chatParticipantListId={chat?.participantListId || 'placeholder'} />
            </DialogContent>
            <DialogActions>
                {myParticipantType ?
                    <Button onClick={onClose}>Invite Friend</Button>
                    :
                    <Button onClick={onClose}>Join Chat</Button>
                }
            </DialogActions>
        </Dialog >
    );
}