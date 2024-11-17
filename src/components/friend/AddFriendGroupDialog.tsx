'use client';
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addFriendGroup } from "@/lib/features/friend/friendSlice";

interface AddFriendGroupDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function AddFriendGroupDialog(
    { open, onClose }: AddFriendGroupDialogProps
) {
    const token = useAppSelector((state) => state.auth.token);
    const userId = useAppSelector((state) => state.auth.user.userId);
    const [newGroupName, setNewGroupName] = useState('');
    const dispatch = useAppDispatch();

    const handleConfirmAddGroup = async () => {
        try {
            const headers = new Headers();
            headers.append("Authorization", token);
            const response = await fetch('/api/friends/groups', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ userId, groupName: newGroupName })
            });

            if (!response.ok) {
                throw new Error('Failed to add new group');
            }

            dispatch(addFriendGroup(newGroupName));
            setNewGroupName('');
            onClose();
        } catch (error) {
            console.log('Error adding new group:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
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
                <Button onClick={handleConfirmAddGroup} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}