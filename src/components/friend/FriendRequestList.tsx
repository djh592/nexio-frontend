'use client';
import React from 'react';
import {
    Box, Typography, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '@/lib/hooks';
import FriendRequestDisplayCard from './FriendRequestDisplayCard';
import { FriendRequest } from '@/lib/definitions';

export default function FriendRequestList() {
    const sentRequests = useAppSelector((state) => state.friend.sentRequests);
    const receivedRequests = useAppSelector((state) => state.friend.receivedRequests);

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Accordion sx={{ boxShadow: 'none', border: 'none' }} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Received Requests</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                    {receivedRequests.length > 0 ? (
                        receivedRequests.map((request: FriendRequest) => (
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
                    <Typography variant="h6">Sent Requests</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                    {sentRequests.length > 0 ? (
                        sentRequests.map((request: FriendRequest) => (
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