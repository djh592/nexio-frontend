'use client';
import React, { useState } from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { User } from '@/lib/definitions';
import { moveFriendToGroup } from '@/lib/features/friend/friendSlice';
import AddIcon from '@mui/icons-material/Add';
import AddFriendGroupDialog from '@/components/friend/AddFriendGroupDialog';

interface FriendGroupSelectProps {
    friend: User;
}

export default function FriendGroupSelect({ friend }: FriendGroupSelectProps) {
    const dispatch = useAppDispatch();
    const friendGroups = useAppSelector((state) => state.friend.friendGroups);
    const [selectedGroup, setSelectedGroup] = useState(() => {
        const group = friendGroups.find((group) => group.friends.some((f) => f.userId === friend.userId));
        return group ? group.groupName : '';
    });
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        const newGroupName = event.target.value as string;
        if (newGroupName === 'addGroup') {
            setDialogOpen(true);
        } else {
            dispatch(moveFriendToGroup({ friendId: friend.userId, fromGroupName: selectedGroup, toGroupName: newGroupName }));
            setSelectedGroup(newGroupName);
        }
    };

    return (
        <>
            <Select value={selectedGroup} onChange={handleChange} variant="standard" sx={{ width: "30%" }}>
                {friendGroups.map((group) => (
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