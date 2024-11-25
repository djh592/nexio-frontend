'use client';
import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAppSelector } from "@/lib/hooks";
import { deleteFriendsGroups } from "@/lib/api";
import { removeFriendGroup } from "@/lib/storage";

interface DeleteFriendGroupDialogProps {
    groupName: string;
    open: boolean;
    onClose: () => void;
}

export default function DeleteFriendGroupDialog(
    { groupName, open, onClose }: DeleteFriendGroupDialogProps
) {
    const userId = useAppSelector((state) => state.auth.user.userId);

    const handleConfirmDeleteGroup = async () => {
        try {
            const response = await deleteFriendsGroups({
                userId: userId,
                groupName: groupName
            });
            if (response.code === 0) {
                try {
                    await removeFriendGroup(groupName);
                }
                catch (error) {
                    throw new Error(String(error));
                }
            }
            else {
                throw new Error(response.info);
            }
        } catch (error) {
            console.log(`Failed to delete group: ${error}`);
        } finally {
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography>{`Are you sure you want to delete the group "${groupName}"?`}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirmDeleteGroup} color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}