'use client';
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import UserDisplayAvatar from '@/components/UserDisplayAvatar';

import { placeholderChatParticipantList } from '@/lib/placeholder';

interface GroupParticipantDisplayProps {
    chatParticipantListId: string;
}

const ROW_LIMIT = 2;
const COLUMN_LIMIT = 5;

export default function GroupParticipantDisplay({ chatParticipantListId }: GroupParticipantDisplayProps) {
    const chatParticipantList = useLiveQuery(
        () => db.chatParticipantLists.where('participantListId').equals(chatParticipantListId).first(),
        [chatParticipantListId]
    ) ?? placeholderChatParticipantList;

    const [expanded, setExpanded] = useState(false);

    const participants = chatParticipantList?.participants || [];
    const totalRows = Math.ceil(participants.length / COLUMN_LIMIT);
    const visibleRows = expanded ? totalRows : ROW_LIMIT;
    const visibleParticipants = participants.slice(0, visibleRows * COLUMN_LIMIT);

    const handleToggleExpand = () => {
        setExpanded((prev) => !prev);
    };

    return (
        <Box sx={{ width: '100%', paddingTop: 1, paddingX: 1, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Grid container spacing={2}>
                {visibleParticipants.map((participant) => (
                    <Grid size={2} key={participant.userId}>
                        <UserDisplayAvatar userId={participant.userId} />
                    </Grid>
                ))}
            </Grid>
            {totalRows > ROW_LIMIT && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <IconButton onClick={handleToggleExpand} aria-label="toggle expand">
                        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
            )}
        </Box>
    );
}
