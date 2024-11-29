'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ChatSessionContent from '@/components/chat/ChatSessionContent';

const ChatSessionLoading = () => {
    return <div>Loading...</div>;
}

const ChatSessionWithContent = () => {
    const searchParams = useSearchParams();
    const [chatId, setChatId] = useState<null | string>(null);

    useEffect(() => {
        const chatId = searchParams.get('chat');
        if (chatId) {
            setChatId(chatId);
        }
    }, [searchParams]);

    return (
        <>
            {chatId && <ChatSessionContent chatId={chatId} />}
        </>
    );
};

export default function ChatSession() {
    return (
        <Suspense fallback={<ChatSessionLoading />}>
            <ChatSessionWithContent />
        </Suspense>
    );
}
