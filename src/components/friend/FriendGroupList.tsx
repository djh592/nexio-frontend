'use client';
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserStack from '@/components/UserStack';
import { FriendGroups } from '@/lib/definitions';

interface FriendGroupListProps {
    friendGroups: FriendGroups;
}

export default function FriendGroupList({ friendGroups }: FriendGroupListProps) {
    return (
        <Box sx={{ width: '100%' }}>
            {friendGroups.map((group) => (
                <Accordion key={group.groupName} sx={{ boxShadow: 'none', border: 'none' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${group.groupName}-content`}
                        id={`${group.groupName}-header`}
                    >
                        <Typography variant="subtitle1">{group.groupName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                        {group.friends.map((friend) => (
                            <Box key={friend.userId} sx={{ width: '100%' }}>
                                <UserStack user={friend} />
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}