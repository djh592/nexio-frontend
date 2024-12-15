'use client';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import { useCurrentUser } from '@/lib/hooks';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { postJoinRequests } from '@/lib/api';
import UserDisplayAvatar from '@/components/user/UserDisplayAvatar';

interface GroupInviteDialogProps {
    chatId: string;
    open: boolean;
    onClose: () => void;
}

export default function GroupInviteDialog({ chatId, open, onClose }: GroupInviteDialogProps) {
    const chat = useLiveQuery(() => db.chats.where('chatId').equals(chatId).first(), [chatId]);
    const { currentUser } = useCurrentUser();
    const friendGroups = useLiveQuery(() => db.friendGroups.toArray(), []);
    const [friendIds, setFriendIds] = useState<string[]>([]);

    useEffect(() => {
        if (friendGroups) {
            setFriendIds(friendGroups.flatMap((group) => group.friends));
        }
    }, [friendGroups]);

    const [selectedFriendId, setSelectedFriendId] = useState<string>('');


    const handleToggle = (friendUserId: string) => {
        if (selectedFriendId === friendUserId) {
            setSelectedFriendId('');
        }
        else {
            setSelectedFriendId(friendUserId);
        }
    };

    const handleCreate = async () => {
        if (selectedFriendId === '') return;
        if (!currentUser.userId || !chat) return;
        try {
            const response = await postJoinRequests(chat.joinRequestListId, {
                userId: currentUser.userId,
                fromUserId: currentUser.userId,
                toChatId: chat.chatId,
            });
            if (response.code !== 0) {
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
            <DialogTitle>Invite Friend to Group</DialogTitle>
            <DialogContent>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>]
                    {friendIds.map((friendId) => (
                        <FormControlLabel
                            key={friendId}
                            control={
                                <Checkbox
                                    checked={selectedFriendId === friendId}
                                    onChange={() => handleToggle(friendId)}
                                />
                            }
                            label={<UserDisplayAvatar userId={friendId} />}
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreate} disabled={!selectedFriendId}>
                    Create
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}