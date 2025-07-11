'use client';
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { useCurrentUser } from '@/lib/hooks';
import { putUser } from '@/lib/api';

interface EditUserNameDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function EditUserNameDialog({ open, onClose }: EditUserNameDialogProps) {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [newUserName, setNewUserName] = useState(currentUser.userName);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await putUser(currentUser.userId, { userName: newUserName });
            if (response.code === 0) {
                localStorage.setItem('token', response.token);
                setCurrentUser(response.user);
            } else {
                throw new Error(response.info);
            }
        } catch (error) {
            console.log('Error updating profile:', error);
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
                Edit Username
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