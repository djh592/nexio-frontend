'use client';
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useCurrentUser } from "@/lib/hooks";
import { postFriendsGroups } from "@/lib/api";
import { upsertFriendGroup } from "@/lib/storage";
import { decomposeResponseFriendGroup } from "@/lib/logic";

interface AddFriendGroupDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function AddFriendGroupDialog(
    { open, onClose }: AddFriendGroupDialogProps
) {
    const { currentUser } = useCurrentUser();
    const [newGroupName, setNewGroupName] = useState('');

    const handleConfirmAddGroup = async () => {
        try {
            const response = await postFriendsGroups({
                userId: currentUser.userId,
                groupName: newGroupName
            });
            if (response.code === 0) {
                const responseGroup = response.friendGroup;
                const newGroup = decomposeResponseFriendGroup(responseGroup).friendGroup;
                try {
                    await upsertFriendGroup(newGroup);
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