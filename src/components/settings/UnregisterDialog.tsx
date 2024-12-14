'use client';
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useCurrentUser } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { deleteUnregister } from '@/lib/api';
import { disconnectSocket } from '@/lib/socket';

interface UnregisterDialogLogoutDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function UnregisterDialog(
    { open, onClose }: UnregisterDialogLogoutDialogProps
) {
    const { currentUser } = useCurrentUser();
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDeleteAccount = async () => {
        setLoading(true);
        try {
            const response = await deleteUnregister({ userId: currentUser.userId, password });
            if (response.code === 0) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.dispatchEvent(new Event('storage'));
                disconnectSocket();
                router.push('/');
            } else {
                throw new Error(response.info);
            }
        } catch (error) {
            alert("Failed to delete account: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-account-dialog-title"
            aria-describedby="delete-account-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="delete-account-dialog-title">
                Confirm Delete Account
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-account-dialog-description">
                    To delete your account, please enter your password to confirm.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleDeleteAccount}
                    color="error"
                    variant="contained"
                    disabled={loading}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
