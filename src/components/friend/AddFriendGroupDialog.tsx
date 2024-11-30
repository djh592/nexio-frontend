'use client';
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useCurrentUser } from "@/lib/hooks";
import { postFriendsGroups } from "@/lib/api";
import { addFriendGroup } from "@/lib/storage";

interface AddFriendGroupDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function AddFriendGroupDialog(
    { open, onClose }: AddFriendGroupDialogProps
) {
    const me = useCurrentUser();
    const myId = me.userId;
    const [newGroupName, setNewGroupName] = useState('');

    const handleConfirmAddGroup = async () => {
        try {
            const response = await postFriendsGroups({
                userId: myId,
                groupName: newGroupName
            });
            if (response.code === 0) {
                const newGroup = response.friendGroup;
                console.log('New group:', newGroup);
                try {
                    await addFriendGroup(newGroup.groupName);
                }
                catch (err) {
                    throw new Error(String(err));
                }
            }
            else {
                throw new Error(response.info);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setNewGroupName('');
            onClose();
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