'use client';
import React, { useState } from 'react';
import { MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, ListItemIcon, ListItemText } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { User } from '@/lib/definitions';
import { moveFriendToGroup, addFriendGroup } from '@/lib/features/friend/friendSlice';
import AddIcon from '@mui/icons-material/Add';

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
    const [newGroupName, setNewGroupName] = useState('');
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

    const handleAddGroup = () => {
        if (newGroupName.trim()) {
            dispatch(addFriendGroup(newGroupName));
            dispatch(moveFriendToGroup({ friendId: friend.userId, fromGroupName: selectedGroup, toGroupName: newGroupName }));
            setSelectedGroup(newGroupName);
            setNewGroupName('');
            setDialogOpen(false);
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
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Add New Group</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Group Name"
                        fullWidth
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddGroup} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}