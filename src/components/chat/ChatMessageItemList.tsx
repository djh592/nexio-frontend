import React, { useEffect, useRef, useState } from 'react';
import { Box, Checkbox } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { updateChatMessageList } from '@/lib/storage';
import { useCurrentUser, useAppSelector, useAppDispatch } from '@/lib/hooks';
import { addForwardingMessage, removeForwardingMessage } from '@/lib/features/chat/chatSlice';
import { patchMessages } from '@/lib/api';
import ChatMessageItem from '@/components/chat/ChatMessageItem';
import ChatMessageTimestamp from '@/components/chat/ChatMessageTimestamp';
import ChatMessageWithdrawn from '@/components/chat/ChatMessageWithdrawn';
import { ChatMessage, ChatMessageMeta, ChatType } from '@/lib/definitions';

interface ChatMessageItemListProps {
    chatType: ChatType;
    messageListId: string;
}

export default function ChatMessageItemList({ chatType, messageListId }: ChatMessageItemListProps) {
    const { currentUser } = useCurrentUser();
    const dispatch = useAppDispatch();
    const isForwarding = useAppSelector(state => state.chat.isForwarding);
    const forwardingMessages = useAppSelector(state => state.chat.forwardingMessages);
    const messageList = useLiveQuery(() => db.chatMessageLists.where('messageListId').equals(messageListId).first(), [messageListId]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!messageList || !currentUser) {
            return;
        }
        const newMessageList = messageList;
        newMessageList.messages.forEach(async message => {
            const newReadBy = message.meta.readBy;
            if (!newReadBy.includes(currentUser.userId)) {
                newReadBy.push(currentUser.userId);
                const newMeta: ChatMessageMeta = { ...message.meta, readBy: newReadBy };
                try {
                    const response = await patchMessages(messageListId, {
                        fromUserId: currentUser.userId,
                        chatMessage: {
                            ...message,
                            meta: newMeta
                        }
                    });
                    if (response.code !== 0) {
                        throw new Error(response.info);
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    }, [currentUser, messageList, messageListId]);

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        updateChatMessageList(messageListId, currentUser.userId);
    }
        , [currentUser, messageListId]);

    useEffect(() => {
        if (messageList) {
            setMessages(messageList.messages);
        }
    }, [messageList]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const renderMessages = () => {
        if (!messages.length) return null;

        const renderedMessages = [];
        let lastTimestamp = new Date(messages[0].createdAt).getTime();

        renderedMessages.push(
            <ChatMessageTimestamp key='timestamp-000' timestamp={messages[0].createdAt} />
        );

        messages.forEach(message => {
            const currentTimestamp = new Date(message.createdAt).getTime();
            const timeDiff = currentTimestamp - lastTimestamp;

            if (timeDiff > 5 * 60 * 1000) {
                renderedMessages.push(
                    <ChatMessageTimestamp key={`timestamp-${message.messageId}`} timestamp={message.createdAt} />
                );
                lastTimestamp = currentTimestamp;
            }

            if (message.meta.deleted) return;

            if (message.meta.withdrawn) {
                renderedMessages.push(
                    <ChatMessageWithdrawn key={message.messageId} fromUserId={message.fromUserId} />
                );
            } else {
                renderedMessages.push(
                    <Box key={message.messageId} sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-start' }}>
                        {
                            isForwarding ?
                                <Checkbox
                                    checked={forwardingMessages.some(forwardingMessage => forwardingMessage.messageId === message.messageId)}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            dispatch(addForwardingMessage(message));
                                        } else {
                                            dispatch(removeForwardingMessage(message));
                                        }
                                    }}
                                />
                                : null
                        }
                        <ChatMessageItem messageListId={messageListId} chatType={chatType} message={message} />
                    </Box>
                );
            }
        });

        return renderedMessages;
    };

    return (
        <Box sx={{ width: '100%', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {renderMessages()}
            <div ref={bottomRef} />
        </Box>
    );
}