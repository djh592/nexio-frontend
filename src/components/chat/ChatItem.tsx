'use client';
import React, { Suspense } from "react";
import { Chat } from "@/lib/definitions";
import ChatItemContent from "@/components/chat/ChatItemContent";
import ChatItemSkeleton from "@/components/chat/ChatItemSkeleton";

interface ChatItemProps {
    chat: Chat;
}

export default function ChatItem({ chat }: ChatItemProps) {
    return (
        <Suspense fallback={<ChatItemSkeleton />}>
            <ChatItemContent chat={chat} />
        </Suspense>
    );
}