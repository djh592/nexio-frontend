'use client';
import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { useCurrentUser } from '@/lib/hooks';
import { postChats } from '@/lib/api';
import { ChatType } from '@/lib/definitions';
import { upsertChat } from '@/lib/storage';


export function FriendChatButtonDisabled() {
    return (
        <Button
            color="primary"
            variant="contained"
            disabled
        >
            Chat
        </Button>
    );
}

interface FriendChatButtonEnabledProps {
    friendUserId: string;
}

export function FriendChatButtonEnabled({ friendUserId }: FriendChatButtonEnabledProps) {
    const { currentUser } = useCurrentUser();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleClick = async () => {
        if (!currentUser.userId) {
            replace('/signin');
            return;
        }
        else {
            try {
                const response = await postChats({
                    fromUserId: currentUser.userId,
                    chatType: String(ChatType.Private),
                    participantIds: [currentUser.userId, friendUserId],
                });
                if (response.code === 0) {
                    const chat = response.chat;
                    await upsertChat(chat);
                    const newSearchParams = new URLSearchParams(searchParams);
                    newSearchParams.set('chat', chat.chatId);
                    replace(`/chats?${newSearchParams.toString()}`);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Button
            color="primary"
            variant="contained"
            onClick={handleClick}
        >
            Chat
        </Button>
    );
}


interface FriendChatButtonProps {
    friendUserId: string;
}

export default function FriendChatButton({ friendUserId }: FriendChatButtonProps) {
    return (
        <Suspense fallback={<FriendChatButtonDisabled />}>
            <FriendChatButtonEnabled friendUserId={friendUserId} />
        </Suspense>
    );
}