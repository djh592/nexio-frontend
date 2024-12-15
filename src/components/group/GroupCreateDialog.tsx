'use client';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import { useCurrentUser } from '@/lib/hooks';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { postChats } from '@/lib/api';
import { ChatType } from '@/lib/definitions';
import { upsertChat } from '@/lib/storage';
import UserDisplayAvatar from '@/components/user/UserDisplayAvatar';

interface GroupCreateDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function GroupCreateDialog({ open, onClose }: GroupCreateDialogProps) {
    const { currentUser } = useCurrentUser();
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
                setSelectedFriends((prevSelected) => prevSelected.filter((id) => id !== userId));
            }
        });
    }, [selectedFriends, friendIds]);

    const handleToggle = (userId: string) => {
        setSelectedFriends((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter((id) => id !== userId);
            } else {
                setSelectedFriends((prevSelected) => [...prevSelected, userId]);
                return [...prevSelected, userId];
            }
        });
    };

    const handleCreate = async () => {
        try {
            console.log(selectedFriends);
            const response = await postChats({
                fromUserId: currentUser.userId,
                chatType: ChatType.Group,
                participantIds: selectedFriends,
            });
            if (response.code === 0) {
                try {await upsertChat(response.chat);}
                catch (error) {console.log(error);}
            }
            else {
                throw new Error(response.info);
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Create Group</DialogTitle>
            <DialogContent>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>]
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreate} disabled={selectedFriends.length === 0}>
                    Create
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}