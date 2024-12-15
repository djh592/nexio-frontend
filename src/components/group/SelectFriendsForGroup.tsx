'use client';
import React, { useState, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import UserDisplayAvatar from '@/components/user/UserDisplayAvatar';

interface SelectFriendsForGroupProps {
    onSelect: (selectedFriendId: string) => void;
    onCancel: (canceledFriendId: string) => void;
}

export default function SelectFriendsForGroup({ onSelect, onCancel }: SelectFriendsForGroupProps) {
    const friendGroups = useLiveQuery(() => db.friendGroups.toArray(), []);
    const [friendIds, setFriendIds] = useState<string[]>([]);

    useEffect(() => {
        if (friendGroups) {
            setFriendIds(friendGroups.flatMap((group) => group.friends));
        }
    }, [friendGroups]);

    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

    useEffect(() => {
        selectedFriends.forEach((userId) => {
            if (!friendIds.includes(userId)) {
                onCancel(userId);
            }
        });
    }, [selectedFriends, friendIds, onCancel]);

    const handleToggle = (userId: string) => {
        setSelectedFriends((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter((id) => id !== userId);
            } else {
                onSelect(userId);
                return [...prevSelected, userId];
            }
        });
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {friendIds.map((friendId) => (
                <FormControlLabel
                    key={friendId}
                    control={
                        <Checkbox
                            checked={selectedFriends.includes(friendId)}
                            onChange={() => handleToggle(friendId)}
                        />
                    }
                    label={<UserDisplayAvatar userId={friendId} />}
                />
            ))}
        </Box>
    );
}