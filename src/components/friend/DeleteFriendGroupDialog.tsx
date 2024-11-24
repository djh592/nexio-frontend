'use client';
import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeFriendGroup } from "@/lib/features/friend/friendSlice";
import { deleteFriendsGroups } from "@/lib/api";

interface DeleteFriendGroupDialogProps {
    groupName: string;
    open: boolean;
    onClose: () => void;
}

export default function DeleteFriendGroupDialog(
    { groupName, open, onClose }: DeleteFriendGroupDialogProps
) {
    const userId = useAppSelector((state) => state.auth.user.userId);
    const dispatch = useAppDispatch();

    const handleConfirmDeleteGroup = async () => {
        try {
            const response = await deleteFriendsGroups({
                userId: userId,
                groupName: groupName
            });
            if (response.code === 200) {
                dispatch(removeFriendGroup(groupName));
            }
            else {
                console.log(response.info);
            }
        } catch (error) {
            console.log(error);
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