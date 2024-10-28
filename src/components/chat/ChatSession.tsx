'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const ChatSessionContent = () => {
    const searchParams = useSearchParams();
    const [chatId, setChatId] = useState('0');

    useEffect(() => {
        const chatId = searchParams.get('chat');
        if (chatId) {
            setChatId(chatId);
        }
    }, [searchParams]);

    return (
        <>
            <h1>Chat Session</h1>
            <p>Chat ID: {chatId}</p>
        </>
    );
};

export default function ChatSession() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChatSessionContent />
        </Suspense>
    );
}
