'use client';
import React, { useState } from "react";
import { ChatNotification } from '@/lib/definitions';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Box, Typography, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface ChatNotificationItemProps {
    notification: ChatNotification;
}

export default function ChatNotificationItem({ notification }: ChatNotificationItemProps) {
    const [expanded, setExpanded] = useState(false);
    const fromUser = useLiveQuery(() => db.users.where('userId').equals(notification.fromUserId).first(), [notification.fromUserId]);

    const handleToggleExpand = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <Box sx={{ borderBottom: '1px solid #e0e0e0', padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                    {new Date(notification.createdAt).toLocaleString()}
                </Typography>
                <IconButton onClick={handleToggleExpand} aria-label="toggle expand">
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {fromUser?.userName || 'Unknown User'}
            </Typography>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {notification.notification}
                </Typography>
            </Collapse>
            {!expanded && (
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {notification.notification}
                </Typography>
            )}
        </Box>
    );
}