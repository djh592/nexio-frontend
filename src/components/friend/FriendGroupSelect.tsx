'use client';
import React, { useEffect, useState } from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useCurrentUser } from '@/lib/hooks';
import { User } from '@/lib/definitions';
import AddIcon from '@mui/icons-material/Add';
import AddFriendGroupDialog from '@/components/friend/AddFriendGroupDialog';
import { patchFriendsGroups } from '@/lib/api';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { moveFriendToGroup } from '@/lib/storage';

interface FriendGroupSelectProps {
    friend: User;
}

export default function FriendGroupSelect({ friend }: FriendGroupSelectProps) {
    const { currentUser } = useCurrentUser();
    const [dialogOpen, setDialogOpen] = useState(false);
    const friendGroups = useLiveQuery(() => db.friendGroups.toArray(), [dialogOpen]);
    const [currentGroupName, setCurrentGroupName] = useState<string>('');

    useEffect(() => {
        if (!friendGroups) return;
        const group = friendGroups.find((group) => group.friends.some((f) => f.userId === friend.userId));
        setCurrentGroupName(group ? group.groupName : '');
    }, [friendGroups, friend.userId]);

    const handleChange = async (event: SelectChangeEvent) => {
        const newGroupName = event.target.value as string;
        if (newGroupName === 'addGroup') {
            setDialogOpen(true);
        } else {
            try {
                const response = await patchFriendsGroups({
                    userId: currentUser.userId,
                    friendUserId: friend.userId,
                    fromGroupName: currentGroupName,
                    toGroupName: newGroupName
                });
                if (response.code === 0) {
                    try {
                        await moveFriendToGroup(friend.userId, currentGroupName, newGroupName);
                        setCurrentGroupName(newGroupName);
                    }
                    catch (err) {
                        throw new Error(String(err));
                    }
                }
                else {
                    throw new Error(response.info);
                }
            }
            catch (err) {
                console.log('Error moving friend to group:', err);
            }
        }
    };

    return (
        <>
            <Select value={currentGroupName} onChange={handleChange} variant="standard" sx={{ width: "30%" }}>
                {friendGroups && friendGroups.map((group) => (
                    <MenuItem key={group.groupName} value={group.groupName}>
                        {group.groupName}
                    </MenuItem>
                ))}
                <MenuItem value="addGroup">
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add a Group" />
                </MenuItem>
            </Select>
            <AddFriendGroupDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </>
    );
}