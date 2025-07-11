'use client';
import React, { useEffect } from 'react';
import {
    Box, Typography, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCurrentUser } from '@/lib/hooks';
import FriendRequestDisplayCard from './FriendRequestDisplayCard';
import { FriendRequest } from '@/lib/definitions';
import { db } from '@/lib/db';
import { updateFriendRequests } from '@/lib/storage';
import { useLiveQuery } from 'dexie-react-hooks';

export default function FriendRequestList() {
    const { currentUser } = useCurrentUser();

    useEffect(() => { updateFriendRequests(currentUser.userId) }, [currentUser.userId]);    

    const sentRequests = useLiveQuery(() => db.friendRequests.where('fromUserId').equals(currentUser.userId).toArray(), [currentUser.userId]);
    const receivedRequests = useLiveQuery(() => db.friendRequests.where('toUserId').equals(currentUser.userId).toArray(), [currentUser.userId]);

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Accordion sx={{ boxShadow: 'none', border: 'none' }} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Received Requests
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                    {receivedRequests && receivedRequests.length > 0 ? (
                        [...receivedRequests].reverse().map((request: FriendRequest) => (
                            <FriendRequestDisplayCard key={request.requestId} request={request} />
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No received requests.
                        </Typography>
                    )}
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ boxShadow: 'none', border: 'none' }} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Sent Requests
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                    {sentRequests && sentRequests.length > 0 ? (
                        [...sentRequests].reverse().map((request: FriendRequest) => (
                            <FriendRequestDisplayCard key={request.requestId} request={request} />
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No sent requests.
                        </Typography>
                    )}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}