'use client';
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ChatParticipantType } from '@/lib/definitions';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCurrentUser } from '@/lib/hooks';
import GroupParticipantDisplay from '@/components/group/GroupParticipantDisplay';
import GroupInviteButton from '@/components/group/GroupInviteButton';
import GroupJoinButton from '@/components/group/GroupJoinButton';
import GroupDeleteButton from '@/components/group/GroupDeleteButton';


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
            fullWidth
        >
            <DialogTitle>
                {chat?.chatName || 'Group Name'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Participants
                </DialogContentText>
                <GroupParticipantDisplay chatParticipantListId={chat?.participantListId || 'placeholder'} />
                <DialogContentText>
                    My Role: {myParticipantType}
                </DialogContentText>
                {
                    myParticipantType === ChatParticipantType.Owner ?
                        <>
                            <GroupDeleteButton chatId={chatId} />
                            <Button>
                                Change Owner
                            </Button>
                        </>
                        : null
                }
            </DialogContent>
            <DialogActions>
                {myParticipantType ?
                    <GroupInviteButton chatId={chatId} />
                    :
                    <GroupJoinButton chatId={chatId} />
                }
            </DialogActions>
        </Dialog >
    );
}