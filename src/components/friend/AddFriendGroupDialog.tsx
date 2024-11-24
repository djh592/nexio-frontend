'use client';
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addFriendGroup } from "@/lib/features/friend/friendSlice";
import { postFriendsGroups } from "@/lib/api";

interface AddFriendGroupDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function AddFriendGroupDialog(
    { open, onClose }: AddFriendGroupDialogProps
) {
    const userId = useAppSelector((state) => state.auth.user.userId);
    const [newGroupName, setNewGroupName] = useState('');
    const dispatch = useAppDispatch();

    const handleConfirmAddGroup = async () => {
        try {
            const response = await postFriendsGroups({
                userId: userId,
                groupName: newGroupName
            });
            if (response.code === 200) {
                const newGroup = response.friendGroup;
                dispatch(addFriendGroup(newGroup.groupName));
            }
            else {
                console.log(response.info);
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