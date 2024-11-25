'use client';
import React, { useState } from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from '@/lib/hooks';
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
    const myId = useAppSelector((state) => state.auth.user.userId);
    const friendGroups = useLiveQuery(() => db.friendGroups.toArray(), []);
    const [selectedGroup, setSelectedGroup] = useState(() => {
        if (!friendGroups) return '';
        const group = friendGroups.find((group) => group.friends.some((f) => f.userId === friend.userId));
        return group ? group.groupName : '';
    });
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleChange = async (event: SelectChangeEvent) => {
        const newGroupName = event.target.value as string;
        if (newGroupName === 'addGroup') {
            setDialogOpen(true);
        } else {
            try {
                const response = await patchFriendsGroups({
                    userId: myId,
                    friendUserId: friend.userId,
                    fromGroupName: selectedGroup,
                    toGroupName: newGroupName
                });
                if (response.code === 0) {
                    setSelectedGroup(newGroupName);
                    try {
                        await moveFriendToGroup(friend.userId, selectedGroup, newGroupName);
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
            <Select value={selectedGroup} onChange={handleChange} variant="standard" sx={{ width: "30%" }}>
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