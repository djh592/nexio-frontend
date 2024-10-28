'use client';
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setUserName } from '@/lib/features/auth/authSlice';

interface EditUserNameDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function EditUserNameDialog({ open, onClose }: EditUserNameDialogProps) {
    const token = useAppSelector((state) => state.auth.token);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [newUserName, setNewUserName] = useState(user.userName);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const headers = new Headers();
            headers.append("Authorization", token);
            const response = await fetch(`/api/user/${user.userId}`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    userName: newUserName,
                }),
            });
            if (response.ok) {
                dispatch(setUserName(newUserName));
                onClose();
            } else {
                const data = await response.json();
                alert("Failed to update username: " + data.message);
            }
        } catch (error) {
            alert("Failed to update username: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="edit-username-dialog-title"
            aria-describedby="edit-username-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="edit-username-dialog-title">
                <Typography variant="h6">{"Edit Username"}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="edit-username-dialog-description">
                    Please enter your new username.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                    disabled={loading}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}