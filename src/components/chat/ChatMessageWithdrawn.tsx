'use client';
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { updateUser } from "@/lib/storage";


interface ChatMessageWithdrawnProps {
    fromUserId: string;
}

export default function ChatMessageWithdrawn({ fromUserId }: ChatMessageWithdrawnProps) {
    const fromUser = useLiveQuery(() => db.users.where('userId').equals(fromUserId).first(), [fromUserId]);

    useEffect(() => {
        if (!fromUser) {
            updateUser(fromUserId);
        }
    }, [fromUser, fromUserId]);

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginY: 2,
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    color: "gray",
                    fontSize: "0.875rem",
                    backgroundColor: "#f0f0f0",
                    paddingX: 2,
                    paddingY: 0.5,
                    borderRadius: 2,
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                }}
            >
                {fromUser ? `${fromUser.userName} withdrew a message` : "Someone withdrew a message"}
            </Typography>
        </Box>
    );
};